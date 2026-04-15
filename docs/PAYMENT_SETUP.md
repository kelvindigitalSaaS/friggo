# Guia de Configuração — Pagamentos & Edge Functions

## 1. Pré-requisitos

| Ferramenta   | Versão mínima |
| ------------ | ------------- |
| Supabase CLI | `>= 1.160`    |
| Node.js      | `>= 18`       |
| Conta Stripe | Free tier     |

```bash
# instale o CLI do Supabase globalmente (se ainda não instalou)
npm install -g supabase
```

---

## 2. Variáveis de Ambiente necessárias

| Secret                  | Onde obter                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------ |
| `STRIPE_SECRET_KEY`     | Stripe Dashboard → Developers → API Keys → Secret key (`sk_live_xxx` ou `sk_test_xxx`)                 |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Developers → Webhooks → signing secret (`whsec_xxx`)                                |
| `GEMINI_API_KEY`        | [Google AI Studio](https://aistudio.google.com/app/apikey) — apenas se usar geração de receitas por IA |

---

## 3. Configurar secrets no Supabase

```bash
# faça login no Supabase
supabase login

# link ao projeto (execute na raiz do repositório)
supabase link --project-ref <SEU_PROJECT_REF>
# o Project Ref está em: Supabase Dashboard → Configurações do Projeto → General

# definir os secrets (uma vez é suficiente)
supabase secrets set STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxx
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxx
supabase secrets set GEMINI_API_KEY=AIzaSy_xxxxxxxxxxxxxxxxxx

# verificar
supabase secrets list
```

---

## 4. IDs dos planos Stripe (já configurados no código)

| Plano    | Price ID                         |
| -------- | -------------------------------- |
| Basic    | `price_1SxQCMH9gIP9tzTRnJX7vbWc` |
| Standard | `price_1SxQCcH9gIP9tzTRhSGp7AMi` |
| Premium  | `price_1SxQE1H9gIP9tzTRpqAhJFyB` |

> Esses IDs estão em `src/contexts/SubscriptionContext.tsx`. Se criar novos preços no Stripe, atualize lá.

---

## 5. Configurar o Webhook no Stripe

1. Acesse **Stripe Dashboard → Developers → Webhooks → Add endpoint**
2. URL do endpoint:
   ```
   https://<SEU_PROJECT_REF>.supabase.co/functions/v1/stripe-webhook
   ```
3. Eventos a escutar (selecione todos):
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
4. Copie o **Signing secret** (`whsec_xxx`) e salve como `STRIPE_WEBHOOK_SECRET` (passo 3 acima).

---

## 6. Deploy das Edge Functions

```bash
# deploy de todas as funções de uma vez
supabase functions deploy

# ou deploy individual
supabase functions deploy check-subscription
supabase functions deploy create-checkout
supabase functions deploy customer-portal
supabase functions deploy stripe-webhook
supabase functions deploy generate-recipes
supabase functions deploy generate-shopping-list
supabase functions deploy smart-fridge
```

---

## 7. Testar localmente

```bash
# serve as funções localmente (porta 54321 por padrão)
supabase functions serve --env-file .env.local

# .env.local deve conter:
# STRIPE_SECRET_KEY=sk_test_xxx
# STRIPE_WEBHOOK_SECRET=whsec_xxx
# GEMINI_API_KEY=AIzaSy_xxx
```

Para testar o webhook localmente, use o **Stripe CLI**:

```bash
stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhook
```

---

## 8. Variáveis do frontend (arquivo `.env`)

```env
VITE_SUPABASE_URL=https://<SEU_PROJECT_REF>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...  # anon/public key
```

> Nunca coloque a `STRIPE_SECRET_KEY` ou `service_role` key no frontend.

---

## 9. Verificar se os pagamentos estão funcionando

1. Use o cartão de teste Stripe: `4242 4242 4242 4242`, validade qualquer data futura, CVC qualquer.
2. Acesse a tela **Planos** no app → escolha um plano → confirme o pagamento.
3. Verifique na edge function `check-subscription` se o status retorna `active`.
4. No Supabase Dashboard → Edge Functions → Logs, confira se não há erros 500.

---

## 10. Samsung SmartThings (Smart Fridge)

```bash
supabase secrets set SMARTTHINGS_TOKEN=<seu_personal_access_token>
```

Token em: [SmartThings Developer Console](https://account.smartthings.com/tokens) → Generate new token → marcar todos os escopos de devices.
