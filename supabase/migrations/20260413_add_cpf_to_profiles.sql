-- Migration: 2026-04-13 - Adicionar coluna cpf em profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS cpf text;

-- Opcional: criar índice único se desejar evitar duplicatas
-- CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_cpf ON public.profiles (cpf);
