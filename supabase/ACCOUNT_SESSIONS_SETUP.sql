-- =============================================================================
-- KAZA — Setup da tabela account_sessions (sessão única por usuário)
-- =============================================================================
-- Execução: Supabase Dashboard > SQL Editor
-- Esta tabela controla qual dispositivo está ativo por usuário.
-- Se o usuário logar em outro dispositivo, o anterior é desconectado.
-- =============================================================================

BEGIN;

-- =============================================================================
-- 1. CRIAR TABELA
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.account_sessions (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  group_id         uuid REFERENCES public.sub_account_groups(id) ON DELETE SET NULL,
  device_id        text NOT NULL,
  platform         text NOT NULL DEFAULT 'web',
  is_connected     boolean NOT NULL DEFAULT true,
  force_disconnected boolean NOT NULL DEFAULT false,
  last_seen_at     timestamptz NOT NULL DEFAULT now(),
  created_at       timestamptz NOT NULL DEFAULT now(),

  UNIQUE(user_id, device_id)
);

-- =============================================================================
-- 2. RLS
-- =============================================================================

ALTER TABLE public.account_sessions ENABLE ROW LEVEL SECURITY;

-- Usuário pode inserir/atualizar a própria sessão
DROP POLICY IF EXISTS "sessions_upsert_own" ON public.account_sessions;
CREATE POLICY "sessions_upsert_own"
  ON public.account_sessions
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =============================================================================
-- 3. ÍNDICES PARA PERFORMANCE
-- =============================================================================

DROP INDEX IF EXISTS idx_sessions_user_id;
DROP INDEX IF EXISTS idx_sessions_group_id;
DROP INDEX IF EXISTS idx_sessions_last_seen;

CREATE INDEX idx_sessions_user_id   ON public.account_sessions(user_id);
CREATE INDEX idx_sessions_group_id  ON public.account_sessions(group_id);
CREATE INDEX idx_sessions_last_seen ON public.account_sessions(last_seen_at DESC);

-- =============================================================================
-- 4. LIMPEZA AUTOMÁTICA (sessões antigas > 7 dias)
-- =============================================================================

-- Função que remove sessões inativas há mais de 7 dias
CREATE OR REPLACE FUNCTION public.cleanup_old_sessions()
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  DELETE FROM public.account_sessions
  WHERE last_seen_at < now() - interval '7 days';
$$;

-- =============================================================================
-- 5. VERIFICAÇÃO
-- =============================================================================

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'account_sessions'
ORDER BY ordinal_position;

SELECT policyname FROM pg_policies
WHERE tablename = 'account_sessions';

COMMIT;
