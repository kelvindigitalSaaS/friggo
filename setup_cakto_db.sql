-- ============================================================
-- SQL DE CONFIGURACAO COMPLETA (INICIALIZACAO + CAKTO)
-- Criado para Novo Banco Supabase
-- Pode executar este script inteiro no SQL Editor do Supabase
-- ============================================================

-- =========================
-- 1. FUNCTION: update_updated_at
-- =========================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- =========================
-- 1.5 TYPES: Enums
-- =========================
DO $$ BEGIN
  CREATE TYPE public.subscription_plan AS ENUM ('free', 'basic', 'standard', 'premium');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- =========================
-- 2. TABLE: profiles
-- =========================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT,
  email TEXT,
  home_type TEXT DEFAULT 'apartment',
  residents INTEGER DEFAULT 1,
  fridge_type TEXT DEFAULT 'common',
  fridge_brand TEXT,
  habits TEXT[] DEFAULT '{}',
  onboarding_completed BOOLEAN DEFAULT false,
  avatar_url TEXT,
  
  -- Campos CAKTO e Trial (conforme guia)
  plan_type VARCHAR(20) DEFAULT 'free',
  subscription_status VARCHAR(20) DEFAULT 'trialing',
  trial_start_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  cakto_customer_id VARCHAR(100),
  last_payment_date TIMESTAMP WITH TIME ZONE,
  payment_method VARCHAR(20),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================
-- 2.5 TABLE: subscriptions (App Logic Support)
-- =========================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  plan subscription_plan NOT NULL DEFAULT 'free',
  price DECIMAL(10,2),
  items_limit INTEGER DEFAULT 5,
  recipes_per_day INTEGER DEFAULT 1,
  shopping_list_limit INTEGER DEFAULT 20,
  notification_change_days INTEGER DEFAULT 7,
  last_notification_change TIMESTAMP WITH TIME ZONE,
  recipes_used_today INTEGER DEFAULT 0,
  last_recipe_reset DATE DEFAULT CURRENT_DATE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  payment_provider TEXT,
  payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscriptions;
CREATE POLICY "Users can view own subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert own subscription" ON public.subscriptions;
CREATE POLICY "Users can insert own subscription" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own subscription" ON public.subscriptions;
CREATE POLICY "Users can update own subscription" ON public.subscriptions FOR UPDATE USING (auth.uid() = user_id);

-- =========================
-- 3. TABLE: payment_history (Cakto)
-- =========================
CREATE TABLE IF NOT EXISTS public.payment_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    cakto_transaction_id VARCHAR(255) UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'BRL',
    status VARCHAR(50) NOT NULL,
    payment_method VARCHAR(100),
    webhook_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_history_user_id ON payment_history(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_history_transaction_id ON payment_history(cakto_transaction_id);

ALTER TABLE public.payment_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own payment history" ON public.payment_history;
CREATE POLICY "Users can view own payment history" ON public.payment_history FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert own payment history" ON public.payment_history;
CREATE POLICY "Users can insert own payment history" ON public.payment_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =========================
-- 4. TABLE: items
-- =========================
CREATE TABLE IF NOT EXISTS public.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'fridge',
  quantity INTEGER DEFAULT 1,
  unit TEXT DEFAULT 'un',
  expiry_date DATE,
  opened_date DATE,
  maturation TEXT DEFAULT 'green',
  min_stock INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own items" ON public.items;
CREATE POLICY "Users can manage own items" ON public.items USING (auth.uid() = user_id);

-- =========================
-- 5. TABLE: shopping_items
-- =========================
CREATE TABLE IF NOT EXISTS public.shopping_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'market',
  quantity INTEGER DEFAULT 1,
  unit TEXT DEFAULT 'un',
  checked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.shopping_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own shopping_items" ON public.shopping_items;
CREATE POLICY "Users can manage own shopping_items" ON public.shopping_items USING (auth.uid() = user_id);

-- =========================
-- 6. TABLE: saved_recipes
-- =========================
CREATE TABLE IF NOT EXISTS public.saved_recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  ingredients JSONB NOT NULL DEFAULT '[]',
  instructions TEXT[],
  type TEXT DEFAULT 'lunch',
  prep_time INTEGER DEFAULT 30,
  servings INTEGER DEFAULT 2,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.saved_recipes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own saved_recipes" ON public.saved_recipes;
CREATE POLICY "Users can manage own saved_recipes" ON public.saved_recipes USING (auth.uid() = user_id);

-- =========================
-- 7. STORAGE: avatars bucket
-- =========================
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- FIM DO SCRIPT
