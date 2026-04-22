-- =============================================================================
-- KAZA — FORÇAR PLANO MULTIPRO (TESTES)
-- =============================================================================
-- Este script força o status de "MultiPRO" para um usuário, permitindo o envio
-- de convites de membros sem necessidade de assinatura real.
-- =============================================================================

DO $$ 
DECLARE 
    v_email TEXT := 'seu-email@aqui.com'; -- <--- COLOQUE SEU EMAIL AQUI
    v_user_id UUID;
    v_group_id UUID;
BEGIN
    -- 1. Buscar o ID do usuário
    SELECT id INTO v_user_id FROM auth.users WHERE email = v_email;

    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Usuário com email % não encontrado.', v_email;
    END IF;

    -- 2. Garantir que o usuário tenha uma assinatura ativa
    INSERT INTO public.subscriptions (user_id, plan, plan_tier, is_active, current_period_end)
    VALUES (v_user_id, 'multiPRO', 'multiPRO', TRUE, now() + interval '1 year')
    ON CONFLICT (user_id) DO UPDATE 
    SET plan = 'multiPRO', 
        plan_tier = 'multiPRO', 
        is_active = TRUE, 
        current_period_end = now() + interval '1 year';

    -- 3. Criar ou Vincular um Grupo de Subcontas
    SELECT id INTO v_group_id FROM public.sub_account_groups WHERE master_user_id = v_user_id LIMIT 1;

    IF v_group_id IS NULL THEN
        INSERT INTO public.sub_account_groups (master_user_id, plan_tier, max_members)
        VALUES (v_user_id, 'multiPRO', 3)
        RETURNING id INTO v_group_id;
    END IF;

    -- 4. Vincular o grupo à assinatura
    UPDATE public.subscriptions SET group_id = v_group_id WHERE user_id = v_user_id;

    RAISE NOTICE 'CONTA % AGORA É KAZA MULTIPRO (TESTE)!', v_email;
END $$;
