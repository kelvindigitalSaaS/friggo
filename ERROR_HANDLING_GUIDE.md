# 🛡️ Error Handling Guide for KAZA

## Objetivo

Todos os erros de banco de dados e operações assíncronas devem ser tratados com mensagens amigáveis ao usuário, sem expor detalhes técnicos.

---

## ✅ Padrão Correto

### 1. Função Helper: `formatDatabaseError()`

A função `formatDatabaseError()` em `KazaContext.tsx` traduz erros Postgres para português amigável:

```typescript
// Em KazaContext.tsx
const formatDatabaseError = (err: unknown): string => {
  // Trata erros conhecidos (23505, 23502, 23503)
  // Retorna mensagem em português amigável
};
```

**Códigos tratados:**
- `23505`: UNIQUE constraint (ex: CPF duplicado, meal plan duplicado)
- `23502`: NOT NULL constraint (dados incompletos)
- `23503`: Foreign key (dados relacionados não existem)

---

## 🔧 Como Aplicar em Novas Funções

### Padrão de Try/Catch com Tratamento de Erro

```typescript
const myFunction = async (data: any) => {
  try {
    const { data: result, error } = await supabase
      .from("my_table")
      .insert(data)
      .select()
      .single();

    // ✅ SEMPRE verificar error ANTES de usar data
    if (error) {
      // Opção 1: Tratamento genérico
      showError("Erro ao salvar", error);
      return;

      // Opção 2: Tratamento específico + genérico
      if (error.code === "23505" && error.message?.includes("custom_constraint")) {
        toast({
          title: "Já existe",
          description: "Este registro já está cadastrado.",
          variant: "destructive"
        });
        return;
      }
      showError("Erro ao salvar", error);
      return;
    }

    // ✅ Usar result APENAS se error é null
    if (result) {
      setMyData((prev) => [...prev, result]);
      toast({ title: "Sucesso!", description: "Dados salvos." });
    }

  } catch (err) {
    // ✅ Catch para erros inesperados (não do Supabase)
    showError("Erro inesperado", err);
  }
};
```

---

## 🎯 Checklist para Cada Operação

Ao adicionar qualquer operação de banco de dados (INSERT, UPDATE, DELETE, RPC):

- [ ] **Error check**: Há `if (error)` logo após a operação?
- [ ] **Error handling**: Chama `showError()` ou mostra mensagem amigável?
- [ ] **Specific constraint**: Há tratamento específico para constraints conhecidas (23505, etc)?
- [ ] **Data usage**: Usa `data` APENAS se `error === null`?
- [ ] **User feedback**: Mostra toast com mensagem clara ao usuário?
- [ ] **Try/catch**: Toda função assíncrona tem try/catch?
- [ ] **No console.error exposto**: Não mostra mensagens técnicas ao usuário?

---

## 📋 Tipos de Erros Comuns

### Erro: UNIQUE Constraint (23505)

**Quando ocorre**: Tentando inserir dado que já existe com constraint UNIQUE

**Solução**:
```typescript
if (error.code === "23505") {
  if (error.message?.includes("meal_plans")) {
    toast({
      title: "Plano já existe",
      description: "Já existe um plano alimentar para esta categoria nesta data.",
      variant: "destructive"
    });
    return;
  }
  showError("Erro ao salvar", error);
  return;
}
```

### Erro: NOT NULL Constraint (23502)

**Quando ocorre**: Falta campo obrigatório (ex: home_id NULL)

**Solução**:
```typescript
if (error.code === "23502") {
  toast({
    title: "Dados incompletos",
    description: "Preencha todos os campos obrigatórios.",
    variant: "destructive"
  });
  return;
}
```

### Erro: Foreign Key (23503)

**Quando ocorre**: Referência para dado que não existe

**Solução**:
```typescript
if (error.code === "23503") {
  toast({
    title: "Erro",
    description: "Os dados relacionados não existem ou foram deletados.",
    variant: "destructive"
  });
  return;
}
```

---

## 🚀 Exemplos por Operação

### INSERT (Adicionar)

```typescript
const { data, error } = await supabase
  .from("items")
  .insert(newItem)
  .select()
  .single();

if (error) {
  showError("Erro ao adicionar item", error);
  return;
}

setItems((prev) => [...prev, data]);
toast({ title: "Item adicionado!" });
```

### UPDATE (Atualizar)

```typescript
const { error } = await supabase
  .from("items")
  .update(updates)
  .eq("id", itemId)
  .eq("home_id", homeId);

if (error) {
  showError("Erro ao atualizar item", error);
  return;
}

setItems((prev) =>
  prev.map((i) => (i.id === itemId ? { ...i, ...updates } : i))
);
toast({ title: "Item atualizado!" });
```

### DELETE / SOFT DELETE (Deletar)

```typescript
const { error } = await supabase
  .from("items")
  .update({ deleted_at: now() })  // Soft delete
  .eq("id", itemId)
  .eq("home_id", homeId);

if (error) {
  showError("Erro ao deletar item", error);
  return;
}

setItems((prev) => prev.filter((i) => i.id !== itemId));
toast({ title: "Item deletado!" });
```

### RPC Call (Função no Banco)

```typescript
const { data, error } = await (supabase as any).rpc("complete_user_onboarding", {
  p_home_name: "Minha Casa",
  p_user_name: "João"
});

if (error) {
  showError("Erro ao completar onboarding", error);
  throw error;
}

console.log("Onboarding completo:", data);
```

---

## ❌ Padrões Errados (Evitar)

### ❌ Não fazer isto:

```typescript
// ❌ BAD: Não verifica error
const { data } = await supabase.from("items").insert(item);
setItems((prev) => [...prev, data]);  // data pode ser undefined!

// ❌ BAD: Mostra erro técnico ao usuário
throw error;  // Usuário vê "code: 23505" no console

// ❌ BAD: Não tem try/catch
const result = supabase.from("items").select();

// ❌ BAD: Usa data sem verificar error
if (error) showError("Erro", error);
const id = data.id;  // Pode ser undefined!
```

### ✅ Padrão correto:

```typescript
try {
  const { data, error } = await supabase.from("items").insert(item);
  
  if (error) {
    showError("Erro ao adicionar", error);  // Mensagem amigável
    return;
  }

  if (data) {
    setItems((prev) => [...prev, data]);
    toast({ title: "Sucesso!" });
  }
} catch (err) {
  showError("Erro inesperado", err);
}
```

---

## 🔄 Lista de Funções a Revisar

As seguintes funções em `KazaContext.tsx` podem precisar de melhorias:

- [ ] `addItem()` - Usar padrão de error handling
- [ ] `updateItem()` - Verificar constraint errors
- [ ] `deleteItem()` - Soft delete with proper error
- [ ] `addToShoppingList()` - Error handling
- [ ] `updateShoppingList()` - Error handling
- [ ] `addToConsumables()` - Error handling
- [ ] `toggleConsumableComplete()` - Error handling
- [ ] `addToMealPlan()` - ✅ JÁ FEITO
- [ ] `removeFromMealPlan()` - Verificar error handling
- [ ] Qualquer função com `.insert()`, `.update()`, `.delete()`

---

## 🎓 Resumo

| Operação | Checklist |
|----------|-----------|
| INSERT | Error check → Specific error handling → Toast success |
| UPDATE | Error check → Optimistic update → Toast feedback |
| DELETE | Error check → Soft delete com deleted_at → Toast |
| RPC | Error check → Format error → User feedback |

---

## 📞 Perguntas?

Se uma operação não tem error handling:
1. Adicione `if (error)` check
2. Use `showError()` ou toast específico
3. Teste com dados inválidos
4. Verifique mensagem ao usuário (deve ser amigável)

---

**Status**: 🟢 Guia criado  
**Data**: 2026-04-30  
**Próxima ação**: Aplicar a todas as funções de CRUD
