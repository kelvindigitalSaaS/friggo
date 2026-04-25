# 🔐 KAZA — Reset de Dados + Setup Admin Seguro

## ⚠️ IMPORTANTE: Backup Primeiro!

Antes de executar qualquer coisa:
1. Acesse: https://supabase.com/dashboard/project/nrfketkwajzkmrlkvoyd/settings/backups
2. Clique em "Back up now"
3. Aguarde a conclusão

---

## 📋 Passo 1: Resetar Todos os Dados

### Opção A: Via SQL Editor (Recomendado)

1. Acesse: https://supabase.com/dashboard/project/nrfketkwajzkmrlkvoyd/sql
2. Crie uma **nova query**
3. Cole o conteúdo de: `supabase/ADMIN_SETUP_SECURE.sql` (primeira parte apenas)
4. Execute (Ctrl+Enter)

**Resultado esperado:**
```
✅ TRUNCATE TABLE (todas as tabelas resetadas)
```

---

## 🔐 Passo 2: Criar Conta Admin

### Opção A: PowerShell (Windows) — RECOMENDADO

```powershell
# 1. Abra PowerShell como Administrador
# 2. Navegue para a pasta do projeto
cd "C:\Users\CAIO\Pictures\apps\KAZA"

# 3. Execute o script
powershell -ExecutionPolicy Bypass -File .\scripts\create-admin-safe.ps1

# 4. Cole sua SERVICE_ROLE_KEY quando solicitado
# 5. Defina a senha do admin
```

**O que você precisa:**
- **SERVICE_ROLE_KEY**: 
  - Acesse: https://supabase.com/dashboard/project/nrfketkwajzkmrlkvoyd/settings/api
  - Copie a chave em "service_role" (aquela que começa com `eyJhbGc...`)
  - ⚠️ **NUNCA** compartilhe esta chave com ninguém!

### Opção B: Bash/Linux/Mac

```bash
# 1. Abra um terminal
# 2. Navegue para a pasta do projeto
cd ~/path/to/KAZA

# 3. Execute o script
bash ./scripts/create-admin-safe.sh

# 4. Cole sua SERVICE_ROLE_KEY quando solicitado
# 5. Defina a senha do admin
```

---

## Passo 3: Completar Setup no Supabase Dashboard

Depois de executar o script PowerShell/Bash:

1. **Copie o SQL gerado** (será exibido no terminal)
2. Acesse: https://supabase.com/dashboard/project/nrfketkwajzkmrlkvoyd/sql
3. **Cole o SQL no editor**
4. **Execute** (Ctrl+Enter)

**Resultado esperado:**
```
user_id                          | name
---------------------------------+----------
550e8400-e29b-41d4-a716-446655440000 | Admin KAZA
```

---

## ✅ Passo 4: Testar Login

1. Abra seu app: http://localhost:5173 (ou seu URL)
2. Clique em "Login"
3. Email: **admin@kaza.local**
4. Senha: **[aquela que você definiu]**

**Esperado:**
- ✅ Login com sucesso
- ✅ Dashboard carrega
- ✅ Casa "Casa do Admin" aparece
- ✅ Sem erros no console (F12)

---

## 🆘 Troubleshooting

### Erro: "SERVICE_ROLE_KEY inválida"
```
❌ Erro ao criar usuário: Unauthorized
```
**Solução:**
- Copie a chave correta em: Settings > API > service_role
- Não copie `anon_key` — isso é errado!

### Erro: "Email já existe"
```
❌ Erro: User already exists
```
**Solução:**
- Rode a Parte 1 (reset) novamente
- Ou use outro email: `admin+test@kaza.local`

### Erro: "SQL execute failed"
```
❌ Erro: column "xxx" does not exist
```
**Solução:**
- Certifique-se que executou a Parte 1 (reset) corretamente
- Verifique se o schema foi aplicado

---

## 🔍 Verificar Status

Para confirmar que tudo funcionou:

```sql
-- Executar no SQL Editor

-- Ver usuários criados
SELECT id, email FROM auth.users;

-- Ver perfis
SELECT user_id, name, plan_type FROM public.profiles;

-- Ver casas
SELECT id, name, owner_user_id FROM public.homes;
```

---

## 📊 O que foi resetado?

Estas tabelas foram **vazias por completo**:
- ✅ `auth.users` (usuários de login)
- ✅ `profiles` (perfis de usuários)
- ✅ `homes` (casas)
- ✅ `home_members` (membros das casas)
- ✅ `subscriptions` (assinaturas)
- ✅ `items` (itens da geladeira)
- ✅ `recipes` (receitas)
- ✅ `meals_plans` (planos de refeição)
- ✅ Todas as outras tabelas

**Não foram afetadas:**
- ❌ Storage (fotos, arquivos)
- ❌ Configurações do Supabase
- ❌ Policies e RLS

---

## 🚀 Próximos Passos

1. ✅ App funcionando com admin
2. Criar mais usuários para teste
3. Testar fluxos de convidação
4. Testar planos de subscrição

---

## ⚙️ Informações do Projeto

| Campo | Valor |
|-------|-------|
| Projeto Supabase | nrfketkwajzkmrlkvoyd |
| URL da API | https://nrfketkwajzkmrlkvoyd.supabase.co |
| Admin Email | admin@kaza.local |

---

**⏱️ Tempo estimado: 5-10 minutos**
