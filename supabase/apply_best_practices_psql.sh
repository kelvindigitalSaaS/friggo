#!/usr/bin/env bash
set -euo pipefail

# apply_best_practices_psql.sh
# Uso:
#   ./apply_best_practices_psql.sh "postgresql://user:pass@host:5432/db"
# ou
#   PG_CONN="postgresql://user:pass@host:5432/db" ./apply_best_practices_psql.sh
#
# Observações:
# - Este script usa CREATE INDEX CONCURRENTLY (recomendado para produção).
# - Não execute dentro de uma transação. Cada comando é executado separadamente via psql.
# - Requer psql no PATH.

PG_CONN="${1:-${PG_CONN:-}}"
if [ -z "$PG_CONN" ]; then
  echo "ERRO: conexão não fornecida. Passe a connection string como primeiro argumento ou exporte PG_CONN."
  echo "Ex: PG_CONN=\"postgresql://user:pass@host:5432/db\" $0"
  exit 1
fi

psql_exec() {
  local sql="$1"
  echo ">> $sql"
  psql "$PG_CONN" -v ON_ERROR_STOP=1 -c "$sql"
}

obj_exists() {
  local obj="$1"
  local res
  res=$(psql "$PG_CONN" -qtAX -c "SELECT to_regclass('$obj');")
  [ -n "$res" ] && return 0 || return 1
}

echo "Aplicando boas práticas (índices com CONCURRENTLY) no banco: $PG_CONN"

# 1) Extensão de monitoramento
psql_exec "CREATE EXTENSION IF NOT EXISTS pg_stat_statements;" || echo "Aviso: não foi possível criar pg_stat_statements (permissões?)"

# 2) Índices por tabela — só cria se a tabela existir
if obj_exists 'public.subscriptions'; then
  psql_exec "CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions (user_id);"
  psql_exec "CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_subscriptions_user_started_at ON public.subscriptions (user_id, started_at);"
else
  echo "Ignorando índices de subscriptions (tabela ausente)"
fi

if obj_exists 'public.shopping_items'; then
  psql_exec "CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shopping_items_user_id ON public.shopping_items (user_id);"
else
  echo "Ignorando índices de shopping_items (tabela ausente)"
fi

if obj_exists 'public.consumables'; then
  psql_exec "CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_consumables_user_id ON public.consumables (user_id);"
else
  echo "Ignorando índices de consumables (tabela ausente)"
fi

if obj_exists 'public.meal_plan'; then
  psql_exec "CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_meal_plan_user_planned ON public.meal_plan (user_id, planned_date);"
else
  echo "Ignorando índices de meal_plan (tabela ausente)"
fi

if obj_exists 'public.favorite_recipes'; then
  psql_exec "CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_fav_recipes_user_id ON public.favorite_recipes (user_id);"
else
  echo "Ignorando índices de favorite_recipes (tabela ausente)"
fi

# profile_sensitive (CPF)
if obj_exists 'public.profile_sensitive'; then
  psql_exec "CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS idx_profile_sensitive_cpf ON public.profile_sensitive (cpf);"
  psql_exec "CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS idx_profile_sensitive_user_id ON public.profile_sensitive (user_id);"
else
  echo "Ignorando índices de profile_sensitive (tabela ausente)"
fi

if obj_exists 'public.profiles'; then
  psql_exec "CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_user_id ON public.profiles (user_id);"
else
  echo "Ignorando índices de profiles (tabela ausente)"
fi

if obj_exists 'public.profile_settings'; then
  psql_exec "CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS idx_profile_settings_user_id ON public.profile_settings (user_id);"
else
  echo "Ignorando índices de profile_settings (tabela ausente)"
fi

# 3) Atualizar estatísticas (ANALYZE)
for t in public.subscriptions public.shopping_items public.consumables public.meal_plan public.favorite_recipes public.profile_sensitive public.profiles public.profile_settings; do
  if obj_exists "$t"; then
    psql_exec "ANALYZE $t;"
  fi
done

echo "Concluído. Verifique logs acima para possíveis avisos ou erros."
