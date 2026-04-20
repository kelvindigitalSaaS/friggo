-- =============================================================================
-- KAZA — MIGRATION 20260420000003: ZERO TRUST HARDENING (V2 CORRIGIDA)
-- =============================================================================
-- Objetivo: Blindagem total e isolamento de chave pública.
-- Correção: Adicionado DROP para strict_user_owned_avatars.
-- Segurança: Mutações no client-side bloqueadas via RLS nas tabelas críticas.
-- =============================================================================

BEGIN;

-- ═════════════════════════════════════════════════════════════════════════════
-- 1. REVOGAÇÃO DE PERMISSÕES PADRÃO (LIMPEZA)
-- ═════════════════════════════════════════════════════════════════════════════

DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN (
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  )
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', r.tablename);
    EXECUTE format('DROP POLICY IF EXISTS "Enable read access for all" ON public.%I', r.tablename);
    EXECUTE format('DROP POLICY IF EXISTS "Public access" ON public.%I', r.tablename);
    EXECUTE format('DROP POLICY IF EXISTS "anon_read" ON public.%I', r.tablename);
  END LOOP;
END $$;

-- ═════════════════════════════════════════════════════════════════════════════
-- 2. POLÍTICAS DE ISOLAMENTO E BLOQUEIO DE MUTAÇÃO CLIENT-SIDE
-- ═════════════════════════════════════════════════════════════════════════════
-- Para isolar a 'anon key', restringimos o client apenas à leitura.
-- Toda criação/edição será feita via Edge Functions (backend).

-- PROFILES (Client logado lê apenas seu perfil. Create/Update via Backend)
DROP POLICY IF EXISTS profiles_own ON public.profiles;
DROP POLICY IF EXISTS profiles_rw ON public.profiles;
CREATE POLICY profiles_own ON public.profiles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- SUBSCRIPTIONS (Client apenas vê seu plano. Mutação via Webhook/Function apenas)
DROP POLICY IF EXISTS subscriptions_own ON public.subscriptions;
CREATE POLICY subscriptions_own ON public.subscriptions
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- HOME_MEMBERS & SUB_ACCOUNT_MEMBERS
DROP POLICY IF EXISTS home_members_group_access ON public.home_members;
CREATE POLICY home_members_group_access ON public.home_members
  FOR SELECT TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()));

DROP POLICY IF EXISTS sub_account_members_group_access ON public.sub_account_members;
CREATE POLICY sub_account_members_group_access ON public.sub_account_members
  FOR SELECT TO authenticated
  USING (group_id IN (SELECT public.get_auth_user_group_ids()));

-- ═════════════════════════════════════════════════════════════════════════════
-- 3. ÍNDICES DE PERFORMANCE
-- ═════════════════════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_items_home_id ON public.items(home_id);
CREATE INDEX IF NOT EXISTS idx_consumables_home_id ON public.consumables(home_id);
CREATE INDEX IF NOT EXISTS idx_shopping_items_home_id ON public.shopping_items(home_id);

-- ═════════════════════════════════════════════════════════════════════════════
-- 4. BLINDAGEM DE STORAGE (AVATARS) - CORREÇÃO DE DUPLICIDADE
-- ═════════════════════════════════════════════════════════════════════════════

DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Give users access to own folder" ON storage.objects;
DROP POLICY IF EXISTS "strict_user_owned_avatars" ON storage.objects;

CREATE POLICY "strict_user_owned_avatars" ON storage.objects
  FOR ALL TO authenticated
  USING (
    bucket_id = 'avatars' 
    AND (storage.foldername(name))[1] = (auth.uid())::text
  )
  WITH CHECK (
    bucket_id = 'avatars' 
    AND (storage.foldername(name))[1] = (auth.uid())::text
  );

-- ═════════════════════════════════════════════════════════════════════════════
-- 5. TRAVA DE DADOS SENSÍVEIS (PAGAMENTOS/IDS)
-- ═════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.payment_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS payment_history_own ON public.payment_history;
CREATE POLICY payment_history_own ON public.payment_history
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- ═════════════════════════════════════════════════════════════════════════════
-- 6. RECRIAÇÃO DE VIEWS COM SECURITY INVOKER (REMOÇÃO DO "UNRESTRICTED")
-- ═════════════════════════════════════════════════════════════════════════════

DROP VIEW IF EXISTS public.v_user_access;
CREATE VIEW public.v_user_access WITH (security_invoker = true) AS
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
  CASE
    WHEN s.trial_ends_at IS NOT NULL AND s.trial_ends_at > now()
      THEN GREATEST(0, EXTRACT(day FROM (s.trial_ends_at - now()))::int)
    ELSE 0
  END AS trial_days_left,
  CASE
    WHEN s.next_billing_at IS NOT NULL
     AND s.next_billing_at BETWEEN now() AND now() + interval '3 days'
      THEN true ELSE false
  END AS billing_soon,
  COALESCE(s.plan_tier, 'free') AS plan_tier,
  s.group_id
FROM public.profiles p
LEFT JOIN public.subscriptions s ON s.user_id = p.user_id;


DROP VIEW IF EXISTS public.v_subscription_summary;
CREATE VIEW public.v_subscription_summary WITH (security_invoker = true) AS
SELECT s.user_id, s.plan, s.is_active, s.trial_ends_at, s.plan_tier, s.group_id
FROM public.subscriptions s;

DROP VIEW IF EXISTS public.v_profile_identity_status;
CREATE VIEW public.v_profile_identity_status WITH (security_invoker = true) AS
SELECT user_id, cpf, name, cpf_locked_at, name_locked_at
FROM public.profiles;

COMMIT;
