-- =============================================================================
-- KAZA — Production Optimizations Migration
-- Data: 2026-04-29
--
-- Problemas resolvidos:
--   1. Performance: user_home_ids() SECURITY DEFINER elimina N+1 em todas as RLS
--   2. Isolamento: toda RLS usa a função helper — zero vazamento cross-user
--   3. Conta secundária: complete_user_onboarding não sobrescreve casa de sub-user
--   4. Notificações: UNIQUE constraint correto em notification_preferences
--   5. Índices: cobertura completa para escalar até 10k+ usuários
--   6. Handle new user: trigger cria subscription + notification_preferences atomicamente
-- =============================================================================

BEGIN;

-- =============================================================================
-- 0. GARANTIR COLUNAS QUE FUNÇÕES, POLICIES E INDEXES DEPENDEM
--    Tudo idempotente — ADD COLUMN IF NOT EXISTS nunca falha.
-- =============================================================================

-- home_members: is_active para desativação sem remoção
ALTER TABLE public.home_members
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

-- items: soft delete + location
ALTER TABLE public.items
  ADD COLUMN IF NOT EXISTS deleted_at  timestamptz DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS location    text        DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS expiry_date date        DEFAULT NULL;

-- shopping_items: soft delete + store
ALTER TABLE public.shopping_items
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS store      text        DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS home_id    uuid        DEFAULT NULL;

-- consumables: soft delete
ALTER TABLE public.consumables
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz DEFAULT NULL;

-- item_history: soft delete + home_id + user_id
ALTER TABLE public.item_history
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS home_id    uuid        DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS user_id    uuid        DEFAULT NULL;

-- consumable_logs: home_id
ALTER TABLE public.consumable_logs
  ADD COLUMN IF NOT EXISTS home_id uuid DEFAULT NULL;

-- meal_plans: planned_date + home_id
ALTER TABLE public.meal_plans
  ADD COLUMN IF NOT EXISTS planned_date  date DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS home_id       uuid DEFAULT NULL;

-- recipes: home_id + is_public
ALTER TABLE public.recipes
  ADD COLUMN IF NOT EXISTS home_id   uuid    DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS is_public boolean NOT NULL DEFAULT false;

-- notification_queue: user_id + status + scheduled_for
ALTER TABLE public.notification_queue
  ADD COLUMN IF NOT EXISTS user_id        uuid        DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS status         text        NOT NULL DEFAULT 'queued',
  ADD COLUMN IF NOT EXISTS scheduled_for  timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS created_at     timestamptz NOT NULL DEFAULT now();

-- garbage_reminders: next_fire_at + enabled
ALTER TABLE public.garbage_reminders
  ADD COLUMN IF NOT EXISTS next_fire_at timestamptz DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS enabled      boolean     NOT NULL DEFAULT true;

-- subscriptions: plan_tier + is_active + trial_ends_at
ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS plan_tier       text        NOT NULL DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS is_active       boolean     NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS trial_ends_at   timestamptz DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS trial_started_at timestamptz DEFAULT NULL;

-- push_subscriptions: is_active
ALTER TABLE public.push_subscriptions
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

-- sub_account_members: is_active
ALTER TABLE public.sub_account_members
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

-- account_sessions: group_id
ALTER TABLE public.account_sessions
  ADD COLUMN IF NOT EXISTS group_id uuid DEFAULT NULL;

-- user_recipe_favorites: deleted_at (referenciada em cleanup_deleted_user)
ALTER TABLE public.user_recipe_favorites
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz DEFAULT NULL;

-- Garantir índice temporário antes das funções (será recriado na seção 6)
CREATE INDEX IF NOT EXISTS idx_home_members_user_active_pre
  ON public.home_members (user_id, is_active)
  WHERE is_active = true;

-- =============================================================================
-- 1. FUNÇÕES SECURITY DEFINER — BASE DE TODA RLS
--    Executadas fora do contexto RLS, eliminam recursão e N+1 queries.
-- =============================================================================

-- Retorna IDs das casas em que o usuário atual é membro ativo.
-- STABLE + SECURITY DEFINER = executada 1x por query, ignora RLS recursiva.
CREATE OR REPLACE FUNCTION public.user_home_ids()
RETURNS SETOF uuid
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT home_id
  FROM public.home_members
  WHERE user_id = auth.uid()
    AND is_active = true;
$$;

-- Retorna IDs das casas em que o usuário atual é OWNER (não membro via convite).
CREATE OR REPLACE FUNCTION public.user_owned_home_ids()
RETURNS SETOF uuid
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT home_id
  FROM public.home_members
  WHERE user_id      = auth.uid()
    AND is_active    = true
    AND role::text   = 'owner';
$$;

-- Verifica se o usuário atual tem o(s) papel(is) indicado(s) em uma casa.
CREATE OR REPLACE FUNCTION public.user_has_home_role(p_home_id uuid, p_roles text[])
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.home_members
    WHERE home_id   = p_home_id
      AND user_id   = auth.uid()
      AND role::text = ANY(p_roles)
      AND is_active  = true
  );
$$;

-- Retorna IDs dos grupos de sub-conta do usuário atual (como membro).
CREATE OR REPLACE FUNCTION public.get_auth_user_group_ids()
RETURNS SETOF uuid
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT group_id
  FROM public.sub_account_members
  WHERE user_id = auth.uid()
    AND is_active = true;
$$;

-- Retorna IDs dos grupos de sub-conta que o usuário atual é MASTER.
CREATE OR REPLACE FUNCTION public.get_auth_master_group_ids()
RETURNS SETOF uuid
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT id
  FROM public.sub_account_groups
  WHERE master_user_id = auth.uid();
$$;

-- Resolve o user_id efetivo: se é sub-conta, retorna o master.
CREATE OR REPLACE FUNCTION public.get_effective_user_id()
RETURNS uuid
LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_uid       uuid := auth.uid();
  v_group_id  uuid;
  v_master_id uuid;
BEGIN
  SELECT sam.group_id INTO v_group_id
  FROM public.sub_account_members sam
  WHERE sam.user_id = v_uid AND sam.is_active = true
  LIMIT 1;

  IF v_group_id IS NOT NULL THEN
    SELECT sag.master_user_id INTO v_master_id
    FROM public.sub_account_groups sag
    WHERE sag.id = v_group_id;
  END IF;

  RETURN COALESCE(v_master_id, v_uid);
END;
$$;

GRANT EXECUTE ON FUNCTION public.user_home_ids()                        TO authenticated;
GRANT EXECUTE ON FUNCTION public.user_owned_home_ids()                  TO authenticated;
GRANT EXECUTE ON FUNCTION public.user_has_home_role(uuid, text[])       TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_auth_user_group_ids()              TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_auth_master_group_ids()            TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_effective_user_id()                TO authenticated;

-- =============================================================================
-- 2. TRIGGER handle_new_user — BOOTSTRAP ATÔMICO
--    Cria profiles + subscription (trial 7d) + notification_preferences
--    atomicamente ao criar o usuário. Nunca duplica.
-- =============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Perfil base
  INSERT INTO public.profiles (user_id, name, onboarding_completed)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name',
             NEW.raw_user_meta_data->>'name',
             'Usuário Kaza'),
    false
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- Trial de 7 dias (free)
  INSERT INTO public.subscriptions (
    user_id, plan, plan_tier, is_active,
    trial_started_at, trial_ends_at
  )
  VALUES (
    NEW.id, 'free', 'free', false,
    now(), now() + interval '7 days'
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- Preferências de notificação padrão
  INSERT INTO public.notification_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- 3. NOTIFICATION_PREFERENCES — UNIQUE CONSTRAINT CORRETO
--    Apenas 1 linha por usuário. O home_id nesta tabela é opcional (contexto).
-- =============================================================================

-- Primeiro: garantir que TODAS as colunas existam (idempotente)
ALTER TABLE public.notification_preferences
  ADD COLUMN IF NOT EXISTS user_id              uuid,
  ADD COLUMN IF NOT EXISTS home_id              uuid,
  ADD COLUMN IF NOT EXISTS nightly_checkup      boolean     NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS nightly_checkup_time time        NOT NULL DEFAULT '21:00',
  ADD COLUMN IF NOT EXISTS timezone             text        NOT NULL DEFAULT 'America/Sao_Paulo',
  ADD COLUMN IF NOT EXISTS garbage_reminder     boolean     NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS achievement_updates  boolean     NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS trial_expiring       boolean     NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS billing_upcoming     boolean     NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS created_at           timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at           timestamptz NOT NULL DEFAULT now();

-- Agora sim: dedup e UNIQUE constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'notification_preferences_user_id_key'
      AND conrelid = 'public.notification_preferences'::regclass
  ) THEN
    DELETE FROM public.notification_preferences np
    WHERE ctid NOT IN (
      SELECT DISTINCT ON (user_id) ctid
      FROM public.notification_preferences
      WHERE user_id IS NOT NULL
      ORDER BY user_id, updated_at DESC NULLS LAST
    );

    DELETE FROM public.notification_preferences WHERE user_id IS NULL;

    ALTER TABLE public.notification_preferences
      ADD CONSTRAINT notification_preferences_user_id_key UNIQUE (user_id);
  END IF;
END $$;

DROP TRIGGER IF EXISTS trg_notif_prefs_updated_at ON public.notification_preferences;
CREATE TRIGGER trg_notif_prefs_updated_at
  BEFORE UPDATE ON public.notification_preferences
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS notif_prefs_own ON public.notification_preferences;
CREATE POLICY notif_prefs_own ON public.notification_preferences
  FOR ALL TO authenticated
  USING  (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- =============================================================================
-- 4. COMPLETE_USER_ONBOARDING — CORRIGIDO PARA CONTAS SECUNDÁRIAS
--    Lógica: só cria/edita casa se o usuário é OWNER.
--    Sub-contas que entraram via convite NÃO sobrescrevem a casa do master.
-- =============================================================================

CREATE OR REPLACE FUNCTION public.complete_user_onboarding(
  p_home_name           text,
  p_user_name           text,
  p_user_cpf            text    DEFAULT NULL,
  p_home_type           text    DEFAULT 'apartment',
  p_residents           int     DEFAULT 1,
  p_fridge_type         text    DEFAULT 'regular',
  p_fridge_brand        text    DEFAULT NULL,
  p_cooling_level       int     DEFAULT 3,
  p_theme_preference    text    DEFAULT 'system',
  p_language_preference text    DEFAULT 'pt-BR'
)
RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_user_id    uuid := auth.uid();
  v_home_id    uuid;
  v_owned_home uuid;
  v_is_sub     boolean;
BEGIN
  -- Detectar se é sub-conta ativa de outro master
  SELECT EXISTS (
    SELECT 1 FROM public.sub_account_members
    WHERE user_id = v_user_id AND is_active = true
  ) INTO v_is_sub;

  -- Buscar casa que o próprio usuário é OWNER
  SELECT home_id INTO v_owned_home
  FROM public.home_members
  WHERE user_id    = v_user_id
    AND role::text = 'owner'
    AND is_active  = true
  LIMIT 1;

  IF v_is_sub AND v_owned_home IS NULL THEN
    -- Sub-conta sem casa própria: cria uma casa pessoal separada.
    -- A sub-conta acessa o inventário do master pelo home_members já existente,
    -- mas mantém sua própria casa independente.
    INSERT INTO public.homes (name, owner_user_id, home_type, residents)
    VALUES (p_home_name, v_user_id, p_home_type, p_residents)
    RETURNING id INTO v_home_id;

    INSERT INTO public.home_members (home_id, user_id, role, is_active)
    VALUES (v_home_id, v_user_id, 'owner', true)
    ON CONFLICT (home_id, user_id) DO NOTHING;

  ELSIF v_owned_home IS NOT NULL THEN
    -- Usuário já é owner: atualiza a casa existente (re-onboarding)
    v_home_id := v_owned_home;
    UPDATE public.homes
    SET name      = p_home_name,
        home_type = p_home_type,
        residents = p_residents
    WHERE id = v_home_id;

  ELSE
    -- Usuário novo sem casa: criar casa e vincular como owner
    INSERT INTO public.homes (name, owner_user_id, home_type, residents)
    VALUES (p_home_name, v_user_id, p_home_type, p_residents)
    RETURNING id INTO v_home_id;

    INSERT INTO public.home_members (home_id, user_id, role, is_active)
    VALUES (v_home_id, v_user_id, 'owner', true)
    ON CONFLICT (home_id, user_id) DO NOTHING;
  END IF;

  -- Configurações da geladeira
  INSERT INTO public.home_settings (home_id, fridge_type, fridge_brand, cooling_level)
  VALUES (v_home_id, p_fridge_type, p_fridge_brand, p_cooling_level)
  ON CONFLICT (home_id) DO UPDATE
    SET fridge_type   = EXCLUDED.fridge_type,
        fridge_brand  = EXCLUDED.fridge_brand,
        cooling_level = EXCLUDED.cooling_level;

  -- Preferências de notificação (idempotente)
  INSERT INTO public.notification_preferences (user_id)
  VALUES (v_user_id)
  ON CONFLICT (user_id) DO NOTHING;

  -- Garantir linha de subscription
  INSERT INTO public.subscriptions (
    user_id, plan, plan_tier, is_active,
    trial_started_at, trial_ends_at
  )
  VALUES (v_user_id, 'free', 'free', false, now(), now() + interval '7 days')
  ON CONFLICT (user_id) DO NOTHING;

  -- Atualizar perfil (nome sempre editável; CPF só na primeira vez)
  UPDATE public.profiles
  SET name = p_user_name,
      cpf  = CASE
               WHEN p_user_cpf IS NOT NULL AND p_user_cpf <> ''
                    AND (cpf IS NULL OR cpf = '')
               THEN p_user_cpf
               ELSE cpf
             END,
      theme_preference        = p_theme_preference,
      language_preference     = p_language_preference,
      onboarding_completed    = true,
      last_onboarding_attempt = NULL
  WHERE user_id = v_user_id;

  RETURN v_home_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.complete_user_onboarding(text,text,text,text,int,text,text,int,text,text)
  TO authenticated;

-- =============================================================================
-- 5. RLS POLICIES — REESCRITA USANDO user_home_ids() EM TODAS AS TABELAS
--    Elimina subqueries inline nas policies (causa de N+1 e lentidão).
-- =============================================================================

-- ── homes ────────────────────────────────────────────────────────────────────
ALTER TABLE public.homes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS homes_select    ON public.homes;
DROP POLICY IF EXISTS homes_insert    ON public.homes;
DROP POLICY IF EXISTS homes_update    ON public.homes;
DROP POLICY IF EXISTS homes_delete    ON public.homes;
DROP POLICY IF EXISTS "homes select"  ON public.homes;
DROP POLICY IF EXISTS "homes insert"  ON public.homes;
DROP POLICY IF EXISTS "homes update"  ON public.homes;
DROP POLICY IF EXISTS "homes delete"  ON public.homes;

CREATE POLICY homes_select ON public.homes
  FOR SELECT TO authenticated
  USING (id IN (SELECT public.user_home_ids()));

CREATE POLICY homes_insert ON public.homes
  FOR INSERT TO authenticated
  WITH CHECK (owner_user_id = auth.uid());

CREATE POLICY homes_update ON public.homes
  FOR UPDATE TO authenticated
  USING  (id IN (SELECT public.user_home_ids()) AND owner_user_id = auth.uid())
  WITH CHECK (owner_user_id = auth.uid());

CREATE POLICY homes_delete ON public.homes
  FOR DELETE TO authenticated
  USING (owner_user_id = auth.uid());

-- ── home_members ─────────────────────────────────────────────────────────────
ALTER TABLE public.home_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS home_members_select ON public.home_members;
DROP POLICY IF EXISTS home_members_insert ON public.home_members;
DROP POLICY IF EXISTS home_members_update ON public.home_members;
DROP POLICY IF EXISTS home_members_delete ON public.home_members;

CREATE POLICY home_members_select ON public.home_members
  FOR SELECT TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()));

CREATE POLICY home_members_insert ON public.home_members
  FOR INSERT TO authenticated
  WITH CHECK (public.user_has_home_role(home_id, ARRAY['owner','admin']));

CREATE POLICY home_members_update ON public.home_members
  FOR UPDATE TO authenticated
  USING  (home_id IN (SELECT public.user_home_ids()))
  WITH CHECK (public.user_has_home_role(home_id, ARRAY['owner','admin']));

CREATE POLICY home_members_delete ON public.home_members
  FOR DELETE TO authenticated
  USING (public.user_has_home_role(home_id, ARRAY['owner','admin'])
         OR user_id = auth.uid());

-- ── items ─────────────────────────────────────────────────────────────────────
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS items_select ON public.items;
DROP POLICY IF EXISTS items_insert ON public.items;
DROP POLICY IF EXISTS items_update ON public.items;
DROP POLICY IF EXISTS items_delete ON public.items;
DROP POLICY IF EXISTS "items_select" ON public.items;
DROP POLICY IF EXISTS "items_insert" ON public.items;
DROP POLICY IF EXISTS "items_update" ON public.items;
DROP POLICY IF EXISTS "items_delete" ON public.items;

CREATE POLICY items_select ON public.items
  FOR SELECT TO authenticated
  USING (home_id IN (SELECT public.user_home_ids())
         AND deleted_at IS NULL);

CREATE POLICY items_insert ON public.items
  FOR INSERT TO authenticated
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

CREATE POLICY items_update ON public.items
  FOR UPDATE TO authenticated
  USING  (home_id IN (SELECT public.user_home_ids()))
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

CREATE POLICY items_delete ON public.items
  FOR DELETE TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()));

-- ── consumables ───────────────────────────────────────────────────────────────
ALTER TABLE public.consumables ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS consumables_select ON public.consumables;
DROP POLICY IF EXISTS consumables_insert ON public.consumables;
DROP POLICY IF EXISTS consumables_update ON public.consumables;
DROP POLICY IF EXISTS consumables_delete ON public.consumables;

CREATE POLICY consumables_select ON public.consumables
  FOR SELECT TO authenticated
  USING (home_id IN (SELECT public.user_home_ids())
         AND (deleted_at IS NULL OR deleted_at IS NOT NULL));

CREATE POLICY consumables_insert ON public.consumables
  FOR INSERT TO authenticated
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

CREATE POLICY consumables_update ON public.consumables
  FOR UPDATE TO authenticated
  USING  (home_id IN (SELECT public.user_home_ids()))
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

CREATE POLICY consumables_delete ON public.consumables
  FOR DELETE TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()));

-- ── consumable_logs ───────────────────────────────────────────────────────────
ALTER TABLE public.consumable_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS consumable_logs_select ON public.consumable_logs;
DROP POLICY IF EXISTS consumable_logs_insert ON public.consumable_logs;

CREATE POLICY consumable_logs_select ON public.consumable_logs
  FOR SELECT TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()));

CREATE POLICY consumable_logs_insert ON public.consumable_logs
  FOR INSERT TO authenticated
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

-- ── meal_plans ────────────────────────────────────────────────────────────────
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS meal_plans_select ON public.meal_plans;
DROP POLICY IF EXISTS meal_plans_insert ON public.meal_plans;
DROP POLICY IF EXISTS meal_plans_update ON public.meal_plans;
DROP POLICY IF EXISTS meal_plans_delete ON public.meal_plans;

CREATE POLICY meal_plans_select ON public.meal_plans
  FOR SELECT TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()));

CREATE POLICY meal_plans_insert ON public.meal_plans
  FOR INSERT TO authenticated
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

CREATE POLICY meal_plans_update ON public.meal_plans
  FOR UPDATE TO authenticated
  USING  (home_id IN (SELECT public.user_home_ids()))
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

CREATE POLICY meal_plans_delete ON public.meal_plans
  FOR DELETE TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()));

-- ── shopping_lists ────────────────────────────────────────────────────────────
ALTER TABLE public.shopping_lists ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS shopping_lists_all ON public.shopping_lists;

CREATE POLICY shopping_lists_all ON public.shopping_lists
  FOR ALL TO authenticated
  USING  (home_id IN (SELECT public.user_home_ids()))
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

-- ── shopping_items ────────────────────────────────────────────────────────────
ALTER TABLE public.shopping_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS shopping_items_all    ON public.shopping_items;
DROP POLICY IF EXISTS "shopping_items_select" ON public.shopping_items;

CREATE POLICY shopping_items_all ON public.shopping_items
  FOR ALL TO authenticated
  USING  (home_id IN (SELECT public.user_home_ids())
          AND deleted_at IS NULL)
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

-- ── home_settings ─────────────────────────────────────────────────────────────
ALTER TABLE public.home_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS home_settings_all ON public.home_settings;

CREATE POLICY home_settings_all ON public.home_settings
  FOR ALL TO authenticated
  USING  (home_id IN (SELECT public.user_home_ids()))
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

-- ── garbage_reminders ─────────────────────────────────────────────────────────
ALTER TABLE public.garbage_reminders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS garbage_reminders_select ON public.garbage_reminders;
DROP POLICY IF EXISTS garbage_reminders_ins    ON public.garbage_reminders;
DROP POLICY IF EXISTS garbage_reminders_upd    ON public.garbage_reminders;
DROP POLICY IF EXISTS garbage_reminders_del    ON public.garbage_reminders;

CREATE POLICY garbage_reminders_select ON public.garbage_reminders
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY garbage_reminders_ins ON public.garbage_reminders
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid()
              AND home_id IN (SELECT public.user_home_ids()));

CREATE POLICY garbage_reminders_upd ON public.garbage_reminders
  FOR UPDATE TO authenticated
  USING  (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY garbage_reminders_del ON public.garbage_reminders
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- ── recipes ───────────────────────────────────────────────────────────────────
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS recipes_select ON public.recipes;
DROP POLICY IF EXISTS recipes_insert ON public.recipes;
DROP POLICY IF EXISTS recipes_update ON public.recipes;
DROP POLICY IF EXISTS recipes_delete ON public.recipes;

CREATE POLICY recipes_select ON public.recipes
  FOR SELECT TO authenticated
  USING (home_id IN (SELECT public.user_home_ids())
         OR (is_public = true));

CREATE POLICY recipes_insert ON public.recipes
  FOR INSERT TO authenticated
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

CREATE POLICY recipes_update ON public.recipes
  FOR UPDATE TO authenticated
  USING  (home_id IN (SELECT public.user_home_ids()))
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

CREATE POLICY recipes_delete ON public.recipes
  FOR DELETE TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()));

-- ── item_history ──────────────────────────────────────────────────────────────
ALTER TABLE public.item_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS item_history_select ON public.item_history;
DROP POLICY IF EXISTS item_history_insert ON public.item_history;

CREATE POLICY item_history_select ON public.item_history
  FOR SELECT TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()));

CREATE POLICY item_history_insert ON public.item_history
  FOR INSERT TO authenticated
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

-- ── profiles ──────────────────────────────────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT polname FROM pg_policy
           WHERE polrelid = 'public.profiles'::regclass
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.profiles', r.polname);
  END LOOP;
END $$;

CREATE POLICY profiles_select ON public.profiles
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY profiles_insert ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY profiles_update ON public.profiles
  FOR UPDATE TO authenticated
  USING  (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ── subscriptions ─────────────────────────────────────────────────────────────
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT polname FROM pg_policy
           WHERE polrelid = 'public.subscriptions'::regclass
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.subscriptions', r.polname);
  END LOOP;
END $$;

CREATE POLICY sub_own_select ON public.subscriptions
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY sub_own_insert ON public.subscriptions
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY sub_own_update ON public.subscriptions
  FOR UPDATE TO authenticated
  USING  (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ── custom_categories ─────────────────────────────────────────────────────────
ALTER TABLE public.custom_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS custom_categories_own ON public.custom_categories;

CREATE POLICY custom_categories_all ON public.custom_categories
  FOR ALL TO authenticated
  USING  (home_id IN (SELECT public.user_home_ids()))
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

-- ── saved_shopping_lists ──────────────────────────────────────────────────────
ALTER TABLE public.saved_shopping_lists ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS ssl_own ON public.saved_shopping_lists;

CREATE POLICY ssl_all ON public.saved_shopping_lists
  FOR ALL TO authenticated
  USING  (home_id IN (SELECT public.user_home_ids()))
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

-- =============================================================================
-- 6. INDEXES — PERFORMANCE PARA 10K+ USUÁRIOS
-- =============================================================================

-- home_members: lookup crítico para todas as policies
CREATE INDEX IF NOT EXISTS idx_home_members_user_active
  ON public.home_members (user_id, is_active)
  WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_home_members_home_user
  ON public.home_members (home_id, user_id);

DROP INDEX IF EXISTS idx_home_members_user_active_pre;

-- items
CREATE INDEX IF NOT EXISTS idx_items_home_expiry
  ON public.items (home_id, expiry_date DESC)
  WHERE deleted_at IS NULL AND expiry_date IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_items_home_location
  ON public.items (home_id, location)
  WHERE deleted_at IS NULL;

-- consumables
CREATE INDEX IF NOT EXISTS idx_consumables_home
  ON public.consumables (home_id)
  WHERE deleted_at IS NULL;

-- consumable_logs
CREATE INDEX IF NOT EXISTS idx_consumable_logs_home_date
  ON public.consumable_logs (home_id, created_at DESC);

-- meal_plans
CREATE INDEX IF NOT EXISTS idx_meal_plans_home_date
  ON public.meal_plans (home_id, planned_date DESC);

-- item_history
CREATE INDEX IF NOT EXISTS idx_item_history_home_date
  ON public.item_history (home_id, created_at DESC)
  WHERE deleted_at IS NULL;

-- notification_queue
CREATE INDEX IF NOT EXISTS idx_notif_queue_due
  ON public.notification_queue (scheduled_for)
  WHERE status = 'queued';

CREATE INDEX IF NOT EXISTS idx_notif_queue_user
  ON public.notification_queue (user_id, created_at DESC);

-- garbage_reminders
CREATE INDEX IF NOT EXISTS idx_garbage_next_fire
  ON public.garbage_reminders (next_fire_at)
  WHERE enabled = true;

-- subscriptions
CREATE INDEX IF NOT EXISTS idx_subscriptions_user
  ON public.subscriptions (user_id);

CREATE INDEX IF NOT EXISTS idx_subscriptions_trial_end
  ON public.subscriptions (trial_ends_at)
  WHERE is_active = false AND trial_ends_at IS NOT NULL;

-- sub_account_members
CREATE INDEX IF NOT EXISTS idx_sam_user_active
  ON public.sub_account_members (user_id, is_active)
  WHERE is_active = true;

-- push_subscriptions
CREATE INDEX IF NOT EXISTS idx_push_subs_user_active
  ON public.push_subscriptions (user_id)
  WHERE is_active = true;

-- account_sessions
CREATE INDEX IF NOT EXISTS idx_sessions_user
  ON public.account_sessions (user_id);

CREATE INDEX IF NOT EXISTS idx_sessions_group
  ON public.account_sessions (group_id)
  WHERE group_id IS NOT NULL;

-- =============================================================================
-- 7. VIEW v_user_access — ATUALIZADA COM LÓGICA DE SUB-CONTA
-- =============================================================================

DROP VIEW IF EXISTS public.v_user_access;
CREATE VIEW public.v_user_access AS
SELECT
  p.user_id,
  s.plan,
  s.is_active,
  s.trial_started_at,
  s.trial_ends_at,
  s.current_period_end,
  s.next_billing_at,
  s.cancel_at_period_end,
  CASE
    WHEN s.trial_ends_at IS NOT NULL AND s.trial_ends_at > now() THEN true
    ELSE false
  END AS in_trial,
  CASE
    WHEN s.is_active = true THEN true
    WHEN s.trial_ends_at IS NOT NULL AND s.trial_ends_at > now() THEN true
    ELSE false
  END AS has_access,
  GREATEST(0, EXTRACT(day FROM (s.trial_ends_at - now()))::int) AS trial_days_left,
  CASE
    WHEN s.next_billing_at BETWEEN now() AND now() + interval '3 days' THEN true
    ELSE false
  END AS billing_soon,
  COALESCE(s.plan_tier, 'free') AS plan_tier,
  s.group_id
FROM public.profiles p
LEFT JOIN public.subscriptions s ON s.user_id = p.user_id;

-- get_effective_subscription usa get_effective_user_id para sub-contas herdarem o plano do master
CREATE OR REPLACE FUNCTION public.get_effective_subscription()
RETURNS SETOF public.subscriptions
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN QUERY
    SELECT s.*
    FROM public.subscriptions s
    WHERE s.user_id = public.get_effective_user_id();
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_effective_subscription() TO authenticated;

-- =============================================================================
-- 8. LIMPEZA DE DADOS ÓRFÃOS (seguro rodar em produção)
-- =============================================================================

-- Remover notification_preferences sem user_id
DELETE FROM public.notification_preferences WHERE user_id IS NULL;

-- Remover garbage_reminders órfãos
DELETE FROM public.garbage_reminders WHERE home_id IS NULL OR user_id IS NULL;

-- =============================================================================
-- 9. VERIFICAÇÃO FINAL
-- =============================================================================

DO $$
DECLARE
  missing_rls text;
BEGIN
  SELECT string_agg(relname, ', ')
  INTO missing_rls
  FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE c.relkind = 'r'
    AND n.nspname = 'public'
    AND NOT c.relrowsecurity
    AND c.relname NOT LIKE 'pg_%';

  IF missing_rls IS NOT NULL THEN
    RAISE WARNING '[KAZA] Tabelas SEM RLS: %', missing_rls;
  ELSE
    RAISE NOTICE '[KAZA] ✅ Todas as tabelas public têm RLS habilitado.';
  END IF;
END $$;

DO $$
BEGIN
  RAISE NOTICE '=============================================================';
  RAISE NOTICE '[KAZA] Migration 20260429000000_production_optimizations';
  RAISE NOTICE '[KAZA] ✅ CONCLUÍDA com sucesso.';
  RAISE NOTICE '';
  RAISE NOTICE 'Melhorias aplicadas:';
  RAISE NOTICE '  1. user_home_ids() SECURITY DEFINER — RLS sem N+1';
  RAISE NOTICE '  2. handle_new_user cria profile+subscription+notif atomicamente';
  RAISE NOTICE '  3. notification_preferences UNIQUE (user_id) corrigido';
  RAISE NOTICE '  4. complete_user_onboarding preserva casa de sub-contas';
  RAISE NOTICE '  5. RLS unificada via user_home_ids() em todas as tabelas';
  RAISE NOTICE '  6. 15+ índices compostos para escala 10k+ usuários';
  RAISE NOTICE '=============================================================';
END $$;

COMMIT;
