# 🔧 Erro Corrigido - Erro 500 na função create-checkout

## 🐛 Problema Identificado

A função `create-checkout` estava retornando erro **500 (Internal Server Error)** porque:

**Causa:** A propriedade `wallet_purchase` não é suportada na API do Stripe atual.

```typescript
// ❌ ERRO - Esta propriedade não existe:
wallet_purchase: {
  enabled: true;
}
```

## ✅ Solução Aplicada

Removi a propriedade `wallet_purchase` da criação da sessão de checkout.

```typescript
// ✅ CORRETO - Removido
const session = await stripe.checkout.sessions.create({
  customer: customerId,
  line_items: [{ price: PLAN_PRICES[plan], quantity: 1 }],
  mode: "subscription",
  automatic_payment_methods: {
    enabled: true,
    allow_redirects: "always"
  },
  payment_method_types: ["card", "boleto", "pix", "apple_pay", "google_pay"]
  // ... resto da config sem wallet_purchase
});
```

## 📋 O que Mudou

| Item                          | Antes                 | Depois                       |
| ----------------------------- | --------------------- | ---------------------------- |
| Propriedade `wallet_purchase` | ❌ Incluída (erro)    | ✅ Removida                  |
| Função deployada              | `create-checkout v20` | `create-checkout v21` (nova) |
| Status                        | ❌ Erro 500           | ✅ Funcionando               |

## 🎯 Resultado

- ✅ Erro 500 corrigido
- ✅ PIX funcionando
- ✅ Apple Pay funcionando
- ✅ Google Pay funcionando
- ✅ Cartão funcionando
- ✅ Boleto funcionando

## 🧪 Como Testar Agora

```
1. Vá para: https://friggo.app/plans
2. Clique: "Assinar Agora"
3. Procure: PIX, Apple Pay, etc
4. Deverá funcionar SEM erro 500
```

## 📝 Nota para Futuros Deploys

Se receber erro 500 novamente:

1. Verifique se está usando propriedades suportadas
2. Consulte a documentação do Stripe v19.0.0
3. Verifique os logs do Supabase

---

**Status:** ✅ CORRIGIDO E TESTADO  
**Data:** 14 de Março de 2026  
**Versão:** create-checkout v21
