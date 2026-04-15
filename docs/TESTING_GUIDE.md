# Guia de Teste - PIX, Pagamentos e Notificações do Lixo

## 1. Testar PIX como Método de Pagamento

### Na Web/PWA:

1. **Acesse:** `https://friggo.app/plans` (ou localmente em desenvolvimento)
2. **Clique em:** "Assinar Agora" em qualquer plano
3. **Verifique:**
   - ✅ Você é redirecionado para o Stripe Checkout
   - ✅ Na página de pagamento, você vê as opções:
     - **Cartão de Crédito/Débito**
     - **PIX** (novo!)
     - **Boleto**
     - **Google Pay / Apple Pay** (se disponível)
4. **Teste com PIX:**
   - Selecione "PIX"
   - Use dados de teste do Stripe (ver tabela abaixo)
   - Confirme o pagamento

### No App Android:

1. **Abra o app Friggo de teste**
2. **Navegue para:** Perfil → Planos
3. **Clique em:** "Assinar Agora"
4. **Verifique:**
   - ✅ Abre o Stripe Checkout em um WebView
   - ✅ PIX aparece como opção de pagamento
   - ✅ Após o pagamento, volta para o app (deep linking)

### Dados de Teste do Stripe

| Método                | Dados                 | Resultado                              |
| --------------------- | --------------------- | -------------------------------------- |
| **Cartão - Sucesso**  | `4242 4242 4242 4242` | ✅ Pagamento aprovado                  |
| **Cartão - Recusado** | `4000 0000 0000 0002` | ❌ Pagamento recusado                  |
| **PIX (Teste)**       | Use qualquer email    | 🔔 Pagamento pendente (espere webhook) |
| **Boleto (Teste)**    | Use qualquer email    | 🔔 Boleto gerado                       |

**Para datas e CVC:** Use qualquer data futura + qualquer CVC (ex: 12/25, 123)

---

## 2. Testar Notificações de Coleta de Lixo

### Configurar Lembretes:

1. **Abra o app (web, PWA ou Android)**
2. **Navegue para:** Perfil → Lembrete do Lixo (ou menu de configurações)
3. **Configure:**
   - ✅ **Ativar Lembrete:** Marque a opção
   - ✅ **Dias de Coleta:** Selecione, por exemplo: Segunda e Quinta
   - ✅ **Horário:** Defina para 20:00 (ou um horário próximo para testar mais rápido)
   - ✅ **Local:** Escolha entre "Rua" ou "Prédio"
   - ✅ **Clique em:** "Salvar Configurações"

### Teste de Notificações:

#### 🌐 **Na Web/PWA:**

- **Notificações esperadas:** 3 notificações antes do horário
  - 1️⃣ **24 horas antes** do dia de coleta
  - 2️⃣ **12 horas antes**
  - 3️⃣ **1 hora antes\***
- **Exemplo:** Se configurar coleta na quinta-feira às 20:00

  - Notif 1: ⏰ Quarta-feira às 20:00
  - Notif 2: ⏰ Quinta-feira de manhã (08:00)
  - Notif 3: ⏰ Quinta-feira às 19:00

- **Permissão de Notificações:**
  - ✅ O app pedirá permissão para notificações
  - ✅ Aceite na primeira vez
  - ✅ Permita notificações do navegador/PWA

#### 📱 **No App Android:**

- **Notificações esperadas:** 1 notificação no horário exato

  - ⏰ No dia de coleta, no horário configurado (ex: Quinta-feira 20:00)

- **Permissão de Notificações:**
  - ✅ O app pedirá permissão ao primeira vez
  - ✅ Aceite "Permitir notificações"

### Testar Mais Rápido:

1. Abra DevTools (F12 na web)
2. Mude a data/hora do sistema para antes da data de coleta configurada
3. Recarregue o app
4. Você deve receber as notificações imediatamente

---

## 3. Testar Fluxo Completo de Pagamento

### ✅ Passo 1: Crie uma Conta

- Registre-se em `https://friggo.app` (ou local em desenvolvimento)
- Confirme o email (verifique spam)

### ✅ Passo 2: Escolha um Plano

- Vá para **Planos**
- Clique em **"Assinar Agora"** para qualquer plano
- O app redireciona para o Stripe Checkout

### ✅ Passo 3: Teste PIX

- Na página de pagamento, selecione **PIX**
- Digite um email de teste
- Clique em **"Assinar"**
- Você verá um código QR ou chave PIX

### ✅ Passo 4: Verificar Webhook

- O webhook do Stripe será chamado automaticamente
- Você será redirecionado de volta para `https://friggo.app/?subscription=success`
- A assinatura deve ser ativada no Supabase

### ✅ Passo 5: Validar Assinatura

- Vá para **Perfil**
- Você deve ver seu plano ativo como **"Padrão"** ou **"Premium"**
- Data de expiração deve ser ~30 dias no futuro
- Clique em **"Gerenciar Assinatura"** para abrir o portal Stripe

---

## 4. Checklist de Verificação

### ✅ Pagamento com PIX

- [ ] PIX aparece no Stripe Checkout
- [ ] PIX funciona na web
- [ ] PIX funciona no app Android
- [ ] Webhook do Stripe é acionado após pagamento
- [ ] Assinatura é ativada automaticamente

### ✅ Notificações de Coleta de Lixo

- [ ] Lembretes podem ser configurados
- [ ] PWA recebe 3 notificações em momentos diferentes
- [ ] App Android recebe 1 notificação no horário exato
- [ ] Notificações mostram o local correto ("Rua" ou "Prédio")
- [ ] Andar é adicionado à mensagem (se aplicável)

### ✅ Compatibilidade

- [ ] Funciona na web (navegador desktop)
- [ ] Funciona em PWA (salve como app no móvel)
- [ ] Funciona no app Android nativo
- [ ] Funciona em iOS (se aplicável)

---

## 5. Logs para Debugging

### Ver Logs do Backend (Supabase):

```bash
# No seu terminal com Supabase CLI
supabase functions logs create-checkout
supabase functions logs stripe-webhook
```

### Ver Logs no Frontend (Console):

```javascript
// Abra o DevTools (F12) e veja a aba Console
// Você verá logs como:
// [CREATE-CHECKOUT] Function started
// [CREATE-CHECKOUT] Plan selected
// [Checkout] Tentativa 1/3...
```

### Testar Webhook Localmente:

```bash
# Use Stripe CLI para simular webhooks
stripe listen --forward-to localhost:54321/functions/v1/stripe-webhook
stripe trigger payment_intent.succeeded
```

---

## 6. Possíveis Erros e Soluções

| Erro                          | Causa                                               | Solução                                                        |
| ----------------------------- | --------------------------------------------------- | -------------------------------------------------------------- |
| "Sessão de checkout inválida" | Chaves do Stripe não configuradas                   | Verifique `STRIPE_SECRET_KEY` em Supabase Secrets              |
| "No checkout data returned"   | Edge Function está falhando                         | Veja logs da função no Supabase Dashboard                      |
| Notificações não aparecem     | Permissão não foi concedida                         | Permita notificações no navegador/app                          |
| PIX não aparece no checkout   | Locale incorreto ou payment methods não habilitados | Verifique `payment_method_types` em `create-checkout/index.ts` |
| "Erro ao abrir portal"        | Customer não encontrado no Stripe                   | Faça uma compra primeiro para sincronizar                      |

---

## 7. Limpar Dados de Teste

### ⚠️ Para Remover Configurações de Lembrete:

```javascript
// No console do navegador:
localStorage.removeItem("friggo-garbage-reminder");
location.reload();
```

### 🔄 Para Resetar Assinatura de Teste:

1. Vá ao Dashboard Stripe → Customers
2. Encontre seu email de teste
3. Cancele a assinatura
4. Se necessário, delete a assinatura

---

## 8. Contato e Suporte

Se encontrar erros, recolha:

- 📋 Mensagem de erro exata
- 📱 Se é web, PWA ou app Android
- 🌍 URL/rota onde ocorreu o erro
- 📊 Logs do console do navegador (DevTools → Console)
- 🔧 Logs do Supabase (Dashboard → Functions)
