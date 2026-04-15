-- ============================================================
-- MIGRATION: Consumíveis, preferências de notificação, receitas favoritas
-- IDEMPOTENTE: pode rodar várias vezes sem erro
-- ============================================================

-- =========================
-- 1. TABLE: consumables (rastreamento de consumíveis)
-- =========================
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

-- =========================
-- 2. TABLE: notification_preferences
-- =========================
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

-- Function: criar notification prefs padrão ao criar perfil
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

-- =========================
-- 3. TABLE: favorite_recipes
-- =========================
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

-- =========================
-- 4. TABLE: garbage_reminders
-- =========================
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

-- =========================
-- 5. TABLE: consumable_logs (histórico de debitos/reposições)
-- =========================
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
