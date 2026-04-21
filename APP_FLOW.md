# Fluxo Técnico do Aplicativo Kaza

Este documento descreve o funcionamento interno, arquitetura de segurança e fluxos de dados do Kaza.

## 1. Arquitetura de Autenticação e Cadastro
O Kaza utiliza o **Supabase Auth** como provedor de identidade, com foco em Login Social (Google).

### 1.1 Login via Google
- **Fluxo**: O usuário clica em "Entrar com Google".
- **Gatilho de Banco**: Quando a conta é criada no `auth.users`, um gatilho SQL (`handle_new_user`) cria automaticamente um registro correspondente na tabela `public.profiles`.
- **Segurança**: Isso garante que o perfil exista antes mesmo de o usuário chegar no app, evitando falhas de permissão (RLS).

## 2. Onboarding Seguro (Atomicidade)
O onboarding não é feito por requisições separadas do frontend para evitar o erro **403 Forbidden**.

- **RPC `complete_user_onboarding`**: Uma função central no servidor que recebe todos os dados do onboarding de uma vez.
- **Operações Atômicas**: Em uma única transação, a função:
  1. Cria a `homes`.
  2. Adiciona o usuário como `owner` em `home_members`.
  3. Cria as `home_settings` da geladeira.
  4. Ativa as `notification_preferences`.
  5. Marca o perfil como `onboarding_completed`.

## 3. Blindagem de Dados (Zero Leakage)
O sistema aplica o princípio de **Privilégio Mínimo**:
- **RLS (Row Level Security)**: Usuários só enxergam dados das casas onde são membros.
- **Backups**: Todas as tabelas de backup (`_backup`) são invisíveis para a chave pública (bloqueadas via RLS).
- **Mutações**: Dados sensíveis (como perfil e assinaturas) não podem ser alterados diretamente via código JavaScript no browser; apenas via funções protegidas (RPC) no servidor.
