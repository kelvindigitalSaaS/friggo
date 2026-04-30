-- =============================================================================
-- KAZA — AUDITORIA COMPLETA DO BANCO (rode no SQL Editor do Supabase)
-- Copia tudo daqui e cola no SQL Editor. Roda seção por seção.
-- =============================================================================

-- =====================================================================
-- SEÇÃO 1: Todas as tabelas + colunas + PK + FK + RLS
-- =====================================================================
WITH tables AS (
  SELECT
    n.nspname AS schemaname,
    c.relname AS tablename,
    c.relrowsecurity AS rls_enabled
  FROM pg_catalog.pg_class c
  JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  WHERE c.relkind IN ('r','p')
    AND n.nspname IN ('auth','public','storage','realtime')
),
pk AS (
  SELECT
    tc.table_schema AS schemaname,
    tc.table_name   AS tablename,
    kcu.column_name,
    tc.constraint_name
  FROM information_schema.table_constraints tc
  JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
   AND tc.table_schema = kcu.table_schema
  WHERE tc.constraint_type = 'PRIMARY KEY'
    AND tc.table_schema IN ('auth','public','storage','realtime')
),
fk AS (
  SELECT
    tc.table_schema AS schemaname,
    tc.table_name   AS tablename,
    tc.constraint_name,
    kcu.column_name AS fk_col,
    ccu.table_schema AS ref_schema,
    ccu.table_name   AS ref_table,
    ccu.column_name  AS ref_col
  FROM information_schema.table_constraints tc
  JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
   AND tc.table_schema = kcu.table_schema
  JOIN information_schema.constraint_column_usage ccu
    ON ccu.constraint_name = tc.constraint_name
   AND ccu.table_schema = tc.table_schema
  WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_schema IN ('auth','public','storage','realtime')
)
SELECT
  t.schemaname,
  t.tablename,
  t.rls_enabled,
  (SELECT jsonb_agg(x ORDER BY x->>'ordinal')
   FROM (
     SELECT DISTINCT jsonb_build_object(
       'ordinal', c2.ordinal_position,
       'col',     c2.column_name,
       'type',    c2.udt_name,
       'nullable',c2.is_nullable,
       'default', c2.column_default
     ) AS x
     FROM information_schema.columns c2
     WHERE c2.table_schema = t.schemaname AND c2.table_name = t.tablename
   ) sub
  ) AS columns,
  jsonb_agg(DISTINCT pk.column_name) FILTER (WHERE pk.column_name IS NOT NULL) AS primary_keys,
  jsonb_agg(DISTINCT jsonb_build_object(
    'col', fk.fk_col,
    'refs', format('%s.%s.%s', fk.ref_schema, fk.ref_table, fk.ref_col)
  )) FILTER (WHERE fk.fk_col IS NOT NULL) AS foreign_keys
FROM tables t
LEFT JOIN pk ON pk.schemaname = t.schemaname AND pk.tablename = t.tablename
LEFT JOIN fk ON fk.schemaname = t.schemaname AND fk.tablename = t.tablename
GROUP BY t.schemaname, t.tablename, t.rls_enabled
ORDER BY t.schemaname, t.tablename;

-- =====================================================================
-- SEÇÃO 2: Todas as policies RLS
-- =====================================================================
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual       AS using_expr,
  with_check AS check_expr
FROM pg_policies
WHERE schemaname IN ('auth','public','storage','realtime')
ORDER BY schemaname, tablename, policyname;

-- =====================================================================
-- SEÇÃO 3: Tabelas SEM RLS habilitado (possível furo de segurança)
-- =====================================================================
SELECT
  n.nspname AS schema,
  c.relname AS tabela,
  'SEM RLS — verificar se é intencional' AS alerta
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind = 'r'
  AND n.nspname = 'public'
  AND NOT c.relrowsecurity
ORDER BY c.relname;

-- =====================================================================
-- SEÇÃO 4: Tabelas com RLS mas SEM nenhuma policy (bloqueio total)
-- =====================================================================
SELECT
  n.nspname AS schema,
  c.relname AS tabela,
  'RLS ativo mas ZERO policies — tabela inacessível para todos' AS alerta
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind = 'r'
  AND n.nspname = 'public'
  AND c.relrowsecurity
  AND NOT EXISTS (
    SELECT 1 FROM pg_policies p
    WHERE p.schemaname = n.nspname AND p.tablename = c.relname
  )
ORDER BY c.relname;

-- =====================================================================
-- SEÇÃO 5: Indexes existentes (performance)
-- =====================================================================
SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname IN ('public','auth')
ORDER BY schemaname, tablename, indexname;

-- =====================================================================
-- SEÇÃO 6: Funções/RPCs públicas (possível superfície de ataque)
-- =====================================================================
SELECT
  n.nspname   AS schema,
  p.proname   AS funcao,
  pg_get_function_arguments(p.oid) AS args,
  p.prosecdef AS security_definer,
  r.rolname   AS owner
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
JOIN pg_roles r     ON r.oid = p.proowner
WHERE n.nspname = 'public'
ORDER BY p.proname;

-- =====================================================================
-- SEÇÃO 7: Enums e tipos customizados
-- =====================================================================
SELECT
  n.nspname  AS schema,
  t.typname  AS tipo,
  t.typtype,
  array_agg(e.enumlabel ORDER BY e.enumsortorder) AS valores
FROM pg_type t
JOIN pg_namespace n ON n.oid = t.typnamespace
LEFT JOIN pg_enum e ON e.enumtypid = t.oid
WHERE n.nspname IN ('public','auth')
  AND t.typtype IN ('e','d','c')
GROUP BY n.nspname, t.typname, t.typtype
ORDER BY n.nspname, t.typname;

-- =====================================================================
-- SEÇÃO 8: Contagem de registros por tabela (snapshot atual)
-- =====================================================================
SELECT
  schemaname,
  relname AS tabela,
  n_live_tup AS registros_vivos,
  n_dead_tup AS registros_mortos,
  last_vacuum,
  last_analyze
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY n_live_tup DESC;
