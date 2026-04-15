-- db_best_practices_sql_editor.sql
-- Script idempotente pronto para colar no SQL Editor do Supabase (pode rodar todo de uma vez).
-- Observação: este script NÃO usa CREATE INDEX CONCURRENTLY (para rodar no editor em uma única execução).
-- Em produção, prefira criar índices com CONCURRENTLY via psql conforme instruções abaixo.

-- 1) Extensão de monitoramento (se disponível)
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- 2) Criação de índices (IF NOT EXISTS) — idempotente
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions (user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_started_at ON public.subscriptions (user_id, started_at);

CREATE INDEX IF NOT EXISTS idx_shopping_items_user_id ON public.shopping_items (user_id);

CREATE INDEX IF NOT EXISTS idx_consumables_user_id ON public.consumables (user_id);

CREATE INDEX IF NOT EXISTS idx_meal_plan_user_planned ON public.meal_plan (user_id, planned_date);

CREATE INDEX IF NOT EXISTS idx_fav_recipes_user_id ON public.favorite_recipes (user_id);

-- profile_sensitive: CPF e user_id (unique)
CREATE UNIQUE INDEX IF NOT EXISTS idx_profile_sensitive_cpf ON public.profile_sensitive (cpf);
CREATE UNIQUE INDEX IF NOT EXISTS idx_profile_sensitive_user_id ON public.profile_sensitive (user_id);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles (user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_profile_settings_user_id ON public.profile_settings (user_id);

-- 3) Atualizar estatísticas para o planner
ANALYZE public.subscriptions;
ANALYZE public.shopping_items;
ANALYZE public.consumables;
ANALYZE public.meal_plan;
ANALYZE public.favorite_recipes;
ANALYZE public.profile_sensitive;
ANALYZE public.profiles;
ANALYZE public.profile_settings;

-- 4) Recomendações de execução em produção (manualmente via psql)
-- Use os comandos abaixo com psql conectado ao banco de produção para criar índices sem bloquear:
--
-- CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions (user_id);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_subscriptions_user_started_at ON public.subscriptions (user_id, started_at);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shopping_items_user_id ON public.shopping_items (user_id);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_consumables_user_id ON public.consumables (user_id);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_meal_plan_user_planned ON public.meal_plan (user_id, planned_date);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_fav_recipes_user_id ON public.favorite_recipes (user_id);
-- CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS idx_profile_sensitive_cpf ON public.profile_sensitive (cpf);
-- CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS idx_profile_sensitive_user_id ON public.profile_sensitive (user_id);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_user_id ON public.profiles (user_id);
-- CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS idx_profile_settings_user_id ON public.profile_settings (user_id);
--
-- Atenção: CREATE INDEX CONCURRENTLY não pode ser executado dentro de transações (DO/BEGIN/END). Use psql ou execute cada linha separadamente no editor.

-- FIM
