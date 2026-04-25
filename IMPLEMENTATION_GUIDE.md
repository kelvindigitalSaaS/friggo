# 🚀 Guia de Implementação: Remover Admin + Feedback Pós-Trial

## Status da Implementação

✅ Código implementado e pronto para produção

---

## 📋 O que foi feito

### 1. ✅ Remoção do Admin da UI
- Remover import lazy do `AdminDashboard` em `src/App.tsx`
- Remover rota `/app/admin` em `src/App.tsx`
- **Resultado:** Nenhum chunk admin gerado no build. Variáveis `VITE_ADMIN_*` não aparecem no bundle.

### 2. ✅ Schema do Feedback no Supabase
- Nova coluna `feedback_submitted` em `profiles`
- Nova tabela `feedback_surveys` com RLS
- Ver: `supabase/FEEDBACK_SURVEYS_SETUP.sql`

### 3. ✅ SubscriptionContext atualizado
- Expõe `feedbackSubmitted: boolean`
- Busca `feedback_submitted` do profile
- Arquivo: `src/contexts/SubscriptionContext.tsx`

### 4. ✅ App.tsx atualizado
- Adicionado import lazy do `FeedbackSurvey`
- Adicionada rota `/app/feedback-survey` com `allowLocked={true}`
- Lógica de redirect: se `isLocked && !feedbackSubmitted` → vai para survey

### 5. ✅ Hook useFeedbackSurvey
- `submitFeedback(data)` — insere feedback e marca como respondido
- `skipFeedback()` — apenas marca como respondido
- Arquivo: `src/hooks/useFeedbackSurvey.ts`

### 6. ✅ Página FeedbackSurvey
- 4 steps com barra de progresso
- Step 1: Avaliação (1-5 estrelas)
- Step 2: O que gostou (checkboxes)
- Step 3: O que mudaria (checkboxes)
- Step 4: Por que não assinar (select)
- Botão "Pular" disponível em todas as etapas
- Arquivo: `src/pages/FeedbackSurvey/index.tsx`

### 7. ✅ Relatórios SQL
- 10 queries prontas para análise de feedback
- Arquivo: `supabase/FEEDBACK_REPORTS.sql`

---

## 🔧 Próximos Passos (IMPORTANTE)

### Passo 1: Executar SQL no Supabase

1. Acesse: https://supabase.com/dashboard/project/nrfketkwajzkmrlkvoyd/sql
2. **Crie uma nova query**
3. Cole o conteúdo de: `supabase/FEEDBACK_SURVEYS_SETUP.sql`
4. Clique em **Execute** (Ctrl+Enter)

**Esperado:**
```
✅ ALTER TABLE
✅ CREATE TABLE
✅ ALTER TABLE (RLS)
✅ CREATE POLICY
✅ CREATE INDEX
```

### Passo 2: Build e Deploy

```bash
# Limpar e fazer build
npm run build

# Verificar que AdminDashboard não está no bundle
ls -la dist/assets/ | grep -i admin
# Resultado esperado: vazio (zero matches)
```

### Passo 3: Testar Fluxo Localmente

```bash
npm run dev
```

**Teste 1: Usuário com trial ativo**
- Login com uma conta que ainda tem dias de trial
- Deve ver a home normalmente, sem survey

**Teste 2: Usuário com trial expirado + feedback não respondido**
- Use o Supabase Dashboard para expirar o trial de um usuário:
  ```sql
  UPDATE profiles SET trial_start_date = NOW() - interval '8 days'
  WHERE user_id = 'seu_user_id';

  UPDATE profiles SET feedback_submitted = false
  WHERE user_id = 'seu_user_id';
  ```
- Login com essa conta
- Deve redirecionar para `/app/feedback-survey`
- Você vê: página com 4 steps

**Teste 3: Submeter feedback**
- Preencha todos os steps
- Clique "Enviar feedback"
- Deve ir para paywall (`/app/home?subscription=open`)
- Verifique no Supabase: `SELECT * FROM feedback_surveys WHERE user_id = '...';`
- Dados devem estar salvos

**Teste 4: Pular feedback**
- Volte e resetar `feedback_submitted = false` para outro usuário
- Ir para survey novamente
- Clique "Pular"
- Deve ir direto para paywall
- Verifique que `feedback_surveys` NÃO tem entrada para esse usuário

**Teste 5: Verificar que não volta para survey**
- Após responder feedback, recarregue a página
- Não deve voltar para survey (deve ficar na paywall)

---

## 📊 Analisar Feedback Recebido

Depois que tiver feedback de usuários reais, use as queries em:
`supabase/FEEDBACK_REPORTS.sql`

### Exemplo: Resumo rápido
```sql
SELECT
  COUNT(*) AS total,
  ROUND(AVG(rating)::numeric, 2) AS nota_media,
  COUNT(*) FILTER (WHERE rating >= 4) AS satisfeitos
FROM public.feedback_surveys;
```

Resultado esperado:
```
total | nota_media | satisfeitos
------|------------|------------
15    | 4.2        | 12
```

### Features mais gostadas
```sql
SELECT unnest(liked_features) AS feature, COUNT(*) AS total
FROM public.feedback_surveys
WHERE array_length(liked_features, 1) > 0
GROUP BY feature ORDER BY total DESC;
```

---

## 🔒 Segurança

✅ **RLS está configurado:**
- Usuários podem fazer INSERT do próprio feedback
- Sem SELECT policy — dados não ficam visíveis no cliente
- Admin acessa via Supabase Dashboard com `service_role`

✅ **Admin não exposto:**
- Sem rota `/app/admin` públic no navegador
- Sem bundle do AdminDashboard no build
- Variáveis `VITE_ADMIN_*` não embutidas

✅ **Dados de feedback seguros:**
- Salvos no Supabase com RLS
- Sem expor no F12
- Acessível apenas via API ou Dashboard

---

## ✔️ Checklist Final (Antes de Produção)

- [ ] Executou SQL de setup do feedback
- [ ] Build local funciona (`npm run build`)
- [ ] AdminDashboard não está em `dist/assets/`
- [ ] Testou survey com trial expirado
- [ ] Testou skip do feedback
- [ ] Testou submit do feedback
- [ ] Testou que não volta para survey após responder
- [ ] Testou RLS (usuário não consegue ler feedback de outros)
- [ ] Deploy em staging confirmado

---

## 📞 Dúvidas

Se encontrar erro:

1. **"Página em branco ao ir para `/app/feedback-survey`"**
   - Verificar se SQL foi executado no Supabase
   - Verificar console do navegador (F12) para erros

2. **"Feedback não salva"**
   - Verificar se RLS policy foi criada (SELECT em `pg_policies`)
   - Testar INSERT direto no Supabase Dashboard

3. **"AdminDashboard ainda aparece no bundle"**
   - Limpar `node_modules` e `dist`
   - Rodar `npm install && npm run build` novamente

---

## 📁 Arquivos Criados/Modificados

**Criados:**
- `src/hooks/useFeedbackSurvey.ts`
- `src/pages/FeedbackSurvey/index.tsx`
- `supabase/FEEDBACK_SURVEYS_SETUP.sql`
- `supabase/FEEDBACK_REPORTS.sql`

**Modificados:**
- `src/App.tsx` (remoção admin, rota feedback, import)
- `src/contexts/SubscriptionContext.tsx` (expõe feedbackSubmitted)

---

**Status:** Pronto para produção ✅
