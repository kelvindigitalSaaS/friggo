-- =============================================================================
-- KAZA — FULL NUCLEAR RESET (DEV / STAGING ONLY)
-- =============================================================================
-- Apaga ABSOLUTAMENTE TUDO: dados, perfis e auth.users.
-- Use apenas em ambiente de desenvolvimento. IRREVERSÍVEL.
-- Após rodar este script, rode todas as migrations em ordem.
-- =============================================================================

DO $$
BEGIN
    RAISE NOTICE '=============================================================';
    RAISE NOTICE '[KAZA Nuclear Reset] Iniciando limpeza total...';
    RAISE NOTICE '=============================================================';
END $$;

-- Desabilita triggers de FK para truncar sem erros de dependência
SET session_replication_role = 'replica';

-- Trunca apenas tabelas que existem (seguro rodar em qualquer estado do banco)
DO $$
DECLARE
  tbl text;
  tables text[] := ARRAY[
    -- Logs e histórico
    'consumable_logs',
    'item_history',
    'subscription_events',
    'payment_history',
    'user_cpf_audit',
    -- Fila de notificações
    'notification_queue',
    'push_subscriptions',
    -- Dados de negócio
    'consumables',
    'shopping_items',
    'shopping_lists',
    'saved_shopping_lists',
    'items',
    'meal_plans',
    'recipes',
    'custom_categories',
    -- Preferências e configurações
    'home_settings',
    'notification_preferences',
    'garbage_reminders',
    -- Conquistas e favoritos
    'user_achievements',
    'user_recipe_favorites',
    -- SaaS / grupos / sessões / convites
    'account_sessions',
    'sub_account_invites',
    'sub_account_members',
    'sub_account_groups',
    -- Casa e membros
    'home_members',
    'homes',
    -- Assinaturas
    'subscriptions',
    -- Perfis (por último)
    'profiles'
  ];
BEGIN
  FOREACH tbl IN ARRAY tables LOOP
    IF EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = tbl
    ) THEN
      EXECUTE format('TRUNCATE TABLE public.%I RESTART IDENTITY CASCADE', tbl);
      RAISE NOTICE '[KAZA Reset] Truncated: %', tbl;
    ELSE
      RAISE NOTICE '[KAZA Reset] Skipped (not found): %', tbl;
    END IF;
  END LOOP;
END $$;

-- -------------------------------------------------------------------------
-- Auth — apaga todos os usuários do Supabase Auth
-- -------------------------------------------------------------------------
DELETE FROM auth.sessions;
DELETE FROM auth.refresh_tokens;
DELETE FROM auth.mfa_factors;
DELETE FROM auth.mfa_challenges;
DELETE FROM auth.identities;
DELETE FROM auth.users;

-- Restaura comportamento normal de triggers
SET session_replication_role = 'origin';

DO $$
BEGIN
    RAISE NOTICE '=============================================================';
    RAISE NOTICE '[KAZA Nuclear Reset] CONCLUÍDO.';
    RAISE NOTICE 'Banco zerado. Rode agora a migration de otimizações:';
    RAISE NOTICE '  20260429000000_production_optimizations.sql';
    RAISE NOTICE '=============================================================';
END $$;
