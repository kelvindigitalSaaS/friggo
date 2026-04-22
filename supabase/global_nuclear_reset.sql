-- =============================================================================
-- KAZA — GLOBAL NUCLEAR RESET (LIMPEZA TOTAL DO BANCO)
-- =============================================================================
-- ATENÇÃO: Este script apaga TODOS os dados de TODOS os usuários.
-- Use apenas em ambiente de desenvolvimento para começar do zero absoluto.
-- =============================================================================

BEGIN;

-- 1. Desabilitar triggers temporariamente para evitar erros de integridade/logs
SET session_replication_role = 'replica';

-- 2. Limpeza de tabelas de dados (Truncate apaga tudo de uma vez)
TRUNCATE TABLE public.kaza_items RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.shopping_list RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.consumable_inventory RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.item_history RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.meal_plans RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.home_settings RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.notification_preferences RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.account_sessions RESTART IDENTITY CASCADE;

-- 3. Limpeza de estruturas de grupo e moradia
TRUNCATE TABLE public.sub_account_invites RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.sub_account_members RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.sub_account_groups RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.home_members RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.homes RESTART IDENTITY CASCADE;

-- 4. Limpeza de assinaturas
TRUNCATE TABLE public.subscriptions RESTART IDENTITY CASCADE;

-- 5. Resetar TODOS os perfis (Limpa CPF, Nome e Onboarding de todos os usuários)
UPDATE public.profiles 
SET cpf = NULL,
    onboarding_completed = FALSE,
    setup_step = 'welcome',
    last_onboarding_attempt = NULL,
    home_type = NULL,
    residents = NULL,
    avatar_url = NULL;

-- 6. Restaurar triggers
SET session_replication_role = 'origin';

COMMIT;

RAISE NOTICE 'GLOBAL NUCLEAR RESET CONCLUÍDO! O banco está limpo para novos testes.';
