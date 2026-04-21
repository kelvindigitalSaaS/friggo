-- =============================================================================
-- Migration: Fix 403 Onboarding Error (Atomic Implementation)
-- Date: 2026-04-20
-- 
-- 1. Create a SECURITY DEFINER function to atomically create a home and ALL its 
--    settings, bypassing RLS issues during the first setup.
-- 2. Ensure all tables have proper RLS policies.
-- =============================================================================

-- 1) RPC for atomic home creation
DROP FUNCTION IF EXISTS public.create_home_with_owner(text, text, int);
CREATE OR REPLACE FUNCTION public.create_home_with_owner(home_name text, h_type text DEFAULT 'apartment', res_count int DEFAULT 1)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog, pg_temp
AS $$
DECLARE
  new_home_id uuid;
BEGIN
  -- Insert the new home
  INSERT INTO public.homes (name, home_type, residents, owner_user_id)
  VALUES (home_name, h_type::public.home_type, res_count, auth.uid())
  RETURNING id INTO new_home_id;

  -- Create the owner membership
  INSERT INTO public.home_members (home_id, user_id, role)
  VALUES (new_home_id, auth.uid(), 'owner'::public.home_role);

  -- Initial settings and preferences (Atomic)
  -- ---------------------------------------------------------------------------
  -- Criamos as configurações básicas por aqui para evitar que o frontend 
  -- receba 403 ao tentar inserir em tabelas onde ele ainda não é 'membro' 
  -- reconhecido pela sessão JWT atual.
  -- ---------------------------------------------------------------------------
  
  INSERT INTO public.home_settings (home_id, fridge_type, cooling_level)
  VALUES (new_home_id, 'regular'::public.fridge_type, 3);

  INSERT INTO public.notification_preferences (home_id, expiring_items, low_stock_consumables, garbage_reminder, cooking_timer, shopping_list_updates)
  VALUES (new_home_id, true, true, true, true, true);

  INSERT INTO public.garbage_reminders (home_id, enabled)
  VALUES (new_home_id, false);

  RETURN new_home_id;
END;
$$;

-- 2) RLS Policies for Robust Security
ALTER TABLE public.homes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.garbage_reminders ENABLE ROW LEVEL SECURITY;

-- Policy: Members can see their homes
DROP POLICY IF EXISTS "homes_member_select" ON public.homes;
CREATE POLICY "homes_member_select" ON public.homes
  FOR SELECT TO authenticated
  USING (id IN (SELECT home_id FROM public.home_members WHERE user_id = auth.uid()));

-- Policy: Owners/Admins can update their homes
DROP POLICY IF EXISTS "homes_owner_update" ON public.homes;
CREATE POLICY "homes_owner_update" ON public.homes
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.home_members 
      WHERE home_id = homes.id AND user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Policy: Profiles self-access
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "profiles_self_all" ON public.profiles;
CREATE POLICY "profiles_self_all" ON public.profiles
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- 3) GRANTS
GRANT EXECUTE ON FUNCTION public.create_home_with_owner(text, text, int) TO authenticated;
