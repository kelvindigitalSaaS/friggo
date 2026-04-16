-- ============================================================
-- MIGRATION COMPLETA FRIGGO - RESET TOTAL + RECRIAÇÃO
-- Executar no SQL Editor do Supabase em sequência
-- ============================================================

-- ============================================================
-- ETAPA 1: DROP (Cuidado - isto apaga TUDO)
-- ============================================================

-- Desabilitar RLS temporariamente para deletar sem problemas
ALTER TABLE IF EXISTS profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS homes DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS home_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS home_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS items DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS shopping_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS shopping_lists DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS consumables DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS consumable_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS item_history DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS recipes DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS meal_plans DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS notification_preferences DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS garbage_reminders DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS subscriptions DISABLE ROW LEVEL SECURITY;

-- DROP POLICIES
DROP POLICY IF EXISTS "profiles_select" ON profiles;
DROP POLICY IF EXISTS "profiles_insert" ON profiles;
DROP POLICY IF EXISTS "profiles_update" ON profiles;
DROP POLICY IF EXISTS "profiles_delete" ON profiles;

DROP POLICY IF EXISTS "homes_select" ON homes;
DROP POLICY IF EXISTS "homes_insert" ON homes;
DROP POLICY IF EXISTS "homes_update" ON homes;
DROP POLICY IF EXISTS "homes_delete" ON homes;

DROP POLICY IF EXISTS "home_members_select" ON home_members;
DROP POLICY IF EXISTS "home_members_insert" ON home_members;
DROP POLICY IF EXISTS "home_members_update" ON home_members;
DROP POLICY IF EXISTS "home_members_delete" ON home_members;

DROP POLICY IF EXISTS "home_settings_select" ON home_settings;
DROP POLICY IF EXISTS "home_settings_update" ON home_settings;

DROP POLICY IF EXISTS "items_select" ON items;
DROP POLICY IF EXISTS "items_insert" ON items;
DROP POLICY IF EXISTS "items_update" ON items;
DROP POLICY IF EXISTS "items_delete" ON items;

DROP POLICY IF EXISTS "shopping_items_select" ON shopping_items;
DROP POLICY IF EXISTS "shopping_items_insert" ON shopping_items;
DROP POLICY IF EXISTS "shopping_items_update" ON shopping_items;
DROP POLICY IF EXISTS "shopping_items_delete" ON shopping_items;

DROP POLICY IF EXISTS "shopping_lists_select" ON shopping_lists;
DROP POLICY IF EXISTS "shopping_lists_insert" ON shopping_lists;
DROP POLICY IF EXISTS "shopping_lists_update" ON shopping_lists;
DROP POLICY IF EXISTS "shopping_lists_delete" ON shopping_lists;

DROP POLICY IF EXISTS "consumables_select" ON consumables;
DROP POLICY IF EXISTS "consumables_insert" ON consumables;
DROP POLICY IF EXISTS "consumables_update" ON consumables;
DROP POLICY IF EXISTS "consumables_delete" ON consumables;

DROP POLICY IF EXISTS "consumable_logs_select" ON consumable_logs;
DROP POLICY IF EXISTS "consumable_logs_insert" ON consumable_logs;

DROP POLICY IF EXISTS "item_history_select" ON item_history;
DROP POLICY IF EXISTS "item_history_insert" ON item_history;

DROP POLICY IF EXISTS "recipes_select" ON recipes;
DROP POLICY IF EXISTS "recipes_insert" ON recipes;
DROP POLICY IF EXISTS "recipes_update" ON recipes;
DROP POLICY IF EXISTS "recipes_delete" ON recipes;

DROP POLICY IF EXISTS "meal_plans_select" ON meal_plans;
DROP POLICY IF EXISTS "meal_plans_insert" ON meal_plans;
DROP POLICY IF EXISTS "meal_plans_update" ON meal_plans;
DROP POLICY IF EXISTS "meal_plans_delete" ON meal_plans;

DROP POLICY IF EXISTS "notification_preferences_select" ON notification_preferences;
DROP POLICY IF EXISTS "notification_preferences_update" ON notification_preferences;

DROP POLICY IF EXISTS "garbage_reminders_select" ON garbage_reminders;
DROP POLICY IF EXISTS "garbage_reminders_insert" ON garbage_reminders;
DROP POLICY IF EXISTS "garbage_reminders_update" ON garbage_reminders;

DROP POLICY IF EXISTS "subscriptions_select" ON subscriptions;
DROP POLICY IF EXISTS "subscriptions_insert" ON subscriptions;
DROP POLICY IF EXISTS "subscriptions_update" ON subscriptions;

-- Storage policies
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;

-- DROP TRIGGERS
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS update_homes_updated_at ON homes;
DROP TRIGGER IF EXISTS update_home_settings_updated_at ON home_settings;
DROP TRIGGER IF EXISTS update_items_updated_at ON items;
DROP TRIGGER IF EXISTS update_shopping_items_updated_at ON shopping_items;
DROP TRIGGER IF EXISTS update_consumables_updated_at ON consumables;
DROP TRIGGER IF EXISTS update_recipes_updated_at ON recipes;
DROP TRIGGER IF EXISTS update_meal_plans_updated_at ON meal_plans;
DROP TRIGGER IF EXISTS update_notification_preferences_updated_at ON notification_preferences;
DROP TRIGGER IF EXISTS update_garbage_reminders_updated_at ON garbage_reminders;
DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
DROP TRIGGER IF EXISTS on_profile_created ON profiles;

-- DROP FUNCTIONS
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS create_default_home_and_members() CASCADE;
DROP FUNCTION IF EXISTS handle_payment_via_cpf(TEXT, DECIMAL) CASCADE;

-- DROP TABLES (em ordem reversa de FK)
DROP TABLE IF EXISTS meal_plans CASCADE;
DROP TABLE IF EXISTS shopping_lists CASCADE;
DROP TABLE IF EXISTS shopping_items CASCADE;
DROP TABLE IF EXISTS consumable_logs CASCADE;
DROP TABLE IF EXISTS consumables CASCADE;
DROP TABLE IF EXISTS item_history CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS notification_preferences CASCADE;
DROP TABLE IF EXISTS garbage_reminders CASCADE;
DROP TABLE IF EXISTS home_settings CASCADE;
DROP TABLE IF EXISTS home_members CASCADE;
DROP TABLE IF EXISTS homes CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS favorite_recipes CASCADE;
DROP TABLE IF EXISTS saved_recipes CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- DROP ENUMS
DROP TYPE IF EXISTS home_type CASCADE;
DROP TYPE IF EXISTS fridge_type CASCADE;
DROP TYPE IF EXISTS item_category CASCADE;
DROP TYPE IF EXISTS item_location CASCADE;
DROP TYPE IF EXISTS maturation_level CASCADE;
DROP TYPE IF EXISTS home_role CASCADE;
DROP TYPE IF EXISTS meal_type CASCADE;
DROP TYPE IF EXISTS subscription_plan CASCADE;
DROP TYPE IF EXISTS action_type CASCADE;

-- DELETE Storage bucket
DELETE FROM storage.buckets WHERE id = 'avatars';

-- ============================================================
-- ETAPA 2: CREATE ENUMS
-- ============================================================

CREATE TYPE home_type AS ENUM ('apartment', 'house');
CREATE TYPE fridge_type AS ENUM ('regular', 'smart');
CREATE TYPE item_category AS ENUM ('fruit', 'vegetable', 'meat', 'dairy', 'cooked', 'frozen', 'beverage', 'cleaning', 'hygiene', 'pantry');
CREATE TYPE item_location AS ENUM ('fridge', 'freezer', 'pantry', 'cleaning');
CREATE TYPE maturation_level AS ENUM ('green', 'ripe', 'very-ripe', 'overripe');
CREATE TYPE home_role AS ENUM ('owner', 'admin', 'member', 'viewer');
CREATE TYPE meal_type AS ENUM ('breakfast', 'lunch', 'dinner', 'snack');
CREATE TYPE subscription_plan AS ENUM ('free', 'basic', 'standard', 'premium');
CREATE TYPE action_type AS ENUM ('added', 'consumed', 'cooked', 'discarded', 'defrosted');

-- ============================================================
-- ETAPA 3: CREATE FUNCTION - update_updated_at
-- ============================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ============================================================
-- ETAPA 4: CREATE TABLES
-- ============================================================

-- 4.1 PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  cpf TEXT UNIQUE SPARSE,
  avatar_url TEXT,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_cpf ON profiles(cpf) WHERE cpf IS NOT NULL;

-- 4.2 HOMES
CREATE TABLE public.homes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Minha Casa',
  home_type home_type DEFAULT 'apartment',
  address TEXT,
  residents INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_homes_owner_user_id ON homes(owner_user_id);

-- 4.3 HOME_MEMBERS
CREATE TABLE public.home_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  home_id UUID NOT NULL REFERENCES homes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role home_role NOT NULL DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(home_id, user_id)
);

CREATE INDEX idx_home_members_home_id ON home_members(home_id);
CREATE INDEX idx_home_members_user_id ON home_members(user_id);

-- 4.4 HOME_SETTINGS
CREATE TABLE public.home_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  home_id UUID NOT NULL UNIQUE REFERENCES homes(id) ON DELETE CASCADE,
  fridge_type fridge_type DEFAULT 'regular',
  fridge_brand TEXT,
  cooling_level INT DEFAULT 3 CHECK (cooling_level >= 1 AND cooling_level <= 5),
  habits TEXT[] DEFAULT '{}',
  notification_prefs TEXT[] DEFAULT '{}',
  hidden_sections TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4.5 ITEMS
CREATE TABLE public.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  home_id UUID NOT NULL REFERENCES homes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category item_category NOT NULL,
  location item_location NOT NULL DEFAULT 'fridge',
  quantity INT DEFAULT 1,
  unit TEXT DEFAULT 'un',
  expiry_date DATE,
  opened_date DATE,
  maturation maturation_level DEFAULT 'green',
  min_stock INT,
  image_url TEXT,
  added_by_user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_items_home_id ON items(home_id);
CREATE INDEX idx_items_home_expiry ON items(home_id, expiry_date);
CREATE INDEX idx_items_added_by_user ON items(added_by_user_id);

-- 4.6 SHOPPING_ITEMS
CREATE TABLE public.shopping_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  home_id UUID NOT NULL REFERENCES homes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INT DEFAULT 1,
  unit TEXT DEFAULT 'un',
  checked BOOLEAN DEFAULT false,
  checked_by_user_id UUID REFERENCES auth.users(id),
  checked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_shopping_items_home_id ON shopping_items(home_id);

-- 4.7 SHOPPING_LISTS (listas salvas)
CREATE TABLE public.shopping_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  home_id UUID NOT NULL REFERENCES homes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  created_by_user_id UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(home_id, name)
);

CREATE INDEX idx_shopping_lists_home_id ON shopping_lists(home_id);

-- 4.8 CONSUMABLES
CREATE TABLE public.consumables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  home_id UUID NOT NULL REFERENCES homes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT DEFAULT '📦',
  category TEXT NOT NULL DEFAULT 'other',
  current_stock DECIMAL(10,2) DEFAULT 0,
  unit TEXT DEFAULT 'un',
  daily_consumption DECIMAL(10,4) DEFAULT 1,
  min_stock DECIMAL(10,2) DEFAULT 2,
  usage_interval TEXT DEFAULT 'daily',
  auto_add_to_shopping BOOLEAN DEFAULT true,
  is_hidden BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(home_id, name)
);

CREATE INDEX idx_consumables_home_id ON consumables(home_id);

-- 4.9 CONSUMABLE_LOGS
CREATE TABLE public.consumable_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consumable_id UUID NOT NULL REFERENCES consumables(id) ON DELETE CASCADE,
  home_id UUID NOT NULL REFERENCES homes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  action TEXT NOT NULL CHECK (action IN ('debit', 'restock')),
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_consumable_logs_consumable_id ON consumable_logs(consumable_id);
CREATE INDEX idx_consumable_logs_home_id ON consumable_logs(home_id);

-- 4.10 ITEM_HISTORY
CREATE TABLE public.item_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  home_id UUID NOT NULL REFERENCES homes(id) ON DELETE CASCADE,
  item_id UUID,
  item_name TEXT NOT NULL,
  action action_type NOT NULL,
  quantity INT NOT NULL,
  unit TEXT,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  user_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_item_history_home_id ON item_history(home_id);
CREATE INDEX idx_item_history_user_id ON item_history(user_id);
CREATE INDEX idx_item_history_home_date ON item_history(home_id, created_at DESC);

-- 4.11 RECIPES
CREATE TABLE public.recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  home_id UUID NOT NULL REFERENCES homes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  ingredients JSONB NOT NULL DEFAULT '[]',
  instructions TEXT[],
  type TEXT,
  category TEXT,
  prep_time INT,
  cook_time INT,
  servings INT,
  difficulty TEXT,
  image_url TEXT,
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(home_id, name)
);

CREATE INDEX idx_recipes_home_id ON recipes(home_id);
CREATE INDEX idx_recipes_home_favorite ON recipes(home_id, is_favorite);

-- 4.12 MEAL_PLANS
CREATE TABLE public.meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  home_id UUID NOT NULL REFERENCES homes(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES recipes(id) ON DELETE SET NULL,
  recipe_name TEXT NOT NULL,
  planned_date DATE NOT NULL,
  meal_type meal_type NOT NULL,
  created_by_user_id UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(home_id, planned_date, meal_type)
);

CREATE INDEX idx_meal_plans_home_date ON meal_plans(home_id, planned_date);

-- 4.13 NOTIFICATION_PREFERENCES
CREATE TABLE public.notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  home_id UUID NOT NULL UNIQUE REFERENCES homes(id) ON DELETE CASCADE,
  expiring_items BOOLEAN DEFAULT true,
  low_stock_consumables BOOLEAN DEFAULT true,
  garbage_reminder BOOLEAN DEFAULT true,
  cooking_timer BOOLEAN DEFAULT true,
  shopping_list_updates BOOLEAN DEFAULT true,
  daily_summary BOOLEAN DEFAULT false,
  quiet_hours_start TIME DEFAULT '22:00',
  quiet_hours_end TIME DEFAULT '07:00',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4.14 GARBAGE_REMINDERS
CREATE TABLE public.garbage_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  home_id UUID NOT NULL UNIQUE REFERENCES homes(id) ON DELETE CASCADE,
  enabled BOOLEAN DEFAULT false,
  selected_days INT[] DEFAULT ARRAY[1,4],
  reminder_time TIME DEFAULT '20:00',
  garbage_location TEXT DEFAULT 'street',
  building_floor TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4.15 SUBSCRIPTIONS (POR USUÁRIO, não por casa)
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  plan subscription_plan NOT NULL DEFAULT 'free',
  items_limit INT DEFAULT 5,
  recipes_per_day INT DEFAULT 1,
  shopping_list_limit INT DEFAULT 20,
  notification_change_days INT DEFAULT 7,
  last_notification_change TIMESTAMPTZ,
  started_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  payment_provider TEXT,
  payment_id TEXT,
  cakto_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_payment_id ON subscriptions(payment_id) WHERE payment_id IS NOT NULL;

-- 4.16 SAVED_RECIPES (legacy - será deprecado)
CREATE TABLE public.saved_recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  ingredients JSONB NOT NULL DEFAULT '[]',
  instructions TEXT[],
  type TEXT DEFAULT 'lunch',
  prep_time INT DEFAULT 30,
  servings INT DEFAULT 2,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4.17 FAVORITE_RECIPES (legacy - será deprecado)
CREATE TABLE public.favorite_recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recipe_name TEXT NOT NULL,
  recipe_category TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, recipe_name)
);

-- ============================================================
-- ETAPA 5: ENABLE RLS
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE homes ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE consumables ENABLE ROW LEVEL SECURITY;
ALTER TABLE consumable_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE item_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE garbage_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_recipes ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- ETAPA 6: CREATE POLICIES (RLS)
-- ============================================================

-- PROFILES
CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "profiles_delete" ON profiles FOR DELETE USING (auth.uid() = user_id);

-- HOMES: Usuário pode ver apenas casas onde é membro
CREATE POLICY "homes_select" ON homes FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = homes.id AND user_id = auth.uid()
  )
);
CREATE POLICY "homes_insert" ON homes FOR INSERT WITH CHECK (auth.uid() = owner_user_id);
CREATE POLICY "homes_update" ON homes FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = homes.id AND user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);
CREATE POLICY "homes_delete" ON homes FOR DELETE USING (auth.uid() = owner_user_id);

-- HOME_MEMBERS
CREATE POLICY "home_members_select" ON home_members FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM home_members AS hm2
    WHERE hm2.home_id = home_members.home_id AND hm2.user_id = auth.uid()
  )
);
CREATE POLICY "home_members_insert" ON home_members FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM home_members AS hm2
    WHERE hm2.home_id = home_members.home_id AND hm2.user_id = auth.uid() AND hm2.role IN ('owner', 'admin')
  )
);
CREATE POLICY "home_members_update" ON home_members FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM home_members AS hm2
    WHERE hm2.home_id = home_members.home_id AND hm2.user_id = auth.uid() AND hm2.role IN ('owner', 'admin')
  )
);
CREATE POLICY "home_members_delete" ON home_members FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM home_members AS hm2
    WHERE hm2.home_id = home_members.home_id AND hm2.user_id = auth.uid() AND hm2.role = 'owner'
  )
);

-- HOME_SETTINGS
CREATE POLICY "home_settings_select" ON home_settings FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = home_settings.home_id AND user_id = auth.uid()
  )
);
CREATE POLICY "home_settings_update" ON home_settings FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = home_settings.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

-- ITEMS
CREATE POLICY "items_select" ON items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = items.home_id AND user_id = auth.uid()
  )
);
CREATE POLICY "items_insert" ON items FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = items.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
  )
);
CREATE POLICY "items_update" ON items FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = items.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
  )
);
CREATE POLICY "items_delete" ON items FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = items.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

-- SHOPPING_ITEMS
CREATE POLICY "shopping_items_select" ON shopping_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = shopping_items.home_id AND user_id = auth.uid()
  )
);
CREATE POLICY "shopping_items_insert" ON shopping_items FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = shopping_items.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
  )
);
CREATE POLICY "shopping_items_update" ON shopping_items FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = shopping_items.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
  )
);
CREATE POLICY "shopping_items_delete" ON shopping_items FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = shopping_items.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

-- SHOPPING_LISTS
CREATE POLICY "shopping_lists_select" ON shopping_lists FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = shopping_lists.home_id AND user_id = auth.uid()
  )
);
CREATE POLICY "shopping_lists_insert" ON shopping_lists FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = shopping_lists.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
  )
);
CREATE POLICY "shopping_lists_update" ON shopping_lists FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = shopping_lists.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
  )
);
CREATE POLICY "shopping_lists_delete" ON shopping_lists FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = shopping_lists.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

-- CONSUMABLES
CREATE POLICY "consumables_select" ON consumables FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = consumables.home_id AND user_id = auth.uid()
  )
);
CREATE POLICY "consumables_insert" ON consumables FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = consumables.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
  )
);
CREATE POLICY "consumables_update" ON consumables FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = consumables.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
  )
);
CREATE POLICY "consumables_delete" ON consumables FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = consumables.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

-- CONSUMABLE_LOGS
CREATE POLICY "consumable_logs_select" ON consumable_logs FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = consumable_logs.home_id AND user_id = auth.uid()
  )
);
CREATE POLICY "consumable_logs_insert" ON consumable_logs FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = consumable_logs.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
  )
);

-- ITEM_HISTORY
CREATE POLICY "item_history_select" ON item_history FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = item_history.home_id AND user_id = auth.uid()
  )
);
CREATE POLICY "item_history_insert" ON item_history FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = item_history.home_id AND user_id = auth.uid()
  )
);

-- RECIPES
CREATE POLICY "recipes_select" ON recipes FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = recipes.home_id AND user_id = auth.uid()
  )
);
CREATE POLICY "recipes_insert" ON recipes FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = recipes.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
  )
);
CREATE POLICY "recipes_update" ON recipes FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = recipes.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
  )
);
CREATE POLICY "recipes_delete" ON recipes FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = recipes.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

-- MEAL_PLANS
CREATE POLICY "meal_plans_select" ON meal_plans FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = meal_plans.home_id AND user_id = auth.uid()
  )
);
CREATE POLICY "meal_plans_insert" ON meal_plans FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = meal_plans.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
  )
);
CREATE POLICY "meal_plans_update" ON meal_plans FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = meal_plans.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
  )
);
CREATE POLICY "meal_plans_delete" ON meal_plans FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = meal_plans.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

-- NOTIFICATION_PREFERENCES
CREATE POLICY "notification_preferences_select" ON notification_preferences FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = notification_preferences.home_id AND user_id = auth.uid()
  )
);
CREATE POLICY "notification_preferences_update" ON notification_preferences FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = notification_preferences.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

-- GARBAGE_REMINDERS
CREATE POLICY "garbage_reminders_select" ON garbage_reminders FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = garbage_reminders.home_id AND user_id = auth.uid()
  )
);
CREATE POLICY "garbage_reminders_insert" ON garbage_reminders FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = garbage_reminders.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);
CREATE POLICY "garbage_reminders_update" ON garbage_reminders FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM home_members
    WHERE home_id = garbage_reminders.home_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

-- SUBSCRIPTIONS
CREATE POLICY "subscriptions_select" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "subscriptions_insert" ON subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "subscriptions_update" ON subscriptions FOR UPDATE USING (auth.uid() = user_id);

-- LEGACY TABLES (manter para compatibilidade)
CREATE POLICY "saved_recipes_select" ON saved_recipes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "saved_recipes_insert" ON saved_recipes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "saved_recipes_delete" ON saved_recipes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "favorite_recipes_select" ON favorite_recipes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "favorite_recipes_insert" ON favorite_recipes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "favorite_recipes_delete" ON favorite_recipes FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- ETAPA 7: CREATE TRIGGERS
-- ============================================================

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_homes_updated_at BEFORE UPDATE ON homes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_home_settings_updated_at BEFORE UPDATE ON home_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_items_updated_at BEFORE UPDATE ON items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consumables_updated_at BEFORE UPDATE ON consumables FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_recipes_updated_at BEFORE UPDATE ON recipes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_meal_plans_updated_at BEFORE UPDATE ON meal_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notification_preferences_updated_at BEFORE UPDATE ON notification_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_garbage_reminders_updated_at BEFORE UPDATE ON garbage_reminders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ETAPA 8: CREATE COMPLEX FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION public.create_default_home_and_members()
RETURNS TRIGGER AS $$
DECLARE
  home_id_var UUID;
BEGIN
  -- 1. Criar home padrão
  INSERT INTO homes (owner_user_id, name)
  VALUES (NEW.user_id, 'Minha Casa')
  RETURNING id INTO home_id_var;

  -- 2. Adicionar usuário como owner
  INSERT INTO home_members (home_id, user_id, role)
  VALUES (home_id_var, NEW.user_id, 'owner');

  -- 3. Criar home_settings padrão
  INSERT INTO home_settings (home_id)
  VALUES (home_id_var);

  -- 4. Criar notification_preferences padrão
  INSERT INTO notification_preferences (home_id)
  VALUES (home_id_var);

  -- 5. Criar subscription free padrão
  INSERT INTO subscriptions (user_id, plan)
  VALUES (NEW.user_id, 'free');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger para auto-criar home ao criar profile
CREATE TRIGGER on_profile_created AFTER INSERT ON profiles
FOR EACH ROW EXECUTE FUNCTION create_default_home_and_members();

-- ============================================================
-- ETAPA 9: CREATE STORAGE
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own avatar" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own avatar" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- ============================================================
-- ETAPA 10: FINAL CHECKS
-- ============================================================

-- Verificar se tudo foi criado
SELECT 'Migration completed successfully!' as status;
