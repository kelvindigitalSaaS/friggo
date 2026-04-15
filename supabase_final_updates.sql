-- 1. ATUALIZAR TABELA PROFILES COM TODOS OS CAMPOS NECESSÁRIOS
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS hidden_sections text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS last_payment_date timestamp with time zone,
ADD COLUMN IF NOT EXISTS payment_method text,
ADD COLUMN IF NOT EXISTS avatar_url text,
ADD COLUMN IF NOT EXISTS cpf text UNIQUE,
ADD COLUMN IF NOT EXISTS home_type text DEFAULT 'apartment',
ADD COLUMN IF NOT EXISTS residents integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS fridge_type text DEFAULT 'regular',
ADD COLUMN IF NOT EXISTS cooling_level integer DEFAULT 3,
ADD COLUMN IF NOT EXISTS habits text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS notification_prefs jsonb DEFAULT '[]',
ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false;

-- 2. GARANTIR QUE CONSUMÍVEIS SUPORTEM DECIMAIS E NOVAS COLUNAS
ALTER TABLE public.consumables 
ALTER COLUMN current_stock TYPE decimal(10,2),
ALTER COLUMN daily_consumption TYPE decimal(10,2),
ALTER COLUMN min_stock TYPE decimal(10,2),
ADD COLUMN IF NOT EXISTS usage_interval text DEFAULT 'daily';

-- 3. CONFIGURAR STORAGE (BUCKET AVATARES)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- 4. POLÍTICAS DE SEGURANÇA PARA STORAGE (CORRIGIDAS PARA FOLDERS)
-- Remover políticas antigas se existirem para evitar conflitos
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;

-- Permitir acesso público de leitura
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

-- Permitir Upload: O primeiro nível da pasta DEVE ser o ID do usuário (auth.uid())
CREATE POLICY "Users can upload their own avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Permitir DELETE: Apenas o dono
CREATE POLICY "Users can delete their own avatar" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Permitir UPDATE: Apenas o dono
CREATE POLICY "Users can update their own avatar" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' AND 
  (storage.foldername(name))[1] = auth.uid()::text
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
