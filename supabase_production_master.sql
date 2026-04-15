-- ==========================================
-- FRIGGO PRODUCTION MASTER SCHEMA
-- Consolidated Audit & Hardening
-- ==========================================

-- 1. EXTENSIONS & SETUP
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLES DEFINITIONS

-- PROFILES: Central user data
CREATE TABLE IF NOT EXISTS public.profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    cpf TEXT UNIQUE,
    home_type TEXT DEFAULT 'apartment',
    residents INTEGER DEFAULT 2,
    fridge_type TEXT DEFAULT 'regular',
    fridge_brand TEXT,
    cooling_level INTEGER DEFAULT 3,
    habits TEXT[] DEFAULT '{}',
    avatar_url TEXT,
    notification_prefs TEXT[] DEFAULT '{expiry, shopping, nightCheckup}',
    hidden_sections TEXT[] DEFAULT '{}',
    onboarding_completed BOOLEAN DEFAULT FALSE,
    last_payment_date TIMESTAMPTZ,
    payment_method TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ITEMS: Fridge/Pantry items
CREATE TABLE IF NOT EXISTS public.items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    quantity NUMERIC(10,2) DEFAULT 1,
    unit TEXT DEFAULT 'unidades',
    expiry_date DATE,
    opened_date DATE,
    min_stock NUMERIC(10,2),
    maturation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SHOPPING ITEMS: Shopping list
CREATE TABLE IF NOT EXISTS public.shopping_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    quantity NUMERIC(10,2) DEFAULT 1,
    unit TEXT DEFAULT 'unidades',
    category TEXT,
    checked BOOLEAN DEFAULT FALSE,
    store TEXT DEFAULT 'market',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CONSUMABLES: Household stocks
CREATE TABLE IF NOT EXISTS public.consumables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    icon TEXT DEFAULT '📦',
    category TEXT DEFAULT 'other',
    current_stock NUMERIC(10,2) DEFAULT 0,
    unit TEXT DEFAULT 'unidades',
    daily_consumption NUMERIC(10,2) DEFAULT 0,
    min_stock NUMERIC(10,2) DEFAULT 0,
    usage_interval TEXT DEFAULT 'daily',
    hidden BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT consumables_unique_user_item UNIQUE(user_id, name)
);

-- 3. STORAGE SETUP (Avatars)
-- Note: Buckets must be created via Dashboard or API. 
-- The following policies assume the "avatars" bucket exists.

-- 4. ROW LEVEL SECURITY (RLS)

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consumables ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Items Policies
DROP POLICY IF EXISTS "Users can manage own items" ON public.items;
CREATE POLICY "Users can manage own items" ON public.items 
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Shopping Items Policies
DROP POLICY IF EXISTS "Users can manage own shopping list" ON public.shopping_items;
CREATE POLICY "Users can manage own shopping list" ON public.shopping_items 
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Consumables Policies
DROP POLICY IF EXISTS "Users can manage own consumables" ON public.consumables;
CREATE POLICY "Users can manage own consumables" ON public.consumables 
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 5. STORAGE POLICIES (Avatars Bucket)
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Avatar Public Access" ON storage.objects;
CREATE POLICY "Avatar Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Avatar User Upload" ON storage.objects;
CREATE POLICY "Avatar User Upload" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Avatar User Update" ON storage.objects;
CREATE POLICY "Avatar User Update" ON storage.objects FOR UPDATE USING (
    bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Avatar User Delete" ON storage.objects;
CREATE POLICY "Avatar User Delete" ON storage.objects FOR DELETE USING (
    bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text
);

-- 6. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS items_user_id_idx ON public.items(user_id);
CREATE INDEX IF NOT EXISTS consumables_user_id_idx ON public.consumables(user_id);
CREATE INDEX IF NOT EXISTS shopping_items_user_id_idx ON public.shopping_items(user_id);
