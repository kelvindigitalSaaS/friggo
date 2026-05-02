-- =============================================================================
-- KAZA — Fix accept_invite: idempotência + compatibilidade com service role
-- Data: 2026-05-02
--
-- Problemas:
-- 1. accept_invite não era idempotente: se o convite já estava 'accepted'
--    (por retry ou duplo clique), a função lançava exceção "Invalid or expired".
-- 2. A edge function usava service role client para chamar a RPC, fazendo
--    auth.uid() retornar NULL e o INSERT em sub_account_members falhar.
--    Solução: accept_invite agora aceita p_user_id uuid opcional; quando
--    fornecido (chamado pelo service role), usa esse valor em vez de auth.uid().
-- =============================================================================

BEGIN;

DROP FUNCTION IF EXISTS accept_invite(text);
DROP FUNCTION IF EXISTS public.accept_invite(text);

CREATE OR REPLACE FUNCTION public.accept_invite(
  invite_token text,
  p_user_id    uuid DEFAULT NULL
)
RETURNS TABLE(r_group_id uuid, r_master_name text)
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_invite         sub_account_invites;
  v_master_home_id uuid;
  v_caller_id      uuid;
BEGIN
  -- Determinar quem é o usuário: parâmetro explícito (service role) ou auth.uid()
  v_caller_id := COALESCE(p_user_id, auth.uid());

  IF v_caller_id IS NULL THEN
    RAISE EXCEPTION 'Não autenticado: forneça p_user_id ou use um JWT válido';
  END IF;

  -- Buscar convite (aceita 'pending' E 'accepted' para idempotência)
  SELECT * INTO v_invite
  FROM sub_account_invites
  WHERE token      = invite_token
    AND expires_at > now();

  IF v_invite IS NULL THEN
    RAISE EXCEPTION 'Convite inválido ou expirado';
  END IF;

  -- Idempotência: convite já aceito → garantir memberships e retornar sucesso
  -- (não lança exceção, permite retry seguro)

  -- 1. Criar/atualizar membership no grupo
  INSERT INTO sub_account_members (group_id, user_id, role, is_active, joined_at)
  VALUES (v_invite.group_id, v_caller_id, 'member', true, now())
  ON CONFLICT (group_id, user_id) DO UPDATE
    SET is_active = true,
        joined_at = now();

  -- 2. Encontrar a casa principal do master
  SELECT hm.home_id INTO v_master_home_id
  FROM sub_account_groups sag
  JOIN home_members hm
    ON hm.user_id = sag.master_user_id
   AND hm.role    = 'owner'
  WHERE sag.id = v_invite.group_id
  LIMIT 1;

  -- 3. Adicionar membro à casa do master
  IF v_master_home_id IS NOT NULL THEN
    INSERT INTO home_members (home_id, user_id, role, joined_at)
    VALUES (v_master_home_id, v_caller_id, 'member', now())
    ON CONFLICT (home_id, user_id) DO NOTHING;
  END IF;

  -- 4. Marcar convite como aceito (idempotente com DO NOTHING se já aceito)
  UPDATE sub_account_invites
  SET status = 'accepted'
  WHERE id = v_invite.id
    AND status = 'pending';

  RETURN QUERY SELECT v_invite.group_id, v_invite.master_name;
END;
$$;

GRANT EXECUTE ON FUNCTION public.accept_invite(text, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.accept_invite(text, uuid) TO service_role;

DO $$
BEGIN
  RAISE NOTICE '=================================================';
  RAISE NOTICE '[KAZA] Fix 20260502000002 aplicado com sucesso.';
  RAISE NOTICE '  ✅ accept_invite: idempotente (retry seguro)';
  RAISE NOTICE '  ✅ accept_invite: aceita p_user_id para service role';
  RAISE NOTICE '  ✅ accept_invite: ambiguidade de nomes resolvida (r_*)';
  RAISE NOTICE '=================================================';
END $$;

COMMIT;
