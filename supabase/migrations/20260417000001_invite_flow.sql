-- Sub-account invites flow for multiPRO plan
-- Allows master to invite people by email, with 7-day token expiry

CREATE TABLE sub_account_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES sub_account_groups(id) ON DELETE CASCADE,
  master_user_id uuid NOT NULL,
  master_name text NOT NULL,
  invited_email text NOT NULL,
  token text NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired')),
  expires_at timestamptz NOT NULL DEFAULT now() + interval '7 days',
  created_at timestamptz DEFAULT now(),
  UNIQUE(group_id, invited_email)
);

ALTER TABLE sub_account_invites ENABLE ROW LEVEL SECURITY;

-- Master can manage all invites for their group
CREATE POLICY "master_manage_invites" ON sub_account_invites
  FOR ALL USING (master_user_id = auth.uid());

-- RPC to accept invite by token
CREATE OR REPLACE FUNCTION accept_invite(invite_token text)
RETURNS TABLE(group_id uuid, master_name text) AS $$
DECLARE
  v_invite sub_account_invites;
  v_group_id uuid;
  v_master_name text;
BEGIN
  -- Find invite
  SELECT * INTO v_invite FROM sub_account_invites
  WHERE token = invite_token
    AND status = 'pending'
    AND expires_at > now();

  IF v_invite IS NULL THEN
    RAISE EXCEPTION 'Invalid or expired invite token';
  END IF;

  -- Create or get membership
  INSERT INTO sub_account_members (
    group_id,
    user_id,
    role,
    is_active,
    joined_at
  ) VALUES (
    v_invite.group_id,
    auth.uid(),
    'member',
    true,
    now()
  )
  ON CONFLICT (group_id, user_id) DO UPDATE
    SET is_active = true, joined_at = now();

  -- Update invite status
  UPDATE sub_account_invites
  SET status = 'accepted'
  WHERE id = v_invite.id;

  RETURN QUERY SELECT v_invite.group_id, v_invite.master_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
