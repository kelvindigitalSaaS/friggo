# 🎯 PRÓXIMAS AÇÕES - FRIGGO (Abril 2026)

---

## 🗄️ BANCO DE DADOS — O QUE COLAR NO SUPABASE

### Passo a passo para aplicar a migração:

1. Acesse o **Supabase Dashboard** → seu projeto (`pylruhvqjyvbninduzod`)
2. Vá em **SQL Editor**
3. Clique em **New Query**
4. Cole o conteúdo **COMPLETO** do arquivo:
   ```
   supabase/migrations/20260306_consumables_notifications.sql
   ```
5. Clique em **Run** (ou Ctrl+Enter)
6. Deve retornar "Success. No rows returned." para cada comando

### O que esse SQL cria:

| Tabela | Função |
|--------|--------|
| `consumables` | Estoque de consumíveis (papel, detergente, etc.) com `daily_consumption`, `min_stock`, `is_hidden` |
| `notification_preferences` | Preferências de notificação por usuário (expiring_items, low_stock, garbage, timer, shopping, quiet hours) |
| `favorite_recipes` | Receitas favoritadas pelo usuário (unique por user + recipe_name) |
| `garbage_reminders` | Config do lembrete do lixo (dias, horário, local, prédio) |
| `consumable_logs` | Histórico de débitos/reposições de consumíveis |

### Todas as tabelas incluem:
- ✅ Row Level Security (RLS) — cada usuário só vê seus dados
- ✅ Policies de SELECT, INSERT, UPDATE, DELETE
- ✅ Triggers de `updated_at` automático
- ✅ Trigger automático: ao criar perfil, cria `notification_preferences` padrão

### ⚠️ IMPORTANTE:
- O SQL é **idempotente** — pode rodar quantas vezes quiser sem erro
- Se a tabela `profiles` já existir (do schema anterior), os triggers se conectam a ela
- A migration anterior (`20260305_full_schema.sql`) **deve** já estar aplicada antes

---

## 🔧 O QUE FOI FEITO (Sessão Atual)

### ✅ Receitas
- [x] 2500+ receitas no app (819 originais + ~1680 geradas automaticamente)
- [x] Emojis por categoria no lugar de fotos (🍝🥩🍗🦐🍜🥗🥬🍚🔥🍬🎂🍞☕💪🥪🍱🌮🌱🍖🐟🥤🍰)
- [x] Header compacto na página da receita (removido ícone gigante h-48)
- [x] "Sugestão do dia" abre a receita específica ao clicar

### ✅ Modo Cozinha (Timer)
- [x] Timer circular com progresso visual (SVG animado)
- [x] Presets rápidos: 1, 3, 5, 10, 15, 20, 30 minutos
- [x] Input personalizado para qualquer tempo
- [x] Beep sonoro com Web Audio API (5 tons ao acabar)
- [x] Notificação nativa do sistema quando timer acaba
- [x] Toast persistente (10s) ao finalizar
- [x] Pausar / Continuar / Cancelar timer

### ✅ Lista de Compras
- [x] Modal adaptativo com Dialog (Radix UI) no lugar de `window.confirm`
- [x] Ícone de alerta + botões de Cancelar/Excluir

### ✅ Lembrete do Lixo
- [x] Corrigido para permitir lembrete NO DIA ATUAL (antes pulava para dia-1)
- [x] Considera hora + minuto na comparação (não só hora)

### ✅ Consumíveis
- [x] Botão de olho (👁️) em cada consumível para ocultar/exibir individualmente
- [x] Switch global "Mostrar ocultos" quando há itens ocultos
- [x] Clicar no card (ícone + nome + info) abre a tela de configuração do item
- [x] Propriedade `hidden` por item

### ✅ Banco de Dados
- [x] SQL completo para 5 tabelas novas com RLS

---

## ⚠️ PENDENTES / NÃO FINALIZADO

### 🔴 Consumíveis — Persistência
- Os dados de consumíveis estão em `useState` local — **ao recarregar a página, voltam ao padrão**
- Para funcionar de verdade, precisa conectar ao Supabase (tabela `consumables`)
- A tela de edição configura ícone, nome, consumo/dia e estoque mín — tudo funcional em memória

### 🔴 Notificações — Integração com Preferências do BD
- A tabela `notification_preferences` existe no SQL mas **não está conectada ao front**
- Atualmente, notificações usam `localStorage` — migrar para Supabase quando for persistir

### 🟡 Receitas — Geração Performance
- O bundle JS ficou grande (~1.9 MB) porque as 1680 receitas extras são geradas em tempo de build
- Considerar lazy-loading ou separar em chunk com `import()` dinâmico

---

## 🚀 Deploy

### Build:
```powershell
cd "C:\Users\CAIO\Desktop\erpfinalajustes\FRIGGO"
npm run build
```

### O que verificar antes de deploy:
1. ✅ `npx tsc --noEmit` — sem erros de tipo
2. ✅ `npx vite build` — build OK (PWA gerado com 48 entries)
3. Cole o SQL no Supabase SQL Editor
4. Configure webhook do Stripe (ver seção anterior mantida abaixo)

---

## 🔥 Webhook do Stripe (manter configurado)

1. **URL:** `https://pylruhvqjyvbninduzod.supabase.co/functions/v1/stripe-webhook`
2. **Eventos:**
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.deleted`
   - `customer.subscription.updated`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

---

## 📂 Arquivos Modificados Nesta Sessão

| Arquivo | O que mudou |
|---------|-------------|
| `src/data/recipeDatabase.ts` | Restaurou 34 imports + gerou ~1680 receitas extras |
| `src/components/friggo/RecipeCard.tsx` | Emojis por categoria + export `getCategoryEmoji()` |
| `src/pages/RecipePage.tsx` | Header compacto + Timer com beep no modo cozinha |
| `src/components/friggo/tabs/ShoppingTab.tsx` | Dialog no lugar de `window.confirm` |
| `src/components/friggo/tabs/HomeTab.tsx` | Sugestão do dia navega para receita específica |
| `src/pages/ConsumableTrackerPage.tsx` | Olho por item + click abre config + toggle global |
| `src/pages/GarbageReminderPage.tsx` | Lembrete a partir do dia atual |
| `supabase/migrations/20260306_consumables_notifications.sql` | **NOVO** — SQL para colar no Supabase |

---

## 🎉 Sucesso!

Seu sistema Friggo agora suporta:

- ✅ **PIX** - Pagamento instantâneo Brasil
- ✅ **Apple Pay** - Para usuários Mac/iPhone
- ✅ **Google Pay** - Para usuários Android
- ✅ **Notificações de Coleta de Lixo** - Funciona perfeitamente

**Próximo passo:** Configurar o webhook (5 minutos)

Qualquer dúvida, consulte a documentação em `docs/`
