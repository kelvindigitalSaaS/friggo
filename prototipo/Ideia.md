# 🏠 KAZA — Documento Mestre do Projeto

> App mobile-first de **controle de estoque pessoal/doméstico** no formato **PWA (SaaS)**.
> Este documento é a referência central. Cada seção contém um **prompt isolado** para ser usado no Claude Code.

---

## 📌 VISÃO GERAL

**Nome:** Kaza
**Tipo:** SaaS PWA (Progressive Web App) — instala como app nativo
**Plataforma:** Mobile-first (funciona em qualquer browser)
**Idioma da interface:** Português do Brasil
**Estética:** Premium, orgânico/natural, clean & organizado — tons de verde floresta com acentos quentes
**Propósito:** Controlar o estoque doméstico/pessoal — entradas, saídas (consumo) e descartes de produtos

### Stack Tecnológico

| Tecnologia | Versão | Uso |
|---|---|---|
| Vite | latest | Build tool + dev server |
| React | 18+ | Framework SPA |
| React Router | v6 | Navegação entre telas |
| Framer Motion | latest | Animações, gestos, layout morphing |
| Tailwind CSS | v4 | Styling utilitário |
| CSS Custom Properties | — | Design tokens globais |
| PWA (Service Worker) | — | Instalação mobile + offline |

### Dependências

```bash
npm create vite@latest ./ -- --template react
npm install framer-motion react-router-dom
npm install -D tailwindcss @tailwindcss/vite
```

---

## 🎨 DESIGN SYSTEM

### Paleta de Cores

```css
:root {
  /* === Cores Principais === */
  --color-primary: #0d3b2e;
  --color-primary-mid: #1a5c3a;
  --color-accent-green: #8bc34a;
  --color-accent-green-light: #c8e6c9;
  --color-accent-orange: #e07c3a;
  --color-accent-orange-light: #fff8f0;
  --color-surface: #ffffff;
  --color-surface-alt: #f5f7f5;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #5c5c5c;
  --color-text-muted: #b0b0b0;
  --color-text-on-primary: #ffffff;
  --color-border: #e0e0e0;
  --color-grocery-tag: #f9e7b0;

  /* Escala de verdes do protótipo (gradientes) */
  --kaza-900: #165A52;
  --kaza-800: #276A5C;
  --kaza-700: #3B7A68;
  --kaza-600: #548A76;
  --kaza-500: #709A87;
  --kaza-400: #90AB9C;
  --kaza-100: #DAF1DE;

  /* === Tipografia === */
  --font-family-base: 'SF Pro Display', 'Inter', sans-serif;
  --font-family-heading: 'Oswald', sans-serif;
  --font-family-body: 'Quattrocento', serif;
  --font-size-xs: 10px;
  --font-size-sm: 12px;
  --font-size-md: 14px;
  --font-size-lg: 18px;
  --font-size-xl: 22px;
  --font-size-price: 20px;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* === Espaçamento === */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --page-padding: 16px;

  /* === Border Radius === */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-full: 999px;

  /* === Sombras === */
  --shadow-sm: 0 2px 6px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.10);
  --shadow-card: 0 2px 12px rgba(13,59,46,0.08);

  /* === Tokens de Componente === */
  --navbar-height: 60px;
  --tabbar-height: 64px;
  --input-height: 46px;
  --btn-add-size: 32px;
  --card-img-size: 80px;
  --category-icon-size: 48px;
  --transition-base: 0.2s ease;

  /* === Easing Curves (do skill animate) === */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Tipografia

- **Headings:** `Oswald` (Google Fonts) — Bold, para títulos e categorias
- **Body:** `Quattrocento` (Google Fonts) — Regular para descrições
- **UI/Labels:** `SF Pro Display` / `Inter` (fallback) — Para elementos de interface
- **Preços:** `Oswald` tamanho grande, centavos menores em superscript

### Assets (pasta `prototipo/`)

| Arquivo | Uso |
|---------|-----|
| `FAVICON.png` | Ícone do app (casa estilizada em fundo #165A52) |
| `logo completa site branca.svg` | Logo para headers escuros |
| `logo completa site preto.svg` | Logo para fundos claros |
| `paleta de cores.jpeg` | Referência visual da paleta |
| `tipografia.jpeg` | Referência visual da tipografia |
| `desing mobile 1.webp` | Mockup: Home + Product Detail |
| `desing mobile 2.webp` | Mockup: Categories + Category Detail |
| `animacoes.mp4` | Referência de animações |

---

## 🧠 LÓGICA DE NEGÓCIO (CORE)

O Kaza é um **SaaS de controle de estoque pessoal/doméstico**. O usuário gerencia os produtos que tem em casa.

### Fluxos Principais

| Fluxo | Descrição | Como é feito |
|-------|-----------|---|
| **📥 Entrada** | Adicionar produto ao estoque | Código de barras (câmera) OU busca por nome. Produto vem de base pré-cadastrada (JSON gigante) |
| **📤 Saída (Consumo)** | Usar/consumir parte do produto | Informar quantidade consumida. Respeita unidade de medida. Líquidos/peso: mínimo 100ml ou 100g |
| **🗑️ Descarte** | Produto venceu ou estragou | Marca como descartado. Sai do estoque. Entra no relatório de perdas |

### Categorias de Produto (Tipo)

Ao dar entrada em um produto, ele deve ser classificado em UMA categoria de tipo:

| Categoria | Descrição | Exemplos |
|-----------|-----------|----------|
| **Insumos** | Ingredientes e matérias-primas para preparo | Farinha, óleo, sal, temperos, ovos |
| **Não Perecíveis** | Produtos com validade longa ou sem validade | Enlatados, grãos, massas secas, açúcar |
| **Consumíveis** | Produtos de uso diário que acabam rápido | Papel higiênico, detergente, sabão, esponja |

### Locais de Armazenamento (Onde guarda)

Cada produto também é associado a um LOCAL de armazenamento:

| Local | Ícone | Descrição |
|-------|-------|-----------|
| **Geladeira** | 🧊 | Produtos refrigerados |
| **Freezer** | ❄️ | Produtos congelados |
| **Dispensa** | 🏪 | Secos, enlatados, grãos |
| **Limpeza** | 🧹 | Produtos de limpeza |
| **+ Personalizado** | ✏️ | O usuário pode criar seus próprios locais |

### Consumíveis com Rastreamento de Uso

Produtos da categoria "Consumíveis" (especialmente higiene pessoal) têm um modelo especial:

```json
{
  "id": "uuid",
  "name": "Shampoo Dove 400ml",
  "category": "consumivel",
  "usageFrequency": "diario",
  "quantityPerUse": 1,
  "currentStock": 2,
  "minimumStock": 1,
  "autoAddToShoppingList": true
}
```

| Campo | Valores | Descrição |
|-------|---------|----------|
| `usageFrequency` | diario, semanal, quinzenal, mensal | Com que frequência o usuário usa |
| `quantityPerUse` | número | Quanto usa por vez |
| `minimumStock` | número | Abaixo disso → notifica e adiciona à lista de compras |
| `autoAddToShoppingList` | true/false | Adicionar automaticamente à lista quando estoque baixo |

### Unidades de Medida

| Tipo | Unidades | Consumo mínimo |
|------|----------|----------------|
| **Peso** | g, kg | A partir de 100g |
| **Volume** | ml, L | A partir de 100ml |
| **Unidade** | un | 1 unidade |
| **Pacote** | pct | 1 pacote |

### Modelo de Dados (Produto no Estoque)

```json
{
  "id": "uuid",
  "productId": "ref ao produto da base JSON",
  "name": "Arroz Integral Tio João",
  "category": "nao_perecivel",
  "barcode": "7891234567890",
  "unit": "kg",
  "totalQuantity": 5,
  "currentQuantity": 3.2,
  "expirationDate": "2026-08-15",
  "entryDate": "2026-04-14",
  "department": "Mercearia",
  "storageLocation": "dispensa",
  "status": "active",
  "history": [
    { "type": "entrada", "quantity": 5, "date": "2026-04-14" },
    { "type": "saida", "quantity": 1.8, "date": "2026-04-16", "reason": "consumo" }
  ]
}
```

### Base de Produtos Pré-Cadastrados

O app terá um **JSON grande** com centenas de produtos comuns já pré-cadastrados:
- Nome, código de barras, unidade de medida padrão, departamento/seção
- Ao buscar por nome ou escanear código de barras, o produto é sugerido automaticamente
- O usuário só precisa informar: quantidade, validade e categoria

### Relatório Mensal

- Sempre considerando o **mês de competência** (01 a 30/31), NÃO últimos 30 dias
- Métricas:
  - Total de entradas no mês
  - Total de saídas (consumo) no mês
  - Total de descartes (perdas) no mês
  - Produtos próximos ao vencimento
  - Valor estimado do estoque

### Checkup / Notificações Periódicas

- Sistema de verificação periódica configurável pelo usuário
- Pergunta: "Você usou ou descartou [produto X] recentemente?"
- Frequência configurável nas Configurações (diário, semanal, quinzenal, mensal)
- Produtos que não tiveram movimentação entram no checkup
- O usuário pode: confirmar uso, registrar descarte, ou ignorar

---

## 📱 TELAS DO APP

### Tela 0 — 🔐 Login / Loading (Primeira Tela)

Esta é a PRIMEIRA coisa que o usuário vê ao abrir o app.

**Fase A — Splash/Loading (2-3 segundos):**

```
┌─────────────────────────┐
│                          │
│                          │
│         ╭─────╮          │
│        ╱       ╲         │
│       ╱  ╭───╮  ╲       │  ← Favicon (casa) animado
│      │   │   │   │       │     Pulsa + rotação sutil
│       ╲  ╰───╯  ╱       │     Traço SVG se desenha
│        ╲       ╱         │
│         ╰─────╯          │
│                          │
│      ███████████▒        │  ← Barra de progresso fina
│                          │
│         k a z a          │  ← Logo aparece em fade
│                          │
│                          │
└─────────────────────────┘
```

**Loader criativo:**
- Background: gradiente radial sutil de `--color-primary` → `--kaza-800`
- O ícone da casa (favicon) se desenha com animação SVG stroke-dasharray
- Depois de desenhado, faz um pulse suave (scale 1 → 1.05 → 1) em loop
- Barra de progresso fina abaixo: verde `--color-accent-green`, animação de preenchimento
- Logo "kaza" aparece com stagger letter por letter (fade in cada letra com 80ms delay)
- Depois de ~2.5s, transição suave para a tela de Login

**Fase B — Tela de Login:**

```
┌─────────────────────────┐
│                          │
│       🏠 kaza            │  ← Logo pequena no topo
│                          │
│    Que bom ter você      │  ← Título (font-heading)
│       de volta!          │
│                          │
│  Entre e controle seu    │  ← Subtítulo (font-body)
│  estoque com facilidade  │
│                          │
│  E-mail                  │
│  ┌─────────────────────┐ │  ← Input com borda suave
│  │ seu@email.com    ✅ │ │     ✅ = válido (verde)
│  └─────────────────────┘ │     ❌ = erro (laranja)
│                          │
│  Senha                   │
│  ┌─────────────────────┐ │
│  │ ••••••••••       👁 │ │  ← Toggle visibilidade
│  └─────────────────────┘ │
│           Esqueceu a senha?│ ← Link (--color-primary-mid)
│                          │
│  ┌─────────────────────┐ │
│  │    Entrar    →      │ │  ← Botão CTA principal
│  └─────────────────────┘ │     --color-primary, radius-xl
│                          │
│    Ou entre com          │  ← Divisor com linha
│                          │
│    [f]    [G]            │  ← Botões sociais (outline)
│                          │
│  Não tem conta?          │
│  Crie aqui!              │  ← Link verde (--color-accent-green)
│                          │
└─────────────────────────┘
```

**Estados do formulário (inspirado na imagem de referência):**

| Estado | Visual |
|--------|--------|
| Vazio | Borda `--color-border`, placeholder `--color-text-muted` |
| Focus | Borda `--color-primary`, sombra sutil verde |
| Válido | Borda `--color-accent-green`, ícone ✅ verde no canto |
| Erro | Borda `--color-accent-orange`, texto de erro laranja abaixo |
| Loading | Botão com spinner, inputs desabilitados |

**Elementos:**
1. Logo Kaza pequena centrada no topo (SVG preta em fundo claro)
2. Título: "Que bom ter você de volta!" — font-heading, --font-size-xl, bold
3. Subtítulo: "Entre e controle seu estoque com facilidade" — font-body, --color-text-secondary
4. Input E-mail: type email, ícone de validação, borda animada
5. Input Senha: type password, toggle mostrar/ocultar (olho), borda animada
6. "Esqueceu a senha?" — link discreto alinhado à direita
7. Botão "Entrar →" — full width, --color-primary, radius-xl, --font-weight-bold
8. Divisor "Ou entre com" — linhas horizontais com texto no meio
9. Botões sociais: Facebook (f) e Google (G) — círculos outline
10. "Não tem conta? Crie aqui!" — texto + link verde

**Comportamento:**
- Validação em tempo real (email regex, senha min 6 chars)
- Shake animation nos inputs com erro ao tentar enviar
- Botão desabilitado enquanto campos inválidos
- Ao logar com sucesso: loader rápido no botão → transição para Home
- Sem Header nem BottomNav nesta tela (tela fullscreen)

---

### Tela 1 — 🏠 Home Page (Painel de Estoque)

```
┌─────────────────────────┐
│ ████ HEADER VERDE ████  │  ← wave/curve SVG no fundo
│  🏠 kaza                │  ← Logo branca
│  Olá, João!       🔔    │  ← Saudação + notificações
│─────────────────────────│
│                          │
│  📊 Relatório Mensal     │  ← Título seção
│  Abril 2026              │  ← Competência do mês atual
│  ┌──────┐┌──────┐┌──────┐│
│  │ 📥   ││ 📤   ││ 🗑️   ││  ← 3 cards resumo
│  │  24  ││  18  ││  3   ││
│  │Entrad││Saídas││Desc. ││
│  └──────┘└──────┘└──────┘│
│                          │
│  ⚠️ 5 produtos vencendo  │  ← Alerta (se houver)
│                          │
│─────────────────────────│
│  🔔 Checkup Pendente     │  ← Card de checkup
│  ┌─────────────────────┐ │
│  │ Arroz Tio João      │ │
│  │ Sem movimentação     │ │
│  │ há 15 dias           │ │
│  │ [Usei] [Descartei]  │ │
│  └─────────────────────┘ │
│  ┌─────────────────────┐ │
│  │ Leite Integral      │ │
│  │ Vence em 2 dias!    │ │
│  │ [Usei] [Descartei]  │ │
│  └─────────────────────┘ │
│                          │
│─────────────────────────│
│  Meu Estoque             │  ← Título seção
│  ┌─────────────────────┐ │
│  │ 🥫 Insumos       12 │ │  ← Departamentos com qtd
│  ├─────────────────────┤ │
│  │ 📦 Não Perecíveis 8 │ │
│  ├─────────────────────┤ │
│  │ 🧹 Consumíveis    5 │ │
│  └─────────────────────┘ │
│                          │
│─────────────────────────│
│  🍳 Receita do Dia       │  ← Sugestão baseada no estoque
│  ┌─────────────────────┐ │
│  │ 🖼️ Lasanha Bolonhesa│ │
│  │ ⏱️ 45min  75% itens ✅│ │  ← % dos ingredientes
│  │ [Ver Receita →]      │ │
│  └─────────────────────┘ │
│                          │
│─────────────────────────│
│ 🏠  📦  🍳  📊  ⚙️     │  ← Bottom Tab Bar (5 tabs)
│                     [+]  │  ← FAB (Floating Action Button)
└─────────────────────────┘
```

**Seções da Home:**

1. **Header verde** com wave curve (SVG), logo kaza branca, saudação "Olá, [nome]!", ícone de notificações 🔔 (com badge de contagem)

2. **Relatório Mensal** (competência do mês, NÃO últimos 30 dias):
   - Título "Relatório Mensal" + nome do mês (ex: "Abril 2026")
   - 3 cards de resumo lado a lado:
     - 📥 Entradas (total do mês)
     - 📤 Saídas/Consumo (total do mês)
     - 🗑️ Descartes (total do mês)
   - Cada card com ícone, número grande e label
   - Se há produtos prestes a vencer: alerta laranja "⚠️ X produtos vencendo"

3. **Checkup Pendente** (se houver notificações):
   - Cards de produtos que precisam de atenção
   - Cada card mostra: nome do produto, motivo (sem movimentação / vencendo)
   - Botões de ação rápida: [Usei] e [Descartei]
   - O usuário configura a periodicidade nas configurações
   - Se não há checkups: seção oculta ou "Tudo em dia! ✅"

4. **Meu Estoque** — listagem por departamento/categoria:
   - Cada linha: ícone + nome da categoria + quantidade de itens
   - Tap abre a listagem completa daquela categoria
   - Categorias: Insumos, Não Perecíveis, Consumíveis

5. **🍳 Receita do Dia** — sugestão inteligente baseada no estoque:
   - Card largo com imagem da receita, nome, tempo de preparo
   - Badge "X% dos ingredientes no estoque":
     - Verde (>80%): ✅ "Quase pronto!"
     - Amarelo (50-80%): ⚠️ "Faltam alguns itens"
     - Vermelho (<50%): ❌ "Muitos itens faltando"
   - Botão "Ver Receita →" → navega para /receitas/:id
   - Lógica de sugestão:
     - Prioriza receitas onde o usuário tem >70% dos ingredientes
     - Considera o perfil/preferências do usuário
     - Rotaciona 1 receita diferente por dia
     - Se sem perfil: mostra receitas populares

6. **🔔 Painel de Notificações** — ao clicar no ícone 🔔 no header:
   - Badge numérico vermelho no ícone indica notificações não lidas
   - Abre dropdown/overlay deslizando de cima com AnimatePresence
   - Tipos de notificação:
     - ⚠️ Produto vencendo em X dias
     - 📉 Estoque mínimo atingido (consumível)
     - 🔔 Checkup pendente (sem movimentação)
     - 🛒 Item adicionado automaticamente à lista de compras
     - 🍳 Receita do dia disponível
     - ⏰ Timer de cozinha finalizado
   - Cada notificação: ícone + título + descrição + horário + botão de ação
   - Swipe left para dispensar notificação
   - Botão "Limpar todas" no topo
   - Animação: slideDown + fade com stagger nos itens
   - Notificações persistem até serem lidas/dispensadas

7. **FAB (Floating Action Button)** — botão "+" verde:
   - Posição: bottom-right, acima do BottomNav
   - Cor: --color-primary, ícone "+" branco
   - whileTap: scale 0.9
   - Ao clicar: abre modal de Adicionar Item (Entrada) com:
     - Barra de busca por nome do produto
     - Botão de escanear código de barras (câmera)
     - Resultados da base pré-cadastrada aparecem embaixo
     - Selecionar produto → preenche nome, unidade, departamento
     - Usuário completa: quantidade, validade, local de armazenamento, categoria
   - Disponível tanto na Home quanto na Tela 2 (Estoque)

8. **Bottom Navigation** (5 tabs):
   - 🏠 Início — Home (esta tela)
   - 📦 Estoque — Lista completa de todos os itens
   - 🍳 Receitas — Explorar receitas e plano alimentar
   - 📊 Relatórios — Relatórios detalhados
   - ⚙️ Configurações — Configurações do app

---

### Tela 2 — 📦 Estoque (Listagem por Local + Consumíveis)

Esta tela tem **duas sub-abas** no topo:

**Sub-aba A — Estoque (por local de armazenamento):**

```
┌─────────────────────────┐
│ ████ HEADER VERDE ████  │
│  📦 Meu Estoque         │
│─────────────────────────│
│  [  Estoque  ] [Consumíveis]│ ← 2 tabs (pill switch)
│─────────────────────────│
│  [🔍 Buscar produto...]  │ ← SearchBar
│  [📷 Escanear]           │ ← Botão de barcode
│─────────────────────────│
│                          │
│  🧊 Geladeira        15 │ ← Accordion/Card
│  ┌─────────────────────┐ │
│  │ Leite Integral  2L  │ │
│  │ ██████████░░ 70%     │ │ ← Barra de consumo
│  │ Vence: 16/04         │ │
│  ├─────────────────────┤ │
│  │ Queijo Minas  500g  │ │
│  │ ████████░░░░ 60%     │ │
│  │ Vence: 20/04         │ │
│  └─────────────────────┘ │
│                          │
│  ❄️ Freezer           8 │ ← Colapsado por padrão
│  ┌─────────────────────┐ │
│  │ (tap para expandir)  │ │
│  └─────────────────────┘ │
│                          │
│  🏪 Dispensa          22│
│  ┌─────────────────────┐ │
│  │ (tap para expandir)  │ │
│  └─────────────────────┘ │
│                          │
│  🧹 Limpeza            5│
│  ┌─────────────────────┐ │
│                          │
│  ✏️ + Criar novo local  │ ← Botão para criar categoria
│                          │
│─────────────────────────│
│ 🏠  📦  🍳  📊  ⚙️ [+]│
└─────────────────────────┘
```

**Elementos da sub-aba Estoque:**

1. **Tabs de alternância** no topo: [Estoque] e [Consumíveis]
   - Pill switch animada com layoutId (Framer Motion)
   - Tab ativa: fundo --color-primary, texto branco
   - Tab inativa: fundo transparente, texto --color-text-secondary

2. **Barra de busca** + **botão escanear código de barras (buscar E adicionar):**
   - Input: placeholder "Buscar produto..."
   - Busca no estoque existente OU na base pré-cadastrada para adicionar novos
   - Botão 📷: abre leitor de código de barras (câmera)
   - Pode digitar nome OU escanear para encontrar/adicionar ao estoque
   - Se o produto não existe no estoque, oferece opção "➕ Adicionar ao estoque"
   - Fluxo de adição: preenche dados do produto → confirma → entra no estoque

3. **Listagem por local de armazenamento** (accordion/collapse):
   - **Pré-definidos:** 🧊 Geladeira, ❄️ Freezer, 🏪 Dispensa, 🧹 Limpeza
   - Cada seção é **colapsável** (tap no header expande/recolhe)
   - Header da seção: ícone + nome + contagem de itens
   - AnimatePresence para expand/collapse suave

4. **Cada item na lista mostra:**
   - Nome do produto + quantidade/peso original
   - Barra de progresso: quanto resta (% do total)
     - Verde (>50%), Amarelo (20-50%), Vermelho (<20%)
   - Data de vencimento (laranja se <7 dias, vermelho se vencido)
   - Swipe left: ações rápidas [📤 Consumir] [🗑️ Descartar]

5. **Botão "+ Criar novo local"** no final:
   - Abre modal simples: nome do local + ícone (emoji picker)
   - O local criado aparece na lista junto dos pré-definidos

6. **FAB (+)** presente para adicionar novo produto ao estoque

---

**Sub-aba B — Consumíveis (Higiene Pessoal / Rastreamento):**

```
┌─────────────────────────┐
│ ████ HEADER VERDE ████  │
│  📦 Meu Estoque         │
│─────────────────────────│
│  [Estoque] [ Consumíveis ]│ ← Tab ativa
│─────────────────────────│
│                          │
│  Seus consumíveis        │
│  Configure a frequência  │
│  de uso de cada item     │
│                          │
│  ┌─────────────────────┐ │
│  │ 🧴 Shampoo          │ │
│  │ Estoque: 2 un       │ │
│  │ Uso: Diário         │ │
│  │ Mín: 1 un           │ │
│  │ ████████░░░░         │ │ ← Barra visual
│  │ [Editar] [Consumir]  │ │
│  ├─────────────────────┤ │
│  │ 🧻 Papel Higiênico  │ │
│  │ Estoque: 6 un       │ │
│  │ Uso: Semanal (2/sem) │ │
│  │ Mín: 4 un           │ │
│  │ ██████████████░░     │ │
│  │ [Editar] [Consumir]  │ │
│  ├─────────────────────┤ │
│  │ 🧽 Esponja          │ │
│  │ ⚠️ Estoque baixo! 1un│ │ ← Alerta amarelo
│  │ Uso: Quinzenal       │ │
│  │ Mín: 2 un           │ │
│  │ ██░░░░░░░░░░░        │ │ ← Barra vermelha
│  │ [Editar] [Comprar 🛒]│ │ ← Auto-adiciona à lista
│  └─────────────────────┘ │
│                          │
│  [+ Adicionar consumível]│ ← Botão
│                          │
│─────────────────────────│
│ 🏠  📦  🍳  📊  ⚙️ [+]│
└─────────────────────────┘
```

**Elementos da sub-aba Consumíveis:**

1. **Cabeçalho explicativo:** "Configure a frequência de uso de cada item"

2. **Lista de consumíveis cadastrados**, cada card mostra:
   - Ícone (emoji) + Nome do produto
   - Estoque atual (ex: "2 un")
   - Frequência de uso configurada (Diário, Semanal, Quinzenal, Mensal)
   - Quantidade por uso (se semanal 2/sem = usa 2 por semana)
   - Estoque mínimo definido pelo usuário
   - Barra de progresso visual (verde/amarelo/vermelho)
   - **Se estoque ≤ mínimo:** alerta amarelo ⚠️ "Estoque baixo!"
   - Botões: [Editar] e [Consumir] (ou [Comprar 🛒] se estoque baixo)

3. **Ao clicar "Editar"** abre modal/bottom sheet com:
   - Nome do item
   - Frequência de uso: select (Diário | Semanal | Quinzenal | Mensal)
   - Quantidade por uso: stepper numérico
   - Estoque mínimo: stepper numérico
   - Toggle: "Adicionar automaticamente à lista de compras"
   - Botão Salvar

4. **Ao clicar "Consumir":**
   - Registra saída de 1 unidade (ou a quantidade configurada)
   - Atualiza barra de progresso com animação
   - Se atingir estoque mínimo → mostra alerta + pode auto-adicionar à lista

5. **Botão "+ Adicionar consumível":**
   - Buscar por nome ou escanear código de barras
   - Configurar frequência, quantidade e mínimo

**Comportamento geral da Tela 2:**
- Busca funciona em ambas as abas (filtra por nome)
- Escaneamento funciona em ambas (identifica pelo barcode)
- Transição suave entre abas (AnimatePresence com slide horizontal)
- Pull to refresh atualiza contagens

---

### Tela 3 — 🍳 Receitas (Exploração + Plano Alimentar)

A tela de Receitas é o hub gastronômico do Kaza. Conecta o estoque do usuário com receitas, planejamento alimentar e modo de cozinha assistido.

**Layout principal:**

```
┌─────────────────────────┐
│ ████ HEADER VERDE ████  │
│  🍳 Receitas             │
│─────────────────────────│
│                          │
│ [📅 Plano Alimentar] [❤️]│ ← Plano + Favoritos
│                          │
│─────────────────────────│
│ [🔍 Buscar receita...]   │ ← SearchBar
│─────────────────────────│
│                          │
│  Categorias     [▼ Ver]  │ ← Ocultas por padrão
│  ┌───┐┌───┐┌───┐┌───┐  │
│  │🥗 ││🍝 ││🍰 ││🥩 │  │ ← Scroll horizontal
│  │Sal.││Mas.││Doc.││Car.│  │
│  └───┘└───┘└───┘└───┘  │
│                          │
│  Receitas Populares      │ ← Título seção
│  ┌─────────────────────┐ │
│  │ 🖼️ [Foto receita]   │ │
│  │ Lasanha Bolonhesa    │ │
│  │ ⏱️ 45min  👤 4 porções│ │
│  │ ██████░░ 75% itens ✅│ │ ← % ingredientes
│  ├─────────────────────┤ │
│  │ 🖼️ [Foto receita]   │ │
│  │ Strogonoff de Frango │ │
│  │ ⏱️ 30min  👤 3 porções│ │
│  │ ████░░░░ 50% itens ⚠️│ │
│  └─────────────────────┘ │
│                          │
│─────────────────────────│
│ 🏠  📦  🍳  📊  ⚙️     │ ← Bottom Tab Bar
└─────────────────────────┘
```

**Elementos da Tela de Receitas:**

1. **Header** com título "Receitas" e ícone 🍳

2. **Barra superior de ações:**
   - Botão **📅 Plano Alimentar** — abre a tela de planejamento (Tela 3C)
   - Botão **❤️ Favoritos** — coração ao lado, abre receitas salvas (Tela 3D)
   - Ambos com pill shape, --color-primary outline
   - Animação: whileHover scale 1.05, whileTap scale 0.95

3. **Barra de busca:**
   - Input: placeholder "Buscar receita..."
   - Busca por nome, ingrediente ou categoria
   - Resultados aparecem em tempo real abaixo (debounce 300ms)
   - Ícone 🔍 desliza ao focus (Search Expand animation)

4. **Categorias de receita (ocultas por padrão):**
   - Botão "▼ Ver categorias" para expandir/recolher
   - AnimatePresence com slideDown suave
   - Categorias em scroll horizontal (drag gesture):
     - 🥗 Saladas | 🍝 Massas | 🍰 Doces | 🥩 Carnes
     - 🐟 Peixes | 🥘 Sopas | 🍕 Lanches | 🥤 Bebidas
     - 🌱 Vegano | 🥚 Low Carb | 💪 Fitness | 🌍 Internacional
     - 🍳 Café da Manhã | 🥪 Rápidas | 🎉 Especiais
   - Ao selecionar categoria, filtra a lista de receitas abaixo
   - whileHover/whileTap em cada categoria

5. **Lista de receitas** (para todos os gostos!):
   - Cards de receitas com:
     - Foto grande da receita (aspect ratio 16:9)
     - Nome da receita (font-heading, --font-size-lg)
     - Tempo de preparo ⏱️ + Porções 👤
     - **Barra de % de ingredientes disponíveis:**
       - Calcula automaticamente cruzando com o estoque do Kaza
       - Verde (>80%): ✅ "Quase pronto!"
       - Amarelo (50-80%): ⚠️ "Faltam alguns itens"
       - Vermelho (<50%): ❌ "Muitos itens faltando"
     - Dificuldade: Fácil / Médio / Difícil (badge colorido)
   - Grid: 1 coluna (cards largos com foto)
   - Stagger animation na entrada (variants container/item)
   - Ao clicar → abre Detalhe da Receita (Tela 3A)

---

### Tela 3A — 📋 Detalhe da Receita

Abre como sub-rota dentro da navegação de Receitas (`/receitas/:id`).

```
┌─────────────────────────┐
│ ◀ Voltar         ❤️ 🔗  │ ← Header com ações
│─────────────────────────│
│                          │
│  🖼️ [FOTO GRANDE]       │ ← Imagem da receita
│                          │
│  Lasanha Bolonhesa       │ ← Título (font-heading)
│  ⏱️ 45min  👤 4 porções  │
│  ⭐ 4.8 (124 avaliações) │
│  🏷️ Fácil               │ ← Badge dificuldade
│                          │
│─────────────────────────│
│  Ingredientes disponíveis│
│  ┌─────────────────────┐ │
│  │ ██████████░░░ 75%    │ │ ← Barra grande animada
│  │ 9 de 12 ingredientes │ │
│  │ ✅ Massa  ✅ Queijo   │ │
│  │ ✅ Molho  ❌ Presunto │ │ ← ✅ tem / ❌ não tem
│  │ ❌ Bechamel ❌ Orégano│ │
│  └─────────────────────┘ │
│                          │
│  Itens faltando: 3       │
│  [🛒 Adicionar à lista]  │ ← Itens → lista de compras
│                          │
│  ┌─────────────────────┐ │
│  │ 🍳 INICIAR COZINHA  │ │ ← Botão CTA grande
│  └─────────────────────┘ │
│                          │
│  [📅 Adicionar ao Plano] │ ← Add ao plano alimentar
│                          │
│─────────────────────────│
│ 🏠  📦  🍳  📊  ⚙️     │
└─────────────────────────┘
```

**Elementos:**

1. **Header:** botão voltar ◀ + ícone favorito ❤️ + compartilhar 🔗
   - ❤️ toggle: animação pulse scale ao favoritar (Heart Pulse #7)
   - whileTap: scale 0.85 no coração

2. **Foto grande** da receita:
   - Height: 220px, width: 100%, object-cover
   - layoutId para morphing ao entrar/sair
   - Gradiente escuro sutil na base da imagem (para texto legível)

3. **Info da receita:**
   - Nome: font-heading, --font-size-xl, bold
   - Tempo ⏱️ + Porções 👤 + Avaliação ⭐: linha com ícones
   - Badge de dificuldade: Fácil (verde), Médio (amarelo), Difícil (vermelho)
   - Stagger fadeIn + slideUp ao entrar

4. **Painel de ingredientes (cruzamento com estoque):**
   - Barra de progresso grande mostrando % disponível
     - Animação: barra preenche da esquerda com ease-out-expo (800ms)
   - Lista de TODOS os ingredientes com ✅ (tem) ou ❌ (não tem)
   - Cruza automaticamente com o estoque do Kaza em tempo real
   - **Itens faltando:** lista destacada com botão "🛒 Adicionar à lista de compras"
     - Ao clicar: itens faltantes vão para a lista de compras com status "pendente"
     - Feedback visual: toast "X itens adicionados à lista" com slideUp
     - Itens pendentes ficam na lista até o usuário comprá-los

5. **Botão "🍳 INICIAR COZINHA":**
   - CTA principal, full width, grande (height: 56px)
   - Cor --color-primary, radius-xl, font-heading bold
   - Abre o Modo Cozinha (Tela 3B)
   - **Mesmo sem todos os ingredientes, o usuário pode clicar e iniciar**
   - Se faltam ingredientes: aviso sutil "Faltam X ingredientes" mas não bloqueia
   - whileTap: scale 0.97

6. **Botão "📅 Adicionar ao Plano":**
   - Secundário, outline --color-primary
   - Abre modal/bottom sheet para escolher:
     - Dia da semana
     - Refeição (Café, Almoço, Jantar, Lanche)
   - Ao adicionar: toast confirmando + ícone 📅 pulse

---

### Tela 3B — 👨‍🍳 Modo Cozinha (Passo a Passo)

Tela fullscreen imersiva para cozinhar seguindo a receita.

```
┌─────────────────────────┐
│ ✕ Fechar    Passo 2/8   │ ← Mini header
│ ▓▓▓▓▓▓░░░░░░░░░░░░░░░░ │ ← Barra de progresso
│─────────────────────────│
│                          │
│  ┌──────┐ ┌────────────┐│
│  │INGRE-│ │            ││
│  │DIEN- │ │  PASSO     ││
│  │TES   │ │  ATUAL     ││
│  │      │ │            ││
│  │✅ Far.│ │ Refogue a  ││
│  │✅ Ovo │ │ cebola no  ││
│  │☐ Sal │ │ azeite até ││
│  │☐ Leite│ │ dourar.    ││
│  │      │ │            ││
│  │      │ │ ⏱️ 05:00   ││ ← Timer do passo
│  │      │ │            ││
│  └──────┘ └────────────┘│
│                          │
│  ┌─────────────────────┐ │
│  │ ◀ Anterior          │ │
│  │ ▶ PRÓXIMO PASSO     │ │ ← Navegação
│  └─────────────────────┘ │
│                          │
│  [⏱️ Timer: 00:00]       │ ← Timer configurável
│  [▶ Iniciar Timer]       │
│                          │
└─────────────────────────┘
```

**Layout Split View (Mobile):**

1. **Mini Header:**
   - Botão ✕ Fechar (volta para detalhe da receita)
   - Indicador "Passo X de Y" (font-heading)
   - Barra de progresso fina (--color-accent-green)
   - Sem BottomNav nem Header padrão (tela fullscreen)

2. **Lado Esquerdo — Ingredientes (30% width):**
   - Lista vertical de todos os ingredientes
   - Cada ingrediente é clicável (checkbox interativo)
   - ✅ = já usado/separado — texto com line-through, opacity 0.5
   - ☐ = pendente — texto normal
   - Ao marcar: animação checkmark (scale 0→1, 200ms)
   - Scroll independente se lista longa
   - Background: --color-surface-alt

3. **Lado Direito — Passo a Passo (70% width):**
   - Mostra **UM passo por vez**
   - Título: "Passo X" (font-heading, --font-size-lg)
   - Descrição detalhada do passo (font-body)
   - Imagem/ilustração do passo (se disponível)
   - Timer específico do passo (se aplicável)
   - **Clicar no lado direito → avança para próximo passo**
   - Swipe horizontal OU botões para navegar

4. **Navegação entre Passos:**
   - Botão "◀ Anterior" e "▶ PRÓXIMO PASSO"
   - Swipe horizontal (drag gesture, Framer Motion)
   - Progresso visual: dots ou barra segmentada no topo
   - AnimatePresence com slide horizontal ao trocar passo
   - Ao avançar: passo anterior fica marcado como ✅
   - Possível voltar e desmarcar

5. **Botão "▶ Iniciar" (Fluxo de progresso):**
   - Ao entrar no Modo Cozinha, botão "▶ Iniciar" no primeiro passo
   - Após iniciar: cada passo pode ser marcado como concluído
   - Barra de progresso geral atualiza a cada passo
   - Feedback tátil (vibração leve) ao completar cada passo
   - Timer geral opcional: cronômetro contando tempo total de preparo

6. **Sistema de Timer:**
   - Botão "⏱️ Timer" fixo na parte inferior da tela
   - Ao clicar: modal para definir tempo (minutos:segundos)
   - Presets rápidos: 1min, 3min, 5min, 10min, 15min, 30min
   - Timer contando regressivamente com display grande e animado
   - **Quando o timer acaba:**
     - 📳 **Vibração do celular** (Vibration API — padrão: vibra-pausa-vibra)
     - 🔔 **Notificação push** (Notification API — "⏰ Timer finalizado!")
     - 🔊 Som de alarme (suave mas perceptível)
     - 🟢 Visual: overlay pulsante verde "⏰ Tempo!" com botão "Parar"
     - Timer vai para o Painel de Notificações 🔔 da Home
   - **Múltiplos timers simultâneos:**
     - Possível criar vários timers (ex: "Forno 25min" + "Molho 10min")
     - Lista de timers ativos no bottom da tela
     - Cada timer com nome, tempo restante e botão pausar/cancelar
   - **Timer funciona em background:**
     - Funciona mesmo se trocar de passo ou sair da tela
     - Service Worker gerencia os timers
     - Notificação push garante que o alarme toque

7. **Tela de Conclusão (ao finalizar todos os passos):**
   - Animação de celebração: 🎉 confetti particles (Framer Motion)
   - Texto: "Receita concluída! Bom apetite! 🎉"
   - Tempo total de preparo exibido
   - Botões de ação:
     - ⭐ "Avaliar receita" (1-5 estrelas)
     - ❤️ "Adicionar aos Favoritos" (se ainda não favoritou)
     - 📅 "Repetir no plano" → adiciona ao plano alimentar
     - 📤 "Compartilhar" → share nativo
   - Ao sair: volta para a tela de Receitas

8. **Comportamento Fullscreen:**
   - Esconde BottomNav e Header padrão
   - Mini header com: ✕ Fechar + indicador de passo + progresso
   - Tap na tela para mostrar/esconder controles (fade toggle)
   - **Keep-awake:** previne que a tela apague durante o cozinhar (Wake Lock API)
   - Se o usuário sair sem finalizar: salva progresso automaticamente

---

### Tela 3C — 📅 Plano Alimentar

Acessível pelo botão "📅 Plano Alimentar" na tela de Receitas.

```
┌─────────────────────────┐
│ ◀ Voltar                 │
│  📅 Plano Alimentar      │
│─────────────────────────│
│  [Semana] [Dia] [Mês]   │ ← Toggle período
│─────────────────────────│
│                          │
│  Seg 14/04               │
│  ┌─────────────────────┐ │
│  │ ☀️ Café: Panquecas   │ │
│  │ 🌤️ Almoço: Lasanha   │ │
│  │ 🌙 Jantar: (vazio)   │ │ ← Tap para adicionar
│  │ 🍪 Lanche: Smoothie  │ │
│  └─────────────────────┘ │
│                          │
│  Ter 15/04               │
│  ┌─────────────────────┐ │
│  │ ☀️ Café: (vazio)     │ │
│  │ 🌤️ Almoço: Strogon. │ │
│  │ 🌙 Jantar: Sopa      │ │
│  │ 🍪 Lanche: (vazio)   │ │
│  └─────────────────────┘ │
│                          │
│  ⚠️ Itens pendentes: 5   │ ← Faltam ingredientes
│  [🛒 Ver lista de compras]│
│                          │
│─────────────────────────│
│ 🏠  📦  🍳  📊  ⚙️     │
└─────────────────────────┘
```

**Elementos do Plano Alimentar:**

1. **Toggle de período:** [Semana] [Dia] [Mês]
   - Pill switch animada (layoutId para pill ativa)
   - **Semana:** mostra 7 dias com 4 refeições cada
   - **Dia:** mostra 1 dia expandido com detalhes e fotos das receitas
   - **Mês:** calendário mensal compacto com dots indicando dias planejados
   - Transição: AnimatePresence com fade + slide

2. **Cards diários:**
   - Cada dia mostra 4 slots de refeição:
     - ☀️ Café da Manhã
     - 🌤️ Almoço
     - 🌙 Jantar
     - 🍪 Lanche
   - **Refeição preenchida:** nome da receita + mini thumbnail
     - Tap → opções: [Ver receita] [Trocar] [Remover]
   - **Refeição vazia:** texto "(vazio)" com ícone "+" discreto
     - Tap → abre busca de receitas (modal/bottom sheet)
     - Selecionar receita → encaixa na refeição do dia
   - Card com radius-md, shadow-card, fundo branco

3. **Verificação automática de ingredientes:**
   - Ao adicionar receitas ao plano, o sistema cruza com o estoque
   - **Itens que o usuário NÃO tem:**
     - Ficam como "pendentes" na lista de compras automaticamente
     - Badge "⚠️ Itens pendentes: X" no bottom do plano
     - Botão "🛒 Ver lista de compras" → abre lista com itens faltantes
   - **Itens que já tem:** marcados como ✅ automaticamente
   - **Se o estoque mudar** (comprou um item): atualiza em tempo real

4. **Arrastar e soltar (drag & drop):**
   - Receitas podem ser reorganizadas entre dias/refeições
   - Framer Motion: drag + reorder com Reorder component
   - Feedback visual ao arrastar: opacity 0.6, elevated shadow, scale 1.02
   - Snap suave ao soltar na posição

5. **Geração automática (futuro):**
   - Botão "✨ Sugerir semana" — gera plano baseado em:
     - Itens disponíveis no estoque
     - Perfil/preferências do usuário
     - Variedade (não repetir receitas em sequência)
   - O usuário pode aceitar, modificar ou rejeitar sugestões
   - Cada sugestão com swipe: ← Rejeitar | Aceitar →

---

### Tela 3D — ❤️ Receitas Favoritas

Acessível pelo botão ❤️ ao lado do "Plano Alimentar" na tela de Receitas.

```
┌─────────────────────────┐
│ ◀ Voltar                 │
│  ❤️ Minhas Receitas      │
│─────────────────────────│
│                          │
│  ┌─────────────────────┐ │
│  │ 🖼️ Lasanha          │ │
│  │ ⏱️ 45min  ██████ 75%│ │
│  │ [❤️] [📅 Planejar]  │ │
│  ├─────────────────────┤ │
│  │ 🖼️ Bolo de Chocolate│ │
│  │ ⏱️ 60min  ████ 50%  │ │
│  │ [❤️] [📅 Planejar]  │ │
│  └─────────────────────┘ │
│                          │
│  Se vazio:               │
│  ❤️ (grande, pulsando)   │
│  "Nenhuma receita salva" │
│  "Explore e favorite!"   │
│  [Explorar Receitas →]   │
│                          │
│─────────────────────────│
│ 🏠  📦  🍳  📊  ⚙️     │
└─────────────────────────┘
```

**Elementos:**

1. **Header:** ◀ Voltar + título "❤️ Minhas Receitas"

2. **Lista de receitas favoritadas:**
   - Cards com: foto, nome, tempo, barra % ingredientes
   - Botão ❤️ preenchido (coração vermelho) — tap para desfavoritar
   - Botão "📅 Planejar" — adiciona direto a uma refeição no plano
   - AnimatePresence: ao desfavoritar, card sai com scale 0.8 + fadeOut
   - Stagger animation na entrada dos cards

3. **Empty State:** (quando sem favoritos)
   - ❤️ grande centralizado com pulse animation (scale 1 → 1.1 → 1)
   - "Nenhuma receita salva ainda"
   - "Explore as receitas e marque suas favoritas com ❤️"
   - Botão "Explorar Receitas →" → navega para /receitas

4. **Comportamento:**
   - Receitas favoritas persistem no localStorage/store
   - Ao clicar no card → abre Detalhe da Receita (Tela 3A)
   - Layout morphing se possível (layoutId na foto)
   - Pull to refresh atualiza % de ingredientes

---

### Tela 4+ — (a ser detalhada pelo usuário)

> As próximas telas serão adicionadas conforme o usuário descrever cada uma.

---

## 🎬 ANIMAÇÕES (Framer Motion)

### Regras Gerais de Animação

```
Durações:
  100-150ms → feedback instantâneo (botão, toggle)
  200-300ms → mudanças de estado (hover, menu)
  300-500ms → mudanças de layout (accordion, modal)
  500-800ms → animações de entrada (page load)

Easing:
  USAR: ease-out-quart cubic-bezier(0.25, 1, 0.5, 1)
  USAR: ease-out-expo  cubic-bezier(0.16, 1, 0.3, 1)
  NUNCA: bounce ou elastic (datado)

Saída é 75% da duração de entrada.
Sempre respeitar prefers-reduced-motion.
Animar apenas transform e opacity (GPU).
```

### Animação 1 — Category Menu (Drag Horizontal)

```jsx
import { motion } from "framer-motion";

const categories = [
  { id: 1, name: "Carnes", icon: "🥩" },
  { id: 2, name: "Vegetais", icon: "🥦" },
  { id: 3, name: "Frutas", icon: "🍎" },
  { id: 4, name: "Pães", icon: "🍞" },
  { id: 5, name: "Laticínios", icon: "🧀" },
];

export const CategoryMenu = () => {
  return (
    <motion.div 
      className="flex overflow-x-auto gap-4 p-4 scrollbar-hide"
      style={{ cursor: "grab" }}
      whileTap={{ cursor: "grabbing" }}
    >
      {categories.map((cat) => (
        <motion.div
          key={cat.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0 flex flex-col items-center bg-gray-100 p-4 rounded-2xl min-w-[80px]"
        >
          <span className="text-2xl">{cat.icon}</span>
          <span className="text-sm font-medium mt-2">{cat.name}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};
```

### Animação 2 — Bottom Sheet (Pull Up Menu)

```jsx
import { motion, useAnimation } from "framer-motion";

export const BottomSheet = () => {
  const controls = useAnimation();

  const variants = {
    opened: { y: 0 },
    closed: { y: "80%" },
  };

  const onDragEnd = (event, info) => {
    if (info.offset.y < -100 || info.velocity.y < -500) {
      controls.start("opened");
    } else {
      controls.start("closed");
    }
  };

  return (
    <motion.div
      initial="closed"
      animate={controls}
      variants={variants}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={onDragEnd}
      className="fixed bottom-0 left-0 right-0 h-[90vh] bg-white rounded-t-[30px] shadow-2xl z-50 p-6 border-t"
    >
      <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />
      <h2 className="text-xl font-bold mb-4">Todas as Categorias</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* CategoryCards aqui */}
      </div>
    </motion.div>
  );
};
```

### Animação 3 — Layout Morphing (Produto → Detalhe)

```jsx
// Na listagem (ProductCard.jsx)
<motion.img 
  layoutId={`product-${product.id}`} 
  src={product.image} 
  className="w-20 h-20 object-cover rounded-lg"
/>

// No detalhe (ProductDetailPage.jsx)
// O mesmo layoutId faz a imagem "voar" e crescer automaticamente
<motion.img 
  layoutId={`product-${product.id}`} 
  src={product.image} 
  className="w-full h-64 object-cover"
/>
```

### Animação 4 — Product Card Stagger (Entrada)

```jsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.div variants={container} initial="hidden" animate="show">
  {products.map(p => (
    <motion.div key={p.id} variants={item}>
      <ProductCard product={p} />
    </motion.div>
  ))}
</motion.div>
```

### Animações Complementares

| # | Nome | Técnica | Duração |
|---|------|---------|---------|
| 5 | Add to Cart Fly | `animate` posição produto → carrinho | 500ms |
| 6 | Cart Badge Pop | Scale `0 → 1.2 → 1` spring | 400ms |
| 7 | Heart Pulse | Scale pulse + fill color | 300ms |
| 8 | Quantity Slide | slideY ao incrementar/decrementar | 200ms |
| 9 | Page Transition | Slide horizontal exit/enter | 300ms |
| 10 | Skeleton Shimmer | CSS gradient loop | ∞ |
| 11 | Search Expand | Width animate ao focus | 200ms |
| 12 | Banner Carousel | Auto-scroll + dots | 3s |
| 13 | Pull to Refresh | Logo Kaza rotação | 1s |
| 14 | Tab Indicator | `layoutId` pill ativa | 200ms |

### Acessibilidade de Animação

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📁 ESTRUTURA DO PROJETO

```
kaza/
├── prototipo/                    # Assets do protótipo (existente)
│   ├── FAVICON.png
│   ├── Ideia.md                  # ← ESTE ARQUIVO
│   ├── animacoes.mp4
│   ├── desing mobile 1.webp
│   ├── desing mobile 2.webp
│   ├── logo completa site branca.svg
│   ├── logo completa site preto.svg
│   ├── paleta de cores.jpeg
│   └── tipografia.jpeg
│
├── public/
│   ├── manifest.json             # PWA manifest
│   ├── sw.js                     # Service Worker
│   ├── favicon.png               # Copiar de prototipo/FAVICON.png
│   └── icons/                    # PWA icons 192x192 e 512x512
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
│
├── src/
│   ├── main.jsx                  # Entry point React
│   ├── App.jsx                   # Router + AnimatePresence
│   ├── index.css                 # Tailwind imports + design tokens CSS
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx        # Header com wave curve SVG
│   │   │   ├── BottomNav.jsx     # Tab bar 5 tabs com layoutId
│   │   │   ├── BottomSheet.jsx   # Draggable bottom sheet
│   │   │   └── NotificationPanel.jsx # Painel de notificações 🔔
│   │   ├── product/
│   │   │   ├── ProductCard.jsx   # Card com layoutId para morphing
│   │   │   ├── QuantityStepper.jsx
│   │   │   ├── ProductSkeleton.jsx
│   │   │   └── AddItemModal.jsx  # Modal de adicionar item (FAB/busca)
│   │   ├── category/
│   │   │   ├── CategoryCard.jsx
│   │   │   └── CategoryMenu.jsx  # Horizontal drag scroll
│   │   ├── recipe/
│   │   │   ├── RecipeCard.jsx    # Card de receita com % ingredientes
│   │   │   ├── RecipeCategoryMenu.jsx # Categorias de receita
│   │   │   ├── IngredientChecker.jsx  # Painel ✅/❌ ingredientes
│   │   │   ├── CookingStep.jsx   # Passo individual do modo cozinha
│   │   │   ├── TimerWidget.jsx   # Timer com vibração/notificação
│   │   │   ├── MealSlot.jsx      # Slot de refeição no plano
│   │   │   └── RecipeSuggestion.jsx # Card sugestão na Home
│   │   └── ui/
│   │       ├── SearchBar.jsx
│   │       ├── Banner.jsx
│   │       ├── Badge.jsx
│   │       └── HeartButton.jsx
│   │
│   ├── pages/
│   │   ├── LoginPage.jsx          # Splash loader + Login form
│   │   ├── HomePage.jsx           # Home com receita do dia
│   │   ├── CategoriesPage.jsx
│   │   ├── CategoryDetailPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── FavoritesPage.jsx
│   │   ├── RecipesPage.jsx        # Exploração de receitas + categorias
│   │   ├── RecipeDetailPage.jsx   # Detalhe + % ingredientes
│   │   ├── CookingModePage.jsx    # Modo cozinha step-by-step
│   │   ├── MealPlanPage.jsx       # Plano alimentar semana/dia/mês
│   │   └── FavoriteRecipesPage.jsx # Receitas favoritas ❤️
│   │
│   ├── hooks/
│   │   ├── useCart.js
│   │   ├── useFavorites.js
│   │   ├── useCategories.js
│   │   ├── useRecipes.js          # Busca, filtro, % ingredientes
│   │   ├── useMealPlan.js         # Plano alimentar CRUD
│   │   ├── useTimer.js            # Timer com notificação/vibração
│   │   └── useNotifications.js    # Sistema de notificações
│   │
│   ├── store/
│   │   └── store.js              # Zustand ou Context
│   │
│   ├── data/
│   │   ├── products.js           # Dados mock em pt-BR
│   │   ├── categories.js
│   │   └── recipes.js            # Receitas mock com ingredientes/passos
│   │
│   └── assets/
│       ├── logos/                 # SVGs copiados do protótipo
│       └── icons/
│
└── .agents/                      # Skills instalados
```

---

---

# 🔧 PROMPTS PARA CLAUDE CODE

> Cada prompt abaixo é independente e incremental.
> Copie UM de cada vez no Claude Code.
> O Claude Code deve ler o arquivo `prototipo/Ideia.md` (este arquivo) como contexto.

---

## PROMPT 01 — Setup do Projeto

```
Leia o arquivo prototipo/Ideia.md para contexto completo do projeto Kaza.

Crie o projeto React + Vite na pasta kaza/:

1. Inicialize com Vite template React
2. Instale as dependências: framer-motion, react-router-dom
3. Configure Tailwind CSS v4 com @tailwindcss/vite
4. Crie o index.html com:
   - Meta tags para PWA (viewport, theme-color #0d3b2e, apple-mobile-web-app)
   - Google Fonts: Oswald (400,700) + Quattrocento (400)
   - Título "Kaza — Mercado"
5. Crie public/manifest.json com:
   - name: "Kaza", short_name: "Kaza"
   - theme_color: "#0d3b2e", background_color: "#f5f7f5"
   - display: "standalone", orientation: "portrait"
   - start_url: "/"
   - icons apontando para /icons/icon-192.png e /icons/icon-512.png
6. Crie um Service Worker básico em public/sw.js (cache-first para assets)
7. Copie prototipo/FAVICON.png para public/favicon.png

NÃO crie componentes ainda. Apenas a fundação.
Rode npm install e confirme que npm run dev funciona.
```

---

## PROMPT 02 — Design System CSS

```
Leia prototipo/Ideia.md — seção "DESIGN SYSTEM".

Crie/atualize src/index.css com:

1. Imports do Tailwind (@import "tailwindcss")
2. TODOS os CSS custom properties da seção "Paleta de Cores" do Ideia.md
   (incluindo cores, tipografia, espaçamento, radius, sombras, component tokens, easing curves)
3. Reset básico (box-sizing, margin, padding)
4. Classes utilitárias:
   - .scrollbar-hide (esconde scrollbar nativa)
   - .font-heading { font-family: var(--font-family-heading) }
   - .font-body { font-family: var(--font-family-body) }
5. Regra @media (prefers-reduced-motion: reduce) para acessibilidade
6. Configure o Tailwind theme para usar as CSS variables como cores
   (ex: colors.primary, colors.surface, etc.)

O body deve ter:
- font-family: var(--font-family-base)
- background: var(--color-surface-alt)
- color: var(--color-text-primary)
- overflow-x: hidden
- -webkit-font-smoothing: antialiased
```

---

## PROMPT 03 — App Shell + Router

```
Leia prototipo/Ideia.md — seções "TELAS DO APP" e "ESTRUTURA DO PROJETO".

Crie a estrutura de navegação:

1. src/App.jsx:
   - React Router com BrowserRouter
   - AnimatePresence do Framer Motion envolvendo as rotas
   - Rotas: /login (Login — rota inicial), / (Home), /categorias, /categoria/:id, /produto/:id, /carrinho, /favoritos
   - A rota /login NÃO mostra Header nem BottomNav (tela fullscreen)
   - As demais rotas usam Layout com Header no topo e BottomNav fixo embaixo
   - Padding-bottom para não sobrepor o BottomNav
   - Redirect: se não autenticado → /login

2. Crie páginas placeholder:
   - src/pages/LoginPage.jsx → <div>Login</div>
   - src/pages/HomePage.jsx → <div>Home</div>
   - src/pages/CategoriesPage.jsx → <div>Categorias</div>
   - src/pages/CategoryDetailPage.jsx → <div>Categoria</div>
   - src/pages/ProductDetailPage.jsx → <div>Produto</div>
   - src/pages/CartPage.jsx → <div>Carrinho</div>
   - src/pages/FavoritesPage.jsx → <div>Favoritos</div>

3. Crie src/components/shared/PageTransition.jsx:
   - Wrapper com motion.div
   - Animação: slide horizontal (enter da direita, exit pela esquerda)
   - Duração: 300ms, easing: ease-out-quart

Todas as páginas (exceto Login) devem usar PageTransition como wrapper.
Login usa sua própria transição (fade in do splash → formulário).
```

---

## PROMPT 04 — Login / Loading Page

```
Leia prototipo/Ideia.md — seção "Tela 0 — Login / Loading".
Veja a imagem prototipo/FAVICON.png para o ícone da casa.
Veja prototipo/logo completa site preto.svg para a logo.

Crie src/pages/LoginPage.jsx com DUAS fases:

=== FASE A: SPLASH LOADER (primeiros 2.5 segundos) ===

1. Tela inteira com background: gradiente radial sutil
   - Centro: --color-primary (#0d3b2e)
   - Bordas: --kaza-800 (#276A5C)
   - Efeito sutil de textura/noise (CSS grain overlay com pseudo-element)

2. Ícone da casa (favicon) centralizado:
   - Recrie o ícone da casa do FAVICON.png como SVG inline (triângulo arredondado com porta)
   - Cor: branca (#ffffff)
   - Tamanho: 120x120px
   - ANIMAÇÃO: SVG stroke-dasharray → o traço se desenha progressivamente (1.5s)
   - Depois de desenhado: pulse suave (scale 1 → 1.08 → 1, infinite, 2s ease)

3. Logo "kaza" abaixo do ícone:
   - Use a logo SVG branca (prototipo/logo completa site branca.svg)
   - Cada letra aparece com stagger (opacity 0→1, y: 10→0, delay 80ms cada)
   - Total: ~400ms para todas as letras

4. Barra de progresso fina (2px height):
   - Posição: abaixo da logo, largura 60% da tela
   - Cor: --color-accent-green (#8bc34a)
   - Animação: width 0% → 100% em 2.5s, ease-out-expo
   - Border-radius: full

5. Após 2.5s: toda a tela faz fadeOut (opacity 1→0, 400ms)
   Simultaneamente a Fase B faz fadeIn

=== FASE B: FORMULÁRIO DE LOGIN ===

1. Background: --color-surface (#ffffff), limpo
2. Padding: --page-padding (16px) horizontal, generoso vertical

3. Logo Kaza centralizada no topo:
   - Logo preta (prototipo/logo completa site preto.svg) pequena (width 80px)
   - margin-top: 60px
   - Animação entrada: fadeIn + scaleUp (0.8→1), 300ms

4. Título: "Que bom ter você de volta!"
   - font-family: var(--font-family-heading) = Oswald
   - font-size: var(--font-size-xl) = 22px
   - font-weight: bold
   - color: var(--color-text-primary)
   - text-align: center
   - margin-top: 24px
   - Animação: fadeIn + slideUp, delay 100ms

5. Subtítulo: "Entre e descubra as melhores ofertas"
   - font-family: var(--font-family-body) = Quattrocento
   - font-size: var(--font-size-md) = 14px
   - color: var(--color-text-secondary)
   - text-align: center
   - Animação: fadeIn + slideUp, delay 150ms

6. Campo E-mail:
   - Label: "E-mail" (font-size-sm, font-weight-medium, color-text-primary)
   - Input: type email, placeholder "seu@email.com"
   - Height: var(--input-height) = 46px
   - Border: 1px solid var(--color-border)
   - Border-radius: var(--radius-md) = 12px
   - Padding: 0 16px
   - font-family: var(--font-family-base)
   - ESTADOS:
     - Focus: border-color → --color-primary, box-shadow: 0 0 0 3px rgba(13,59,46,0.1)
     - Válido (email regex ok): border-color → --color-accent-green, ícone ✅ verde no canto direito
     - Erro: border-color → --color-accent-orange, texto erro abaixo
   - Transição de borda: 200ms ease
   - Animação entrada: fadeIn + slideUp, delay 200ms

7. Campo Senha:
   - Mesmo estilo do E-mail
   - type: password (toggle para text)
   - Ícone de olho (👁) no canto direito para toggle
   - Validação: mínimo 6 caracteres
   - Animação entrada: fadeIn + slideUp, delay 250ms

8. "Esqueceu a senha?" — alinhado à direita:
   - font-size: var(--font-size-sm)
   - color: var(--color-primary-mid)
   - cursor pointer, hover: underline
   - Animação entrada: fadeIn, delay 300ms

9. Botão "Entrar →":
   - Full width
   - Height: 52px
   - Background: var(--color-primary)
   - Color: var(--color-text-on-primary) = branco
   - Font: var(--font-family-heading), var(--font-weight-bold)
   - Font-size: var(--font-size-lg)
   - Border-radius: var(--radius-xl) = 28px
   - Seta → no lado direito
   - whileTap: scale 0.97
   - whileHover: brightness 1.1
   - Disabled (campos inválidos): opacity 0.5, pointer-events none
   - Loading state: texto vira spinner circular (animação rotate 360)
   - Animação entrada: fadeIn + slideUp, delay 350ms

10. Divisor "Ou entre com":
    - Linha horizontal fina (--color-border) com texto no centro
    - font-size: var(--font-size-sm), color: var(--color-text-muted)
    - Animação entrada: fadeIn, delay 400ms

11. Botões sociais (Facebook e Google):
    - Dois círculos (52x52px) lado a lado, centralizados
    - Borda: 1px solid var(--color-border)
    - Background: transparent
    - Ícones: "f" (bold) e "G" (bold)
    - whileHover: border-color --color-primary, scale 1.05
    - whileTap: scale 0.95
    - Animação entrada: fadeIn + scale, delay 450ms

12. "Não tem conta? Crie aqui!":
    - Posição: bottom da tela (margin-top auto ou position absolute bottom 40px)
    - "Não tem conta?" em --color-text-secondary
    - "Crie aqui!" em --color-accent-green, font-weight-bold
    - Animação entrada: fadeIn, delay 500ms

13. COMPORTAMENTO:
    - Validação em tempo real (não ao submit)
    - Se email ou senha inválidos ao clicar Entrar:
      - Input(s) inválidos fazem shake animation (translateX -5 → 5 → -5 → 0, 400ms)
      - Texto de erro aparece abaixo do input com slideDown + fadeIn
    - Se login OK: botão mostra spinner 1s → navegação com slide para /
    - Estado de autenticação simples (localStorage flag para MVP)

Esta tela NÃO tem Header nem BottomNav.
Use Framer Motion para TODAS as animações.
Respeite prefers-reduced-motion.
```

---

## PROMPT 05 — Header com Wave Curve

```
Leia prototipo/Ideia.md e veja as imagens prototipo/desing mobile 1.webp e 2.webp.

Crie src/components/layout/Header.jsx:

1. Background: gradiente de --color-primary para --kaza-800
2. Parte inferior: SVG wave/curve que faz a transição verde→branco
3. Conteúdo:
   - Logo Kaza (use o SVG branco de prototipo/logo completa site branca.svg)
   - Localização: "São Paulo, SP 📍" com seta
4. Abaixo da wave: SearchBar + Cart button
5. SearchBar: input com ícone de lupa, placeholder "Buscar no Mercado"
6. Cart button: ícone de carrinho com Badge (número de itens)
7. O Badge deve ter animação de pop (scale 0→1.2→1) quando o número muda

Altura do header: --navbar-height + área do wave
O wave deve ter ~40px de curvatura
Posição: sticky top: 0, z-index: 50
```

---

## PROMPT 06 — Bottom Navigation

```
Leia prototipo/Ideia.md — seção "Bottom Navigation".

Crie src/components/layout/BottomNav.jsx:

1. Barra fixa no bottom com 4 tabs:
   - 🏠 Início → rota /
   - 📋 Categorias → rota /categorias
   - ❤️ Favoritos → rota /favoritos
   - 🛒 Carrinho → rota /carrinho

2. Ícones: use SVG simples ou emoji inicialmente
3. Tab ativa: ícone preenchido + texto em --color-primary
4. Tab inativa: ícone outline + texto em --color-text-muted

5. ANIMAÇÃO (Framer Motion):
   - Indicador (pill/dot) abaixo da tab ativa
   - Usar layoutId para a pill deslizar suavemente entre tabs
   - Transição: 200ms ease-out-quart

6. Altura: --tabbar-height (64px)
7. Background: branco com shadow-md no topo
8. safe-area-inset-bottom para notch do iPhone
```

---

## PROMPT 07 — Category Menu (Drag Scroll)

```
Leia prototipo/Ideia.md — seção "Animação 1" e veja desing mobile 1.webp.

Crie src/components/category/CategoryMenu.jsx:

1. Carrossel horizontal de ícones de categoria
2. Categorias: Carnes 🥩, Vegetais 🥦, Frutas 🍎, Pães 🍞, Laticínios 🧀, Lanches 🍿, Padaria 🧁, Frangos 🍗
3. Cada item: ícone circular com fundo --kaza-100, label abaixo
4. Ícone circular: --category-icon-size (48px) com borda suave

5. ANIMAÇÃO (Framer Motion):
   - Container: cursor grab → grabbing ao arrastar (whileTap)
   - Cada item: whileHover scale 1.05, whileTap scale 0.95
   - Scroll horizontal nativo com scrollbar-hide
   - Overflow: auto no eixo X

6. Ao clicar uma categoria, navegar para /categoria/:id
```

---

## PROMPT 08 — Product Card + Layout Morphing

```
Leia prototipo/Ideia.md — seção "Animação 3" e veja desing mobile 1.webp (lado esquerdo).

Crie src/components/product/ProductCard.jsx:

1. Card branco com shadow-card e radius-md
2. Layout vertical: imagem → nome → peso → preço → botão adicionar
3. Imagem: --card-img-size (80px), rounded, object-cover
4. Nome: font-heading, --font-size-md, truncate 2 linhas
5. Peso: --font-size-sm, --color-text-muted (ex: "500 gm")
6. Preço: font-heading, --font-size-price, bold
   - Formato: "R$ 17,29" com centavos menores (superscript)
7. Botão "+": circular, --btn-add-size, borda --color-primary, ícone +
   - Quando tem quantidade: mostrar QuantityStepper inline

8. ANIMAÇÃO (Framer Motion):
   - layoutId={`product-image-${id}`} na imagem → para morphing com ProductDetail
   - layoutId={`product-name-${id}`} no nome
   - whileHover: scale 1.02 + shadow-md
   - whileTap: scale 0.98

9. Ao clicar (exceto no botão +), navegar para /produto/:id
```

---

## PROMPT 09 — Quantity Stepper Animado

```
Leia prototipo/Ideia.md — animação complementar #8.

Crie src/components/product/QuantityStepper.jsx:

Props: value, onIncrement, onDecrement, min=0, max=99

1. Layout horizontal: [—] [número] [+]
2. Botões circulares --btn-add-size com borda --color-primary
3. Botão — : --color-primary outline
4. Botão + : --color-primary filled, texto branco
5. Número ao centro: font-heading, --font-size-lg

6. ANIMAÇÃO (Framer Motion):
   - Número faz slide vertical ao mudar:
     - Incremento: número antigo sobe e sai, novo entra de baixo
     - Decremento: número antigo desce e sai, novo entra de cima
   - AnimatePresence com mode="popLayout"
   - Duração: 200ms ease-out-quint
   - Overflow hidden no container do número

7. Quando value = 0, mostrar apenas o botão "+" isolado
   Transição suave ao expandir para o stepper completo
```

---

## PROMPT 10 — Bottom Sheet (Draggable)

```
Leia prototipo/Ideia.md — seção "Animação 2".

Crie src/components/layout/BottomSheet.jsx:

Props: isOpen, onClose, children, title

1. Overlay escuro (opacity 0.5) atrás quando aberto
2. Sheet branco com rounded-t-[30px] e shadow-2xl
3. Alça visual: barra cinza 48x4px centralizada no topo
4. Título (se fornecido): font-heading, --font-size-xl

5. ANIMAÇÃO (Framer Motion):
   - drag="y" apenas vertical
   - Estado fechado: y="80%", só a alça visível
   - Estado aberto: y=0
   - dragConstraints: top 0, bottom 0
   - dragElastic: 0.2
   - onDragEnd: se offset.y < -100 ou velocity.y < -500 → abrir
   - Senão → fechar
   - Overlay: fade in/out 200ms

6. Quando fechado, não renderizar children (lazy)
7. z-index: 50 (sheet) e 40 (overlay)
```

---

## PROMPT 11 — Skeleton Loading

```
Leia prototipo/Ideia.md — animação complementar #10.

Crie src/components/product/ProductSkeleton.jsx:

1. Placeholder visual que imita o ProductCard
2. Retângulos cinza claro (#e0e0e0) nas posições de:
   - Imagem (quadrado 80x80, radius-md)
   - Nome (retângulo 70% width, 14px height)
   - Peso (retângulo 40% width, 10px height)
   - Preço (retângulo 50% width, 20px height)
   - Botão (círculo 32px)

3. ANIMAÇÃO (CSS puro):
   - Shimmer effect: gradiente que move da esquerda→direita
   - @keyframes shimmer com background-position
   - Gradiente: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)
   - background-size: 200% 100%
   - Duração: 1.5s infinite ease-in-out

4. Exportar também CategorySkeleton (para o CategoryCard)
```

---

## PROMPT 12 — Dados Mock

```
Leia prototipo/Ideia.md para contexto.

Crie os arquivos de dados mock:

1. src/data/categories.js:
   - Array de 10 categorias em pt-BR
   - Cada uma: { id, name, subtitle, icon (emoji), color (hex para background sutil) }
   - Categorias: Carnes, Vegetais, Frutas, Pães, Lanches, Padaria, Laticínios, Frangos, Bebidas, Congelados

2. src/data/products.js:
   - Array de 20+ produtos distribuídos entre as categorias
   - Cada um: { id, categoryId, name, weight, unit, price, image (URL placeholder), rating, available, description }
   - Preços realistas em BRL (5-50 reais)
   - Pesos realistas (100g, 250g, 500g, 1kg)
   - Para imagens, use URLs de https://placehold.co/ com tamanhos 300x300

3. src/data/banners.js:
   - Array de 2-3 banners promocionais
   - { id, title, subtitle, deliveryTime, freeDelivery, color, icon }
```

---

## PROMPT 13 — Store (Estado Global)

```
Leia prototipo/Ideia.md — seção "ESTRUTURA DO PROJETO".

Crie o gerenciamento de estado com Zustand:

1. Instale: npm install zustand

2. src/store/store.js:
   - useCartStore:
     - items: [] (produto + quantidade)
     - addItem(product)
     - removeItem(productId)
     - updateQuantity(productId, quantity)
     - clearCart()
     - getTotal() — soma dos preços * quantidade
     - getItemCount() — total de itens

   - useFavoritesStore:
     - favorites: [] (array de product IDs)
     - toggleFavorite(productId)
     - isFavorite(productId)

   - useAppStore:
     - currentLocation: "São Paulo, SP"
     - activeTab: "home"
     - setActiveTab(tab)
```

---

## PROMPT 14 — Home Page Completa

```
Leia prototipo/Ideia.md — seção "Tela 1 — Home Page" e veja desing mobile 1.webp.

Monte src/pages/HomePage.jsx usando os componentes já criados:

1. Header (já existe)
2. CategoryMenu — carrossel de categorias com drag
3. Seção "Você pode precisar":
   - Título com "Ver mais" à direita
   - Scroll horizontal de ProductCards
   - Limitado a 6 produtos
4. Seção Banners:
   - 2 banners lado a lado (Mercado + Atacado)
   - Cada banner: título, horário, "Frete grátis", ícone
   - Fundo rosa claro (mercado) e laranja claro (atacado)
5. Seção "Destaques":
   - Título com "Ver tudo"
   - Grid 2 colunas de ProductCards
   - Limitado a 8 produtos

ANIMAÇÃO:
- Stagger animation ao carregar (variants container/item)
- Cada seção aparece com fadeIn + slideUp, 50ms delay entre elas
- ProductCards com stagger próprio dentro de cada seção

Usar dados de src/data/products.js e categories.js
```

---

## PROMPT 15 — Categories Page

```
Leia prototipo/Ideia.md — seção "Tela 2 — Categorias" e veja desing mobile 2.webp.

Monte src/pages/CategoriesPage.jsx:

1. Header (simplificado, sem localização)
2. Banner promocional:
   - Fundo --color-accent-orange
   - "10% OFF com Kaza Plus+"
   - Subtexto: "Gaste R$30 para ganhar 5%"
   - Ícone de info (i)
3. Título "Todas as categorias"
4. Grid 2 colunas de CategoryCards:
   - Cada card: nome, subtítulo, ícone/emoji no canto
   - Fundo branco com shadow-card
   - radius-md
   - Ao clicar, navegar para /categoria/:id

ANIMAÇÃO:
- Grid com stagger animation (fadeIn + slideUp)
- Cards com whileHover scale 1.02, whileTap scale 0.97
- Banner com fadeIn suave no load
```

---

## PROMPT 16 — Category Detail Page

```
Leia prototipo/Ideia.md — seção "Tela 3".

Monte src/pages/CategoryDetailPage.jsx:

1. Header com botão voltar (◀) + nome da categoria + carrinho
2. Filtros horizontais scrolláveis:
   - Pills/chips: "Todos", "Congelados", "Frescos", "Bebidas", "Carnes"...
   - Ativo: fundo --color-primary, texto branco
   - Inativo: fundo --color-surface, borda --color-border
   - layoutId para a pill ativa (anima ao trocar)
3. SearchBar contextual
4. Grid 2 colunas de ProductCards filtrados por categoryId
5. Se nenhum produto, mostrar empty state

ANIMAÇÃO:
- Filtros: pill ativa com layoutId (slide suave)
- Grid: stagger no load e ao mudar filtro
- AnimatePresence para transição ao filtrar
```

---

## PROMPT 17 — Product Detail Page

```
Leia prototipo/Ideia.md — seção "Tela 4" e veja desing mobile 1.webp (lado direito).

Monte src/pages/ProductDetailPage.jsx:

1. Header: ◀ voltar + "Detalhes do Produto" + carrinho
2. Imagem grande:
   - motion.img com layoutId={`product-image-${id}`} (MORPHING da listagem!)
   - Ocupar largura total, height 250px, object-cover
   - Fundo branco com curva do header atrás
3. Botão favorito: coração ❤️ no canto superior direito da imagem
   - Animação pulse ao favoritar
4. Info do produto:
   - Nome (font-heading, xl)
   - Peso (text-muted, sm)
   - Preço grande (font-heading, price, bold) com centavos small
   - Badge "⚡ Entrega rápida disponível" (verde claro)
5. Variações: bolinhas coloridas horizontais
6. Rating: ⭐ 4.5 Avaliação
7. Descrição: texto com "Ler mais" (expandir com AnimatePresence)
8. Barra inferior fixa:
   - QuantityStepper à esquerda
   - Botão "🛒 Adicionar" à direita (fundo --color-primary, texto branco, radius-full)

ANIMAÇÃO:
- Layout morphing da imagem ao entrar (automático via layoutId)
- Conteúdo abaixo da imagem: stagger fadeIn + slideUp após imagem pousar
- Botão adicionar: whileTap scale 0.95
- Heart: pulse scale ao favoritar
```

---

## PROMPT 18 — Cart Page

```
Leia prototipo/Ideia.md — seção "Tela 5 — Carrinho".

Monte src/pages/CartPage.jsx:

1. Header: "Meu Carrinho" + badge com total de itens
2. Se carrinho vazio:
   - Ilustração/emoji grande 🛒
   - "Seu carrinho está vazio"
   - Botão "Explorar" → navega para /
3. Se tem itens:
   - Lista de itens do carrinho:
     - Imagem pequena (60x60), nome, peso, preço
     - QuantityStepper à direita
     - SWIPE LEFT para deletar (Framer Motion drag x)
       - Ao arrastar >100px: revelar botão vermelho "Excluir"
       - Snap back ou remover
4. Resumo fixo no bottom:
   - Subtotal: R$ XX,XX
   - Frete: R$ 5,00 (ou "Grátis" se > R$30)
   - Total: R$ XX,XX (bold, grande)
   - Botão "Finalizar Pedido" (full width, --color-primary, radius-xl)

ANIMAÇÃO:
- AnimatePresence na lista: itens saem com slideLeft + fadeOut ao remover
- Número do total: countUp animation (valor antigo → novo)
- Botão: whileTap scale 0.97
```

---

## PROMPT 19 — Favorites Page

```
Leia prototipo/Ideia.md — seção "Tela 6 — Favoritos".

Monte src/pages/FavoritesPage.jsx:

1. Header: "Favoritos" + ícone ❤️
2. Se nenhum favorito:
   - Emoji ❤️ grande
   - "Nenhum favorito ainda"
   - "Explore o catálogo e marque seus produtos preferidos"
   - Botão "Explorar" → /
3. Se tem favoritos:
   - Grid 2 colunas de ProductCards (filtrados pelos favoritos)
   - Cada card com botão de coração preenchido
   - Ao desfavoritar: card sai com exit animation (scale 0.8 + fadeOut)

ANIMAÇÃO:
- Grid com stagger entrance
- AnimatePresence para saída suave ao desfavoritar
- Layout morphing funcional (tap → product detail)
```

---

## PROMPT 20 — Micro-interações Finais + PWA Polish

```
Leia prototipo/Ideia.md — seção "Animações Complementares".

Adicione as micro-interações faltantes:

1. Add to Cart Fly:
   - Ao clicar "Adicionar" no ProductDetail
   - Criar um clone fantasma do botão/ícone
   - Animar posição do botão → ícone do carrinho no header
   - 500ms ease-out-expo
   - Badge pop ao chegar

2. Banner Carousel:
   - Banners na Home com auto-scroll a cada 3s
   - Dots indicadores abaixo
   - Swipe gesture para manual

3. Search Expand:
   - SearchBar: ao focus, expande suavemente a largura
   - Ícone de lupa desliza para a esquerda
   - 200ms ease-out-quart

4. PWA Final:
   - Gere os ícones PWA (192x192 e 512x512) a partir do favicon
   - Teste o manifest.json
   - Service Worker com cache de assets estáticos
   - Registre o SW no main.jsx
   - Verifique com Lighthouse que o PWA score é > 90

5. Confirme que npm run build funciona sem erros
```

---

## PROMPT 21 — Painel de Notificações

```
Leia prototipo/Ideia.md — seção "Painel de Notificações" na Tela 1.

Crie src/components/layout/NotificationPanel.jsx:

1. Ícone 🔔 no Header com Badge numérico vermelho
   - Badge: circle 18px, fundo vermelho, texto branco, font-size 10px
   - Animação: scale 0→1.3→1 (pop) quando novo número aparece
   - Se 0 notificações: badge oculto

2. Ao clicar no 🔔, abre painel overlay:
   - AnimatePresence: slideDown de cima (y: -100% → 0)
   - Overlay escuro atrás (opacity 0.3), tap para fechar
   - Background: branco, radius-lg na base
   - Max-height: 60vh com scroll interno

3. Header do painel: "Notificações" + botão "Limpar todas"

4. Lista de notificações:
   - Cada item: ícone do tipo + título + descrição + tempo relativo
   - Tipos com ícones: ⚠️ vencimento, 📉 estoque baixo, 🔔 checkup,
     🛒 lista automática, 🍳 receita, ⏰ timer
   - Não lida: fundo --color-accent-green-light (sutil)
   - Lida: fundo branco
   - Swipe left: botão "Dispensar" com exit animation
   - Tap em notificação: marca como lida + executa ação relevante

5. Empty state: "Nenhuma notificação 🎉" + "Tudo em dia!"

6. Dados das notificações: useNotifications hook com store Zustand

Use Framer Motion para TODAS as animações.
Respeite prefers-reduced-motion.
```

---

## PROMPT 22 — Modal de Adicionar Item (FAB)

```
Leia prototipo/Ideia.md — seção FAB na Tela 1 e Tela 2.

Crie src/components/product/AddItemModal.jsx:

1. Modal/BottomSheet que abre ao clicar no FAB (+):
   - Animação: slide up do bottom + overlay escuro
   - Handle bar no topo (drag para fechar)
   - Height: 80vh

2. Barra de busca no topo:
   - Placeholder: "Buscar produto por nome..."
   - Debounce 300ms
   - Busca na base de produtos pré-cadastrados (JSON)
   - Resultados aparecem como lista abaixo

3. Botão "📷 Escanear código de barras":
   - Abre câmera para leitura de barcode
   - Se encontrado na base: preenche automaticamente
   - Se não encontrado: permite cadastro manual

4. Ao selecionar produto da lista:
   - Preenche: nome, unidade de medida, departamento
   - Formulário para o usuário completar:
     - Quantidade (stepper numérico)
     - Data de validade (date picker)
     - Local de armazenamento (select: Geladeira, Freezer, etc.)
     - Categoria (select: Insumos, Não Perecíveis, Consumíveis)
   - Botão "✅ Adicionar ao Estoque" (--color-primary, full width)

5. Animação de sucesso:
   - Toast verde "Produto adicionado!" com slideUp
   - Item aparece na tela de Estoque com fade in highlight

Este modal funciona tanto na Home (FAB) quanto na Tela 2 (FAB + busca).
```

---

## PROMPT 23 — Tela de Receitas (Exploração)

```
Leia prototipo/Ideia.md — seção "Tela 3 — Receitas".

Crie src/pages/RecipesPage.jsx:

1. Header verde com título "Receitas" e ícone 🍳

2. Barra superior de ações:
   - [📅 Plano Alimentar] → navega para /receitas/plano
   - [❤️] → navega para /receitas/favoritos
   - Pills com outline --color-primary

3. SearchBar: placeholder "Buscar receita..."
   - Busca por nome, ingrediente ou categoria
   - Debounce 300ms, resultados em tempo real

4. Categorias (ocultas por padrão):
   - Botão "▼ Ver categorias" → AnimatePresence slideDown
   - Scroll horizontal de pills com emojis
   - Categorias: Saladas, Massas, Doces, Carnes, Peixes, Sopas,
     Lanches, Bebidas, Vegano, Low Carb, Fitness, Internacional,
     Café da Manhã, Rápidas, Especiais
   - Tab ativa: fundo --color-primary, texto branco
   - layoutId para pill ativa

5. Grid de RecipeCards:
   - 1 coluna, cards largos com foto
   - Cada card: foto 16:9, nome, tempo ⏱️, porções 👤,
     barra % ingredientes, badge dificuldade
   - A barra de % cruza ingredientes com estoque do usuário
   - Stagger animation na entrada
   - Ao clicar → /receitas/:id

Use dados de src/data/recipes.js (criar com 15+ receitas variadas).
Use Framer Motion para TODAS as animações.
```

---

## PROMPT 24 — Dados Mock de Receitas

```
Crie src/data/recipes.js com 15+ receitas variadas:

Cada receita deve ter:
{
  id, name, category, difficulty ("facil"/"medio"/"dificil"),
  prepTime (minutos), servings (porções),
  image (URL placeholder),
  rating, ratingCount,
  ingredients: [
    { name, quantity, unit, productId (ref ao estoque) }
  ],
  steps: [
    { order, instruction, duration (minutos, opcional), image (opcional) }
  ],
  tags: ["vegano", "rápido", "fitness", etc.]
}

Receitas variadas para todos os gostos:
- Lasanha Bolonhesa (médio, 45min)
- Strogonoff de Frango (fácil, 30min)
- Bolo de Chocolate (fácil, 50min)
- Salada Caesar (fácil, 15min)
- Risoto de Cogumelos (médio, 40min)
- Panquecas (fácil, 20min)
- Sopa de Abóbora (fácil, 35min)
- Frango Grelhado Fitness (fácil, 25min)
- Macarrão ao Pesto (fácil, 20min)
- Smoothie de Frutas (fácil, 5min)
- Feijoada (difícil, 120min)
- Sushi Caseiro (difícil, 60min)
- Tacos Mexicanos (médio, 35min)
- Pad Thai (médio, 30min)
- Brownie Vegano (fácil, 40min)

Ingredientes devem cruzar com os productIds do estoque.
Passos detalhados com instruções claras (3-8 passos por receita).
Alguns passos com timer sugerido (ex: "cozinhe por 5 minutos").
```

---

## PROMPT 25 — Detalhe da Receita + Ingredientes

```
Leia prototipo/Ideia.md — seção "Tela 3A — Detalhe da Receita".

Crie src/pages/RecipeDetailPage.jsx:

1. Header: ◀ voltar + ❤️ favoritar + 🔗 compartilhar
   - ❤️: toggle com pulse animation (Heart Pulse)

2. Foto grande (220px, object-cover, layoutId morphing)
   - Gradiente escuro sutil na base

3. Info: nome (heading xl), tempo ⏱️, porções 👤, avaliação ⭐,
   badge dificuldade (verde/amarelo/vermelho)

4. Painel de ingredientes:
   - Componente IngredientChecker.jsx
   - Barra de progresso animada (ease-out-expo, 800ms)
   - Mostra "X de Y ingredientes" com porcentagem
   - Lista: ✅ (tem no estoque) / ❌ (não tem)
   - Cruza automaticamente com useInventoryStore

5. Seção "Itens faltando":
   - Lista apenas os ❌
   - Botão "🛒 Adicionar à lista de compras"
   - Ao clicar: toast "X itens adicionados à lista"
   - Itens ficam pendentes na lista de compras

6. Botão CTA "🍳 INICIAR COZINHA" (full width, 56px):
   - Navega para /receitas/:id/cozinhar
   - Se faltam ingredientes: aviso sutil mas NÃO bloqueia

7. Botão "📅 Adicionar ao Plano":
   - Bottom sheet: escolher dia + refeição
   - Toast de confirmação

Stagger animation em todo o conteúdo ao entrar.
Use Framer Motion para TODAS as animações.
```

---

## PROMPT 26 — Modo Cozinha

```
Leia prototipo/Ideia.md — seção "Tela 3B — Modo Cozinha".

Crie src/pages/CookingModePage.jsx:

1. Tela FULLSCREEN (sem BottomNav, sem Header padrão)
   - Mini header: ✕ Fechar + "Passo X de Y" + barra progresso

2. Layout split view:
   - Esquerda (30%): lista de ingredientes com checkboxes
     - ✅ marcado: line-through + opacity 0.5
     - Animação checkmark ao marcar
   - Direita (70%): passo atual
     - Título + descrição detalhada
     - Imagem do passo (se disponível)
     - Timer sugerido do passo

3. Navegação entre passos:
   - Botões ◀ / ▶ + swipe horizontal
   - AnimatePresence com slide ao trocar
   - Dots ou barra segmentada no topo

4. Botão "▶ Iniciar" no primeiro passo
   - Após iniciar: cada passo marcável
   - Vibração leve ao completar passo

5. Tela de conclusão:
   - Confetti 🎉 + "Bom apetite!"
   - Botões: Avaliar ⭐, Favoritar ❤️, Repetir 📅

6. Wake Lock API: tela não apaga
7. Se sair: salvar progresso

Use Framer Motion para TODAS as animações.
Respeite prefers-reduced-motion.
```

---

## PROMPT 27 — Timer com Notificação e Vibração

```
Leia prototipo/Ideia.md — seção "Sistema de Timer" na Tela 3B.

Crie src/components/recipe/TimerWidget.jsx + src/hooks/useTimer.js:

=== useTimer.js ===
1. Hook que gerencia múltiplos timers simultâneos
2. Cada timer: { id, name, duration, remaining, isRunning }
3. Métodos: startTimer, pauseTimer, resetTimer, removeTimer
4. Usa requestAnimationFrame para contagem precisa
5. Quando remaining === 0:
   - navigator.vibrate([200, 100, 200, 100, 200]) — padrão vibra-pausa
   - new Notification("⏰ Timer finalizado!", { body: name, icon: favicon })
   - Callback onComplete

=== TimerWidget.jsx ===
1. Botão "⏱️ Timer" fixo no bottom da tela (position: fixed)
   - Se timers ativos: mostra contagem regressiva no botão

2. Ao clicar: modal de timer
   - Input: minutos + segundos (num pad style)
   - Presets: [1min] [3min] [5min] [10min] [15min] [30min]
   - Campo nome (opcional): "Forno", "Molho", etc.
   - Botão "▶ Iniciar"

3. Timer ativo:
   - Display grande com countdown animado (números flip/slide)
   - Circular progress ring (SVG) ao redor do tempo
   - Botões: Pausar ⏸️ / Retomar ▶ / Cancelar ✕

4. Lista de timers ativos:
   - Se múltiplos: lista compacta com nome + tempo restante
   - Cada um com pausar/cancelar independente

5. Alarme:
   - Visual: overlay pulsante verde com scale animation
   - Texto: "⏰ [Nome do Timer] finalizado!"
   - Botão "Parar" grande
   - Vibração contínua até clicar Parar

6. Timer deve funcionar mesmo saindo da tela:
   - Persiste no store global
   - Notificação push via Service Worker
   - Ao voltar: sincroniza tempo restante

Pedir permissão de Notification API no primeiro uso.
Testar Vibration API (não funciona em iOS, fallback visual).
```

---

## PROMPT 28 — Plano Alimentar

```
Leia prototipo/Ideia.md — seção "Tela 3C — Plano Alimentar".

Crie src/pages/MealPlanPage.jsx + src/hooks/useMealPlan.js:

=== useMealPlan.js ===
1. Store com Zustand persistido (localStorage)
2. Estrutura: { [date]: { cafe, almoco, jantar, lanche } }
3. Cada slot: recipeId ou null
4. Métodos: addMeal, removeMeal, moveMeal, getMealsForWeek
5. Calcular itens pendentes: cruzar todas as receitas do plano
   com o estoque → retornar lista de itens faltantes

=== MealPlanPage.jsx ===
1. Toggle período: [Semana] [Dia] [Mês] com pill switch (layoutId)

2. Vista Semana (padrão):
   - 7 cards (Seg→Dom), cada um com 4 slots
   - Slot preenchido: nome receita + mini thumb
   - Slot vazio: "+" com tap → busca de receitas (bottom sheet)

3. Vista Dia:
   - 1 dia expandido com fotos grandes das receitas
   - Cada refeição: card largo com foto, nome, tempo
   - Swipe horizontal para navegar entre dias

4. Vista Mês:
   - Calendário compacto com dots coloridos nos dias planejados
   - Tap dia → expande para vista diária

5. Seção "Itens pendentes":
   - Badge: "⚠️ X itens faltando para o plano"
   - Botão "🛒 Ver lista de compras"
   - Itens automaticamente adicionados como pendentes

6. Drag & drop de receitas entre slots:
   - Framer Motion Reorder
   - Feedback visual ao arrastar

Use Framer Motion para TODAS as animações.
```

---

## PROMPT 29 — Receitas Favoritas

```
Leia prototipo/Ideia.md — seção "Tela 3D — Receitas Favoritas".

Crie src/pages/FavoriteRecipesPage.jsx:

1. Header: ◀ Voltar + "❤️ Minhas Receitas"

2. Se tem favoritos:
   - Grid de RecipeCards (1 coluna) filtrados por favoritos
   - Cada card: foto, nome, tempo, barra % ingredientes
   - Botão ❤️ preenchido (tap desfavoritar)
   - Botão "📅 Planejar" → bottom sheet dia/refeição
   - AnimatePresence: saída com scale 0.8 + fadeOut
   - Stagger entrance animation

3. Se vazio (empty state):
   - ❤️ grande centralizado com pulse animation infinite
   - "Nenhuma receita salva ainda"
   - "Explore as receitas e marque suas favoritas com ❤️"
   - Botão "Explorar Receitas →" → /receitas

4. Dados: useFavoritesStore (Zustand, persistido)
   - favoriteRecipes: [] (array de recipe IDs)
   - toggleFavoriteRecipe(recipeId)
   - isFavoriteRecipe(recipeId)

5. Pull to refresh atualiza % de ingredientes

Use Framer Motion para TODAS as animações.
```

---

## PROMPT 30 — Receita do Dia na Home

```
Leia prototipo/Ideia.md — seção "Receita do Dia" na Tela 1.

Crie src/components/recipe/RecipeSuggestion.jsx e integre na HomePage:

1. Card largo na Home (após "Meu Estoque"):
   - Foto de fundo (height: 160px, radius-lg)
   - Gradiente escuro overlay
   - Nome da receita (font-heading, branco, bold)
   - Tempo ⏱️ + Porções 👤 (branco, font-body)
   - Badge: "X% dos ingredientes ✅" (canto, pill verde/amarelo/vermelho)
   - Botão "Ver Receita →" (pill, fundo branco semi-transparente)

2. Lógica de sugestão (src/hooks/useRecipeSuggestion.js):
   - Filtra receitas onde o usuário tem >50% dos ingredientes
   - Ordena por % de ingredientes (maior primeiro)
   - Seleciona 1 receita semi-aleatória (seed baseada na data)
   - Rotaciona 1 receita diferente por dia
   - Se sem estoque: mostra receita popular aleatória

3. Animação de entrada:
   - fadeIn + slideUp com delay (aparece depois das outras seções)
   - whileTap: scale 0.98 no card inteiro
   - Ao clicar → navega para /receitas/:id

4. Integrar na HomePage.jsx como nova seção:
   - Posição: após "Meu Estoque", antes do BottomNav
   - Título: "🍳 Receita do Dia" (font-heading)

Use Framer Motion para TODAS as animações.
```

---

## 📝 NOTAS PARA EXPANSÃO FUTURA

> A partir daqui, novas funcionalidades serão adicionadas como novos prompts.
> Copie cada nova ideia abaixo conforme eu for dizendo.

### Ideias pendentes (a serem detalhadas):

- [ ] Login / Cadastro (auth)
- [ ] Checkout com endereço e pagamento
- [ ] Histórico de pedidos
- [ ] Busca com filtros avançados
- [x] Notificações push (integrado ao sistema de notificações e timer)
- [ ] Dark mode
- [ ] Perfil do usuário (preferências alimentares, restrições)
- [ ] Backend (Supabase? API própria?)
- [ ] Integração com pagamento (Stripe/Pix)
- [x] Sistema de receitas (exploração, detalhe, modo cozinha)
- [x] Plano alimentar (semanal/diário/mensal)
- [x] Timer de cozinha com vibração e notificação
- [x] Receitas favoritas
- [x] Sugestão de receita na Home baseada no estoque
- [x] Painel de notificações 🔔
- [x] Adição de itens via FAB e busca na Tela 2
- [ ] Lista de compras integrada (itens pendentes do plano)
- [ ] Compartilhamento de receitas
- [ ] Avaliação e comentários em receitas
- [ ] Importar receitas de URLs externas
- [ ] Modo offline para receitas salvas

---

> **Última atualização:** 14/04/2026
> **Versão:** 2.0 — Adicionado: Receitas, Plano Alimentar, Modo Cozinha, Timer, Notificações, Adição de Itens
