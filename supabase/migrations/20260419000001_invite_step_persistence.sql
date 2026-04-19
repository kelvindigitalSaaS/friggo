-- ─────────────────────────────────────────────────────────────────────────────
-- Invite Step Persistence
-- Allows the invite onboarding to save progress after each step to the DB so
-- the user can resume from where they left off even after closing the browser.
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Add step tracking columns to sub_account_invites
ALTER TABLE sub_account_invites
  ADD COLUMN IF NOT EXISTS step_data   jsonb         NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS current_step int           NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS updated_at  timestamptz   NOT NULL DEFAULT now();

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. save_invite_step
--    Merges partial step data into the invite row. Accessible by anon so the
--    user can save progress BEFORE they have a Supabase session (pre-signUp).
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.save_invite_step(
  p_token     text,
  p_step_data jsonb,
  p_step      int
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_merged jsonb;
BEGIN
  UPDATE sub_account_invites
  SET
    step_data    = step_data    || p_step_data,
    current_step = GREATEST(current_step, p_step),
    updated_at   = now()
  WHERE token      = p_token
    AND status     = 'pending'
    AND expires_at > now()
  RETURNING step_data INTO v_merged;

  IF v_merged IS NULL THEN
    RAISE EXCEPTION 'Convite inválido ou expirado';
  END IF;

  RETURN v_merged;
END;
$$;

GRANT EXECUTE ON FUNCTION public.save_invite_step(text, jsonb, int)
  TO anon, authenticated;

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. get_invite_progress
--    Returns the current step and saved step_data for an invite token.
--    Accessible by anon so progress can be loaded before the user logs in.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_invite_progress(p_token text)
RETURNS TABLE(current_step int, step_data jsonb)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT current_step, step_data
  FROM   sub_account_invites
  WHERE  token      = p_token
    AND  status     = 'pending'
    AND  expires_at > now()
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_invite_progress(text)
  TO anon, authenticated;
