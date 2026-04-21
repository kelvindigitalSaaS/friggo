-- =============================================================================
-- KAZA — NUCLEAR RESET (LIMPEZA TOTAL DE DADOS)
-- =============================================================================
-- Este script apaga TODOS os dados de itens, estoques, histórico e vínculos
-- de moradia do usuário logado, além de limpar o CPF e o status de onboarding.
--
-- UTILIZAÇÃO: 
-- 1. Rode este script no Editor SQL do Supabase.
-- 2. Recarregue a aplicação Kaza.
-- =============================================================================

DO $$ 
DECLARE 
    v_user_id UUID := auth.uid(); -- Pega o ID do usuário que está rodando o script
    v_home_id UUID;
BEGIN
    -- Se o script for rodado no Editor SQL sem contexto de auth, 
    -- o usuário pode substituir o 'auth.uid()' pelo ID real dele se desejar resetar manualmente.
    
    IF v_user_id IS NULL THEN
        RAISE NOTICE 'Nenhum usuário logado detectado. Para rodar manualmente, substitua auth.uid() pelo seu User ID.';
        RETURN;
    END IF;

    RAISE NOTICE 'Iniciando Nuclear Reset para o usuário: %', v_user_id;

    -- 1. Identificar a casa principal do usuário (Owner) antes de desvincular
    SELECT home_id INTO v_home_id 
    FROM public.home_members 
    WHERE user_id = v_user_id AND role = 'owner'
    LIMIT 1;

    -- 2. Limpar Perfil (CPF e Onboarding)
    UPDATE public.profiles 
    SET cpf = NULL,
        onboarding_completed = FALSE,
        setup_step = 'welcome',
        last_onboarding_attempt = NULL
    WHERE user_id = v_user_id;

    -- 3. Se o usuário for dono de uma casa, limpamos os dados dessa casa
    IF v_home_id IS NOT NULL THEN
        DELETE FROM public.kaza_items WHERE home_id = v_home_id;
        DELETE FROM public.shopping_list WHERE home_id = v_home_id;
        DELETE FROM public.consumable_inventory WHERE home_id = v_home_id;
        DELETE FROM public.item_history WHERE home_id = v_home_id;
        DELETE FROM public.home_settings WHERE home_id = v_home_id;
        DELETE FROM public.meal_plans WHERE home_id = v_home_id;
        
        -- Opcional: Se quiser apagar a casa inteira (cuidado se houver outros membros)
        -- DELETE FROM public.home_members WHERE home_id = v_home_id;
        -- DELETE FROM public.homes WHERE id = v_home_id AND owner_user_id = v_user_id;
    END IF;

    -- 4. Remover qualquer vínculo de membro (inclusive de casas de terceiros)
    DELETE FROM public.home_members WHERE user_id = v_user_id;
    
    -- 5. Limpar preferências de notificação
    DELETE FROM public.notification_preferences WHERE user_id = v_user_id;

    RAISE NOTICE 'Nuclear Reset concluído com sucesso!';
END $$;
