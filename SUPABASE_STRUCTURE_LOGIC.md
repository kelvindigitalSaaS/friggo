# 🗄️ KAZA — Lógica e Estrutura do Supabase (Backup & Análise)

Este documento descreve a arquitetura completa do banco de dados do projeto KAZA, incluindo a estrutura de tabelas, políticas de segurança (RLS), relacionamentos e lógica de negócios. Serve como base para auditoria de produção e planejamento de futuras mudanças.

---

## 🏗️ 1. Arquitetura Core

O KAZA utiliza uma arquitetura **Multi-tenant baseada em "Homes" (Casas)**.
- **Tenant**: Cada `home` (casa) é um isolamento lógico.
- **Usuários**: Podem pertencer a múltiplas casas através da tabela `home_members`.
- **Propriedade**: Cada casa tem um `owner_user_id` (Dono), mas pode ter múltiplos `admins` e `members`.

---

## 🔐 2. Modelo de Segurança (RLS)

A segurança é implementada via **Row Level Security (RLS)** em todas as tabelas do schema `public`.

### Funções de Segurança Principais:
1.  **`user_home_ids()`**: Retorna um conjunto de UUIDs das casas às quais o usuário autenticado pertence.
2.  **`user_has_home_role(home_id, roles[])`**: Verifica se o usuário tem um dos papéis informados para uma casa específica.

### Padrões de Política:
- **Isolamento de Usuário**: `USING (user_id = auth.uid())`
- **Isolamento de Casa**: `USING (home_id IN (SELECT user_home_ids()))`
- **Controle de Role**: `WITH CHECK (user_has_home_role(home_id, '{owner,admin}'))`

---

## 📂 3. Documentação por Schema

### 3.1 Schema `public` (Core)

| Tabela | Função | RLS Ativo |
| :--- | :--- | :---: |
| **profiles** | Dados estendidos do usuário (CPF, Plano, Status). | ✅ |
| **homes** | Entidade central de residência. | ✅ |
| **home_members** | Mapeamento M:N Usuário ↔ Casa com roles. | ✅ |
| **items** | Inventário da casa (geladeira/despensa). | ✅ |
| **consumables** | Estoque de itens de consumo recorrente. | ✅ |
| **consumable_logs** | Histórico de débitos e reposições de consumíveis. | ✅ |
| **recipes** | Base de receitas compartilhadas ou privadas. | ✅ |
| **meal_plans** | Planejamento de refeições diárias. | ✅ |
| **garbage_reminders**| Configuração de cronograma de coleta de lixo. | ✅ |
| **subscriptions** | Gestão de planos e limites (Basic, Pro, etc). | ✅ |

### 3.2 Schema `auth`
- **users**: Tabela central de autenticação do Supabase.
- **audit_log_entries**: Logs de eventos de autenticação.

### 3.3 Schema `storage`
- **buckets**: `avatars` (público), `item-images` (privado).
- **objects**: Referências aos arquivos físicos.

---

## ⚙️ 4. Tipos Customizados (Enums)

| Tipo | Valores |
| :--- | :--- |
| **home_role** | `owner`, `admin`, `member`, `viewer` |
| **item_category** | `fruit`, `vegetable`, `meat`, `dairy`, `cooked`, `frozen`, `beverage`, `cleaning`, `hygiene`, `pantry`, `other` |
| **item_location** | `fridge`, `freezer`, `pantry`, `cleaning` |
| **subscription_plan**| `free`, `basic`, `standard`, `premium` |
| **consumable_action**| `debit`, `restock`, `adjust` |

---

## 🔄 5. Triggers e Lógica Automática

1.  **Bootstrap de Usuário**: Ao criar um usuário no `auth.users`, um trigger automático cria:
    - Registro em `public.profiles`.
    - Uma `public.homes` padrão ("Minha Casa").
    - Vínculo em `public.home_members` como `owner`.
    - Preferências iniciais de notificação.
2.  **Updated At**: Todas as tabelas possuem trigger para atualizar a coluna `updated_at` automaticamente.

---

## 📊 6. Análise e Próximos Passos (O que mudar)

### ⚠️ Pontos de Atenção:
- **Performance**: Com o aumento de usuários (meta de 10k), as queries que usam `IN (SELECT user_home_ids())` devem ser monitoradas. Índices em `home_id` são críticos.
- **Duplicidade**: Detectada a necessidade de uma constraint UNIQUE em `(user_id, home_id)` na tabela de preferências de notificação para evitar redundância.
- **CPF**: A lógica de `cpf_locked_at` precisa ser rigorosamente testada no front-end para evitar bloqueios indevidos em caso de erro de digitação.

### 🚀 Melhorias Sugeridas:
- **Soft Delete**: Implementar `deleted_at` em tabelas críticas como `homes` para permitir recuperação de dados.
- **Cache de Permissões**: Avaliar o uso de `custom claims` no JWT para armazenar as `home_ids` do usuário, reduzindo hits no banco para checagem de RLS.
- **Limpeza de Logs**: Implementar política de retenção para `consumable_logs` e `item_history` (ex: 90 dias) para manter o banco leve.

---
**Data da Auditoria:** 29 de Abril de 2026
**Responsável:** Engenheiro de Dados Especialista (Antigravity)
