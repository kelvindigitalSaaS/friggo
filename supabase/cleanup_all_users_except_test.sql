-- cleanup_all_users_except_test.sql
-- Apaga TODOS os dados de usuários e CPF EXCETO o usuário teste.
-- Execute no: Supabase > SQL Editor
-- IMPORTANTE: Este script é irreversível! Faça backup antes de executar.

DO $$
DECLARE
    test_email TEXT := 'test@friggo.com.br'; -- Email do usuário que NÃO será apagado
    test_user_id UUID;
    deleted_count INT := 0;
    affected_users INT;
BEGIN
    -- 1. Encontrar o UUID do usuário teste
    SELECT id INTO test_user_id
    FROM auth.users
    WHERE email = test_email;

    IF test_user_id IS NULL THEN
        RAISE EXCEPTION 'ERRO: Usuário teste (%) não encontrado! Operação cancelada por segurança.', test_email;
    END IF;

    RAISE NOTICE '🔒 Protegendo usuário teste: % (ID: %)', test_email, test_user_id;

    -- 2. Contar quantos usuários serão afetados
    SELECT COUNT(*) INTO affected_users
    FROM auth.users
    WHERE id != test_user_id;

    RAISE NOTICE '⚠️  Aviso: Vão ser deletados % usuários e seus dados.', affected_users;

    -- 3. Deletar dados em cascata para TODOS os usuários exceto o teste

    -- 3.1. Deletar itens
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='items') THEN
        DELETE FROM public.items WHERE user_id != test_user_id;
        GET DIAGNOSTICS deleted_count = ROW_COUNT;
        RAISE NOTICE '✓ items: % registros deletados', deleted_count;
    END IF;

    -- 3.2. Deletar lista de compras
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='shopping_items') THEN
        DELETE FROM public.shopping_items WHERE user_id != test_user_id;
        GET DIAGNOSTICS deleted_count = ROW_COUNT;
        RAISE NOTICE '✓ shopping_items: % registros deletados', deleted_count;
    END IF;

    -- 3.3. Deletar consumíveis
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='consumables') THEN
        DELETE FROM public.consumables WHERE user_id != test_user_id;
        GET DIAGNOSTICS deleted_count = ROW_COUNT;
        RAISE NOTICE '✓ consumables: % registros deletados', deleted_count;
    END IF;

    -- 3.4. Deletar receitas salvas
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='saved_recipes') THEN
        DELETE FROM public.saved_recipes WHERE user_id != test_user_id;
        GET DIAGNOSTICS deleted_count = ROW_COUNT;
        RAISE NOTICE '✓ saved_recipes: % registros deletados', deleted_count;
    END IF;

    -- 3.5. Deletar receitas favoritas
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='favorite_recipes') THEN
        DELETE FROM public.favorite_recipes WHERE user_id != test_user_id;
        GET DIAGNOSTICS deleted_count = ROW_COUNT;
        RAISE NOTICE '✓ favorite_recipes: % registros deletados', deleted_count;
    END IF;

    -- 3.6. Deletar plano de refeições
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='meal_plan') THEN
        DELETE FROM public.meal_plan WHERE user_id != test_user_id;
        GET DIAGNOSTICS deleted_count = ROW_COUNT;
        RAISE NOTICE '✓ meal_plan: % registros deletados', deleted_count;
    END IF;

    -- 3.7. Deletar histórico de pagamentos
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='payment_history') THEN
        DELETE FROM public.payment_history WHERE user_id != test_user_id;
        GET DIAGNOSTICS deleted_count = ROW_COUNT;
        RAISE NOTICE '✓ payment_history: % registros deletados', deleted_count;
    END IF;

    -- 3.8. Deletar assinatura
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='subscriptions') THEN
        DELETE FROM public.subscriptions WHERE user_id != test_user_id;
        GET DIAGNOSTICS deleted_count = ROW_COUNT;
        RAISE NOTICE '✓ subscriptions: % registros deletados', deleted_count;
    END IF;

    -- 3.9. Deletar dados sensíveis (CPF, etc.)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='profile_sensitive') THEN
        DELETE FROM public.profile_sensitive WHERE user_id != test_user_id;
        GET DIAGNOSTICS deleted_count = ROW_COUNT;
        RAISE NOTICE '✓ profile_sensitive: % registros deletados', deleted_count;
    END IF;

    -- 3.10. Deletar configurações de perfil
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='profile_settings') THEN
        DELETE FROM public.profile_settings WHERE user_id != test_user_id;
        GET DIAGNOSTICS deleted_count = ROW_COUNT;
        RAISE NOTICE '✓ profile_settings: % registros deletados', deleted_count;
    END IF;

    -- 3.11. Deletar notificações
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='notifications') THEN
        DELETE FROM public.notifications WHERE user_id != test_user_id;
        GET DIAGNOSTICS deleted_count = ROW_COUNT;
        RAISE NOTICE '✓ notifications: % registros deletados', deleted_count;
    END IF;

    -- 3.12. Deletar histórico de compras
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='shopping_history') THEN
        DELETE FROM public.shopping_history WHERE user_id != test_user_id;
        GET DIAGNOSTICS deleted_count = ROW_COUNT;
        RAISE NOTICE '✓ shopping_history: % registros deletados', deleted_count;
    END IF;

    -- 3.13. Limpar CPFs da tabela profiles para TODOS os usuários
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema='public' AND table_name='profiles' AND column_name='cpf'
    ) THEN
        -- Desabilitar triggers que bloqueiam atualização de CPF
        DROP TRIGGER IF EXISTS prevent_profiles_cpf_update ON public.profiles;

        -- Limpar CPFs de todos os usuários exceto o teste
        UPDATE public.profiles SET cpf = NULL WHERE user_id != test_user_id AND cpf IS NOT NULL;
        GET DIAGNOSTICS deleted_count = ROW_COUNT;
        RAISE NOTICE '✓ CPFs removidos de profiles: % registros', deleted_count;

        -- Restaurar trigger se a função existir
        IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'prevent_cpf_update' AND pronamespace = 'public'::regnamespace) THEN
            CREATE TRIGGER prevent_profiles_cpf_update
                BEFORE UPDATE ON public.profiles
                FOR EACH ROW WHEN (OLD.cpf IS NOT NULL AND NEW.cpf IS DISTINCT FROM OLD.cpf)
                EXECUTE FUNCTION public.prevent_cpf_update();
        END IF;
    END IF;

    -- 3.14. Deletar avatares do Storage
    DELETE FROM storage.objects WHERE owner != test_user_id::text;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE '✓ storage.objects (avatares): % registros deletados', deleted_count;

    -- 3.15. Deletar sessões e tokens da auth
    DELETE FROM auth.sessions WHERE user_id != test_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE '✓ auth.sessions: % registros deletados', deleted_count;

    DELETE FROM auth.refresh_tokens WHERE user_id != test_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE '✓ auth.refresh_tokens: % registros deletados', deleted_count;

    DELETE FROM auth.mfa_factors WHERE user_id != test_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE '✓ auth.mfa_factors: % registros deletados', deleted_count;

    DELETE FROM auth.identities WHERE user_id != test_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE '✓ auth.identities: % registros deletados', deleted_count;

    -- 3.16. Deletar perfis públicos
    DELETE FROM public.profiles WHERE user_id != test_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE '✓ profiles: % registros deletados', deleted_count;

    -- 3.17. Deletar usuários da tabela auth.users
    DELETE FROM auth.users WHERE id != test_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE '✓ auth.users: % usuários deletados', deleted_count;

    RAISE NOTICE '✅ LIMPEZA CONCLUÍDA COM SUCESSO!';
    RAISE NOTICE '✅ Usuário teste preservado: % (ID: %)', test_email, test_user_id;
    RAISE NOTICE '✅ Todos os outros usuários e CPFs foram deletados.';

EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ ERRO: %', SQLERRM;
    RAISE EXCEPTION 'Limpeza do banco cancelada por erro.';
END $$;

-- Análise final
ANALYZE;
SELECT 'CLEANUP_COMPLETE' AS status, now() AS executed_at;
