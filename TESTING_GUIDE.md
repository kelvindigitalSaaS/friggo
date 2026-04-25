# 🧪 Guia de Testes Detalhado

## Antes de Iniciar

1. Certifique-se que SQL foi executado no Supabase
2. Rodou `npm run build` com sucesso
3. AdminDashboard não está no bundle

---

## Teste 1: Admin Removido ✅

**Objetivo:** Verificar que `/app/admin` não é acessível

### Passos:

1. Abra o app: `http://localhost:5173` (ou seu URL)
2. Faça login
3. Tente acessar manualmente: `http://localhost:5173/app/admin`

### Resultado Esperado:
- Página em branco ou "Not Found"
- Não carrega nenhuma interface admin
- Console do navegador sem erros

### Se falhar:
- Verificar se `src/App.tsx` tem a rota deletada
- Restartar dev server: `npm run dev`

---

## Teste 2: Trial Ativo (Sem Survey) ✅

**Objetivo:** Usuário com trial válido não vê survey

### Preparação:

```sql
-- Supabase Dashboard SQL Editor
UPDATE profiles 
SET trial_start_date = NOW() - interval '2 days',  -- 2 dias atrás
    feedback_submitted = false
WHERE user_id = 'seu_user_id';
```

### Passos:

1. Logout do app
2. Faça login novamente
3. Deve carregar home normalmente

### Resultado Esperado:
- ✅ Home carrega
- ✅ Nenhum redirecionamento para survey
- ✅ Trial banner mostra "5 dias restantes"

### Se falhar:
- Verificar `SubscriptionContext.tsx` — `isLocked` deve ser false
- Checar que `trial_start_date` está correto no Supabase

---

## Teste 3: Trial Expirado + Feedback Não Respondido ✅

**Objetivo:** User vê survey quando trial expira

### Preparação:

```sql
-- Supabase Dashboard SQL Editor
UPDATE profiles 
SET trial_start_date = NOW() - interval '8 days',  -- 8 dias atrás
    feedback_submitted = false
WHERE user_id = 'seu_user_id';
```

### Passos:

1. Logout do app
2. Faça login novamente
3. Aguarde carregamento completo

### Resultado Esperado:
- ✅ Redireciona para `/app/feedback-survey`
- ✅ Mostra página com "Seu feedback é importante"
- ✅ 4 steps visíveis (barra de progresso)
- ✅ Botões: "Pular" e "Próximo"

### Se falhar:
- Verificar que `trial_start_date` foi atualizado
- Checar `SubscriptionContext.tsx` — `isLocked` deve ser true
- Verificar console para erros de import

---

## Teste 4: Navegar pelos Steps ✅

**Objetivo:** Validar que cada step funciona

### De onde começar:
Deve estar em `/app/feedback-survey` (do Teste 3)

### Passo 1 - Avaliação:

1. Clique em nenhuma estrela
2. Clique "Próximo"
3. **Deve mostrar erro:** "Por favor, selecione uma avaliação"

Corrija:
1. Clique em 4 estrelas
2. Clique "Próximo"
3. **Deve avançar para Step 2**

✅ **Resultado:** Validação funciona

### Passo 2 - O que gostou:

1. Clique "Próximo" sem selecionar nada
2. **Deve mostrar erro:** "Por favor, selecione pelo menos uma opção"

Corrija:
1. Selecione 2 opções (ex: "Alertas" e "Receitas")
2. Clique "Próximo"
3. **Deve avançar para Step 3**

✅ **Resultado:** Checkboxes funcionam

### Passo 3 - O que mudaria:

1. Clique "Próximo" sem selecionar nada
2. **Deve mostrar erro:** "Por favor, selecione pelo menos uma opção"

Corrija:
1. Selecione "Outro"
2. Campo de texto deve aparecer
3. Escreva: "Mais integração com Alexa"
4. Clique "Próximo"
5. **Deve avançar para Step 4**

✅ **Resultado:** Checkboxes + textarea funcionam

### Passo 4 - Por que não assinar:

1. Clique "Enviar feedback" sem selecionar razão
2. **Botão deve estar disabled (cinzento)**

Corrija:
1. Selecione "O preço não cabe no meu orçamento"
2. Botão fica enabled (verde)
3. Clique "Enviar feedback"

---

## Teste 5: Submit Feedback ✅

**Objetivo:** Dados salvos no Supabase

### Do ponto anterior:
Você clicou "Enviar feedback"

### Resultado Esperado:
- ✅ Botão muda para "Enviando..."
- ✅ Redireciona para `/app/home?subscription=open`
- ✅ Vê paywall (planos Individual/MultiPRO)

### Verificar dados no Supabase:

```sql
SELECT 
  user_id,
  rating,
  liked_features,
  improvement_areas,
  no_purchase_reason,
  improvement_freetext
FROM public.feedback_surveys
WHERE user_id = 'seu_user_id'
ORDER BY submitted_at DESC
LIMIT 1;
```

**Resultado esperado:**
```
user_id                  | seu_user_id
rating                   | 4
liked_features           | {alertas,receitas}
improvement_areas        | {outro}
no_purchase_reason       | price
improvement_freetext     | Mais integração com Alexa
```

✅ **Dados salvos corretamente**

### Se falhar:

**Erro: "Erro ao enviar feedback"**
- Verificar console (F12) para mensagem detalhada
- Verificar que RLS policy foi criada
- Verificar que `feedback_surveys` tabela existe

**Feedback não aparece em banco:**
- Verificar que `INSERT` foi executado
- Verificar RLS: `SELECT * FROM pg_policies WHERE tablename = 'feedback_surveys';`
- Testar INSERT manual no SQL Editor

---

## Teste 6: Skip Feedback ✅

**Objetivo:** Pular sem responder

### Preparação:

```sql
-- Novo usuário para teste, ou resetar:
UPDATE profiles 
SET trial_start_date = NOW() - interval '8 days',
    feedback_submitted = false
WHERE user_id = 'seu_user_id_2';
```

### Passos:

1. Login com esse usuário
2. Redireciona para survey
3. **Clique "Pular" (qualquer step)**

### Resultado Esperado:
- ✅ Redireciona para `/app/home?subscription=open`
- ✅ Vê paywall imediatamente
- ✅ Nenhum `INSERT` em `feedback_surveys`

### Verificar:

```sql
SELECT COUNT(*) FROM public.feedback_surveys 
WHERE user_id = 'seu_user_id_2';

-- Resultado esperado: 0 (nenhum feedback)
```

✅ **Skip funcionando**

---

## Teste 7: Não volta para Survey ✅

**Objetivo:** Após responder/skip, usuário não volta para survey

### Preparação:
Continue do Teste 6 (user já respondeu ou skipou)

### Passos:

1. Você está em `/app/home?subscription=open`
2. Recarregue a página (F5)
3. **Deve ficar no mesmo lugar**

### Resultado Esperado:
- ✅ Paywall continua visível
- ✅ Nenhum redirecionamento para survey
- ✅ URL se mantém em `?subscription=open`

✅ **Não há loop infinito**

---

## Teste 8: RLS - Segurança ✅

**Objetivo:** Usuário normal não consegue ler feedback de outro

### Preparação:
Estar logado como um usuário comum

### Passos:

1. Abra console (F12)
2. Cole:

```javascript
const { data, error } = await fetch(
  'https://nrfketkwajzkmrlkvoyd.supabase.co/rest/v1/feedback_surveys',
  {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('sb-nrfketkwajzkmrlkvoyd-auth-token')}`,
      'apikey': 'VITE_SUPABASE_ANON_KEY_AQUI'
    }
  }
).then(r => r.json());

console.log(data);
```

### Resultado Esperado:
- ❌ Retorna erro: "insufficient privileges" ou vazio
- **NÃO mostra feedback de outros usuários**

✅ **RLS está protegendo os dados**

---

## Teste 9: Build Final ✅

**Objetivo:** Garantir que build de produção não tem admin

### Passos:

```bash
npm run build

# Verificar tamanho dos arquivos
ls -la dist/assets/ | grep -E "(Admin|admin)"

# Resultado esperado: nenhuma linha
```

✅ **AdminDashboard não está no bundle de produção**

---

## Teste 10: Relatório SQL ✅

**Objetivo:** Queries de análise funcionam

### Passos:

1. Supabase Dashboard > SQL Editor
2. Copie cada query do arquivo `supabase/FEEDBACK_REPORTS.sql`
3. Execute

### Resultado Esperado (exemplo):

**Query 1: Resumo geral**
```sql
SELECT COUNT(*), ROUND(AVG(rating)::numeric, 2) 
FROM public.feedback_surveys;
```
Retorna:
```
count | round
------|-------
3     | 4.0
```

**Query 2: Features mais gostadas**
```sql
SELECT unnest(liked_features), COUNT(*) 
FROM public.feedback_surveys 
GROUP BY 1 ORDER BY 2 DESC;
```
Retorna:
```
unnest   | count
---------|-------
alertas  | 3
receitas | 2
```

✅ **Relatórios funcionando**

---

## Checklist Final

- [ ] Teste 1: Admin removido ✅
- [ ] Teste 2: Trial ativo (sem survey) ✅
- [ ] Teste 3: Trial expirado (survey) ✅
- [ ] Teste 4: Navegação pelos steps ✅
- [ ] Teste 5: Submit feedback ✅
- [ ] Teste 6: Skip feedback ✅
- [ ] Teste 7: Não volta para survey ✅
- [ ] Teste 8: RLS seguro ✅
- [ ] Teste 9: Build sem admin ✅
- [ ] Teste 10: Relatórios SQL ✅

**Se todos os testes passarem → Seguro fazer deploy! 🚀**

---

## Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Survey em branco | Verificar console F12 para erros |
| Botão "Enviar" cinzento | Selecionar razão de não assinar |
| Dados não salvam | Verificar RLS: `SELECT * FROM pg_policies WHERE tablename = 'feedback_surveys'` |
| AdminDashboard aparece | Limpar `dist/` e `node_modules`, rodar `npm install && npm run build` |
| Trial não expira | Verificar `trial_start_date` no Supabase |

---

_Última atualização: 2026-04-24_
