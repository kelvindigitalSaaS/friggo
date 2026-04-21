# Regras de Negócio — Kaza

Este documento consolida as regras que regem a lógica do aplicativo e garantem a integridade dos dados e do modelo de negócio SaaS.

## 1. Identidade e Acesso
- **CPF Único**: Cada CPF só pode estar vinculado a um único perfil de usuário em todo o sistema. Tentativas de duplicidade no onboarding serão bloqueadas.
- **Imutabilidade**: Nome e CPF são "travados" após o primeiro preenchimento bem-sucedido para evitar fraudes em planos pagos.

## 2. Gestão de Casas (Multi-tenancy)
- **Hierarquia**: Cada casa tem exatamente um `owner` (Dono) e múltiplos `members` (Membros).
- **Estrutura Única**: Um usuário que entra no app como "Dono" só pode criar uma nova casa se ele não for membro de nenhuma outra casa existente. Isso evita a fragmentação de dados.
- **Configuração da Geladeira**: Apenas o Dono ou Membros com cargo de Admin podem alterar os níveis de resfriamento e marcas da geladeira em `home_settings`.

## 3. Planos e Subcontas (MultiPRO)
- **Convites**: Um convite para subconta permanece válido por 7 dias. Após esse período, o token expira automaticamente.
- **Aceite de Convite**: Ao aceitar um convite, o novo usuário é automaticamente vinculado à `home_id` do Master, ignorando o fluxo de criação de nova casa (RPC `accept_invite`).

## 4. Inventário e Shopping
- **Isolamento de Dados**: Todos os itens (`items`), consumíveis e listas de compras são filtrados estritamente pelo `home_id` logado. Sem uma `home_id` válida, nenhuma operação de negócio é permitida (RLS).
- **Categorias Customizadas**: As categorias criadas por um usuário são visíveis para todos os membros da mesma casa.
