-- Migration: 2026-04-12 - Reforçar RLS em tabelas principais
-- Garante que apenas o dono (user_id) possa acessar/modificar os registros

-- Items
ALTER TABLE IF EXISTS public.items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own items" ON public.items;
CREATE POLICY "Users can manage own items" ON public.items
FOR ALL USING (auth.uid() = user_id);

-- Shopping Items
ALTER TABLE IF EXISTS public.shopping_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own shopping items" ON public.shopping_items;
CREATE POLICY "Users can manage own shopping items" ON public.shopping_items
FOR ALL USING (auth.uid() = user_id);

-- Subscriptions (protege dados sensíveis)
ALTER TABLE IF EXISTS public.subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can manage own subscriptions" ON public.subscriptions
FOR ALL USING (auth.uid() = user_id);

-- Profiles (reafirmar)
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = user_id);

-- Consumables (reafirmar)
ALTER TABLE IF EXISTS public.consumables ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own consumables" ON public.consumables;
CREATE POLICY "Users can manage own consumables" ON public.consumables
FOR ALL USING (auth.uid() = user_id);

-- Nota: Algumas funções do Supabase podem requerer o uso da service_role key no server-side
-- para executar operações administrativas. Assegure que funções server-side usam a service role
-- ou que adicionem policies específicas para o papel de serviço quando necessário.
