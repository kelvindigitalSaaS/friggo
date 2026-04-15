-- APPLY_ALL_UPDATES.SQL
-- Script consolidado para atualizar o schema do Supabase para o estado esperado
-- Instruções: Cole este arquivo no SQL Editor do Supabase (app.supabase.io → SQL Editor)
-- ou execute com psql contra a sua instância Postgres (use a connection string do projeto).
-- O script é idempotente (usa IF NOT EXISTS / ON CONFLICT) sempre que possível.

-- 0. Função utilitária para triggers (necessária para triggers de updated_at)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ==========================================
-- 1. Garantir colunas e melhorias na tabela `profiles`
-- (mantém compatibilidade com esquemas antigos)
-- ==========================================
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

-- Ensure trigger on profiles updated_at
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_profiles_updated_at') THEN
    DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
    CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
EXCEPTION WHEN undefined_table THEN
  -- If profiles doesn't exist yet, ignore; other migrations (full schema) will create it.
  RAISE NOTICE 'profiles table not found yet; skipping trigger creation for now.';
END $$;

-- ==========================================
-- 2. Criar `profile_settings` (nova tabela de configurações)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.profile_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    home_type TEXT DEFAULT 'apartment',
    residents INTEGER DEFAULT 1,
    fridge_type TEXT DEFAULT 'regular',
    fridge_brand TEXT,
    cooling_level INTEGER DEFAULT 3,
    habits TEXT[] DEFAULT '{}',
    hidden_sections TEXT[] DEFAULT '{}',
    notification_prefs JSONB DEFAULT '[]',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

ALTER TABLE public.profile_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuários gerenciam própria configuração" ON public.profile_settings;
CREATE POLICY "Usuários gerenciam própria configuração" ON public.profile_settings
    FOR ALL USING (auth.uid() = user_id);

-- Trigger to update updated_at
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_profile_settings_updated_at') THEN
    CREATE TRIGGER update_profile_settings_updated_at BEFORE UPDATE ON public.profile_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
EXCEPTION WHEN undefined_table THEN
  RAISE NOTICE 'profile_settings not created?';
END $$;

-- ==========================================
-- 3. Criar `profile_sensitive` (dados sensíveis como CPF)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.profile_sensitive (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    cpf TEXT UNIQUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

ALTER TABLE public.profile_sensitive ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Usuários gerenciam próprios dados sensíveis" ON public.profile_sensitive;
CREATE POLICY "Usuários gerenciam próprios dados sensíveis" ON public.profile_sensitive
    FOR ALL USING (auth.uid() = user_id);

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_profile_sensitive_updated_at') THEN
    CREATE TRIGGER update_profile_sensitive_updated_at BEFORE UPDATE ON public.profile_sensitive FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
EXCEPTION WHEN undefined_table THEN
  RAISE NOTICE 'profile_sensitive not created?';
END $$;

-- ==========================================
-- Trigger: impedir alteração do CPF (imutabilidade)
-- ==========================================
CREATE OR REPLACE FUNCTION public.prevent_cpf_update()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND OLD.cpf IS NOT NULL AND NEW.cpf IS DISTINCT FROM OLD.cpf THEN
    RAISE EXCEPTION 'CPF é imutável e não pode ser alterado';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to profile_sensitive
DROP TRIGGER IF EXISTS prevent_cpf_update ON public.profile_sensitive;
CREATE TRIGGER prevent_cpf_update
BEFORE UPDATE ON public.profile_sensitive
FOR EACH ROW EXECUTE FUNCTION public.prevent_cpf_update();

-- If `profiles.cpf` column exists, protect it as well
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'cpf'
  ) THEN
    DROP TRIGGER IF EXISTS prevent_profiles_cpf_update ON public.profiles;
    CREATE TRIGGER prevent_profiles_cpf_update
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW WHEN (OLD.cpf IS NOT NULL AND NEW.cpf IS DISTINCT FROM OLD.cpf)
    EXECUTE FUNCTION public.prevent_cpf_update();
  END IF;
END $$;

-- ==========================================
-- 4. Migrar dados existentes de `profiles` para `profile_settings` e `profile_sensitive` (se houver)
-- ==========================================
DO $$
BEGIN
    INSERT INTO public.profile_settings (user_id, home_type, residents, fridge_type, fridge_brand, cooling_level, habits, hidden_sections, notification_prefs)
    SELECT user_id, home_type, residents, fridge_type, fridge_brand, cooling_level, habits, hidden_sections, COALESCE(notification_prefs::jsonb, '[]'::jsonb)
    FROM public.profiles
    ON CONFLICT (user_id) DO NOTHING;

    INSERT INTO public.profile_sensitive (user_id, cpf)
    SELECT user_id, cpf
    FROM public.profiles
    WHERE cpf IS NOT NULL
    ON CONFLICT (user_id) DO NOTHING;
EXCEPTION
    WHEN undefined_column THEN
        -- profiles may not have the older columns; ignore
        NULL;
END $$;

-- ==========================================
-- 5. Migrations relacionadas a consumables, notifications, garbage_reminders, favorite_recipes, etc.
-- (baseado em supabase/migrations/20260306_consumables_notifications.sql)
-- ==========================================

-- consumables
CREATE TABLE IF NOT EXISTS public.consumables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  icon TEXT DEFAULT '📦',
  current_stock DECIMAL(10,2) DEFAULT 0,
  unit TEXT DEFAULT 'unidades',
  daily_consumption DECIMAL(10,4) DEFAULT 1,
  min_stock DECIMAL(10,2) DEFAULT 2,
  auto_add_to_shopping BOOLEAN DEFAULT true,
  is_hidden BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.consumables ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own consumables" ON public.consumables;
CREATE POLICY "Users can view own consumables" ON public.consumables FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own consumables" ON public.consumables;
CREATE POLICY "Users can insert own consumables" ON public.consumables FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own consumables" ON public.consumables;
CREATE POLICY "Users can update own consumables" ON public.consumables FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own consumables" ON public.consumables;
CREATE POLICY "Users can delete own consumables" ON public.consumables FOR DELETE USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_consumables_updated_at ON public.consumables;
CREATE TRIGGER update_consumables_updated_at BEFORE UPDATE ON public.consumables FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- notification_preferences (opcional — mantemos para compatibilidade)
CREATE TABLE IF NOT EXISTS public.notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  expiring_items BOOLEAN DEFAULT true,
  low_stock_consumables BOOLEAN DEFAULT true,
  garbage_reminder BOOLEAN DEFAULT true,
  cooking_timer BOOLEAN DEFAULT true,
  shopping_list_updates BOOLEAN DEFAULT true,
  daily_summary BOOLEAN DEFAULT false,
  quiet_hours_start TIME DEFAULT '22:00',
  quiet_hours_end TIME DEFAULT '07:00',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own notification prefs" ON public.notification_preferences;
CREATE POLICY "Users can view own notification prefs" ON public.notification_preferences FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own notification prefs" ON public.notification_preferences;
CREATE POLICY "Users can insert own notification prefs" ON public.notification_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own notification prefs" ON public.notification_preferences;
CREATE POLICY "Users can update own notification prefs" ON public.notification_preferences FOR UPDATE USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_notification_prefs_updated_at ON public.notification_preferences;
CREATE TRIGGER update_notification_prefs_updated_at BEFORE UPDATE ON public.notification_preferences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger: criar notification prefs padrão ao criar perfil (compatibilidade)
CREATE OR REPLACE FUNCTION public.handle_new_user_notification_prefs()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notification_preferences (user_id)
  VALUES (NEW.user_id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_profile_created_notification_prefs ON public.profiles;
CREATE TRIGGER on_profile_created_notification_prefs
AFTER INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_notification_prefs();

-- favorite_recipes
CREATE TABLE IF NOT EXISTS public.favorite_recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recipe_name TEXT NOT NULL,
  recipe_category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, recipe_name)
);

ALTER TABLE public.favorite_recipes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own favorites" ON public.favorite_recipes;
CREATE POLICY "Users can view own favorites" ON public.favorite_recipes FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert own favorites" ON public.favorite_recipes;
CREATE POLICY "Users can insert own favorites" ON public.favorite_recipes FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete own favorites" ON public.favorite_recipes;
CREATE POLICY "Users can delete own favorites" ON public.favorite_recipes FOR DELETE USING (auth.uid() = user_id);

-- garbage_reminders
CREATE TABLE IF NOT EXISTS public.garbage_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  enabled BOOLEAN DEFAULT false,
  selected_days INTEGER[] DEFAULT '{1,4}',
  reminder_time TIME DEFAULT '20:00',
  garbage_location TEXT DEFAULT 'street',
  building_floor TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.garbage_reminders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own garbage reminders" ON public.garbage_reminders;
CREATE POLICY "Users can view own garbage reminders" ON public.garbage_reminders FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert own garbage reminders" ON public.garbage_reminders;
CREATE POLICY "Users can insert own garbage reminders" ON public.garbage_reminders FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own garbage reminders" ON public.garbage_reminders;
CREATE POLICY "Users can update own garbage reminders" ON public.garbage_reminders FOR UPDATE USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_garbage_reminders_updated_at ON public.garbage_reminders;
CREATE TRIGGER update_garbage_reminders_updated_at BEFORE UPDATE ON public.garbage_reminders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- consumable_logs
CREATE TABLE IF NOT EXISTS public.consumable_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  consumable_id UUID REFERENCES public.consumables(id) ON DELETE CASCADE NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('debit', 'restock')),
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.consumable_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own consumable logs" ON public.consumable_logs;
CREATE POLICY "Users can view own consumable logs" ON public.consumable_logs FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert own consumable logs" ON public.consumable_logs;
CREATE POLICY "Users can insert own consumable logs" ON public.consumable_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- 6. Storage / avatars bucket (se aplicável)
-- ==========================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for storage.objects (idempotente)
DROP POLICY IF EXISTS "Avatar Public Access" ON storage.objects;
CREATE POLICY "Avatar Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
CREATE POLICY "Users can upload their own avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
CREATE POLICY "Users can delete their own avatar" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
CREATE POLICY "Users can update their own avatar" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ==========================================
-- FIM: rodar este script no SQL Editor do Supabase.
-- Se preferir, execute os arquivos individuais em /supabase/migrations na ordem.
-- OBS: este script contém DDL; faça backup antes em produção.
-- ==========================================
