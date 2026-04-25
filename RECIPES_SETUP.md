# 🍳 Setup de 5000 Receitas — Passo a Passo

## Status: Tudo Pronto ✅

- ✅ JSON de 5000 receitas salvo em `src/receitas_5000.json`
- ✅ Migration SQL criada: `supabase/RECIPES_MIGRATION.sql`
- ✅ Edge Function criada: `supabase/functions/search-recipes/index.ts`
- ✅ Hook React criado: `src/hooks/useRecipesAPI.ts`
- ✅ Componente de busca criado: `src/pages/Home/components/tabs/RecipesTabNew.tsx`
- ✅ Script de inserção: `insert_recipes.py`

---

## 📋 Passo a Passo de Implementação

### **PASSO 1: Executar Migration SQL** (5 minutos)

1. Abra: https://supabase.com/dashboard/project/nrfketkwajzkmrlkvoyd/sql
2. Clique em "New Query"
3. Copie TODO o conteúdo de: `supabase/RECIPES_MIGRATION.sql`
4. Cole no editor SQL
5. Clique **Execute** (Ctrl+Enter)

**Esperado:**
```
✅ CREATE TABLE
✅ CREATE INDEX
✅ CREATE POLICY
✅ CREATE FUNCTION (search_recipes)
✅ CREATE FUNCTION (get_recipe_categories)
```

Se tiver erro, verifique se a tabela não existe:
```sql
DROP TABLE IF EXISTS public.recipes CASCADE;
```

---

### **PASSO 2: Inserir as 5000 Receitas** (10-15 minutos)

#### Opção A: Via Python (Recomendado)

```bash
# 1. Instalar requests (se não tiver)
pip install requests

# 2. Executar inserção
python3 insert_recipes.py \
  https://nrfketkwajzkmrlkvoyd.supabase.co \
  "seu-service-role-key-aqui" \
  src/receitas_5000.json
```

**Onde encontrar Service Role Key:**
- Supabase Dashboard
- Settings > API
- Copiar a chave em "Service Role" (aquela que começa com `eyJ...`)

**Esperado:**
```
📖 Carregando receitas de src/receitas_5000.json...
✅ 5000 receitas carregadas
🔄 Inserindo 5000 receitas em lotes de 100...
  ✅ Lote 1/50: 100 receitas inseridas (100/5000)
  ✅ Lote 2/50: 100 receitas inseridas (200/5000)
  ...
  ✅ Lote 50/50: 100 receitas inseridas (5000/5000)

✅ Sucesso! Todas as 5000 receitas foram inseridas.
```

#### Opção B: Via SQL Editor (Mais lento, use se Python não funcionar)

1. Supabase Dashboard > SQL Editor > New Query
2. Cole isto:

```sql
-- EXEMPLO: inserir manualmente via cópia/cola do JSON
-- Não recomendado para 5000 receitas (muito lento)

INSERT INTO public.recipes (recipe_id, name, category, difficulty, prep_time, cook_time, servings, emoji, ingredients, instructions)
VALUES
  ('recipe-0001', 'Arroz Agulhinha refogado com cenoura', 'Grãos e Leguminosas', 'difícil', 35, 47, 3, '🍛', '[...]', '[...]'),
  -- ... mais 4999 linhas
;

-- Verificar quantas foram inseridas
SELECT COUNT(*) FROM public.recipes;
```

❌ **NÃO USE ESTA OPÇÃO** — é impraticável para 5000 receitas.

---

### **PASSO 3: Verificar Inserção** (1 minuto)

No **Supabase SQL Editor**, execute:

```sql
-- Contar total
SELECT COUNT(*) as total FROM public.recipes;

-- Ver categorias
SELECT category, COUNT(*) as count FROM public.recipes GROUP BY category ORDER BY count DESC;

-- Ver primeiras 5
SELECT name, category, difficulty, emoji FROM public.recipes LIMIT 5;
```

**Esperado:**
```
total: 5000
categories: 20 categorias diferentes
```

---

### **PASSO 4: Deploy da Edge Function**

#### Opção A: Via Supabase CLI (Recomendado)

```bash
# 1. Instalar Supabase CLI (se não tiver)
# macOS: brew install supabase/tap/supabase
# Linux: https://supabase.com/docs/guides/cli/getting-started
# Windows: choco install supabase

# 2. Fazer login
supabase login

# 3. Link ao projeto
cd "c:\Users\CAIO\Pictures\apps\KAZA"
supabase link --project-ref nrfketkwajzkmrlkvoyd

# 4. Deploy
supabase functions deploy search-recipes

# Esperado: ✅ Function deployed successfully
```

#### Opção B: Via Supabase Dashboard

1. Supabase Dashboard > Functions
2. Create a new function > `search-recipes`
3. Copiar e colar código de: `supabase/functions/search-recipes/index.ts`
4. Deploy

---

### **PASSO 5: Testar Edge Function** (2 minutos)

1. Supabase Dashboard > Functions > `search-recipes`
2. Tab "Invocation Details"
3. Copie a URL (deve ser algo como `https://nrfketkwajzkmrlkvoyd.supabase.co/functions/v1/search-recipes`)
4. Teste via navegador ou curl:

```bash
curl "https://nrfketkwajzkmrlkvoyd.supabase.co/functions/v1/search-recipes?q=arroz&limit=10" \
  -H "Authorization: Bearer seu-anon-key" \
  -H "apikey: seu-anon-key"
```

**Esperado:**
```json
{
  "success": true,
  "recipes": [
    {
      "id": "uuid",
      "recipe_id": "recipe-0001",
      "name": "Arroz Agulhinha refogado com cenoura",
      "category": "Grãos e Leguminosas",
      "emoji": "🍛",
      ...
    }
  ],
  "total": 342,
  "has_next": true,
  "categories": [...]
}
```

---

### **PASSO 6: Atualizar App** (5 minutos)

1. Abra: `src/pages/Home/components/tabs/RecipesTab.tsx`
2. **Substitua o import:**

```typescript
// ANTES:
import { RecipesTab } from "./tabs/RecipesTab";

// DEPOIS:
import { RecipesTabNew as RecipesTab } from "./tabs/RecipesTabNew";
```

Ou simplesmente **renomeie o arquivo**:
```bash
mv src/pages/Home/components/tabs/RecipesTab.tsx src/pages/Home/components/tabs/RecipesTabOld.tsx
mv src/pages/Home/components/tabs/RecipesTabNew.tsx src/pages/Home/components/tabs/RecipesTab.tsx
```

3. Salve e o app vai recarregar

---

### **PASSO 7: Testar Localmente** (5 minutos)

```bash
npm run dev
```

1. Abra http://localhost:5173
2. Vá para "Receitas" (Recipes tab)
3. **Deve estar vazio** — nenhuma receita pré-carregada ✅
4. Digite "arroz" no campo de busca
5. Selecione categoria ou dificuldade (opcional)
6. Clique "Buscar"
7. **Devem aparecer receitas** com resultado em 50 em 50 ✅
8. Scroll até final e clique "Carregar mais 50" ✅

---

## 🎯 Resumo do Fluxo

```
[App abre]
  ↓
[Aba "Receitas" vazia]
  ↓
[Usuário digita "Arroz" ou seleciona "Grãos"]
  ↓
[Clica "Buscar"]
  ↓
[Edge Function dispara → query SQL]
  ↓
[Retorna 50 receitas + total]
  ↓
[Usuário vê resultados]
  ↓
[Se rolar até o final: "Carregar mais 50"]
  ↓
[Edge Function novamente com offset=50]
  ↓
[Mais 50 receitas carregadas]

💡 Zero requisições até o usuário buscar!
```

---

## ⚙️ Variáveis de Ambiente

Certifique-se que `.env` tem:

```
VITE_SUPABASE_URL=https://nrfketkwajzkmrlkvoyd.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=seu-anon-key
```

---

## 🆘 Troubleshooting

### "TypeError: Cannot read property 'total_count'"
→ Verificar se a RPC `search_recipes` foi criada no SQL

### "401 Unauthorized"
→ Verificar se o `VITE_SUPABASE_PUBLISHABLE_KEY` está correto no `.env`

### "Edge Function not found"
→ Verificar se foi deployed: `supabase functions list`

### "Receitas aparecem em branco"
→ Verificar se o JSON está bem formado: `jsonlint.com`

### "Inserção lenta"
→ Normal para 5800 receitas. Use a opção Python (mais rápido que SQL Editor)

---

## ✅ Checklist Final

- [ ] Migration SQL executada no Supabase
- [ ] Inserção de 5000 receitas completada
- [ ] Edge Function `search-recipes` deployada
- [ ] Teste de busca funcionando (curl ou navegador)
- [ ] App atualizado (RecipesTabNew importado)
- [ ] Teste local: busca, filtros, "Carregar mais"
- [ ] Build final: `npm run build`
- [ ] Pronto para deploy em produção ✅

---

**Status:** 🎉 Tudo pronto para usar!

Próximo passo: Executar **PASSO 1** (Migration SQL)
