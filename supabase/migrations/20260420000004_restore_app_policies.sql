-- =============================================================================
-- KAZA — MIGRATION 20260420000004: RESTORE APP FUNCTIONALITY
-- =============================================================================
-- Objetivo: Restaurar o CRUD para usuários autenticados nas tabelas operacionais.
-- Contexto: A migração 20260420000003 foi restritiva demais ao limpar as políticas.
-- =============================================================================

BEGIN;

-- ═════════════════════════════════════════════════════════════════════════════
-- 1. HELPERS DE SEGURANÇA (IDEMPOTENTES)
-- ═════════════════════════════════════════════════════════════════════════════

-- Retorna os IDs das casas que o usuário pertence (SECURITY DEFINER para bypass de RLS circular)
CREATE OR REPLACE FUNCTION public.user_home_ids()
RETURNS SETOF uuid
LANGUAGE sql SECURITY DEFINER SET search_path = ''
AS $$
  SELECT home_id FROM public.home_members WHERE user_id = auth.uid();
$$;

-- ═════════════════════════════════════════════════════════════════════════════
-- 2. RESTAURAÇÃO DE POLÍTICAS (CRUD PARA PROPRIETÁRIO OU MEMBRO DA CASA)
-- ═════════════════════════════════════════════════════════════════════════════

-- ITENS (Geladeira)
DROP POLICY IF EXISTS items_access ON public.items;
CREATE POLICY items_access ON public.items
  FOR ALL TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()))
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

-- CONSUMABLES (Despensa)
DROP POLICY IF EXISTS consumables_access ON public.consumables;
CREATE POLICY consumables_access ON public.consumables
  FOR ALL TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()))
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

-- SHOPPING_ITEMS (Lista de Compras)
DROP POLICY IF EXISTS shopping_items_access ON public.shopping_items;
CREATE POLICY shopping_items_access ON public.shopping_items
  FOR ALL TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()))
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

-- GARBAGE_REMINDERS (Lembretes de Lixo)
DROP POLICY IF EXISTS garbage_reminders_access ON public.garbage_reminders;
CREATE POLICY garbage_reminders_access ON public.garbage_reminders
  FOR ALL TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()) OR user_id = auth.uid())
  WITH CHECK (home_id IN (SELECT public.user_home_ids()) OR user_id = auth.uid());

-- MEAL_PLANS (Plano de Refeições)
DROP POLICY IF EXISTS meal_plans_access ON public.meal_plans;
CREATE POLICY meal_plans_access ON public.meal_plans
  FOR ALL TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()) OR created_by = auth.uid())
  WITH CHECK (home_id IN (SELECT public.user_home_ids()) OR created_by = auth.uid());

-- NOTIFICATION_PREFERENCES
DROP POLICY IF EXISTS notif_prefs_own ON public.notification_preferences;
CREATE POLICY notif_prefs_own ON public.notification_preferences
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- PUSH_SUBSCRIPTIONS
DROP POLICY IF EXISTS push_subs_own ON public.push_subscriptions;
CREATE POLICY push_subs_own ON public.push_subscriptions
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- USER_RECIPE_FAVORITES
DROP POLICY IF EXISTS recipes_fav_own ON public.user_recipe_favorites;
CREATE POLICY recipes_fav_own ON public.user_recipe_favorites
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- CUSTOM_CATEGORIES
DROP POLICY IF EXISTS custom_cats_access ON public.custom_categories;
CREATE POLICY custom_cats_access ON public.custom_categories
  FOR ALL TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()))
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

-- SAVED_SHOPPING_LISTS
DROP POLICY IF EXISTS saved_lists_access ON public.saved_shopping_lists;
CREATE POLICY saved_lists_access ON public.saved_shopping_lists
  FOR ALL TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()))
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

-- ACCOUNT_SESSIONS
DROP POLICY IF EXISTS account_sessions_own ON public.account_sessions;
CREATE POLICY account_sessions_own ON public.account_sessions
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- SUB_ACCOUNT_INVITES (Permitir que usuários convidem se forem donos de grupo)
DROP POLICY IF EXISTS sub_invites_mgmt ON public.sub_account_invites;
CREATE POLICY sub_invites_mgmt ON public.sub_account_invites
  FOR ALL TO authenticated
  USING (master_user_id = auth.uid())
  WITH CHECK (master_user_id = auth.uid());

COMMIT;
