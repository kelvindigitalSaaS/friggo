-- =============================================================================
-- FRIGGO — Database Repair & Bootstrap Backfill
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)
--
-- What this does:
--   1. Recreates the bootstrap_user() trigger with updated column list
--   2. Backfills missing rows for any existing auth.users that lack them
--   3. Fixes subscriptions where is_active = false for free/trial users
--   4. Ensures v_user_access view and required columns exist
-- =============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 1: Recreate bootstrap_user() with correct columns
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.bootstrap_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_home_id UUID;
BEGIN
  -- Profile (name from metadata or email prefix)
  INSERT INTO public.profiles (user_id, name, onboarding_completed)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    false
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- Default home
  INSERT INTO public.homes (owner_user_id, name)
  VALUES (NEW.id, 'Minha Casa')
  RETURNING id INTO new_home_id;

  INSERT INTO public.home_members (home_id, user_id, role)
  VALUES (new_home_id, NEW.id, 'owner');

  -- Home settings & preferences
  INSERT INTO public.home_settings (home_id)
  VALUES (new_home_id)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.notification_preferences (home_id)
  VALUES (new_home_id)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.garbage_reminders (home_id, user_id)
  VALUES (new_home_id, NEW.id)
  ON CONFLICT DO NOTHING;

  -- Free subscription with trial (7 days from now)
  INSERT INTO public.subscriptions (
    user_id,
    plan,
    plan_tier,
    status,
    is_active,
    trial_started_at,
    trial_ends_at,
    started_at
  )
  VALUES (
    NEW.id,
    'free',
    'free',
    'active',
    true,
    now(),
    now() + interval '7 days',
    now()
  )
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$;

-- Re-attach trigger (drop first to avoid duplicate)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.bootstrap_user();

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 2: Ensure required columns exist on subscriptions
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS plan_tier         text        NOT NULL DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS is_active         boolean     NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS trial_started_at  timestamptz,
  ADD COLUMN IF NOT EXISTS trial_ends_at     timestamptz,
  ADD COLUMN IF NOT EXISTS started_at        timestamptz NOT NULL DEFAULT now();

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 3: Backfill missing data for existing auth.users
-- ─────────────────────────────────────────────────────────────────────────────

DO $$
DECLARE
  u RECORD;
  h_id UUID;
BEGIN
  FOR u IN SELECT id, email, raw_user_meta_data, created_at FROM auth.users LOOP

    -- 3a. Profile
    INSERT INTO public.profiles (user_id, name, onboarding_completed)
    VALUES (
      u.id,
      COALESCE(u.raw_user_meta_data->>'name', split_part(u.email, '@', 1)),
      false
    )
    ON CONFLICT (user_id) DO NOTHING;

    -- 3b. Home (only if user has no home yet)
    IF NOT EXISTS (SELECT 1 FROM public.home_members WHERE user_id = u.id) THEN
      INSERT INTO public.homes (owner_user_id, name)
      VALUES (u.id, 'Minha Casa')
      RETURNING id INTO h_id;

      INSERT INTO public.home_members (home_id, user_id, role)
      VALUES (h_id, u.id, 'owner');

      INSERT INTO public.home_settings (home_id)
      VALUES (h_id)
      ON CONFLICT DO NOTHING;

      INSERT INTO public.notification_preferences (home_id)
      VALUES (h_id)
      ON CONFLICT DO NOTHING;

      INSERT INTO public.garbage_reminders (home_id, user_id)
      VALUES (h_id, u.id)
      ON CONFLICT DO NOTHING;
    END IF;

    -- 3c. Subscription
    INSERT INTO public.subscriptions (
      user_id,
      plan,
      plan_tier,
      status,
      is_active,
      trial_started_at,
      trial_ends_at,
      started_at
    )
    VALUES (
      u.id,
      'free',
      'free',
      'active',
      true,
      u.created_at,
      u.created_at + interval '7 days',
      u.created_at
    )
    ON CONFLICT DO NOTHING;

  END LOOP;
END;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 4: Fix subscriptions where is_active is wrong
--   - Free/active subscriptions should have is_active = true
--   - Update plan_tier where it's missing
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE public.subscriptions
   SET is_active = true,
       trial_started_at = COALESCE(trial_started_at, started_at, now()),
       trial_ends_at    = COALESCE(trial_ends_at, started_at + interval '7 days', now() + interval '7 days')
 WHERE status = 'active'
   AND plan IN ('free', 'basic', 'standard')
   AND is_active = false;

UPDATE public.subscriptions
   SET plan_tier = 'free'
 WHERE (plan_tier IS NULL OR plan_tier = '')
   AND plan::text NOT IN ('premium');

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 5: Ensure profiles have onboarding_completed column
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS onboarding_completed boolean NOT NULL DEFAULT false;

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 6: Recreate v_user_access view (must DROP first — can't replace with different columns)
-- ─────────────────────────────────────────────────────────────────────────────

DROP VIEW IF EXISTS public.v_user_access CASCADE;
CREATE VIEW public.v_user_access AS
SELECT
  p.user_id,
  s.plan,
  s.is_active,
  s.trial_started_at,
  s.trial_ends_at,
  s.current_period_end,
  s.next_billing_at,
  s.cancel_at_period_end,
  CASE
    WHEN s.trial_ends_at IS NOT NULL AND s.trial_ends_at > now() THEN true
    ELSE false
  END AS in_trial,
  CASE
    WHEN s.is_active = true THEN true
    WHEN s.trial_ends_at IS NOT NULL AND s.trial_ends_at > now() THEN true
    ELSE false
  END AS has_access,
  CASE
    WHEN s.trial_ends_at IS NOT NULL AND s.trial_ends_at > now()
      THEN GREATEST(0, EXTRACT(day FROM (s.trial_ends_at - now()))::int)
    ELSE 0
  END AS trial_days_left,
  CASE
    WHEN s.next_billing_at IS NOT NULL
     AND s.next_billing_at BETWEEN now() AND now() + interval '3 days'
      THEN true ELSE false
  END AS billing_soon,
  COALESCE(s.plan_tier, 'free') AS plan_tier,
  s.group_id
FROM public.profiles p
LEFT JOIN public.subscriptions s ON s.user_id = p.user_id;

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 7: Verify — run these SELECTs to confirm everything looks correct
-- ─────────────────────────────────────────────────────────────────────────────

-- Check users without profiles:
-- SELECT u.id, u.email FROM auth.users u LEFT JOIN public.profiles p ON p.user_id = u.id WHERE p.user_id IS NULL;

-- Check users without subscriptions:
-- SELECT u.id, u.email FROM auth.users u LEFT JOIN public.subscriptions s ON s.user_id = u.id WHERE s.user_id IS NULL;

-- Check users without homes:
-- SELECT u.id, u.email FROM auth.users u LEFT JOIN public.home_members hm ON hm.user_id = u.id WHERE hm.user_id IS NULL;

-- Check v_user_access for your user:
-- SELECT * FROM public.v_user_access;

SELECT 'Repair complete. Check comments above to verify.' AS status;
