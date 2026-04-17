-- Public RPC to read invite info without authentication
-- Allows invite page to fetch invite details before user logs in

CREATE OR REPLACE FUNCTION public.get_invite_info(invite_token text)
RETURNS TABLE(
  invited_email text,
  master_name text,
  group_id uuid,
  status text
) AS $$
  SELECT
    invited_email,
    master_name,
    group_id,
    status
  FROM sub_account_invites
  WHERE token = invite_token
    AND expires_at > now()
  LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Allow anyone to call this function
GRANT EXECUTE ON FUNCTION public.get_invite_info(text) TO anon, authenticated;
