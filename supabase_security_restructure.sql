-- ==========================================
-- FRIGGO - SEGURANÇA AVANÇADA DO PERFIL (MÚLTIPLAS TABELAS)
-- ==========================================

-- 1. TABELA PRINCIPAL DE PERFIL (DADOS PÚBLICOS/BÁSICOS NO APP)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT,
    avatar_url TEXT,
    onboarding_completed BOOLEAN DEFAULT false,
    last_payment_date TIMESTAMP WITH TIME ZONE,
    payment_method TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- 2. TABELA DE CONFIGURAÇÕES E PREFERÊNCIAS (DADOS DE USO DO APP)
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

-- 3. TABELA DE DADOS SENSÍVEIS (MÁXIMA SEGURANÇA - CPF)
CREATE TABLE IF NOT EXISTS public.profile_sensitive (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    cpf TEXT UNIQUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- ==========================================
-- SEGURANÇA (RLS - ROW LEVEL SECURITY)
-- ==========================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_sensitive ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS: Cada usuário gerencia apenas o SEU dado

DROP POLICY IF EXISTS "Usuários gerenciam próprio perfil principal" ON public.profiles;
CREATE POLICY "Usuários gerenciam próprio perfil principal" ON public.profiles
    FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários gerenciam própria configuração" ON public.profile_settings;
CREATE POLICY "Usuários gerenciam própria configuração" ON public.profile_settings
    FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários gerenciam próprios dados sensíveis" ON public.profile_sensitive;
CREATE POLICY "Usuários gerenciam próprios dados sensíveis" ON public.profile_sensitive
    FOR ALL USING (auth.uid() = user_id);

-- ==========================================
-- PROCEDIMENTO DE MIGRAÇÃO
-- ==========================================
DO $$
BEGIN
    INSERT INTO public.profile_settings (user_id, home_type, residents, fridge_type, fridge_brand, cooling_level, habits, hidden_sections, notification_prefs)
    SELECT user_id, home_type, residents, fridge_type, fridge_brand, cooling_level, habits, hidden_sections, notification_prefs
    FROM public.profiles
    ON CONFLICT (user_id) DO NOTHING;

    INSERT INTO public.profile_sensitive (user_id, cpf)
    SELECT user_id, cpf
    FROM public.profiles
    WHERE cpf IS NOT NULL
    ON CONFLICT (user_id) DO NOTHING;
EXCEPTION
    WHEN undefined_column THEN
        NULL;
END $$;
