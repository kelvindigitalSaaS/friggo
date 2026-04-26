-- =============================================================================
-- KAZA — Migration: Fix profiles RLS + name lock + achievements table
-- =============================================================================
-- Problems fixed:
--   1. Infinite recursion (42P17): multiple overlapping policies on profiles.
--   2. "Nome já registrado não pode ser alterado": name was incorrectly locked
--      like CPF. Name must be editable; only CPF should be immutable.
--   3. Wizard not loading saved data: consequence of #1 — profiles query
--      silently failed, so the wizard always started empty.
--   4. Creates user_achievements table for the gamification system.
-- =============================================================================

BEGIN;

-- ─────────────────────────────────────────────────────────────────────────────
-- 0. Ensure helpers exist
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. PROFILES RLS — clean slate
--    Drop every known policy name accumulated across migrations, then create
--    exactly three policies (SELECT / INSERT / UPDATE) with no table
--    cross-references to prevent any recursion.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS profile_owner_only           ON public.profiles;
DROP POLICY IF EXISTS profiles_own                 ON public.profiles;
DROP POLICY IF EXISTS profiles_rw                  ON public.profiles;
DROP POLICY IF EXISTS profiles_select              ON public.profiles;
DROP POLICY IF EXISTS profiles_insert              ON public.profiles;
DROP POLICY IF EXISTS profiles_update              ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_own"        ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own"        ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own"        ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for all" ON public.profiles;
DROP POLICY IF EXISTS "Public access"              ON public.profiles;
DROP POLICY IF EXISTS anon_read                    ON public.profiles;

CREATE POLICY profiles_select ON public.profiles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY profiles_insert ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY profiles_update ON public.profiles
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. NAME LOCK — remove name restriction, keep only CPF lock
--    Name is a user-editable field. CPF is the immutable identity field.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.profiles_lock_identity()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  -- CPF: immutable once set
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

  -- Name: freely editable — no longer locked
  -- (name_locked_at kept for backwards compatibility but no longer enforced)

  RETURN NEW;
END;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. complete_user_onboarding — allow name updates, safe CPF handling
-- ─────────────────────────────────────────────────────────────────────────────

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
  -- 1. Find or create home
  SELECT home_id INTO v_existing_home_id
  FROM public.home_members
  WHERE user_id = v_user_id
  LIMIT 1;

  IF v_existing_home_id IS NOT NULL THEN
    v_home_id := v_existing_home_id;
    UPDATE public.homes
    SET name      = p_home_name,
        home_type = p_home_type,
        residents = p_residents
    WHERE id = v_home_id;
  ELSE
    INSERT INTO public.homes (name, owner_user_id, home_type, residents)
    VALUES (p_home_name, v_user_id, p_home_type, p_residents)
    RETURNING id INTO v_home_id;

    INSERT INTO public.home_members (home_id, user_id, role)
    VALUES (v_home_id, v_user_id, 'owner')
    ON CONFLICT (home_id, user_id) DO NOTHING;
  END IF;

  -- 2. Home settings
  INSERT INTO public.home_settings (home_id, fridge_type, fridge_brand, cooling_level)
  VALUES (v_home_id, p_fridge_type, p_fridge_brand, p_cooling_level)
  ON CONFLICT (home_id) DO UPDATE
    SET fridge_type   = EXCLUDED.fridge_type,
        fridge_brand  = EXCLUDED.fridge_brand,
        cooling_level = EXCLUDED.cooling_level;

  -- 3. Notification preferences
  INSERT INTO public.notification_preferences (user_id)
  VALUES (v_user_id)
  ON CONFLICT (user_id) DO NOTHING;

  -- 4. Update profile
  --    - Name is now always editable
  --    - CPF only written if not yet set (trigger blocks overwrite anyway)
  UPDATE public.profiles
  SET name                    = p_user_name,
      cpf                     = CASE
                                  WHEN p_user_cpf IS NOT NULL
                                   AND p_user_cpf <> ''
                                   AND (cpf IS NULL OR cpf = '')
                                  THEN p_user_cpf
                                  ELSE cpf
                                END,
      theme_preference        = p_theme_preference,
      language_preference     = p_language_preference,
      onboarding_completed    = true,
      last_onboarding_attempt = NULL
  WHERE user_id = v_user_id;

  RETURN v_home_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.complete_user_onboarding(TEXT,TEXT,TEXT,TEXT,INT,TEXT,TEXT,INT,TEXT,TEXT)
  TO authenticated;

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. ACHIEVEMENTS TABLE
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_achievements (
  id                   uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  shopping_completions integer     NOT NULL DEFAULT 0,
  share_count          integer     NOT NULL DEFAULT 0,
  meal_plan_count      integer     NOT NULL DEFAULT 0,
  garbage_setups       integer     NOT NULL DEFAULT 0,
  garbage_done         integer     NOT NULL DEFAULT 0,
  unlocked             jsonb       NOT NULL DEFAULT '{}'::jsonb,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT user_achievements_user_id_key UNIQUE (user_id)
);

DROP TRIGGER IF EXISTS trg_user_achievements_updated_at ON public.user_achievements;
CREATE TRIGGER trg_user_achievements_updated_at
  BEFORE UPDATE ON public.user_achievements
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "user_achievements_select_own" ON public.user_achievements;
CREATE POLICY "user_achievements_select_own"
  ON public.user_achievements FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "user_achievements_insert_own" ON public.user_achievements;
CREATE POLICY "user_achievements_insert_own"
  ON public.user_achievements FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "user_achievements_update_own" ON public.user_achievements;
CREATE POLICY "user_achievements_update_own"
  ON public.user_achievements FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

COMMIT;
