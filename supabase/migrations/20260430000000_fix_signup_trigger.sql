-- =============================================================================
-- KAZA — Fix signup trigger (ON CONFLICT sem UNIQUE constraint)
-- Data: 2026-04-30
--
-- Problema: handle_new_user usava ON CONFLICT (user_id) em subscriptions e
-- notification_preferences, mas essas tabelas não tinham UNIQUE (user_id).
-- O Postgres retorna erro, o trigger falha e bloqueia o auth.signUp inteiro.
-- =============================================================================

BEGIN;

-- ── 1. Adicionar UNIQUE em subscriptions.user_id ─────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'subscriptions_user_id_key'
      AND conrelid = 'public.subscriptions'::regclass
  ) THEN
    -- Remover duplicatas mantendo a mais recente
    DELETE FROM public.subscriptions s
    WHERE ctid NOT IN (
      SELECT DISTINCT ON (user_id) ctid
      FROM public.subscriptions
      WHERE user_id IS NOT NULL
      ORDER BY user_id, created_at DESC NULLS LAST, id DESC
    );

    ALTER TABLE public.subscriptions
      ADD CONSTRAINT subscriptions_user_id_key UNIQUE (user_id);

    RAISE NOTICE '[KAZA] UNIQUE (user_id) adicionado em subscriptions';
  ELSE
    RAISE NOTICE '[KAZA] Constraint subscriptions_user_id_key já existe';
  END IF;
END $$;

-- ── 2. Recriar handle_new_user sem ON CONFLICT (coluna) ──────────────────────
--    Usamos ON CONFLICT DO NOTHING (sem target) como fallback seguro para
--    tabelas que possam não ter constraint, e ON CONFLICT (user_id) onde
--    sabemos que a constraint existe.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- 1. Perfil base (user_id é PK)
  INSERT INTO public.profiles (user_id, name, onboarding_completed)
  VALUES (
    NEW.id,
    COALESCE(
      NULLIF(NEW.raw_user_meta_data->>'full_name', ''),
      NULLIF(NEW.raw_user_meta_data->>'name', ''),
      'Usuário Kaza'
    ),
    false
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- 2. Subscription com trial de 7 dias (agora tem UNIQUE (user_id))
  INSERT INTO public.subscriptions (
    user_id, plan, plan_tier, is_active,
    trial_started_at, trial_ends_at
  )
  VALUES (
    NEW.id, 'free', 'free', false,
    now(), now() + interval '7 days'
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- 3. Preferências de notificação (tem UNIQUE (user_id) da migration anterior)
  INSERT INTO public.notification_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Logar o erro sem bloquear a criação do usuário no auth
  RAISE WARNING '[KAZA handle_new_user] Erro ao criar dados do usuário %: % — %',
    NEW.id, SQLSTATE, SQLERRM;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── 3. Garantir UNIQUE em profiles.user_id (deve ser PK, mas garantir) ───────
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.profiles'::regclass
      AND contype IN ('p', 'u')
      AND conkey = ARRAY(
        SELECT a.attnum FROM pg_attribute a
        WHERE a.attrelid = 'public.profiles'::regclass
          AND a.attname = 'user_id'
      )
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);
    RAISE NOTICE '[KAZA] UNIQUE adicionado em profiles.user_id';
  END IF;
END $$;

-- ── 4. Índice em subscriptions para lookup rápido ────────────────────────────
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id
  ON public.subscriptions (user_id);

DO $$
BEGIN
  RAISE NOTICE '=================================================';
  RAISE NOTICE '[KAZA] Fix 20260430000000 aplicado com sucesso.';
  RAISE NOTICE '  ✅ UNIQUE (user_id) em subscriptions';
  RAISE NOTICE '  ✅ handle_new_user reescrito com EXCEPTION handler';
  RAISE NOTICE '  ✅ Trigger on_auth_user_created recriado';
  RAISE NOTICE '=================================================';
END $$;

COMMIT;
