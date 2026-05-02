-- Fix: remove_member_and_convert_to_master was not inserting home_members row
-- causing the ex-member to have no home_id on reload → forced to reconfigure app.
-- Also removes them from master's home_members to prevent cross-home data access.

CREATE OR REPLACE FUNCTION remove_member_and_convert_to_master(
  p_member_user_id uuid,
  p_group_id uuid
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_master_user_id uuid;
  v_master_home_id uuid;
  v_new_home_id    uuid;
BEGIN
  -- Get master user and master's home_id
  SELECT sag.master_user_id, hm.home_id
  INTO v_master_user_id, v_master_home_id
  FROM sub_account_groups sag
  LEFT JOIN home_members hm
    ON hm.user_id = sag.master_user_id AND hm.role = 'owner'
  WHERE sag.id = p_group_id
  LIMIT 1;

  IF v_master_user_id IS NULL THEN
    RETURN json_build_object('error', 'Group not found');
  END IF;

  -- Authorization: only master can remove members
  IF auth.uid() != v_master_user_id THEN
    RETURN json_build_object('error', 'Not authorized');
  END IF;

  -- 1. Remove from sub_account_members
  DELETE FROM sub_account_members
  WHERE user_id = p_member_user_id AND group_id = p_group_id;

  -- 2. Remove from master's home_members (no longer part of that home)
  DELETE FROM home_members
  WHERE user_id = p_member_user_id AND home_id = v_master_home_id;

  -- 3. Create new independent home for the former member
  INSERT INTO homes (user_id, name, created_at)
  VALUES (
    p_member_user_id,
    (SELECT COALESCE(name, 'Meu Lar') FROM profiles WHERE user_id = p_member_user_id LIMIT 1),
    now()
  )
  RETURNING id INTO v_new_home_id;

  -- 4. Add them as OWNER of their new home (fixes the reload/reconfigure bug)
  INSERT INTO home_members (home_id, user_id, role, joined_at)
  VALUES (v_new_home_id, p_member_user_id, 'owner', now())
  ON CONFLICT (home_id, user_id) DO NOTHING;

  -- 5. Create independent subscription (free plan, no group link)
  INSERT INTO subscriptions (user_id, plan_tier, plan_label, plan, is_active, created_at)
  VALUES (
    p_member_user_id,
    'individualPRO',
    'IndividualPRO',
    'free',
    false,
    now()
  )
  ON CONFLICT (user_id) DO UPDATE
  SET
    plan_tier      = 'individualPRO',
    plan_label     = 'IndividualPRO',
    plan           = 'free',
    is_active      = false,
    group_id       = NULL,
    master_user_id = NULL;

  -- 6. Clear achievements
  DELETE FROM user_achievements WHERE user_id = p_member_user_id;

  INSERT INTO user_achievements (user_id, unlocked)
  VALUES (p_member_user_id, '{}'::jsonb)
  ON CONFLICT (user_id) DO UPDATE
  SET unlocked = '{}'::jsonb;

  -- 7. Timestamp group update
  UPDATE sub_account_groups
  SET updated_at = now()
  WHERE id = p_group_id;

  RETURN json_build_object(
    'success',      true,
    'new_home_id',  v_new_home_id,
    'message',      'Member converted to independent master account'
  );
END;
$$;

GRANT EXECUTE ON FUNCTION remove_member_and_convert_to_master(uuid, uuid) TO authenticated;
