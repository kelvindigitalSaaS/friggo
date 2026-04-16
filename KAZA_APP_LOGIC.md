# KAZA — Lógica Completa do App

> Documentação técnica do projeto Kaza (anteriormente Friggo).
> Atualizado em: 2026-04-16

---

## 1. Visão Geral

Kaza é um PWA (Progressive Web App) + App Nativo (iOS/Android via Capacitor) focado em organização doméstica:

- **Geladeira/Despensa** — controle de itens, vencimento, maturação
- **Receitas** — catálogo, favoritos, sugestões baseadas no estoque
- **Plano Semanal/Mensal** — planejamento de refeições
- **Consumíveis** — higiene, limpeza, cozinha (ex: papel higiênico, detergente)
- **Lista de Compras** — gerada manualmente ou sugerida pelo sistema
- **Lembretes** — lixo, notificações personalizáveis
- **Assinaturas** — plano free/premium via Cakto

---

## 2. Módulos Principais

| Módulo | Localização | Responsabilidade |
|--------|-------------|-----------------|
| Auth | `src/hooks/useAuth.tsx` | Login Google/Apple/Email via Supabase |
| Estado Global | `src/contexts/FriggoContext.tsx` | Items, shopping, consumíveis, alertas, onboarding |
| Assinatura | `src/contexts/SubscriptionContext.tsx` | Plano atual, trial, bloqueio de features |
| Idioma | `src/contexts/LanguageContext.tsx` | i18n: pt-BR, en, es |
| Tema | `src/contexts/ThemeContext.tsx` | Dark/Light mode |
| PWA | `src/contexts/PWAContext.tsx` | Install prompt |
| Notificações Web | `src/lib/pushNotifications.ts` | Web Notification API + SW |
| Notificações Lixo | `src/lib/garbageReminderNotifications.ts` | Agendamento por dia/hora |

---

## 3. Fluxo das Páginas

```
/auth          → Login
/              → Index (tabs: home, fridge, recipes, shopping, settings)
/add-item      → Adicionar item ao estoque
/consume/:id   → Registrar consumo de item
/recipe/:id    → Detalhe de receita
/plan/meal-planner?date=YYYY-MM-DD → Planejar refeição (tela inteira)
/consumables   → Consumíveis (higiene/limpeza/cozinha)
/notifications → Histórico de notificações
/profile       → Perfil do usuário
/activity-history → Log de atividades
/garbage-reminder → Configurar lembrete de lixo
/sucesso       → Pós-onboarding
/settings/subscription → Assinatura e planos
/settings/install → Guia de instalação PWA
/settings/faq  → FAQ
/settings/privacy → Privacidade
/monthly-report → Relatório mensal
/night-checkup  → Checkup noturno
/checkout      → Checkout (Stripe/Cakto)
```

---

## 4. Regras de Negócio

### Itens (Geladeira/Despensa)
- Alertas gerados automaticamente por:
  - `expirationDate` vencida → tipo `expiring` prioridade `high`
  - `expirationDate` vence em ≤1 dia → tipo `consume-today` prioridade `high`
  - `expirationDate` vence em ≤3 dias → tipo `expiring` prioridade `medium`
  - `maturation === "very-ripe" | "overripe"` → tipo `overripe`
  - `quantity <= minStock` → tipo `low-stock` prioridade `low`
  - Carne (`category === "meat"`) na despensa (`location === "pantry"`) → alerta de estragamento
- Todos os alertas são calculados via `useEffect` em `FriggoContext` quando `loading === false`

### CPF/Nome (Onboarding)
- Uma vez salvo, CPF não pode ser alterado (regra de negócio imutável)
- Se CPF já existe no perfil, o frontend deve ignorar qualquer nova entrada
- Nome imutável após onboarding completado

### Consumíveis
- Cada item tem `dailyConsumption`, `minStock`, `currentStock`
- Alertas de reposição quando `currentStock <= minStock`
- Categorias: `hygiene`, `cleaning`, `kitchen`, `other`

---

## 5. Autenticação

**Provider:** Supabase Auth
**Métodos:** Google OAuth, Apple Sign-In, Email/Password

**Fluxo:**
1. `useAuth` hook expõe `user`, `loading`, `signIn`, `signOut`, `requireAuth`
2. `ProtectedRoute` em App.tsx redireciona para `/auth` se não logado
3. Deep links OAuth (PKCE flow e Implicit flow) tratados em `App.tsx`
4. `AuthGuard` verifica auth a cada 30s e redireciona se sessão expirar

**Configuração Supabase:**
- URL: `VITE_SUPABASE_URL`
- Key: `VITE_SUPABASE_PUBLISHABLE_KEY`
- Persistência: localStorage

---

## 6. Onboarding / Configurações Iniciais

**Arquivo:** `src/components/friggo/Onboarding.tsx`

**Etapas:**
1. `personalize` — nome, avatar
2. `home` — tipo de moradia, número de moradores
3. `fridge` — tipo de geladeira, marca, nível de resfriamento, hábitos
4. `consumables` — seleção de consumíveis iniciais (presets por idioma)
5. `notification-prefs` — preferências de notificação
6. `complete` — confirmação

**Regras:**
- Cada etapa é salva individualmente ao avançar
- CPF: se já existe no banco (`profiles.cpf != null`), não permite alteração
- Nome: se `onboarding_completed === true`, não permite alteração retroativa
- Progresso não pode deixar dados inconsistentes entre etapas

**Validação por etapa:**
- Nome obrigatório na etapa `personalize`
- Pelo menos 1 tipo de moradia obrigatório na etapa `home`
- Avançar bloqueado se campo obrigatório inválido

---

## 7. Receitas

**Dados:** `src/data/recipeDatabase.ts` + `src/data/brazilianRecipes.ts` + categorias em `src/data/categories/`

**Funcionalidades:**
- Busca por nome e descrição
- Filtro por categoria
- Favoritos (persistidos em Supabase: `recipes` table)
- Detalhe com ingredientes, modo de preparo, tempo, porções
- Integração com plano de refeições

**Edge Function:** `supabase/functions/generate-recipes/` — geração de receitas com IA

---

## 8. Plano Semanal/Mensal

**Componente:** `src/components/friggo/tabs/PlannerTab.tsx`
**Página de Planejamento:** `src/pages/MealPlannerPage.tsx`

**Fluxo de adicionar refeição:**
1. Usuário clica em "+" num dia ou "Explorar Receitas"
2. App navega para `/plan/meal-planner?date=YYYY-MM-DD`
3. MealPlannerPage carrega — tela COMPLETA (não modal)
4. Usuário filtra por tipo de refeição (Café, Almoço, Jantar, Lanche)
5. Busca receitas por nome
6. Clica em tipo de refeição → `addToMealPlan()` chamado
7. Item aparece no plano com indicador visual

**Persistência:** Tabela `meal_plans` no Supabase (via FriggoContext)

---

## 9. Consumíveis

**Página:** `src/pages/ConsumableTrackerPage.tsx`
**Componente:** `src/components/friggo/ConsumableTracker.tsx`
**Tabela Supabase:** `consumables`

**Estrutura de item:**
```typescript
interface ConsumableItem {
  id: string;
  name: string;
  icon: string;
  category: "hygiene" | "cleaning" | "kitchen" | "other";
  currentStock: number;
  unit: string;
  dailyConsumption: number;
  minStock: number;
  usageInterval?: number; // dias entre usos
  lastUsed?: Date;
}
```

**Alertas de reposição:** calculados quando `currentStock / dailyConsumption <= 7 dias`

---

## 10. Perfil

**Página:** `src/pages/ProfilePage.tsx`

**Dados:**
- Nome, avatar (upload via Supabase Storage)
- CPF (imutável após onboarding)
- Tipo de moradia, número de moradores
- Idioma, tema
- Tipo de geladeira e configurações

**Exclusão de conta:** ver seção 19

---

## 11. Lembretes

### Lixo (Garbage Reminder)
**Página:** `src/pages/GarbageReminderPage.tsx`
**Lib:** `src/lib/garbageReminderNotifications.ts`
**Storage key:** `kaza-garbage-reminder` (migrado de `friggo-garbage-reminder`)

**Configuração:**
- Dias da semana de coleta (0-6: Dom-Sáb)
- Horário do lembrete ("HH:MM")
- Localização: rua ou prédio (com andar opcional)
- Toggle on/off

**Agendamento PWA:** 3 notificações por coleta (24h, 12h, 1h antes)
**Agendamento Nativo:** 1 notificação no horário exato

**Botão Salvar:** salva no localStorage + toast de confirmação + inicia monitoramento se ativo

---

## 12. Notificações

**Lib:** `src/lib/pushNotifications.ts`

### Estratégia de Deduplicação
```
hasHydratedAlerts (useRef) = false
items carregam do Supabase (loading → false)
calculateAlerts roda pela primeira vez com loading === false
  → hasHydratedAlerts = false:
     - adiciona todos IDs ao Set notifiedAlertIds
     - seta hasHydratedAlerts = true
     - NÃO dispara notificações (hydration silenciosa)
  → hasHydratedAlerts = true (próximas mudanças):
     - novos alertIDs (não no Set) disparam notificação UMA vez
     - ID adicionado ao Set → nunca dispara de novo nesta sessão
```

### Categorias de Notificação
| Categoria | Vibração | Require Interaction |
|-----------|----------|-------------------|
| `expiry` | duplo buzz | não |
| `consume-today` | ~3s alarme | sim |
| `overripe` | duplo buzz | não |
| `low-stock` | suave | não |
| `garbage` | duplo buzz | sim |

### Vibração de Alarme
- **Padrão:** `[500, 100, 500, 100, 500, 100, 500, 100, 500]` ≈ 3 segundos
- **API:** `navigator.vibrate()` — Web Vibration API
- **Limitações:**
  - Android Chrome/PWA: ✅ funciona em primeiro plano
  - iOS Safari: ❌ não suporta `navigator.vibrate`
  - Nativo Capacitor: usar `@capacitor/haptics` para controle completo
- **Função exposta:** `triggerAlarmVibration()` em `pushNotifications.ts`

### Problemas Corrigidos
- **Bug do Leite (e outros itens):** notificação disparava em todo app open
  - **Causa:** `calculateAlerts` rodava com `items = []` na primeira vez, fazendo hydration com conjunto vazio. Quando itens reais chegavam do Supabase, `hasHydratedAlerts` já era `true` → todos itens disparavam notificação.
  - **Correção:** adicionado `if (loading) return;` no início do `calculateAlerts` useEffect. Hydration só ocorre após `loading === false`.

---

## 13. Assinaturas / Planos

**Contexto:** `src/contexts/SubscriptionContext.tsx`
**Página:** `src/pages/SubscriptionPage.tsx`
**Gateway:** Cakto (`https://pay.cakto.com.br/wbjq4ne_846287`)
**Webhook:** `supabase/functions/cakto-webhook/`

**Planos:**
| Plano | Preço | Features |
|-------|-------|---------|
| `free` | Grátis | Itens limitados, alertas básicos |
| `premium` | R$ 27/mês | Ilimitado, alertas inteligentes, acesso antecipado |

**Trial:** premium trial com `trialDaysRemaining` calculado no context

**Fluxo de upgrade:**
1. Usuário clica "Assinar Agora" → abre Cakto em nova aba
2. Cakto processa pagamento e chama webhook
3. Webhook atualiza `subscription_status` no Supabase
4. Context detecta mudança → `subscription.plan === "premium"`

---

## 14. Limites por Plano

> **TODO:** Implementar restrições baseadas em plano no backend.

Regras desejadas:
- Plano `free`: máximo N moradores na casa
- Plano `premium`: moradores ilimitados (ou maior limite)
- Validação no frontend (`SubscriptionContext.isLocked`) E no backend (RLS / edge function)
- Feedback visual claro quando limite atingido

---

## 15. Estrutura do Banco (Supabase)

**Schema multi-tenant por `home_id`:**

| Tabela | Descrição |
|--------|-----------|
| `profiles` | Perfil do usuário (name, cpf, avatar_url, onboarding_completed) |
| `homes` | Casas/apartamentos (home_type, residents) |
| `home_members` | Membros de cada casa (user_id, home_id, role) |
| `items` | Itens do estoque (name, category, location, quantity, expiry_date) |
| `shopping_items` | Lista de compras (name, quantity, checked) |
| `consumables` | Consumíveis domésticos (name, current_stock, min_stock, daily_consumption) |
| `home_settings` | Configurações da casa (fridge_type, cooling_level, habits) |
| `notification_preferences` | Prefs de notificação por usuário |
| `item_history` | Log de atividades (item, action, timestamp) |
| `recipes` | Receitas favoritas |
| `meal_plans` | Plano de refeições (recipe_id, planned_date, meal_type) |

**RLS (Row Level Security):** todas tabelas filtradas por `user_id` ou `home_id`

---

## 16. Serviços / Hooks / Stores

| Arquivo | Função |
|---------|--------|
| `useAuth.tsx` | Autenticação, sessão, requireAuth |
| `useAuthGuard.tsx` | Guard automático de rota |
| `FriggoContext.tsx` | Estado global + queries Supabase |
| `SubscriptionContext.tsx` | Estado da assinatura |
| `pushNotifications.ts` | Web/Native notifications |
| `garbageReminderNotifications.ts` | Agendamento lixo |
| `capacitor.ts` | Detecção plataforma (isNative, isAndroid, isIOS) |
| `nativeBrowser.ts` | Deep links, in-app browser |
| `nativeUI.ts` | Back button, haptics |
| `sentry.ts` | Error tracking |
| `recipeCache.ts` | Cache de receitas |

---

## 17. Rotas

Definidas em `src/App.tsx` via React Router v6.

**Padrão:** `<ProtectedRoute element={<Page />} />`

**Parâmetros especiais:**
- `allowLocked={true}` — permite acesso mesmo com subscription bloqueada
- `allowOnboarding={true}` — permite acesso antes de onboarding completado
- `/plan/meal-planner?date=YYYY-MM-DD` — contexto de data para planejar refeição

---

## 18. Eventos Importantes do Sistema

| Evento | Onde | O que faz |
|--------|------|-----------|
| `navigateTab` | CustomEvent | Navega para tab específica |
| `force-offline` | CustomEvent | Força estado offline após timeout |
| `popstate` | History API | Re-render após redirect de pagamento |

---

## 19. Exclusão Irreversível do Usuário

> **Status:** A UI de exclusão existe em ProfilePage. O backend precisa de implementação completa.

**Fluxo desejado:**
1. Usuário clica "Excluir Conta" em ProfilePage
2. Modal de confirmação com texto explícito: "Esta ação é irreversível"
3. Confirmação via digitação do email/senha
4. Frontend chama edge function segura com `service_role`
5. Edge function executa em ordem:
   - `DELETE FROM item_history WHERE user_id = $1`
   - `DELETE FROM meal_plans WHERE user_id = $1`
   - `DELETE FROM shopping_items WHERE user_id = $1`
   - `DELETE FROM items WHERE user_id = $1`
   - `DELETE FROM consumables WHERE user_id = $1`
   - `DELETE FROM notification_preferences WHERE user_id = $1`
   - `DELETE FROM home_settings WHERE home_id IN (SELECT id FROM homes WHERE owner_id = $1)`
   - `DELETE FROM home_members WHERE user_id = $1`
   - `DELETE FROM homes WHERE owner_id = $1`
   - `DELETE FROM profiles WHERE id = $1`
   - `supabase.auth.admin.deleteUser(userId)` — remove do Supabase Auth
6. Frontend faz logout e redireciona para `/auth`

**SQL Migration necessária:**
```sql
-- Edge function (service_role): delete_user_completely
-- Garantir CASCADE ou deleção manual na ordem correta
-- Ver constraints de FK antes de deletar

-- Exemplo RPC segura:
CREATE OR REPLACE FUNCTION delete_user_completely(target_user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM item_history WHERE user_id = target_user_id;
  DELETE FROM meal_plans WHERE user_id = target_user_id;
  DELETE FROM shopping_items WHERE user_id = target_user_id;
  DELETE FROM items WHERE user_id = target_user_id;
  DELETE FROM consumables WHERE user_id = target_user_id;
  DELETE FROM notification_preferences WHERE user_id = target_user_id;
  DELETE FROM home_settings hs 
    USING homes h 
    WHERE hs.home_id = h.id AND h.owner_id = target_user_id;
  DELETE FROM home_members WHERE user_id = target_user_id;
  DELETE FROM homes WHERE owner_id = target_user_id;
  DELETE FROM profiles WHERE id = target_user_id;
END;
$$;
```

---

## 20. Deduplicação das Notificações

**Mecanismo:**
- `notifiedAlertIds` — `useRef<Set<string>>` no FriggoContext
- `hasHydratedAlerts` — `useRef<boolean>` inicia como `false`

**Ciclo de vida:**
```
App abre
  → items ainda carregando (loading = true)
  → calculateAlerts: if (loading) return  ← NÃO executa

loading → false (dados chegaram do Supabase)
  → calculateAlerts executa
  → hasHydratedAlerts = false
  → adiciona todos IDs ao Set sem notificar
  → hasHydratedAlerts = true

Item novo ou mudado (ex: maturação muda)
  → calculateAlerts executa
  → novo alertId NÃO está no Set
  → dispara notificação UMA VEZ
  → adiciona ID ao Set

Usuário fecha e reabre o app
  → KazaProvider remonta (ref zerado)
  → ciclo recomeça do início (hydration silenciosa)
  → NÃO dispara notificações na abertura
```

**Limitação conhecida:** O Set é em memória. Se o usuário tiver a mesma alerta em duas sessões diferentes (ex: abre no Chrome e no Safari), a deduplicação não é cross-device. Para dedup persistente entre sessões, seria necessário salvar `notifiedAlertIds` em Supabase ou localStorage com TTL.

---

## 21. Decisões Arquiteturais

| Decisão | Motivo |
|---------|--------|
| FriggoContext como nome interno | Renomear quebraria 25+ imports; internamente aceitável, nome público é "Kaza" |
| localStorage com migração de chaves | Evita perda de dados do usuário ao renomear de `friggo-*` para `kaza-*` |
| Tela inteira para MealPlanner | Modal era pequeno demais para UX de planejamento; rota própria dá contexto e navegação de volta |
| `loading` gate no calculateAlerts | Evita hydration prematura com items vazios que causava spam de notificações |
| Cakto em vez de Stripe | Gateway brasileiro com suporte a PIX parcelado |
| Capacitor para nativo | Reaproveitamento total do código React para iOS/Android |

---

## 22. Pontos que Exigem Atenção Futura

1. **Exclusão irreversível de usuário** — edge function ainda não implementada
2. **Limites por plano** — não aplicados no backend, apenas no frontend
3. **Deduplicação persistente de notificações** — atualmente só em memória (reseta com app reload)
4. **`@capacitor/haptics`** — para vibração de alarme completa no nativo (3s garantidos)
5. **CPF no onboarding** — validação de imutabilidade está no frontend mas precisa de RLS no Supabase
6. **Push token** — `profiles.push_token` não está sendo salvo após registro (linha TODO em pushNotifications.ts)
7. **Chunk size** — `Index-*.js` e `index-*.js` têm >500KB; considerar code splitting adicional
8. **Renomear `FriggoContext.tsx`** — pode ser feito com busca/substituição global quando houver tempo; não urgente pois é interno
