# 🛣️ ROADMAP DE IMPLEMENTAÇÃO - PRODUÇÃO READY

**Status**: Em Desenvolvimento  
**Estimativa**: 2-3 dias  
**Prioridade**: CRÍTICA

---

## 🎯 TAREFAS PRIORITÁRIAS

### 1. ✅ Error Handling (URGENTE)
**Status**: Análise feita, implementação pronta

- [x] formatDatabaseError() - ✅ FEITO
- [x] showError() melhorado - ✅ FEITO  
- [x] addToMealPlan() - ✅ FEITO com erro de UNIQUE constraint
- [x] removeFromMealPlan() - ✅ JÁ TEM try/catch
- [x] updateItem() - ✅ JÁ TEM try/catch
- [ ] Revisar 30+ outras funções no KazaContext
- [ ] Adicionar toast de erro visual em todas
- [ ] Adicionar retry logic para operações críticas

**Código a adicionar em cada função:**
```typescript
try {
  const { error } = await supabase.from("table").delete().eq("id", id);
  if (error) {
    showError("Erro ao deletar", error);
    return;
  }
  toast.success("Deletado!");
} catch (err) {
  showError("Erro inesperado", err);
}
```

---

### 2. 🔐 Restrições para Membros Secundários
**Status**: Planejado

#### 2.1 Criar hook `useCanAccessFeature()`
```typescript
const useCanAccessFeature = (feature: 'payments' | 'delete_members' | 'analytics') => {
  const { isSubAccount } = useKaza();
  
  const canAccess = {
    payments: !isSubAccount,           // Só master pode pagar
    delete_members: !isSubAccount,     // Só master pode deletar
    analytics: true,                   // Todos veem (economia)
    settings: true,                    // Todos veem configurações
  };
  
  return canAccess[feature] ?? true;
};
```

#### 2.2 Implementar em componentes:

**a) Pagamentos**
```typescript
// Em SubscriptionsManage ou Plans
const canAccessPayments = useCanAccessFeature('payments');

if (!canAccessPayments) {
  return <div>Somente conta principal pode gerenciar pagamentos</div>;
}
```

**b) Deletar membros**
```typescript
// Em GroupMembersCard
if (isSubAccount && slot.member?.role === "member") {
  // Esconder botão de delete
}
```

**c) Analytics/Economia**
```typescript
// Dashboard - MANTER VISÍVEL mesmo para members
// Mostrar quanto economizou com receitas
<AnalyticsCard isReadOnly={isSubAccount} />
```

#### 2.3 Checklist:
- [ ] Criar hook useCanAccessFeature()
- [ ] Adicionar isSubAccount a useKaza() (se não existir)
- [ ] Esconder /payments para members
- [ ] Esconder delete member button
- [ ] Manter Analytics visível
- [ ] Manter Settings visível
- [ ] Testar fluxo como member

---

### 3. 🎖️ Conquista de Coragem
**Status**: Planejado

#### 3.1 Criar conquista na função de subscription
```typescript
// Em completeOnboarding() ou ao primeiro subscribe
if (isFirstTimeSubscriber && subscribedToPaidPlan) {
  await recordAchievement({
    id: "courage",
    title: "Coragem",
    description: "Assinou um plano pago no primeiro dia!",
    icon: "🦁",
    badge: "special"
  });
}
```

#### 3.2 Mostrar no Perfil
```typescript
// Em Profile page - Achievement section
<div className="special-achievement">
  🦁 Coragem - Assinou no primeiro dia!
</div>
```

#### 3.3 Indicador visual
- Icon especial próximo ao avatar
- Badge "🦁 Coragem" no perfil
- Toast ao desbloquear: "🦁 Conquista desbloqueada: Coragem!"

#### 3.4 Checklist:
- [ ] Criar achievement record "courage"
- [ ] Detectar first-time subscription
- [ ] Chamar recordAchievement()
- [ ] Mostrar no Profile com ícone 🦁
- [ ] Testar ao assinar pela primeira vez

---

### 4. 📋 Reordenar Fluxo de Onboarding
**Status**: Planejado

#### Ordem atual (ERRADA):
1. Seleção de plano
2. Dados pessoais
3. Home info
4. Configurações

#### Ordem CORRETA:
1. Dados pessoais ← PRIMEIRO
2. Home info
3. Configurações
4. Seleção de plano ← ÚLTIMO
5. **Botão: "Começar Teste Grátis"** (não "Assinar")

#### 3.1 Mudanças necessárias:
- [ ] Reordenar steps em Onboarding component
- [ ] Mudar botão para "Começar Teste Grátis"
- [ ] Ao clicar: Criar subscription com plan='free' e trial
- [ ] Mostrar upgrade de plano DEPOIS

#### 3.2 Checklist:
- [ ] Reordenar UI steps
- [ ] Mudar label do botão
- [ ] Testar fluxo completo
- [ ] Verificar trial dates

---

## 📊 RESUMO DE TRABALHO

| Tarefa | Esforço | Status | Bloqueador |
|--------|---------|--------|-----------|
| Error handling | 4-6h | 🟡 Planejado | Nenhum |
| Member restrictions | 3-4h | 🟡 Planejado | Hook useCanAccessFeature |
| Courage achievement | 2-3h | 🟡 Planejado | Achievement system |
| Onboarding reorder | 2-3h | 🟡 Planejado | Nenhum |
| **TOTAL** | **11-16h** | **2-3 dias** | - |

---

## 🚀 FASES DE DEPLOYMENT

### Fase 1: Desenvolvimento (AGORA)
- [ ] Task 1: Error handling
- [ ] Task 2: Member restrictions
- [ ] Task 3: Courage achievement  
- [ ] Task 4: Onboarding reorder
- [ ] Testes locais completos
- **Deadline**: 2026-05-02

### Fase 2: QA/Staging (1 semana)
- [ ] Deploy em staging
- [ ] 10 beta testers
- [ ] Teste offline/online
- [ ] Teste fluxos críticos
- **Deadline**: 2026-05-09

### Fase 3: Produção (Gradual)
- [ ] 10% dos usuários por 24h
- [ ] 50% dos usuários por 48h
- [ ] 100% dos usuários
- [ ] Monitorar errors
- **Deadline**: 2026-05-12

---

## ✅ REQUISITOS PRÉ-DEPLOY

### Code Quality
- [ ] TypeScript: 0 errors ✅
- [ ] Build: < 30s ✅
- [ ] Error handling: 100% coverage ⚠️
- [ ] No console.error visible to users ✅
- [ ] All async with try/catch ⚠️

### Testing
- [ ] Build without errors
- [ ] Offline sync + retry
- [ ] Delete/Update operations
- [ ] Multi-account flow
- [ ] First-time subscription
- [ ] Member restrictions

### Infrastructure  
- [ ] Error tracking (Sentry) - Optional
- [ ] Monitoring alerts - Optional
- [ ] Rollback plan - Ready
- [ ] Database backup - Ready

---

## 🎬 COMEÇAR AGORA

### Próximas Ações (Ordem):

1. **HOJE**: Implementar error handling em 10 funções críticas
   ```bash
   # Editar src/contexts/KazaContext.tsx
   # Funções: deleteItem, removeFromShoppingList, etc
   # Adicionar try/catch + showError() + toast
   ```

2. **AMANHÃ**: Implementar member restrictions
   ```bash
   # Criar src/hooks/useCanAccessFeature.ts
   # Adicionar em: Payments, GroupMembers, Analytics
   ```

3. **Após amanhã**: Courage achievement
   ```bash
   # Adicionar em: completeOnboarding()
   # Testar ao assinar primeira vez
   ```

4. **Final**: Reordenar onboarding
   ```bash
   # Editar fluxo em Onboarding component
   # Testar novo fluxo
   ```

---

## 📞 SUPORTE

**Dúvidas sobre implementação?**
- Veja ERROR_HANDLING_GUIDE.md para padrão
- Veja PRODUCTION_DEPLOYMENT_ANALYSIS.md para análise
- Teste localmente antes de commitar

**Ao terminar cada tarefa:**
1. Make commit
2. Run tests
3. Verify no new errors
4. Update this roadmap status

---

**Versão**: 1.0  
**Criado**: 2026-04-30  
**Atualizado**: Dinâmico - atualize conforme progride
