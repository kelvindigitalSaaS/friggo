# Database Cleanup Guide

Este guia explica como deletar TODOS os dados de usuários e CPF do banco de dados, preservando apenas o usuário teste.

## ⚠️ AVISO IMPORTANTE

**Esta operação é IRREVERSÍVEL!** Todos os dados de usuários (exceto o teste) serão permanentemente deletados. Faça um backup completo do seu banco de dados ANTES de executar qualquer destes scripts.

## Usuário Teste Protegido

O usuário teste que será preservado:
- **Email**: `test@friggo.com.br`
- **Todos os seus dados** serão mantidos intactos

## Opção 1: SQL Script (Recomendado para Supabase Dashboard)

### Como usar:

1. Acesse **Supabase Dashboard** > **SQL Editor**
2. Crie uma nova query
3. Copie o conteúdo do arquivo `cleanup_all_users_except_test.sql`
4. Cole no SQL Editor
5. Clique em **RUN**

### Arquivo: `cleanup_all_users_except_test.sql`

**Vantagens:**
- Executa diretamente no Supabase sem dependências
- Usa transações PL/pgSQL para segurança
- Mostra detalhes de cada operação no console
- Verifica se o usuário teste existe antes de começar

**Desvantagens:**
- Requer acesso ao dashboard do Supabase
- Mais lento para grandes volumes de dados

### O que é deletado:

- ✅ Todos os usuários (exceto teste)
- ✅ Todos os itens da geladeira
- ✅ Listas de compras
- ✅ Receitas salvas e favoritas
- ✅ Planos de refeições
- ✅ Histórico de pagamentos
- ✅ Assinaturas
- ✅ Todos os CPFs
- ✅ Configurações de perfil
- ✅ Notificações
- ✅ Sessões e tokens de auth
- ✅ Avatares do Storage

## Opção 2: Node.js Script

### Instalação:

```bash
# Instalar dependências (se ainda não estiver instalado)
npm install @supabase/supabase-js
```

### Como usar:

```bash
# Defina as variáveis de ambiente
export SUPABASE_URL="https://seu-projeto.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="sua-chave-de-servico-aqui"

# Execute o script
node supabase/cleanup-all-users.js
```

**Ou em Windows (PowerShell):**

```powershell
$env:SUPABASE_URL="https://seu-projeto.supabase.co"
$env:SUPABASE_SERVICE_ROLE_KEY="sua-chave-de-servico-aqui"
node supabase/cleanup-all-users.js
```

**Ou em Windows (CMD):**

```cmd
set SUPABASE_URL=https://seu-projeto.supabase.co
set SUPABASE_SERVICE_ROLE_KEY=sua-chave-de-servico-aqui
node supabase/cleanup-all-users.js
```

### Arquivo: `cleanup-all-users.js`

**Vantagens:**
- Executa de qualquer lugar (CLI, CI/CD, aplicação)
- Mais rápido que SQL Script
- Melhor para automação
- Suporta fallback manual se RPC não estiver disponível

**Desvantagens:**
- Requer Node.js instalado
- Precisa de variáveis de ambiente

## Opção 3: TypeScript Script

### Como usar:

```bash
# Instalar ts-node (se ainda não estiver instalado)
npm install -D ts-node typescript

# Defina as variáveis de ambiente
export SUPABASE_URL="https://seu-projeto.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="sua-chave-de-servico-aqui"

# Execute o script
npx ts-node supabase/cleanup-all-users.ts
```

### Arquivo: `cleanup-all-users.ts`

Mesmas vantagens/desvantagens do Node.js script, com tipagem TypeScript adicional.

## Como Encontrar suas Credenciais Supabase

1. Acesse [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto
3. Vá para **Settings** > **API** (lado esquerdo)
4. Copie:
   - `URL` → `SUPABASE_URL`
   - `service_role` (secret key) → `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **NUNCA** compartilhe a `service_role` key publicamente!

## Verificação de Segurança

Todos os scripts incluem verificações de segurança:

1. ✅ Valida que o usuário teste existe ANTES de começar
2. ✅ Para a execução se o usuário teste não for encontrado
3. ✅ Usa `WHERE user_id != test_user_id` para garantir proteção
4. ✅ Mostra quantos usuários serão deletados

## Recuperação de Erros

Se algo der errado:

1. **Erro: "Usuário teste não encontrado"**
   - Verifique se o usuário `test@friggo.com.br` existe no Supabase Auth
   - Se não existir, crie manualmente ou use `setup_test_environment.sql`

2. **Erro: "Função RPC não encontrada"**
   - O script JS/TS usará fallback automático (deletar tabela por tabela)
   - Levará mais tempo, mas funcionará

3. **Erro de autenticação**
   - Verifique se `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` estão corretos
   - Use a chave `service_role`, não `anon`

## CI/CD Integration

Para usar em GitHub Actions ou similar:

```yaml
- name: Cleanup Database
  env:
    SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
    SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
  run: node supabase/cleanup-all-users.js
```

## Monitoramento

Após executar, verifique no Supabase Dashboard:

1. **Authentication** > **Users** - Apenas o usuário teste deve estar
2. **SQL Editor** > Execute:
   ```sql
   SELECT COUNT(*) as user_count FROM auth.users;
   SELECT COUNT(*) as profile_count FROM public.profiles;
   SELECT COUNT(*) as cpf_count FROM public.profiles WHERE cpf IS NOT NULL;
   ```

## Backup Antes de Executar

### Backup via Supabase Dashboard:

1. Vá para **Settings** > **Backups**
2. Clique em **Back up now**
3. Aguarde a conclusão (pode levar alguns minutos)

### Backup via CLI:

```bash
supabase db pull
```

Isso salvará o schema no arquivo `supabase/migrations/`.

## Agendamento Automático

Se quiser agendar limpezas regulares:

### GitHub Actions (Semanal):

```yaml
name: Weekly Database Cleanup

on:
  schedule:
    - cron: '0 2 * * 0' # Todo domingo às 2am UTC

jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install @supabase/supabase-js
      - name: Run Cleanup
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
        run: node supabase/cleanup-all-users.js
```

## Suporte

Se encontrar problemas:

1. Verifique o arquivo de erro/log
2. Confirme que as credenciais estão corretas
3. Tente o SQL Script no dashboard primeiro
4. Verifique se o usuário teste existe: `SELECT * FROM auth.users WHERE email = 'test@friggo.com.br';`

## Dados Deletados em Detalhes

| Tabela | Ação | Razão |
|--------|------|-------|
| auth.users | Delete (exceto teste) | Removem usuários do sistema |
| public.profiles | Delete (exceto teste) | Remitem perfis públicos |
| public.items | Delete (exceto teste) | Remove itens da geladeira |
| public.shopping_items | Delete (exceto teste) | Remove listas de compras |
| public.consumables | Delete (exceto teste) | Remove consumíveis |
| public.saved_recipes | Delete (exceto teste) | Remove receitas salvas |
| public.favorite_recipes | Delete (exceto teste) | Remove favoritos |
| public.meal_plan | Delete (exceto teste) | Remove planos de refeição |
| public.payment_history | Delete (exceto teste) | Remove histórico de pagamentos |
| public.subscriptions | Delete (exceto teste) | Remove assinaturas |
| public.profile_sensitive | Delete (exceto teste) | Remove dados sensíveis |
| public.profile_settings | Delete (exceto teste) | Remove configurações |
| public.notifications | Delete (exceto teste) | Remove notificações |
| public.profiles.cpf | NULL (todos) | Remove CPFs de TODOS (incluindo teste) |
| storage.objects | Delete (exceto teste) | Remove avatares |
| auth.sessions | Delete (exceto teste) | Invalida sessões |
| auth.refresh_tokens | Delete (exceto teste) | Invalida tokens |
| auth.mfa_factors | Delete (exceto teste) | Remove 2FA |
| auth.identities | Delete (exceto teste) | Remove identidades sociais |

---

**Última atualização**: 2026-04-15
