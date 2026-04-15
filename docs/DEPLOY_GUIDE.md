# 🚀 Guia Completo de Deploy - Kaza

## ⚡ RESUMO DAS MUDANÇAS

- ✅ Atualizado Stripe de `18.5.0` → `19.0.0`
- ✅ Adicionado Apple Pay e Google Pay
- ✅ Adicionado PIX e Boleto
- ✅ Versão API Stripe atualizada para `2024-11-20`
- ✅ Edge Functions melhoradas com retry automático

---

## 🔐 PASSO 1: Fazer Login no Supabase

### Via Computer/Desktop:

```powershell
# No PowerShell, execute:
supabase login
```

**O que vai acontecer:**

1. Uma URL será exibida
2. Você será redirecionado para: https://supabase.com/dashboard/account/tokens
3. Crie um "Personal Access Token" (clique em "Create new token")
4. Copie o token e cole no PowerShell
5. Pressione Enter

**Alternativa - Se você já tem o token:**

```powershell
$env:SUPABASE_ACCESS_TOKEN = "seu_token_aqui"
```

---

## 🔗 PASSO 2: Link ao Projeto

```powershell
# Navegue até a pasta do projeto
cd "C:\Users\PC\Downloads\friggo-main\friggo-main"

# Link ao projeto
supabase link --project-ref pylruhvqjyvbninduzod

# Confirme dizendo "y" quando asked
```

**Sucesso:** Você verá: "Linked to project"

---

## 🔑 PASSO 3: Configurar Secrets do Stripe

### Obter as Chaves:

1. **Acesse:** https://dashboard.stripe.com/apikeys
2. **Copie:**

   - `Secret key` (comça com `sk_live_` ou `sk_test_`)
   - `Publishable key` (para referência)

3. **Vá para:** https://dashboard.stripe.com/webhooks
4. **Encontre seu endpoint** (provavelmente já existe)
5. **Copie:** `Signing secret` (começa com `whsec_`)

### Configurar no Supabase:

```powershell
# IMPORTANTE: Substitua pelos SEUS valores!

supabase secrets set `
  STRIPE_SECRET_KEY="sk_live_xxxxxxxxxxxxxxxxxxxxx" `
  STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxx"

# Verificar se foi salvo:
supabase secrets list
```

**Esperado:**

```
Name                         Value
STRIPE_SECRET_KEY            sk_live_xxx... (partially masked)
STRIPE_WEBHOOK_SECRET        whsec_xxx... (partially masked)
```

---

## 🚀 PASSO 4: Deploy das Edge Functions

```powershell
# Deploy create-checkout (NOVO - com Apple Pay)
supabase functions deploy create-checkout --project-ref pylruhvqjyvbninduzod

# Deploy stripe-webhook
supabase functions deploy stripe-webhook --project-ref pylruhvqjyvbninduzod

# Deploy check-subscription
supabase functions deploy check-subscription --project-ref pylruhvqjyvbninduzod

# Deploy customer-portal
supabase functions deploy customer-portal --project-ref pylruhvqjyvbninduzod

# Deploy generate-recipes
supabase functions deploy generate-recipes --project-ref pylruhvqjyvbninduzod

# Deploy generate-shopping-list
supabase functions deploy generate-shopping-list --project-ref pylruhvqjyvbninduzod

# Deploy smart-fridge
supabase functions deploy smart-fridge --project-ref pylruhvqjyvbninduzod
```

**Esperado para cada um:**

```
⚡ Functions deployed successfully
  [Function Name] deployed
```

---

## 🔗 PASSO 5: Configurar Webhook do Stripe

### Ativar Webhook:

1. **Acesse:** https://dashboard.stripe.com/webhooks
2. **Clique em:** "Add endpoint"
3. **Preencha:**

   - **URL:** `https://pylruhvqjyvbninduzod.supabase.co/functions/v1/stripe-webhook`
   - **API version:** Use a padrão (ou `2024-11-20`)

4. **Selecione eventos:**

   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.deleted`
   - ✅ `customer.subscription.updated`
   - ✅ `invoice.payment_succeeded`
   - ✅ `invoice.payment_failed`

5. **Clique em:** "Add endpoint"
6. **Copie o Signing secret** (apresentado na página de confirmação)
7. **Atualize o secret do Supabase:**
   ```powershell
   supabase secrets set STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxx"
   ```

---

## 🌐 PASSO 6: Deploy do Frontend

```powershell
# Instalar dependências (se necessário)
npm install

# Build do projeto
npm run build

# Se tiver Vercel/Netlify configurado:
npm run deploy

# Ou faça o deploy manualmente:
# - Netlify: drag & drop a pasta 'dist' no Netlify Dashboard
# - Vercel: `vercel deploy --prod`
# - Outro: Siga as instruções do seu host
```

---

## ✅ PASSO 7: Verificações Finais

### Teste de Conexão:

```javascript
// No console do navegador (F12):
const response = await fetch(
  "https://pylruhvqjyvbninduzod.supabase.co/functions/v1/create-checkout",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer seu_token_aqui",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ plan: "basic" })
  }
);
const data = await response.json();
console.log(data);
```

**Esperado:** Deverá retornar uma URL do Stripe Checkout

### Teste na Plataforma:

1. **Web:** `https://kaza.app/plans` → Clique em "Assinar"
2. **PWA:** Salve como app → Mesmo teste
3. **Android:** Abra o app → Navegue para Planos → Clique em "Assinar"

**Verifique:**

- ✅ Vê as opções: Cartão, PIX, Boleto, Apple Pay, Google Pay
- ✅ Clica em PIX e aparece QR code
- ✅ Após pagamento, volta ao app com `?subscription=success`

---

## 🧪 Teste Rápido com Cartão Stripe

**Use os dados de teste:**

- **Número:** `4242 4242 4242 4242`
- **Validade:** `12/25` (ou futura)
- **CVC:** `123`
- **Email:** Qualquer um

**Esperado:** ✅ Pagamento aprovado

---

## 🆘 Troubleshooting

### "Edge Function não está respondendo"

- Verifique se o deploy foi bem-sucedido: `supabase functions list --project-ref pylruhvqjyvbninduzod`
- Veja os logs: `supabase functions logs create-checkout`

### "PIX/Apple Pay não aparece"

- Verifique se está em modo de teste do Stripe
- Confirme que `payment_method_types` inclui os métodos desejados
- Para Apple Pay: Precisa estar em HTTPS + domínio válido

### "Webhook não está acionando"

- Verifique o Signing secret no Supabase
- Teste no Stripe Dashboard → Webhooks → seu endpoint → Test
- Veja os logs: `supabase functions logs stripe-webhook`

### "Erro de autenticação"

- Confirme que SUPABASE_ACCESS_TOKEN está configurado
- Faça login novamente: `supabase logout` → `supabase login`

---

## 📋 Checklist Final

- [ ] Login no Supabase (`supabase login`)
- [ ] Link ao projeto (`supabase link --project-ref pylruhvqjyvbninduzod`)
- [ ] Secrets configurados (`supabase secrets list`)
- [ ] Edge Functions deployadas (todas 7)
- [ ] Webhook do Stripe configurado
- [ ] Frontend buildado e deployado
- [ ] Teste de pagamento com PIX
- [ ] Teste de pagamento com Apple Pay (em iOS/macOS)
- [ ] Notificações de lixo testadas
- [ ] Logs verificados

---

## 📞 Logs para Debugging

```powershell
# Ver logs das Edge Functions:
supabase functions logs create-checkout
supabase functions logs stripe-webhook
supabase functions logs check-subscription

# Ver em tempo real:
supabase functions logs create-checkout --tail

# Exportar para arquivo:
supabase functions logs create-checkout > logs.txt
```

---

## 🎉 Sucesso!

Se tudo funcionou:

- ✅ PIX está ativo para pagamentos
- ✅ Apple Pay/Google Pay estão disponíveis
- ✅ Notificações de lixo funcionando
- ✅ Retry automático em caso de erro
- ✅ Sistema totalmente compatível com web, PWA e Android

**Próximo passo:** Comunicar aos usuários que PIX está disponível!

---

**Data:** 14 de março de 2026  
**Versão:** 1.0.0 - Deploy Completo  
**Status:** 🚀 Pronto para Produção
