-- =============================================================================
-- KAZA — EMERGENCY RLS fix
-- Run THIS FIRST in Supabase SQL editor. No BEGIN/COMMIT so partial failures
-- don't roll everything back.
-- =============================================================================

-- ─── 1. Drop ALL policies on profiles (dynamic) ─────────────────────────────
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT polname FROM pg_policy
           WHERE polrelid = 'public.profiles'::regclass
  LOOP
    EXECUTE format('DROP POLICY %I ON public.profiles', r.polname);
  END LOOP;
END $$;

-- ─── 2. Drop ALL policies on subscriptions ──────────────────────────────────
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT polname FROM pg_policy
           WHERE polrelid = 'public.subscriptions'::regclass
  LOOP
    EXECUTE format('DROP POLICY %I ON public.subscriptions', r.polname);
  END LOOP;
END $$;

-- ─── 3. Drop ALL policies on home_members (often recurses through profiles) ─
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT polname FROM pg_policy
           WHERE polrelid = 'public.home_members'::regclass
  LOOP
    EXECUTE format('DROP POLICY %I ON public.home_members', r.polname);
  END LOOP;
END $$;

-- ─── 4. Drop ALL policies on homes ──────────────────────────────────────────
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT polname FROM pg_policy
           WHERE polrelid = 'public.homes'::regclass
  LOOP
    EXECUTE format('DROP POLICY %I ON public.homes', r.polname);
  END LOOP;
END $$;

-- ─── 5. Re-enable RLS and create CLEAN, NON-RECURSIVE policies ──────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY profiles_select ON public.profiles
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY profiles_insert ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY profiles_update ON public.profiles
  FOR UPDATE TO authenticated USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY sub_own_select ON public.subscriptions
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY sub_own_update ON public.subscriptions
  FOR UPDATE TO authenticated USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
CREATE POLICY sub_own_insert ON public.subscriptions
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

ALTER TABLE public.homes ENABLE ROW LEVEL SECURITY;
CREATE POLICY homes_owner ON public.homes
  FOR ALL TO authenticated
  USING (owner_user_id = auth.uid())
  WITH CHECK (owner_user_id = auth.uid());

ALTER TABLE public.home_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY home_members_self ON public.home_members
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ─── 6. Check / fix triggers on profiles that might recurse ─────────────────
CREATE OR REPLACE FUNCTION public.profiles_lock_identity()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF OLD.cpf IS NOT NULL AND OLD.cpf <> '' THEN
    IF NEW.cpf IS DISTINCT FROM OLD.cpf THEN
      RAISE EXCEPTION 'CPF já registrado não pode ser alterado'
        USING ERRCODE = 'check_violation';
    END IF;
  ELSE
    IF NEW.cpf IS NOT NULL AND NEW.cpf <> '' THEN
      NEW.cpf_locked_at := now();
    END IF;
  END IF;
  RETURN NEW;
END; $$;

-- ─── 7. item_history.action → text (so inserts work) ────────────────────────
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='item_history' AND column_name='action'
      AND udt_name='action_type'
  ) THEN
    ALTER TABLE public.item_history
      ALTER COLUMN action TYPE text USING action::text;
  END IF;
END $$;

-- ─── 8. user_achievements ───────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE IF NOT EXISTS public.user_achievements (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  shopping_completions integer NOT NULL DEFAULT 0,
  share_count          integer NOT NULL DEFAULT 0,
  meal_plan_count      integer NOT NULL DEFAULT 0,
  garbage_setups       integer NOT NULL DEFAULT 0,
  garbage_done         integer NOT NULL DEFAULT 0,
  unlocked             jsonb   NOT NULL DEFAULT '{}'::jsonb,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT user_achievements_user_id_key UNIQUE (user_id)
);

DROP TRIGGER IF EXISTS trg_user_achievements_updated_at ON public.user_achievements;
CREATE TRIGGER trg_user_achievements_updated_at
  BEFORE UPDATE ON public.user_achievements
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS user_achievements_select_own ON public.user_achievements;
CREATE POLICY user_achievements_select_own ON public.user_achievements
  FOR SELECT TO authenticated USING (user_id = auth.uid());
DROP POLICY IF EXISTS user_achievements_insert_own ON public.user_achievements;
CREATE POLICY user_achievements_insert_own ON public.user_achievements
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS user_achievements_update_own ON public.user_achievements;
CREATE POLICY user_achievements_update_own ON public.user_achievements
  FOR UPDATE TO authenticated USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ─── 9. complete_user_onboarding (defensive — does NOT touch unknown columns) ─
CREATE OR REPLACE FUNCTION public.complete_user_onboarding(
  p_home_name           TEXT,
  p_user_name           TEXT,
  p_user_cpf            TEXT DEFAULT NULL,
  p_home_type           TEXT DEFAULT 'apartment',
  p_residents           INT  DEFAULT 1,
  p_fridge_type         TEXT DEFAULT 'regular',
  p_fridge_brand        TEXT DEFAULT NULL,
  p_cooling_level       INT  DEFAULT 3,
  p_theme_preference    TEXT DEFAULT 'system',
  p_language_preference TEXT DEFAULT 'pt-BR'
)
RETURNS UUID AS $$
DECLARE
  v_user_id          UUID := auth.uid();
  v_home_id          UUID;
  v_existing_home_id UUID;
BEGIN
  SELECT home_id INTO v_existing_home_id
  FROM public.home_members WHERE user_id = v_user_id LIMIT 1;

  IF v_existing_home_id IS NOT NULL THEN
    v_home_id := v_existing_home_id;
    UPDATE public.homes
    SET name=p_home_name, home_type=p_home_type, residents=p_residents
    WHERE id = v_home_id;
  ELSE
    INSERT INTO public.homes (name, owner_user_id, home_type, residents)
    VALUES (p_home_name, v_user_id, p_home_type, p_residents)
    RETURNING id INTO v_home_id;

    INSERT INTO public.home_members (home_id, user_id, role)
    VALUES (v_home_id, v_user_id, 'owner')
    ON CONFLICT (home_id, user_id) DO NOTHING;
  END IF;

  BEGIN
    INSERT INTO public.home_settings (home_id, fridge_type, fridge_brand, cooling_level)
    VALUES (v_home_id, p_fridge_type, p_fridge_brand, p_cooling_level)
    ON CONFLICT (home_id) DO UPDATE
      SET fridge_type=EXCLUDED.fridge_type,
          fridge_brand=EXCLUDED.fridge_brand,
          cooling_level=EXCLUDED.cooling_level;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;

  BEGIN
    INSERT INTO public.notification_preferences (user_id)
    VALUES (v_user_id) ON CONFLICT (user_id) DO NOTHING;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;

  BEGIN
    INSERT INTO public.subscriptions (user_id, plan, plan_tier, is_active, trial_started_at, trial_ends_at)
    VALUES (v_user_id, 'free', 'free', false, now(), now() + interval '7 days')
    ON CONFLICT (user_id) DO NOTHING;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;

  UPDATE public.profiles
  SET name = p_user_name,
      cpf  = CASE WHEN p_user_cpf IS NOT NULL AND p_user_cpf <> ''
                   AND (cpf IS NULL OR cpf='') THEN p_user_cpf ELSE cpf END,
      onboarding_completed = true
  WHERE user_id = v_user_id;

  RETURN v_home_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.complete_user_onboarding(TEXT,TEXT,TEXT,TEXT,INT,TEXT,TEXT,INT,TEXT,TEXT)
  TO authenticated;

-- ─── 10. SECURITY DEFINER for sub-account subscription access ───────────────
CREATE OR REPLACE FUNCTION public.get_effective_user_id()
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_group_id uuid;
  v_master_uid uuid;
BEGIN
  SELECT sam.group_id INTO v_group_id
  FROM public.sub_account_members sam
  WHERE sam.user_id = v_uid AND sam.is_active = true LIMIT 1;
  IF v_group_id IS NOT NULL THEN
    SELECT sag.master_user_id INTO v_master_uid
    FROM public.sub_account_groups sag WHERE sag.id = v_group_id;
  END IF;
  RETURN COALESCE(v_master_uid, v_uid);
END; $$;
GRANT EXECUTE ON FUNCTION public.get_effective_user_id() TO authenticated;

CREATE OR REPLACE FUNCTION public.get_effective_subscription()
RETURNS SETOF public.subscriptions LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY SELECT s.* FROM public.subscriptions s
    WHERE s.user_id = public.get_effective_user_id();
END; $$;
GRANT EXECUTE ON FUNCTION public.get_effective_subscription() TO authenticated;

SELECT 'OK — RLS fixed.' AS status;
