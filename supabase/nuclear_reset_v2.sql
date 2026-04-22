-- =============================================================================
-- KAZA — NUCLEAR RESET V2.6.9 (SESSION SAFE & HYPER RESILIENT)
-- =============================================================================
-- Script ajustado para zerar o Onboarding SEM deslogar o usuário.
-- =============================================================================

DO $$ 
DECLARE 
    v_email TEXT := 'seu-email@aqui.com'; -- <--- TROQUE PELO SEU EMAIL OU DEIXE PARA PEGAR O ÚLTIMO
    v_user_id UUID;
    v_home_id UUID;
BEGIN
    -- 1. Buscar o ID do usuário (Auth)
    IF v_email = 'seu-email@aqui.com' THEN
        SELECT id, email INTO v_user_id, v_email FROM auth.users ORDER BY created_at DESC LIMIT 1;
        RAISE NOTICE 'Auto-detectando o usuário mais recente: %', v_email;
    ELSE
        SELECT id INTO v_user_id FROM auth.users WHERE email = v_email;
    END IF;

    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Usuário com email % não encontrado no Auth.', v_email;
    END IF;

    RAISE NOTICE 'Iniciando Nuclear Reset V2.6.9 (Session Safe) para: %', v_email;

    -- 2. Identificar a casa vinculada via MEMBERSHIP (não deleta o auth.user!)
    SELECT home_id INTO v_home_id 
    FROM public.home_members 
    WHERE user_id = v_user_id 
    LIMIT 1;

    -- 3. Limpeza Profunda de Dados de Negócio
    IF v_home_id IS NOT NULL THEN
        -- Deletar itens e estoque
        DELETE FROM public.items WHERE home_id = v_home_id;
        DELETE FROM public.shopping_items WHERE home_id = v_home_id;
        DELETE FROM public.consumables WHERE home_id = v_home_id;
        DELETE FROM public.item_history WHERE home_id = v_home_id;
        DELETE FROM public.home_settings WHERE home_id = v_home_id;
        DELETE FROM public.meal_plans WHERE home_id = v_home_id;
        DELETE FROM public.meal_plan_items WHERE home_id = v_home_id;
    END IF;

    -- 4. Limpar Vínculos de Grupo e Convites (SaaS)
    DELETE FROM public.sub_account_invites WHERE group_id IN (SELECT id FROM public.sub_account_groups WHERE master_user_id = v_user_id);
    DELETE FROM public.sub_account_members WHERE user_id = v_user_id;
    DELETE FROM public.sub_account_groups WHERE master_user_id = v_user_id;
    
    -- 5. Remover Vínculo com a Casa e Assinatura (SEM DELETAR O PERFIL)
    DELETE FROM public.home_members WHERE user_id = v_user_id;
    DELETE FROM public.subscriptions WHERE user_id = v_user_id;
    
    -- Deletar a casa física se não houver mais ninguém
    IF v_home_id IS NOT NULL THEN
        DELETE FROM public.homes WHERE id = v_home_id;
    END IF;

    -- 6. RESET DO PERFIL (MANTÉM O USUÁRIO LOGADO)
    -- Importante: Não deletamos a linha em 'profiles', apenas limpamos os dados de Onboarding.
    UPDATE public.profiles 
    SET 
        cpf = NULL,
        onboarding_completed = FALSE,
        last_onboarding_attempt = NULL,
        theme_preference = 'system',
        language_preference = 'pt-BR'
    WHERE user_id = v_user_id;

    RAISE NOTICE 'RESET V2.6.9 CONCLUÍDO! Usuário % (%) pronto para novo onboarding sem logout.', v_email, v_user_id;
END $$;
