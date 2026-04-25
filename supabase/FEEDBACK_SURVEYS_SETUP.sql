-- =============================================================================
-- KAZA — Setup de Feedback Surveys (VERSÃO CORRIGIDA)
-- =============================================================================
-- Execução: Supabase Dashboard > SQL Editor
-- Isso cria a tabela de feedback e adiciona coluna de rastreamento no profiles
-- =============================================================================

BEGIN;

-- =============================================================================
-- 1. ADICIONAR COLUNA EM PROFILES
-- =============================================================================

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS feedback_submitted boolean NOT NULL DEFAULT false;

-- =============================================================================
-- 2. CRIAR TABELA DE FEEDBACK SURVEYS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.feedback_surveys (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  submitted_at         timestamptz NOT NULL DEFAULT now(),

  -- Pergunta 1: Avaliação geral (1-5 estrelas)
  rating               smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),

  -- Pergunta 2: O que mais gostou (array de strings)
  liked_features       text[] NOT NULL DEFAULT '{}',

  -- Pergunta 3: O que mudaria (array de strings)
  improvement_areas    text[] NOT NULL DEFAULT '{}',

  -- Pergunta 4: Por que não assinar (texto único)
  no_purchase_reason   text,

  -- Campos de texto livre (opcional)
  liked_freetext       text,
  improvement_freetext text,

  -- Metadados para análise
  trial_days_used      smallint,
  platform             text DEFAULT 'web'
);

-- =============================================================================
-- 3. RLS (Row Level Security)
-- =============================================================================

ALTER TABLE public.feedback_surveys ENABLE ROW LEVEL SECURITY;

-- Política: usuário pode INSERT seu próprio feedback
DROP POLICY IF EXISTS "feedback_insert_own" ON public.feedback_surveys;

CREATE POLICY "feedback_insert_own"
  ON public.feedback_surveys
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Nota: Sem policy de SELECT — usuários não precisam ler sua própria resposta
-- Admin acessa via service_role no Supabase Dashboard para gerar relatórios

-- =============================================================================
-- 4. ÍNDICES PARA PERFORMANCE
-- =============================================================================

DROP INDEX IF EXISTS idx_feedback_user_id;
DROP INDEX IF EXISTS idx_feedback_submitted_at;

CREATE INDEX idx_feedback_user_id ON public.feedback_surveys(user_id);
CREATE INDEX idx_feedback_submitted_at ON public.feedback_surveys(submitted_at DESC);

-- =============================================================================
-- 5. VERIFICAÇÃO
-- =============================================================================

-- Ver se a coluna foi adicionada
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'profiles' AND column_name = 'feedback_submitted';

-- Ver estrutura da tabela
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'feedback_surveys'
ORDER BY ordinal_position;

-- Ver policies
SELECT policyname, qual, with_check
FROM pg_policies
WHERE tablename = 'feedback_surveys';

COMMIT;
