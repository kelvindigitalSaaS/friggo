# 🌍 Estratégia de Internacionalização — Stripe (USD) + Cakto (BRL)

> **Objetivo:** Vender assinaturas do Kaza para o mercado internacional em dólar via Stripe, mantendo a Cakto para o mercado brasileiro em real.  
> **Resultado:** Mesmo app, mesmo banco, mesmo deploy. Zero duplicação.

---

## 1. Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────┐
│              MESMO APP — app.kaza.com            │
│                                                  │
│   Usuário acessa → detecta região                │
│        │                       │                 │
│   🇧🇷 Brasil               🌍 Exterior           │
│        │                       │                 │
│   Cakto (BRL)             Stripe (USD)           │
│   PIX + Cartão            Cartão                 │
│   Pede CPF                Pede Tax ID local      │
│        │                       │                 │
│   Webhook Cakto          Webhook Stripe          │
│        │                       │                 │
│        └───────┬───────────────┘                 │
│                ▼                                 │
│     Supabase — tabela subscriptions              │
│     (payment_provider = "cakto" ou "stripe")     │
│                                                  │
│     App funciona igual para todos ✅              │
└─────────────────────────────────────────────────┘
```

---

## 2. Por Que NÃO Precisa Duplicar Nada

| Preocupação | Resposta |
|---|---|
| Banco de dados separado? | **Não.** A tabela `subscriptions` já tem `payment_provider` e `payment_id`. Basta salvar `"stripe"` ou `"cakto"`. |
| Subdomínio (en.kaza.com)? | **Não.** O app já tem i18n (pt-BR / en / es). O mesmo domínio serve todos os idiomas. |
| CPF / Tax ID por país? | **Não precisa implementar.** Cada gateway cuida do seu: Cakto pede CPF, Stripe pede o documento fiscal correto do país automaticamente. |
| Código duplicado? | **Não.** Só muda o `startCheckout` — um `if/else` que decide Cakto ou Stripe. |
| Landing page separada? | **Opcional.** Pode ter `kaza.com` (EN) e `kaza.com.br` (PT), ambas apontando pro mesmo app. Mas é marketing, não código. |

---

## 3. O Que Já Está Pronto (Zero Mudança)

- ✅ Tabela `subscriptions` com colunas `payment_provider`, `payment_id`, `price`
- ✅ i18n completo (pt-BR, en, es) no `LanguageContext`
- ✅ CSP no `vercel.json` já permite `api.stripe.com` e `js.stripe.com`
- ✅ `startCheckout` já funciona como redirect externo
- ✅ Lógica de planos (`individualPRO`, `multiPRO`) é agnóstica de moeda
- ✅ `check-subscription` Edge Function já existe

---

## 4. O Que Precisa Implementar

### 4.1 Conta Stripe (~10 min)

1. Criar conta em [stripe.com](https://stripe.com) (aceita CNPJ brasileiro)
2. Criar 2 **Products** com preço em USD:
   - `Kaza individualPRO` → **$3.99/month**
   - `Kaza multiPRO` → **$6.99/month**
3. Anotar os `price_id` (ex: `price_1Abc123...`)
4. Ativar Tax ID Collection:
   - Dashboard → Settings → Checkout → ☑️ Collect Tax IDs
5. Guardar:
   - `STRIPE_SECRET_KEY` (sk_live_xxx)
   - `STRIPE_WEBHOOK_SECRET` (whsec_xxx)
   - `STRIPE_PRICE_INDIVIDUAL` (price_xxx)
   - `STRIPE_PRICE_MULTI` (price_xxx)

### 4.2 Edge Function: `create-stripe-session` (~30 min)

Cria uma Stripe Checkout Session e retorna a URL para redirect.

```typescript
// supabase/functions/create-stripe-session/index.ts
import Stripe from "npm:stripe@17";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);

const PRICE_IDS: Record<string, string> = {
  individualPRO: Deno.env.get("STRIPE_PRICE_INDIVIDUAL")!,
  multiPRO: Deno.env.get("STRIPE_PRICE_MULTI")!,
};

Deno.serve(async (req) => {
  const { plan, user_id, email, success_url, cancel_url } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [{ price: PRICE_IDS[plan], quantity: 1 }],
    success_url: success_url || "https://app.kaza.com/app?subscription=success",
    cancel_url: cancel_url || "https://app.kaza.com/app?subscription=canceled",
    metadata: { user_id, plan },
    tax_id_collection: { enabled: true },
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { "Content-Type": "application/json" },
  });
});
```

### 4.3 Edge Function: `stripe-webhook` (~30 min)

Processa eventos do Stripe e atualiza a tabela `subscriptions`.

```typescript
// supabase/functions/stripe-webhook/index.ts
import Stripe from "npm:stripe@17";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

Deno.serve(async (req) => {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const { createClient } = await import("npm:@supabase/supabase-js@2");
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Assinatura confirmada
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const plan = session.metadata?.plan;

    if (userId && plan) {
      await supabase.from("subscriptions").upsert({
        user_id: userId,
        plan: plan,
        plan_tier: plan,
        is_active: true,
        payment_provider: "stripe",
        payment_id: session.subscription as string,
        price: plan === "multiPRO" ? 6.99 : 3.99,
        items_limit: -1,
        recipes_per_day: -1,
        shopping_list_limit: -1,
        notification_change_days: 0,
        started_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
    }
  }

  // Assinatura cancelada
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    await supabase.from("subscriptions")
      .update({ is_active: false })
      .eq("payment_id", sub.id)
      .eq("payment_provider", "stripe");
  }

  // Pagamento recorrente falhou
  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice;
    if (invoice.subscription) {
      await supabase.from("subscriptions")
        .update({ is_active: false })
        .eq("payment_id", invoice.subscription as string)
        .eq("payment_provider", "stripe");
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
});
```

### 4.4 Detecção de Região (~10 min)

```typescript
// src/lib/regionDetect.ts

/**
 * Detecta se o usuário é do Brasil.
 * Prioridade: idioma do app > navigator > timezone
 */
export function detectBrazil(): boolean {
  // 1. Idioma escolhido no app
  const appLang = localStorage.getItem("Kaza-language");
  if (appLang === "pt-BR") return true;
  if (appLang === "en" || appLang === "es") return false;
  
  // 2. Navigator language
  const navLang = navigator.language || "";
  if (navLang.startsWith("pt-BR") || navLang === "pt") return true;
  
  // 3. Timezone brasileira
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  const brTimezones = [
    "America/Sao_Paulo", "America/Fortaleza", "America/Recife",
    "America/Bahia", "America/Belem", "America/Manaus",
    "America/Cuiaba", "America/Porto_Velho", "America/Rio_Branco",
    "America/Campo_Grande", "America/Boa_Vista", "America/Maceio",
    "America/Araguaina", "America/Noronha", "America/Santarem",
    "America/Eirunepe"
  ];
  if (brTimezones.some(t => tz.startsWith(t))) return true;
  
  return false;
}
```

### 4.5 Atualizar `startCheckout` no `SubscriptionContext.tsx` (~20 min)

```typescript
// Substituir o startCheckout atual por:

const startCheckout = useCallback(async (plan: SubscriptionPlan) => {
  if (plan === "free") return;
  
  const effectivePlan = (plan === "premium" || plan === "individualPRO") 
    ? "individualPRO" : "multiPRO";

  const isBrazil = detectBrazil();

  if (isBrazil) {
    // ━━━ CAKTO (Brasil / BRL) ━━━
    const CAKTO_LINKS = {
      individualPRO: "https://pay.cakto.com.br/356go8z",
      multiPRO: "https://pay.cakto.com.br/wbjq4ne_846287"
    };
    let url = CAKTO_LINKS[effectivePlan as keyof typeof CAKTO_LINKS];
    if (user?.email) {
      url += `${url.includes("?") ? "&" : "?"}email=${encodeURIComponent(user.email)}`;
    }
    await openExternalUrl(url);
  } else {
    // ━━━ STRIPE (Internacional / USD) ━━━
    const { data, error } = await supabase.functions.invoke("create-stripe-session", {
      body: {
        plan: effectivePlan,
        user_id: user?.id,
        email: user?.email,
        success_url: `${window.location.origin}/app?subscription=success`,
        cancel_url: `${window.location.origin}/app?subscription=canceled`,
      }
    });
    if (error) throw new Error("Não foi possível iniciar o checkout.");
    if (data?.url) await openExternalUrl(data.url);
  }
}, [user]);
```

### 4.6 UI de Preços Dinâmica (~30 min)

```typescript
// Preços por moeda
export const PLAN_PRICES = {
  individualPRO: { brl: 19.90, usd: 3.99 },
  multiPRO:      { brl: 37.90, usd: 6.99 },
};

// Helper para formatar preço
export function formatPrice(plan: string, isBrazil: boolean): string {
  const prices = PLAN_PRICES[plan as keyof typeof PLAN_PRICES];
  if (!prices) return "";
  return isBrazil 
    ? `R$ ${prices.brl.toFixed(2).replace(".", ",")}` 
    : `$${prices.usd.toFixed(2)}`;
}

// Uso nos componentes:
// const isBR = detectBrazil();
// <span>{formatPrice("individualPRO", isBR)}/mês</span>
```

---

## 5. Tax ID / CPF por País

| Gateway | Mercado | Documento Fiscal | Quem Coleta? |
|---|---|---|---|
| **Cakto** | 🇧🇷 Brasil | CPF / CNPJ | Cakto (no checkout dela) |
| **Stripe** | 🇺🇸 EUA | Nenhum (SaaS não exige SSN) | — |
| **Stripe** | 🇪🇺 Europa | VAT Number | Stripe (automático) |
| **Stripe** | 🇲🇽 México | RFC | Stripe (automático) |
| **Stripe** | 🇦🇷 Argentina | CUIT | Stripe (automático) |
| **Stripe** | 🇨🇴 Colômbia | NIT | Stripe (automático) |
| **Stripe** | 🇨🇱 Chile | RUT | Stripe (automático) |
| **Stripe** | 🇯🇵 Japão | JCT Number | Stripe (automático) |

> **Você não coleta, não valida, e não armazena nenhum documento fiscal.**  
> Cada gateway cuida do seu mercado. O Kaza só precisa saber: `payment_provider = "cakto" | "stripe"`.

---

## 6. Variáveis de Ambiente Necessárias

Adicionar ao Supabase (Settings → Edge Functions → Secrets):

```env
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
STRIPE_PRICE_INDIVIDUAL=price_xxxxxxxxxxxx
STRIPE_PRICE_MULTI=price_xxxxxxxxxxxx
```

---

## 7. Configuração do Webhook no Stripe

1. Stripe Dashboard → Developers → Webhooks
2. Add Endpoint: `https://<projeto>.supabase.co/functions/v1/stripe-webhook`
3. Eventos para escutar:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
   - `customer.subscription.updated`
   - `invoice.payment_failed`
   - `invoice.payment_succeeded`

---

## 8. Customer Portal (Gestão de Assinatura)

O Stripe oferece um portal pré-built para o assinante:
- Cancelar assinatura
- Trocar de plano
- Atualizar cartão
- Ver faturas

Ativar: Dashboard → Settings → Billing → Customer Portal → Configure

No app, abrir com:

```typescript
// Edge Function: customer-portal
const session = await stripe.billingPortal.sessions.create({
  customer: stripeCustomerId,
  return_url: "https://app.kaza.com/app/settings",
});
return new Response(JSON.stringify({ url: session.url }));
```

---

## 9. Custos

| Gateway | Taxa por transação | Mensalidade |
|---|---|---|
| **Cakto** | Depende do plano Cakto | Depende |
| **Stripe** (internacional) | 2.9% + $0.30 | $0 |
| **Stripe** (cobrança em BRL) | 3.99% + R$0.39 | $0 |

---

## 10. Cronograma Estimado

| # | Etapa | Tempo |
|---|---|---|
| 1 | Conta Stripe + Products/Prices | 10 min |
| 2 | Edge Function `create-stripe-session` | 30 min |
| 3 | Edge Function `stripe-webhook` | 30 min |
| 4 | `detectBrazil()` util | 10 min |
| 5 | Atualizar `startCheckout` (multi-gateway) | 20 min |
| 6 | UI de preços dinâmica (R$ / $) | 30 min |
| 7 | Teste completo (Stripe test mode) | 30 min |
| **Total** | | **~2.5 horas** |

---

## 11. Checklist de Deploy

- [ ] Criar conta Stripe e configurar Products
- [ ] Adicionar secrets ao Supabase
- [ ] Deployar `create-stripe-session` Edge Function
- [ ] Deployar `stripe-webhook` Edge Function
- [ ] Configurar webhook endpoint no Stripe Dashboard
- [ ] Ativar Tax ID Collection no Stripe
- [ ] Ativar Customer Portal no Stripe
- [ ] Implementar `detectBrazil()` no frontend
- [ ] Atualizar `startCheckout` para roteamento dual
- [ ] Atualizar componentes de preço para exibir R$ ou $
- [ ] Testar em Stripe Test Mode com cartão `4242 4242 4242 4242`
- [ ] Testar webhook localmente com `stripe listen --forward-to`
- [ ] Ativar Stripe Live Mode
- [ ] Monitorar primeiras transações no Dashboard
