-- ============================================================================
-- BACKUP E LIMPEZA DE USUÁRIOS E CPF
-- Execute em ordem: 1. Backup → 2. Delete
-- ============================================================================

-- ============================================================================
-- PARTE 1: BACKUP DE TODOS OS CPFs E DADOS DOS USUÁRIOS
-- ============================================================================

-- Criar tabela de backup (execute isso uma vez)
CREATE TABLE IF NOT EXISTS cpf_backup (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  cpf text,
  name text,
  email text,
  created_at timestamp default now()
);

-- Fazer backup de todos os CPFs
INSERT INTO cpf_backup (user_id, cpf, name, email)
SELECT
  p.user_id,
  p.cpf,
  p.name,
  a.email
FROM profiles p
LEFT JOIN auth.users a ON p.user_id = a.id
WHERE p.cpf IS NOT NULL;

-- Verificar quantos registros foram feitos backup
SELECT COUNT(*) as total_backups FROM cpf_backup;

-- Exportar backup como CSV (copie e cole em arquivo .csv)
-- COPY cpf_backup TO STDOUT WITH CSV HEADER;

-- ============================================================================
-- PARTE 2: ANONIMIZAR CPFs DOS USUÁRIOS (LGPD)
-- ============================================================================

-- Opção A: Limpar CPF (seguro - apenas remove o dado sensível)
UPDATE profiles
SET cpf = NULL
WHERE cpf IS NOT NULL;

-- Opção B: Substituir CPF por hash (mantém auditoria sem expor dado real)
-- UPDATE profiles
-- SET cpf = md5(cpf || 'salt123')
-- WHERE cpf IS NOT NULL;

-- ============================================================================
-- PARTE 3: DELETAR USUÁRIOS DO AUTH (CUIDADO - IRREVERSÍVEL!)
-- ============================================================================

-- Opção A: Deletar apenas da tabela profiles (mantém auth.users)
-- DELETE FROM profiles WHERE user_id = '<user_id_especifico>';

-- Opção B: Hard Delete de um usuário específico (IRREVERSÍVEL!)
-- DELETE FROM auth.users WHERE id = '<user_id_especifico>';

-- Opção C: Deletar TODOS os usuários (EXTREMAMENTE PERIGOSO - só em dev/staging!)
-- DELETE FROM auth.users WHERE created_at < now();

-- ============================================================================
-- PARTE 4: LIMPEZA DE DADOS RELACIONADOS (opcional)
-- ============================================================================

-- Deletar soft de itens de usuários específicos
-- UPDATE items
-- SET deleted_at = now()
-- WHERE home_id IN (
--   SELECT id FROM homes WHERE user_id = '<user_id>'
-- )
-- AND deleted_at IS NULL;

-- ============================================================================
-- PARTE 5: VERIFICAÇÃO FINAL
-- ============================================================================

-- Contar usuários cadastrados
SELECT COUNT(*) as total_usuarios FROM profiles;

-- Contar CPFs ainda existentes (deve ser 0 após anonimização)
SELECT COUNT(*) as cpfs_existentes FROM profiles WHERE cpf IS NOT NULL;

-- Ver backup criado
SELECT COUNT(*) as cpfs_em_backup FROM cpf_backup;

-- Listar backup completo
-- SELECT * FROM cpf_backup ORDER BY created_at DESC;
