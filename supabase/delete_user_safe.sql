-- delete_user_safe.sql
-- Remove um usuário e todos os seus dados de forma segura.
-- Substitua o email abaixo pelo usuário que deseja excluir.
-- Execute no: Supabase > SQL Editor

DO $$
DECLARE
    target_email TEXT := 'test@friggo.com'; -- << TROQUE PELO EMAIL DO USUÁRIO
    target_user_id UUID;
BEGIN
    -- Busca o UUID pelo email
    SELECT id INTO target_user_id
    FROM auth.users
    WHERE email = target_email;

    IF target_user_id IS NULL THEN
        RAISE NOTICE 'Usuário com email % não encontrado. Nada a remover.', target_email;
        RETURN;
    END IF;

    RAISE NOTICE 'Removendo dados do usuário: % (ID: %)', target_email, target_user_id;

    -- 1. Remover itens
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='items') THEN
        DELETE FROM public.items WHERE user_id = target_user_id;
        RAISE NOTICE 'items: removido';
    END IF;

    -- 2. Remover lista de compras
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='shopping_items') THEN
        DELETE FROM public.shopping_items WHERE user_id = target_user_id;
        RAISE NOTICE 'shopping_items: removido';
    END IF;

    -- 3. Remover consumíveis
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='consumables') THEN
        DELETE FROM public.consumables WHERE user_id = target_user_id;
        RAISE NOTICE 'consumables: removido';
    END IF;

    -- 4. Remover receitas salvas
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='saved_recipes') THEN
        DELETE FROM public.saved_recipes WHERE user_id = target_user_id;
        RAISE NOTICE 'saved_recipes: removido';
    END IF;

    -- 5. Remover receitas favoritas
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='favorite_recipes') THEN
        DELETE FROM public.favorite_recipes WHERE user_id = target_user_id;
        RAISE NOTICE 'favorite_recipes: removido';
    END IF;

    -- 6. Remover plano de refeições
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='meal_plan') THEN
        DELETE FROM public.meal_plan WHERE user_id = target_user_id;
        RAISE NOTICE 'meal_plan: removido';
    END IF;

    -- 7. Remover histórico de pagamentos
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='payment_history') THEN
        DELETE FROM public.payment_history WHERE user_id = target_user_id;
        RAISE NOTICE 'payment_history: removido';
    END IF;

    -- 8. Remover assinatura
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='subscriptions') THEN
        DELETE FROM public.subscriptions WHERE user_id = target_user_id;
        RAISE NOTICE 'subscriptions: removido';
    END IF;

    -- 9. Remover dados sensíveis (CPF, etc.)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='profile_sensitive') THEN
        DELETE FROM public.profile_sensitive WHERE user_id = target_user_id;
        RAISE NOTICE 'profile_sensitive: removido';
    END IF;

    -- 10. Remover configurações de perfil
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='profile_settings') THEN
        DELETE FROM public.profile_settings WHERE user_id = target_user_id;
        RAISE NOTICE 'profile_settings: removido';
    END IF;

    -- 11. Remover notificações
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='notifications') THEN
        DELETE FROM public.notifications WHERE user_id = target_user_id;
        RAISE NOTICE 'notifications: removido';
    END IF;

    -- 12. Remover avatares do Storage
    DELETE FROM storage.objects WHERE owner = target_user_id::text;

    -- 13. Remover sessões e tokens (auth schema)
    DELETE FROM auth.sessions WHERE user_id = target_user_id;
    DELETE FROM auth.refresh_tokens WHERE user_id = target_user_id;
    DELETE FROM auth.mfa_factors WHERE user_id = target_user_id;
    DELETE FROM auth.identities WHERE user_id = target_user_id;

    -- 14. Remover perfil público
    DELETE FROM public.profiles WHERE user_id = target_user_id;
    RAISE NOTICE 'profiles: removido';

    -- 15. Remover o usuário da tabela auth.users
    DELETE FROM auth.users WHERE id = target_user_id;
    RAISE NOTICE 'auth.users: removido';

    RAISE NOTICE '✅ Usuário % deletado com sucesso!', target_email;
END $$;

SELECT 'DELETE_COMPLETE' AS status, now() AS executed_at;
