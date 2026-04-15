-- Migration: 2026-04-12 - Adicionar avatars, ajustar consumables e políticas RLS
-- Executar no SQL Editor do Supabase ou via CLI

-- 1. ADICIONAR COLUNAS NECESSÁRIAS À TABELA PROFILES
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS hidden_sections text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS last_payment_date timestamp with time zone,
ADD COLUMN IF NOT EXISTS payment_method text,
ADD COLUMN IF NOT EXISTS avatar_url text;

-- 2. GARANTIR QUE CONSUMÍVEIS SUPORTEM DECIMAIS (VITAL PARA 0.5 LITROS ETC)
ALTER TABLE public.consumables 
ALTER COLUMN current_stock TYPE decimal(10,2),
ALTER COLUMN daily_consumption TYPE decimal(10,2),
ALTER COLUMN min_stock TYPE decimal(10,2);

-- 3. CRIAR BUCKET DE AVATARES (CASO NÃO EXISTA)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- 4. POLÍTICAS DE SEGURANÇA PARA STORAGE (AVATARES)
-- Remover políticas existentes para evitar erro de duplicação
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Public Access' AND polrelid = 'storage.objects'::regclass) THEN
    EXECUTE 'DROP POLICY "Public Access" ON storage.objects';
  END IF;
EXCEPTION WHEN undefined_table THEN
  -- ignore if table doesn't exist
END$$;

DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;

-- Permitir que qualquer um veja avatares (público)
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

-- Permitir que usuários façam upload de seus próprios avatares
CREATE POLICY "Users can upload their own avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND 
  auth.uid()::text = SPLIT_PART(name, '-', 1)
);

-- Permitir que usuários deletem seus próprios avatares
CREATE POLICY "Users can delete their own avatar" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' AND 
  auth.uid()::text = SPLIT_PART(name, '-', 1)
);

-- 5. REFORÇAR RLS NAS TABELAS PRINCIPAIS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consumables ENABLE ROW LEVEL SECURITY;

-- Política para Profiles: Apenas o dono vê/edita
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = user_id);

-- Política para Consumables: Apenas o dono vê/edita
DROP POLICY IF EXISTS "Users can manage own consumables" ON public.consumables;
CREATE POLICY "Users can manage own consumables" ON public.consumables
FOR ALL USING (auth.uid() = user_id);

-- Nota: se ocorrer erro ao criar políticas para storage.objects, execute os comandos
-- manualmente no SQL Editor do Supabase (Storage schemas às vezes variam).
