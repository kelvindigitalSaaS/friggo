# QUICK START — 5 MINUTOS

## PASSO 1: Supabase (2 min)

1. Abra Supabase Dashboard → SQL Editor
2. Copie **TODO** o arquivo `SUPABASE_COMPLETE_MIGRATION.sql`
3. Cole e Execute
4. ✅ Pronto!

---

## PASSO 2: Cakto (1 min)

1. Crie conta em https://cakto.com.br
2. Vá para Configurações → API Key
3. Copie a chave
4. Adicione ao `.env.local`:
```
VITE_CAKTO_API_KEY=sua_chave_aqui
```

---

## PASSO 3: Código (2 min)

### 3a — Crie os arquivos
Copie estes 4 arquivos do `CODIGO_TYPESCRIPT_FRIGGO_NOVO.ts`:
- `src/types/friggo-v2.ts`
- `src/services/caktoPayment.ts`
- `src/contexts/FriggoContextV2.tsx`
- `src/hooks/useSyncCaktoPayment.ts`

### 3b — Atualize `src/main.tsx`

Trocar:
```typescript
// Antes
import { KazaProvider } from '@/contexts/KazaContext';
<KazaProvider><App /></KazaProvider>

// Depois
import { FriggoProviderV2 } from '@/contexts/FriggoContextV2';
<FriggoProviderV2><App /></FriggoProviderV2>
```

### 3c — Atualize imports no app

Em qualquer componente que use Kaza:
```typescript
// Antes
import { useKaza } from '@/contexts/KazaContext';
const { items, addItem } = useKaza();

// Depois
import { useFriggoV2 } from '@/contexts/FriggoContextV2';
const { items, addItem } = useFriggoV2();
```

---

## PASSO 4: Testar

1. `npm run dev`
2. Faça signup
3. Verifique se `profiles`, `homes` foram criados no Supabase
4. Pronto! 🎉

---

## INTEGRAÇÃO COM CAKTO (Pagamentos)

### No seu componente de planos:

```typescript
import { useFriggoV2 } from '@/contexts/FriggoContextV2';

export function PlansPage() {
  const { upgradeSubscription, subscription } = useFriggoV2();

  const handleClick = async (planId: string) => {
    await upgradeSubscription(planId, 'pix'); // ou 'credit_card', 'boleto'
  };

  return (
    <div>
      <button onClick={() => handleClick('basic')}>
        {subscription?.plan === 'basic' ? 'Seu plano' : 'Escolher'}
      </button>
    </div>
  );
}
```

### Sincronizar pagamentos ao entrar:

```typescript
import { useSyncCaktoPayment } from '@/hooks/useSyncCaktoPayment';

useEffect(() => {
  const { syncWithCakto } = useSyncCaktoPayment();
  syncWithCakto(); // Vai buscar dados de pagamento do Cakto
}, []);
```

---

## GOTCHAS IMPORTANTES

❌ **DON'T:**
- Usar `user_id` como FK em items/consumables (use `home_id`)
- Tentar acessar dados sem passar por `home_members` (RLS vai bloquear)
- Mandar CPF novamente se usuário já tem CPF salvo

✅ **DO:**
- Sempre usar `home_id` em queries
- Verificar permissão do usuário na home antes de operações
- Pular campo CPF no onboarding se já exists

---

## VARIÁVEIS OBRIGATÓRIAS

```env
# Supabase (já tem)
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...

# Cakto (NOVO)
VITE_CAKTO_API_KEY=ckt_live_xxx
```

---

## API DO NOVO CONTEXTO

```typescript
const {
  // Estado
  homeId,              // ID da casa atual
  homeData,            // Dados da casa
  profile,             // Dados do usuário
  subscription,        // Plano atual (free/basic/standard/premium)
  items,               // Items da geladeira
  consumables,         // Consumíveis (papel, etc)
  recipes,             // Receitas
  mealPlan,            // Plano de refeições
  shoppingItems,       // Lista de compras
  loading,             // boolean

  // Funções
  addItem,             // (item) => Promise<Item>
  updateItem,          // (id, updates) => Promise<void>
  deleteItem,          // (id) => Promise<void>
  
  addConsumable,       // (consumable) => Promise<void>
  updateConsumable,    // (id, updates) => Promise<void>
  deleteConsumable,    // (id) => Promise<void>
  
  addRecipe,           // (recipe) => Promise<void>
  updateRecipe,        // (id, updates) => Promise<void>
  deleteRecipe,        // (id) => Promise<void>
  toggleFavoriteRecipe,// (recipeId) => Promise<void>
  
  addMealPlan,         // (mealPlan) => Promise<void>
  deleteMealPlan,      // (id) => Promise<void>
  
  addShoppingItem,     // (item) => Promise<void>
  toggleShoppingItem,  // (id, checked) => Promise<void>
  deleteShoppingItem,  // (id) => Promise<void>
  
  // Pagamentos
  syncPaymentFromCakto, // (cpf) => Promise<void>
  upgradeSubscription,  // (planId, method) => Promise<void>
} = useFriggoV2();
```

---

## ESTRUTURA DO BANCO

```
Usuário
  ↓
Profile (nome, cpf, avatar)
  ↓
Home (apartamento/casa)
  ↓
HomeMembers (quem tem acesso)
  ↓
HomeSettings (configurações)
  ↓
Items, Consumables, Recipes, etc.
```

---

## SUPORTE

- **Erro de RLS?** = Usuário não está em `home_members`
- **Cakto não funciona?** = Verifique API Key no `.env`
- **Dados não aparecem?** = Verifique `home_id` na query

---

**Done! Seu app agora roda 100% com Supabase + Cakto** 🚀
