# CHECKLIST IMPLEMENTAÇÃO FRIGGO 100%

## PARTE 1: CONFIGURAÇÃO DO SUPABASE

### 1.1 — Copie e cole o SQL

1. Abra o **Supabase Dashboard** > SQL Editor
2. **Copie todo o arquivo** `SUPABASE_COMPLETE_MIGRATION.sql`
3. Cole no SQL Editor
4. Execute em uma transaction (copia tudo de uma vez e roda)
5. ✅ Aguarde conclusão (deve completar sem erros)

**OBS:** A primeira vez vai levar 30-60 segundos por causa dos triggers e policies.

---

### 1.2 — Verifique a criação

No SQL Editor, rode:

```sql
-- Verificar tabelas criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Deve mostrar:
-- consumable_logs
-- consumables
-- favorite_recipes (legacy)
-- garbage_reminders
-- home_members
-- home_settings
-- homes
-- item_history
-- items
-- meal_plans
-- notification_preferences
-- profiles
-- recipes
-- saved_recipes (legacy)
-- shopping_items
-- shopping_lists
-- subscriptions

-- Verificar enums
SELECT typname FROM pg_type WHERE typtype = 'e' ORDER BY typname;

-- Deve mostrar:
-- action_type
-- fridge_type
-- home_role
-- home_type
-- item_category
-- item_location
-- maturation_level
-- meal_type
-- subscription_plan
```

---

## PARTE 2: CONFIGURAÇÃO DO CAKTO (Pagamentos)

### 2.1 — Criar conta no Cakto

1. Vá para https://cakto.com.br
2. Crie uma conta de negócio
3. Configure seus planos:
   - **free**: R$ 0
   - **basic**: R$ 9,90/mês
   - **standard**: R$ 19,90/mês
   - **premium**: R$ 49,90/mês

### 2.2 — Obter API Key do Cakto

1. Vá para **Configurações** > **API & Integrações**
2. Clique em **Gerar Nova Chave**
3. Copie a chave (será algo como `ckt_live_abc123xyz...`)
4. **GUARDE EM SEGURANÇA**

### 2.3 — Adicionar API Key ao .env

**Arquivo:** `.env.local` (ou `.env`)

```
VITE_CAKTO_API_KEY=ckt_live_seu_api_key_aqui
VITE_CAKTO_BASE_URL=https://api.cakto.com.br/v1
```

---

## PARTE 3: INTEGRAÇÃO COM O APP

### 3.1 — Criar arquivos TypeScript

**Copie os arquivos do arquivo `CODIGO_TYPESCRIPT_FRIGGO_NOVO.ts`:**

1. **Crie** `src/types/friggo-v2.ts` com as interfaces
2. **Crie** `src/services/caktoPayment.ts` com a classe `CaktoPaymentService`
3. **Crie** `src/contexts/FriggoContextV2.tsx` com o novo contexto
4. **Crie** `src/hooks/useSyncCaktoPayment.ts` com o hook

### 3.2 — Atualize `src/main.tsx`

Antes:
```typescript
import { KazaProvider } from '@/contexts/KazaContext';

export default function App() {
  return (
    <KazaProvider>
      <YourApp />
    </KazaProvider>
  );
}
```

Depois:
```typescript
import { FriggoProviderV2 } from '@/contexts/FriggoContextV2';

export default function App() {
  return (
    <FriggoProviderV2>
      <YourApp />
    </FriggoProviderV2>
  );
}
```

### 3.3 — Atualize componentes que usam Kaza Context

**Antes:**
```typescript
import { useKaza } from '@/contexts/KazaContext';

const MyComponent = () => {
  const { items, addItem } = useKaza();
  // ...
};
```

**Depois:**
```typescript
import { useFriggoV2 } from '@/contexts/FriggoContextV2';

const MyComponent = () => {
  const { items, addItem } = useFriggoV2();
  // ...
};
```

---

## PARTE 4: ONBOARDING ATUALIZADO

### 4.1 — Atualize o fluxo de Onboarding

**Arquivo:** `src/components/friggo/Onboarding.tsx`

**Principais mudanças:**

```typescript
const { useFriggoV2 } = useContext; // Use o novo contexto
const { profile } = useFriggoV2();

// Pular CPF se já existe
const shouldSkipCpf = !!profile?.cpf;

// Dinâmico: remover steps que não são necessários
const steps = [
  'welcome',
  'homeType',
  'residents',
  'fridge',
  ...(selectedFridge === 'smart' ? ['fridgeBrand'] : []),
  'coolingLevel',
  'habits',
  'notifications',
  'consumables',
  ...(!shouldSkipCpf ? ['cpf'] : []), // ← NOVO
  ...(!profile?.name ? ['name'] : []),  // ← NOVO
  'personalize',
  'ready'
];
```

### 4.2 — Proteger CPF contra sobrescrita

Na função que salva onboarding:

```typescript
const completeOnboarding = async (data: OnboardingData) => {
  // Se CPF já existe, ignorar tentativa de mudança
  if (profile?.cpf && data.cpf !== profile.cpf) {
    data.cpf = profile.cpf;  // Manter original
  }
  
  // Se nome já existe, ignorar tentativa de mudança
  if (profile?.name && data.name !== profile.name) {
    data.name = profile.name;  // Manter original
  }
  
  // Salvar...
  await completeOnboarding(data);
};
```

---

## PARTE 5: PÁGINA DE PAGAMENTO

### 5.1 — Criar componente de pagamento

**Arquivo:** `src/components/friggo/SubscriptionUpgrade.tsx`

```typescript
import React, { useState } from 'react';
import { useFriggoV2 } from '@/contexts/FriggoContextV2';
import { Button } from '@/components/ui/button';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

const PLANS: Plan[] = [
  { id: 'free', name: 'Free', price: 0, features: ['5 itens', '1 receita/dia'] },
  { id: 'basic', name: 'Básico', price: 9.90, features: ['50 itens', '5 receitas/dia'] },
  { id: 'standard', name: 'Padrão', price: 19.90, features: ['500 itens', 'receitas ilimitadas'] },
  { id: 'premium', name: 'Premium', price: 49.90, features: ['Ilimitado', 'Tudo'] }
];

export function SubscriptionUpgrade() {
  const { upgradeSubscription, subscription } = useFriggoV2();
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'credit_card' | 'pix' | 'boleto'>('pix');

  const handleUpgrade = async (planId: string) => {
    setLoading(true);
    try {
      await upgradeSubscription(planId, selectedPayment);
    } catch (error) {
      console.error('Error upgrading:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {PLANS.map((plan) => (
        <div key={plan.id} className="border rounded-lg p-4">
          <h3 className="font-bold">{plan.name}</h3>
          <p className="text-2xl font-bold my-2">R$ {plan.price}</p>
          <ul className="text-sm mb-4">
            {plan.features.map((feature) => (
              <li key={feature} className="mb-1">
                ✓ {feature}
              </li>
            ))}
          </ul>

          {subscription?.plan === plan.id ? (
            <Button disabled>Seu plano atual</Button>
          ) : (
            <Button
              onClick={() => handleUpgrade(plan.id)}
              disabled={loading}
            >
              {loading ? 'Processando...' : 'Escolher'}
            </Button>
          )}
        </div>
      ))}

      {/* Seleção de método de pagamento */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">
          Método de Pagamento
        </label>
        <select
          value={selectedPayment}
          onChange={(e) =>
            setSelectedPayment(
              e.target.value as 'credit_card' | 'pix' | 'boleto'
            )
          }
          className="w-full p-2 border rounded"
        >
          <option value="credit_card">Cartão de Crédito</option>
          <option value="pix">PIX</option>
          <option value="boleto">Boleto</option>
        </select>
      </div>
    </div>
  );
}
```

### 5.2 — Sincronizar pagamentos ao entrar no app

**Arquivo:** `src/pages/Index.tsx` (ou onde o usuário entra depois de autenticado)

```typescript
import { useSyncCaktoPayment } from '@/hooks/useSyncCaktoPayment';

export default function Index() {
  const { syncWithCakto } = useSyncCaktoPayment();

  // Sincronizar pagamentos ao montar
  useEffect(() => {
    syncWithCakto();
  }, [syncWithCakto]);

  // Rest of component...
}
```

---

## PARTE 6: MIGRAÇÃO DE DADOS (OPCIONAL)

Se você tem dados antigos no banco, crie um script de migração:

```typescript
// src/scripts/migrateOldData.ts

export async function migrateOldDataToNewSchema() {
  // 1. Copiar dados de profiles (user_id já existe)
  // 2. Criar home padrão para cada usuário (trigger faz isso automaticamente)
  // 3. Copiar items: user_id → home_id (do primeiro home do usuário)
  // 4. Idem para shopping_items, consumables, etc.
  
  console.log('Migration complete!');
}

// Execute manualmente uma vez:
// import { migrateOldDataToNewSchema } from '@/scripts/migrateOldData';
// await migrateOldDataToNewSchema();
```

---

## PARTE 7: VARIÁVEIS DE AMBIENTE

**Arquivo:** `.env.local`

```env
# Supabase
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...

# Cakto
VITE_CAKTO_API_KEY=ckt_live_abc123xyz...
VITE_CAKTO_BASE_URL=https://api.cakto.com.br/v1

# (Opcional) Analytics, Sentry, etc.
VITE_SENTRY_DSN=...
```

---

## PARTE 8: TESTES

### 8.1 — Teste o fluxo completo

1. **Signup:**
   - Crie uma nova conta
   - Verifique se `profiles`, `homes`, `home_members`, `home_settings` foram criados

2. **Onboarding:**
   - Preencha o onboarding
   - CPF deve ser salvo em `profiles`

3. **Itens:**
   - Adicione um item
   - Verifique em `supabase > items`

4. **Pagamento:**
   - Clique em "Upgrade"
   - Selecione um plano e método de pagamento
   - Verifique se a requisição foi para Cakto

5. **Sincronização:**
   - Faça um pagamento no Cakto
   - Recarregue a página
   - Verifique se `subscriptions.plan` foi atualizado

---

## PARTE 9: TROUBLESHOOTING

### Problema: "RLS policy violated"

**Causa:** Usuário não tem acesso à home

**Solução:**
```sql
-- Verifique se o usuário está em home_members
SELECT * FROM home_members WHERE user_id = 'seu-user-id';

-- Se não tiver, insira manualmente:
INSERT INTO home_members (home_id, user_id, role)
VALUES ('home-id', 'user-id', 'owner');
```

### Problema: Cakto retorna "Authentication Failed"

**Causa:** API Key está errada ou expirada

**Solução:**
```typescript
// Verifique em seu code
console.log('CAKTO_API_KEY:', import.meta.env.VITE_CAKTO_API_KEY);

// Teste a conexão:
curl -H "Authorization: Bearer seu-api-key" \
  https://api.cakto.com.br/v1/customers?cpf=00000000000
```

### Problema: Home não é criada automaticamente

**Causa:** Trigger não disparou

**Solução:**
```sql
-- Verifique se o trigger existe
SELECT * FROM information_schema.triggers 
WHERE trigger_name = 'on_profile_created';

-- Se não existir, crie manualmente:
CREATE TRIGGER on_profile_created AFTER INSERT ON profiles
FOR EACH ROW EXECUTE FUNCTION create_default_home_and_members();

-- Teste inserindo um profile:
INSERT INTO profiles (user_id, name) VALUES ('test-uid', 'Test User');
-- Deve criar automaticamente uma home
```

---

## PARTE 10: CHECKLIST FINAL

- [ ] SQL executado no Supabase
- [ ] Tabelas criadas (verificadas com query)
- [ ] Enums criados
- [ ] Policies criadas
- [ ] Triggers criados
- [ ] Arquivo `.env.local` atualizado com Cakto API Key
- [ ] Arquivos TypeScript criados
- [ ] Contexto `FriggoProviderV2` adicionado ao App
- [ ] Componentes atualizados para usar `useFriggoV2`
- [ ] Onboarding atualizado (pular CPF se já existe)
- [ ] Componente de pagamento criado
- [ ] Teste completo do fluxo funcionando

---

## PARTE 11: DEPLOY

### Antes de fazer deploy em produção:

1. **Backup do banco antigo:**
   ```bash
   pg_dump postgresql://user:password@host/db > backup.sql
   ```

2. **Testar em staging primeiro**

3. **Migrar dados antigos** (se houver)

4. **Comunicar aos usuários:**
   - Nova interface
   - Novo fluxo de pagamento
   - Suporte ao Cakto

5. **Monitorar logs:**
   - Erros de RLS
   - Erros de API
   - Performance

---

## DOCUMENTAÇÃO ADICIONAL

- **Supabase Auth:** https://supabase.com/docs/guides/auth
- **Supabase RLS:** https://supabase.com/docs/guides/auth/row-level-security
- **Cakto API:** https://docs.cakto.com.br (verifique documentação)

---

**Pronto! Seu Friggo está 100% integrado com Supabase + Cakto 🎉**
