-- =============================================================================
-- FRIGGO — Fix: Subscription RLS + Trial maxSlots
-- Date: 2026-04-20
--
-- Fixes:
--   1. Add RLS policies on subscriptions table so the authenticated user
--      can SELECT and UPDATE their own subscription (the bootstrap_user
--      trigger creates the row on signUp, so no INSERT needed from frontend)
--   2. Ensure trial users get multiPRO-level access (3 invite slots)
-- =============================================================================

-- ═════════════════════════════════════════════════════════════════════════════
-- STEP 1: Enable RLS and add policies for subscriptions
-- ═════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow user to read their own subscription
DROP POLICY IF EXISTS sub_own_select ON public.subscriptions;
CREATE POLICY sub_own_select ON public.subscriptions
  FOR SELECT USING (user_id = auth.uid());

-- Allow user to update their own subscription (for onboarding plan_tier, trial, etc.)
DROP POLICY IF EXISTS sub_own_update ON public.subscriptions;
CREATE POLICY sub_own_update ON public.subscriptions
  FOR UPDATE USING (user_id = auth.uid());

-- Allow user to insert their own subscription (fallback if bootstrap_user didn't fire)
DROP POLICY IF EXISTS sub_own_insert ON public.subscriptions;
CREATE POLICY sub_own_insert ON public.subscriptions
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- ═════════════════════════════════════════════════════════════════════════════
-- STEP 2: Ensure sub_account_groups max_members defaults correctly
-- ═════════════════════════════════════════════════════════════════════════════

-- Make sure any existing groups have max_members = 3
UPDATE public.sub_account_groups
   SET max_members = 3
 WHERE max_members IS NULL OR max_members < 3;

-- ═════════════════════════════════════════════════════════════════════════════
-- DONE
-- ═════════════════════════════════════════════════════════════════════════════
SELECT 'Subscription RLS policies created successfully.' AS status;
