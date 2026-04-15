-- ==========================================
-- FRIGGO - MUDANÇAS DE BANCO V2 (RECEITAS E PLANEJADOR)
-- ==========================================

-- 1. TABELA DE FAVORITOS (Salva apenas ID da receita x ID do usuário)
CREATE TABLE IF NOT EXISTS public.recipe_favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    recipe_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, recipe_id)
);

-- RLS PARA FAVORITOS
ALTER TABLE public.recipe_favorites ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuários podem gerenciar próprios favoritos" ON public.recipe_favorites;
CREATE POLICY "Usuários podem gerenciar próprios favoritos" ON public.recipe_favorites
    FOR ALL USING (auth.uid() = user_id);

-- 2. TABELA DE PLANEJADOR SEMANAL (MEAL PLAN)
CREATE TABLE IF NOT EXISTS public.meal_plan (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    recipe_id TEXT NOT NULL,
    recipe_name TEXT NOT NULL,
    planned_date DATE NOT NULL,
    meal_type TEXT NOT NULL, -- 'breakfast', 'lunch', 'dinner', 'snack'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS PARA PLANEJADOR
ALTER TABLE public.meal_plan ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuários podem gerenciar próprio plano de refeição" ON public.meal_plan;
CREATE POLICY "Usuários podem gerenciar próprio plano de refeição" ON public.meal_plan
    FOR ALL USING (auth.uid() = user_id);

-- Comentários de ajuda
COMMENT ON TABLE public.recipe_favorites IS 'Lista de receitas favoritadas pelos usuários';
COMMENT ON TABLE public.meal_plan IS 'Agenda semanal de refeições';
