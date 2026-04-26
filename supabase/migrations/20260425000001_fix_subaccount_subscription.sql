-- =============================================================================
-- KAZA — Fix: sub-account subscription access
-- Sub-accounts query master's subscription but RLS blocks it (auth.uid() ≠ master_user_id).
-- This function returns the effective user_id to query (master if sub-account, self otherwise).
-- =============================================================================

CREATE OR REPLACE FUNCTION public.get_effective_user_id()
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_uid        uuid := auth.uid();
  v_group_id   uuid;
  v_master_uid uuid;
BEGIN
  SELECT sam.group_id INTO v_group_id
  FROM public.sub_account_members sam
  WHERE sam.user_id = v_uid AND sam.is_active = true
  LIMIT 1;

  IF v_group_id IS NOT NULL THEN
    SELECT sag.master_user_id INTO v_master_uid
    FROM public.sub_account_groups sag
    WHERE sag.id = v_group_id;
  END IF;

  RETURN COALESCE(v_master_uid, v_uid);
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_effective_user_id() TO authenticated;

-- Also create a SECURITY DEFINER view so sub-accounts can read master's subscription
CREATE OR REPLACE FUNCTION public.get_effective_subscription()
RETURNS SETOF public.subscriptions LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT s.*
  FROM public.subscriptions s
  WHERE s.user_id = public.get_effective_user_id();
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_effective_subscription() TO authenticated;
