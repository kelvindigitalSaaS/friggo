-- =============================================================================
-- KAZA — Achievements System
-- =============================================================================

-- Ensure set_updated_at helper exists (safe to redefine)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Table
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

-- Trigger (drop first to avoid "already exists" error)
DROP TRIGGER IF EXISTS trg_user_achievements_updated_at ON public.user_achievements;
CREATE TRIGGER trg_user_achievements_updated_at
  BEFORE UPDATE ON public.user_achievements
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
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
