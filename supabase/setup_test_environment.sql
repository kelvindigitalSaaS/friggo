-- ==========================================================
-- setup_test_environment.sql
-- PARTE 1: Cole e execute APENAS ESTE BLOCO no SQL Editor.
-- Depois crie o usuário manualmente (ver instruções abaixo).
-- ==========================================================

-- ==========================================
-- PASSO 2: CONFIGURAR PERFIL DO USUÁRIO TESTE
-- (Execute APÓS criar o usuário no Dashboard!)
-- ==========================================

-- Substitua o UUID abaixo pelo ID do usuário criado no Dashboard Auth.
-- Para encontrar o ID: Supabase > Authentication > Users > copie o UUID.
DO $$
DECLARE
    test_user_id UUID;
    test_email TEXT := 'test@friggo.com.br';
BEGIN
    -- Busca o ID do usuário pelo email
    SELECT id INTO test_user_id
    FROM auth.users
    WHERE email = test_email;

    IF test_user_id IS NULL THEN
        RAISE EXCEPTION 'Usuário % não encontrado! Crie o usuário no Supabase Dashboard > Authentication > Users primeiro.', test_email;
    END IF;

    RAISE NOTICE 'Configurando perfil para usuário: % (ID: %)', test_email, test_user_id;

    -- Configurar perfil (INSERT ou UPDATE se já existir)
    INSERT INTO public.profiles (user_id, name, onboarding_completed, created_at, updated_at)
    VALUES (test_user_id, 'Usuário Teste', TRUE, now(), now())
    ON CONFLICT (user_id) DO UPDATE SET
        name = 'Usuário Teste',
        onboarding_completed = TRUE,
        updated_at = now();

    -- Atualizar colunas opcionais (plan e subscription_status)
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'plan_type'
    ) THEN
        UPDATE public.profiles SET plan_type = 'premium' WHERE user_id = test_user_id;
    END IF;

    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'subscription_status'
    ) THEN
        UPDATE public.profiles SET subscription_status = 'active' WHERE user_id = test_user_id;
    END IF;

    -- Configurar Assinatura Premium
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'subscriptions') THEN
        INSERT INTO public.subscriptions (user_id, plan, is_active, started_at, expires_at)
        VALUES (
            test_user_id,
            'premium'::public.subscription_plan,
            TRUE,
            now(),
            now() + interval '1 year'
        )
        ON CONFLICT (user_id) DO UPDATE SET
            plan = 'premium'::public.subscription_plan,
            is_active = TRUE,
            expires_at = now() + interval '1 year';
    END IF;

    -- Adicionar itens de exemplo na geladeira
    DELETE FROM public.items WHERE user_id = test_user_id;
    INSERT INTO public.items (user_id, name, category, location, quantity, unit, expiry_date)
    VALUES
        (test_user_id, 'Leite Integral',   'Laticínios', 'fridge',  2,  'L',  CURRENT_DATE + 5),
        (test_user_id, 'Ovos',             'Proteínas',  'fridge',  12, 'un', CURRENT_DATE + 10),
        (test_user_id, 'Maçã Fuji',        'Frutas',     'fridge',  5,  'un', CURRENT_DATE + 7),
        (test_user_id, 'Peito de Frango',  'Proteínas',  'freezer', 1,  'kg', CURRENT_DATE + 30),
        (test_user_id, 'Queijo Muçarela',  'Laticínios', 'fridge',  200,'g',  CURRENT_DATE + 12),
        (test_user_id, 'Iogurte Natural',  'Laticínios', 'fridge',  3,  'un', CURRENT_DATE + 8),
        (test_user_id, 'Arroz Integral',   'Grãos',      'pantry',  2,  'kg', CURRENT_DATE + 180);

    RAISE NOTICE 'Itens de exemplo adicionados com sucesso!';
    RAISE NOTICE 'Setup concluído para: %', test_email;
END $$;


-- ==========================================
-- PASSO 3: LIMPAR TODOS OS CPFs DO BANCO
-- ==========================================

-- 3a. Criar backup dos dados antes de limpar
CREATE TABLE IF NOT EXISTS public.profiles_cpf_backup AS
SELECT user_id, cpf, now() AS backed_up_at
FROM public.profiles
WHERE EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'cpf'
);

-- 3b. Desabilitar triggers que bloqueiam atualização de CPF
DROP TRIGGER IF EXISTS prevent_profiles_cpf_update ON public.profiles;
DROP TRIGGER IF EXISTS prevent_cpf_update ON public.profile_sensitive;

-- 3c. Limpar CPFs de todas as tabelas
DO $$
BEGIN
    -- Limpar em profiles
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'cpf'
    ) THEN
        UPDATE public.profiles SET cpf = NULL WHERE cpf IS NOT NULL;
        RAISE NOTICE 'CPFs removidos de public.profiles';
    END IF;

    -- Limpar em profile_sensitive (se existir)
    IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'profile_sensitive'
    ) THEN
        UPDATE public.profile_sensitive SET cpf = NULL WHERE cpf IS NOT NULL;
        RAISE NOTICE 'CPFs removidos de public.profile_sensitive';
    END IF;
END $$;

-- 3d. Restaurar trigger de profiles (se a função existir)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='cpf')
    AND EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'prevent_cpf_update' AND pronamespace = 'public'::regnamespace) THEN
        DROP TRIGGER IF EXISTS prevent_profiles_cpf_update ON public.profiles;
        CREATE TRIGGER prevent_profiles_cpf_update
            BEFORE UPDATE ON public.profiles
            FOR EACH ROW WHEN (OLD.cpf IS NOT NULL AND NEW.cpf IS DISTINCT FROM OLD.cpf)
            EXECUTE FUNCTION public.prevent_cpf_update();
        RAISE NOTICE 'Trigger prevent_profiles_cpf_update recriado.';
    END IF;
END $$;

-- 3e. Restaurar trigger de profile_sensitive (se existir)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='profile_sensitive')
    AND EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'prevent_cpf_update' AND pronamespace = 'public'::regnamespace) THEN
        DROP TRIGGER IF EXISTS prevent_cpf_update ON public.profile_sensitive;
        CREATE TRIGGER prevent_cpf_update
            BEFORE UPDATE ON public.profile_sensitive
            FOR EACH ROW EXECUTE FUNCTION public.prevent_cpf_update();
        RAISE NOTICE 'Trigger prevent_cpf_update em profile_sensitive recriado.';
    END IF;
END $$;

-- ==========================================
-- RESULTADO FINAL
-- ==========================================
ANALYZE public.profiles;
SELECT 'SETUP_COMPLETE' AS status, now() AS executed_at;
