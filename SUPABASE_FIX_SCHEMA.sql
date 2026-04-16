-- =============================================================================
-- FRIGGO — FIX SCHEMA (non-destructive, idempotente)
-- =============================================================================
-- Alvo : Supabase com schema legado que provoca os erros:
--   - column items.user_id does not exist          (400 em GET /rest/v1/items)
--   - missing columns em profiles                  (400 em GET /rest/v1/profiles
--     ?select=plan_type,subscription_status,trial_start_date,created_at,
--     cakto_customer_id,last_payment_date,payment_method)
--
-- Características:
--   - NÃO dropa tabelas. Preserva dados existentes.
--   - ADD COLUMN IF NOT EXISTS em tudo — seguro rodar múltiplas vezes.
--   - Cria profiles/items do zero apenas se ausentes.
--   - Adiciona trigger on auth.users para auto-criar profile no 1º login.
--   - Habilita RLS + policies mínimas (cada user vê apenas seus dados).
--
-- Execução : SQL Editor do Supabase. Transação única, commit atômico.
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- 0) Extensions
-- -----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- -----------------------------------------------------------------------------
-- 1) profiles — garante tabela e colunas que o frontend consulta
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Garante user_id (caso tabela antiga tenha nome diferente)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE;

-- Colunas de perfil
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name                 TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cpf                  TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url           TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN NOT NULL DEFAULT false;

-- Colunas de assinatura que o SubscriptionContext lê
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS plan_type            TEXT DEFAULT 'free';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS subscription_status  TEXT DEFAULT 'trialing';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS trial_start_date     TIMESTAMPTZ DEFAULT now();
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cakto_customer_id    TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_payment_date    TIMESTAMPTZ;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS payment_method       TEXT;

-- Timestamps
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT now();
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- Índice único parcial em CPF (só bloqueia duplicata quando preenchido)
CREATE UNIQUE INDEX IF NOT EXISTS profiles_cpf_unique_idx
  ON public.profiles(cpf) WHERE cpf IS NOT NULL;

-- -----------------------------------------------------------------------------
-- 2) items — adiciona user_id que está faltando
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.items
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS items_user_idx ON public.items(user_id);

-- -----------------------------------------------------------------------------
-- 2b) consumables — garante tabela e colunas que o frontend consulta
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.consumables (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- home_id (multi-tenant). FK adicionada condicionalmente — se public.homes
-- ainda não existe, a coluna fica sem FK para esta migração não falhar.
ALTER TABLE public.consumables
  ADD COLUMN IF NOT EXISTS home_id UUID;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname='public' AND tablename='homes')
     AND NOT EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'consumables_home_id_fkey'
     )
  THEN
    ALTER TABLE public.consumables
      ADD CONSTRAINT consumables_home_id_fkey
      FOREIGN KEY (home_id) REFERENCES public.homes(id) ON DELETE CASCADE;
  END IF;
END $$;

-- user_id (fallback single-tenant ou auditoria)
ALTER TABLE public.consumables
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Campos que o FriggoContext (toConsumable / addConsumable / updateConsumable) lê
ALTER TABLE public.consumables ADD COLUMN IF NOT EXISTS name                 TEXT NOT NULL DEFAULT '';
ALTER TABLE public.consumables ADD COLUMN IF NOT EXISTS icon                 TEXT NOT NULL DEFAULT '📦';
ALTER TABLE public.consumables ADD COLUMN IF NOT EXISTS category             TEXT NOT NULL DEFAULT 'other';
ALTER TABLE public.consumables ADD COLUMN IF NOT EXISTS current_stock        NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (current_stock >= 0);
ALTER TABLE public.consumables ADD COLUMN IF NOT EXISTS unit                 TEXT NOT NULL DEFAULT 'un';
ALTER TABLE public.consumables ADD COLUMN IF NOT EXISTS daily_consumption    NUMERIC(10,4) NOT NULL DEFAULT 1 CHECK (daily_consumption >= 0);
ALTER TABLE public.consumables ADD COLUMN IF NOT EXISTS min_stock            NUMERIC(10,2) NOT NULL DEFAULT 2 CHECK (min_stock >= 0);
ALTER TABLE public.consumables ADD COLUMN IF NOT EXISTS usage_interval       TEXT NOT NULL DEFAULT 'daily';
ALTER TABLE public.consumables ADD COLUMN IF NOT EXISTS auto_add_to_shopping BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.consumables ADD COLUMN IF NOT EXISTS is_hidden            BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.consumables ADD COLUMN IF NOT EXISTS updated_at           TIMESTAMPTZ NOT NULL DEFAULT now();

-- Unique (home_id, name) — requerido pelo upsert em setConsumablesBulk
CREATE UNIQUE INDEX IF NOT EXISTS consumables_home_name_uniq
  ON public.consumables(home_id, name) WHERE home_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS consumables_home_idx ON public.consumables(home_id);
CREATE INDEX IF NOT EXISTS consumables_user_idx ON public.consumables(user_id);

-- -----------------------------------------------------------------------------
-- 3) RLS — cada usuário só vê/edita suas próprias linhas
-- -----------------------------------------------------------------------------
ALTER TABLE public.profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consumables ENABLE ROW LEVEL SECURITY;

-- profiles: apenas o dono
DROP POLICY IF EXISTS profiles_select ON public.profiles;
DROP POLICY IF EXISTS profiles_insert ON public.profiles;
DROP POLICY IF EXISTS profiles_update ON public.profiles;
DROP POLICY IF EXISTS profiles_delete ON public.profiles;

CREATE POLICY profiles_select ON public.profiles
  FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY profiles_insert ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY profiles_update ON public.profiles
  FOR UPDATE TO authenticated
  USING      (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY profiles_delete ON public.profiles
  FOR DELETE TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- items: apenas o dono (fallback simples — se você usa home_id, as policies
-- multi-tenant do SUPABASE_COMPLETE_MIGRATION.sql substituem estas)
DROP POLICY IF EXISTS items_select_by_user ON public.items;
DROP POLICY IF EXISTS items_insert_by_user ON public.items;
DROP POLICY IF EXISTS items_update_by_user ON public.items;
DROP POLICY IF EXISTS items_delete_by_user ON public.items;

CREATE POLICY items_select_by_user ON public.items
  FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY items_insert_by_user ON public.items
  FOR INSERT TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY items_update_by_user ON public.items
  FOR UPDATE TO authenticated
  USING      (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY items_delete_by_user ON public.items
  FOR DELETE TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- consumables: se home_members existe, usa rota multi-tenant; senão,
-- fallback em user_id. Policies criadas dinamicamente via EXECUTE para
-- evitar erro de referência à tabela home_members quando ela não existe.
DROP POLICY IF EXISTS consumables_select ON public.consumables;
DROP POLICY IF EXISTS consumables_insert ON public.consumables;
DROP POLICY IF EXISTS consumables_update ON public.consumables;
DROP POLICY IF EXISTS consumables_delete ON public.consumables;

DO $$
DECLARE
  has_home_members BOOLEAN := EXISTS (
    SELECT 1 FROM pg_tables WHERE schemaname='public' AND tablename='home_members'
  );
  using_clause TEXT;
BEGIN
  IF has_home_members THEN
    using_clause := $clause$
      user_id = (SELECT auth.uid())
      OR (home_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM public.home_members m
        WHERE m.home_id = consumables.home_id AND m.user_id = (SELECT auth.uid())
      ))
    $clause$;
  ELSE
    using_clause := 'user_id = (SELECT auth.uid())';
  END IF;

  EXECUTE format(
    'CREATE POLICY consumables_select ON public.consumables FOR SELECT TO authenticated USING (%s)',
    using_clause);
  EXECUTE format(
    'CREATE POLICY consumables_insert ON public.consumables FOR INSERT TO authenticated WITH CHECK (%s)',
    using_clause);
  EXECUTE format(
    'CREATE POLICY consumables_update ON public.consumables FOR UPDATE TO authenticated USING (%s) WITH CHECK (%s)',
    using_clause, using_clause);
  EXECUTE format(
    'CREATE POLICY consumables_delete ON public.consumables FOR DELETE TO authenticated USING (%s)',
    using_clause);
END $$;

-- -----------------------------------------------------------------------------
-- 4) Trigger — cria profile automaticamente no 1º login (Google OAuth etc.)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, plan_type, subscription_status, trial_start_date)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'full_name',
      split_part(NEW.email, '@', 1)
    ),
    'free',
    'trialing',
    now()
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_profile ON auth.users;
CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 5) Backfill — cria profile para usuários antigos que ainda não têm
-- -----------------------------------------------------------------------------
INSERT INTO public.profiles (user_id, name, plan_type, subscription_status, trial_start_date)
SELECT
  u.id,
  COALESCE(
    u.raw_user_meta_data->>'name',
    u.raw_user_meta_data->>'full_name',
    split_part(u.email, '@', 1)
  ),
  'free',
  'trialing',
  now()
FROM auth.users u
LEFT JOIN public.profiles p ON p.user_id = u.id
WHERE p.user_id IS NULL
ON CONFLICT (user_id) DO NOTHING;

COMMIT;

-- =============================================================================
-- Verificação pós-execução:
--   SELECT column_name FROM information_schema.columns
--     WHERE table_schema='public' AND table_name='profiles' ORDER BY 1;
--   SELECT column_name FROM information_schema.columns
--     WHERE table_schema='public' AND table_name='items' ORDER BY 1;
--   SELECT policyname FROM pg_policies WHERE schemaname='public'
--     AND tablename IN ('profiles','items') ORDER BY 1;
-- =============================================================================
