# Cores & Design

Este documento reúne as variáveis de CSS e tokens de design extraídos da interface e da paleta visual do projeto.
Ele também inclui as fontes usadas no app e as propriedades principais de borda, cor e animação.

---

## 1. Paleta de cores

### Cores principais sugeridas
- `--color-background`: `hsl(145 34% 95%)`  // bege esverdeado claro, fundo suave
- `--color-surface`: `hsl(0 0% 100%)`  // branco puro para cards e painéis
- `--color-foreground`: `hsl(210 15% 18%)`  // texto escuro, quase grafite
- `--color-muted`: `hsl(210 18% 68%)`  // texto secundário / labels
- `--color-border`: `hsl(145 20% 86%)`  // bordas suaves e orgânicas
- `--color-primary`: `hsl(133 59% 42%)`  // verde principal vibrante
- `--color-primary-foreground`: `hsl(0 0% 100%)`  // texto branco em botões
- `--color-accent`: `hsl(42 95% 60%)`  // amarelo suave para destaques
- `--color-shadow`: `rgba(40, 60, 80, 0.08)`  // sombra suave
- `--color-surface-2`: `hsl(145 28% 96%)`  // painel secundário / cartões claros

### Uso na interface
- Fundo geral: `--color-background`
- Cards e painéis: `--color-surface`
- Texto principal: `--color-foreground`
- Texto secundário: `--color-muted`
- Bordas separadoras: `--color-border`
- Botões e elementos ativos: `--color-primary`
- Destaques e tags leves: `--color-accent`

---

## 2. Bordas e sombras

### Variáveis de borda
- `--radius-sm`: `0.75rem`
- `--radius-md`: `1.25rem`
- `--radius-lg`: `2rem`

### Bordas e contornos
- `border-radius: var(--radius-lg);`
- `border: 1px solid var(--color-border);`
- `box-shadow: 0 20px 45px rgba(20, 30, 40, 0.08);`
- `background: var(--color-surface);`

### Tokens de sombra
- `--shadow-sm`: `0 1px 4px rgba(20, 30, 40, 0.08)`
- `--shadow-md`: `0 10px 30px rgba(20, 30, 40, 0.10)`
- `--shadow-lg`: `0 24px 60px rgba(20, 30, 40, 0.12)`

---

## 3. Tipografia

### Fontes usadas no projeto
- `Inter` — fonte sans serif principal para texto e títulos
- `Lora` — fonte serif opcional para conteúdo mais editorial
- `Space Mono` — fonte monospace para dados ou elementos técnicos
- `Dancing Script` — fonte decorativa usada em pequenos destaques ou marca

### Pilha de fontes padrão
```css
font-family: "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Sugestões de tipografia baseada no visual
- `font-size-base`: `16px`
- `font-size-lg`: `20px`
- `font-size-xl`: `28px`
- `font-weight-regular`: `400`
- `font-weight-medium`: `500`
- `font-weight-bold`: `700`
- `line-height`: `1.5`
- `letter-spacing`: `0.01em`

---

## 4. Animações e movimento

A imagem sugere uma interface com transições suaves e movimento leve entre elementos.

### Tokens de animação
- `--animation-fast`: `200ms ease-out`
- `--animation-medium`: `300ms cubic-bezier(0.22, 1, 0.36, 1)`
- `--animation-slow`: `400ms ease`

### Exemplos de animação
```css
.fade-in {
  animation: fadeIn 300ms ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.pop {
  transition: transform 250ms ease, box-shadow 250ms ease;
}

.pop:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(20, 30, 40, 0.10);
}
```

### Animação sugerida para cards
- `transform: translateY(10px)` para entrada suave
- `opacity` de `0` para `1`
- `transition: 280ms ease-out`

---

## 5. Extração CSS baseada na imagem

### Estilo de fundo e container
```css
.page-root {
  background: linear-gradient(180deg, #eef6ea 0%, #f8fbf6 100%);
  color: #1f2937;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.card {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(134, 179, 144, 0.18);
  border-radius: 2rem;
  box-shadow: 0 22px 46px rgba(20, 30, 40, 0.08);
  padding: 1.75rem;
}
```

### Texto e tipografia
```css
.heading {
  color: #111827;
  font-size: 2.25rem;
  line-height: 1.05;
  font-weight: 800;
}

.body-text {
  color: #4b5563;
  font-size: 1rem;
  line-height: 1.6;
}

.label {
  color: #6b7280;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
```

### Botões
```css
.button-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3rem;
  padding: 0 1.5rem;
  border-radius: 1.5rem;
  background: #2f855a;
  color: #ffffff;
  font-weight: 700;
  transition: transform 220ms ease, box-shadow 220ms ease, background-color 220ms ease;
}

.button-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 32px rgba(15, 40, 30, 0.18);
}

.button-outline {
  border: 1px solid rgba(47, 133, 90, 0.24);
  background: rgba(255, 255, 255, 0.9);
  color: #2f855a;
}
```

### Blocos de benefício / cards internos
```css
.benefit-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1.75rem;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(134, 179, 144, 0.14);
  transition: transform 240ms ease, border-color 240ms ease, box-shadow 240ms ease;
}

.benefit-card:hover {
  transform: translateY(-2px);
  border-color: rgba(63, 155, 102, 0.28);
}

.benefit-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  display: grid;
  place-items: center;
  color: #1f2937;
  background: rgba(79, 165, 111, 0.16);
}
```

### Animações sugeridas
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 300ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
```

### Cores usadas na imagem
- `#eef6ea` — fundo claro esverdeado
- `#ffffff` — superfícies de cards
- `#2f855a` — verde primário de botão
- `#4b5563` — texto secundário
- `#6b7280` — labels e legendas
- `rgba(134, 179, 144, 0.18)` — borda suave
- `rgba(20, 30, 40, 0.08)` — sombra leve

### Nota sobre o vídeo
Eu não tenho acesso direto ao vídeo; estou inferindo o CSS a partir da imagem enviada. As animações sugeridas são baseadas no estilo visual e na sensação geral, não em um fluxo de vídeo específico.

---

## 6. Exemplo de variáveis CSS

```css
:root {
  --color-background: hsl(145 34% 95%);
  --color-surface: hsl(0 0% 100%);
  --color-foreground: hsl(210 15% 18%);
  --color-muted: hsl(210 18% 68%);
  --color-border: hsl(145 20% 86%);
  --color-primary: hsl(133 59% 42%);
  --color-primary-foreground: hsl(0 0% 100%);
  --color-accent: hsl(42 95% 60%);
  --color-shadow: rgba(40, 60, 80, 0.08);
  --radius-sm: 0.75rem;
  --radius-md: 1.25rem;
  --radius-lg: 2rem;
  --shadow-sm: 0 1px 4px rgba(20, 30, 40, 0.08);
  --shadow-md: 0 10px 30px rgba(20, 30, 40, 0.10);
  --shadow-lg: 0 24px 60px rgba(20, 30, 40, 0.12);
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-serif: "Lora", ui-serif, Georgia, serif;
  --font-mono: "Space Mono", ui-monospace, monospace;
  --font-display: "Dancing Script", "Lora", cursive;
}
```

---

## 7. Observações finais

- A imagem combina UI limpa, cantos arredondados e sombras discretas.
- A cor verde suave principal e o fundo bege claro criam uma sensação fresca e natural.
- Use animações leves de fade + deslocamento para reproduzir o movimento do vídeo.
- Para as fontes, mantenha `Inter` como base e `Dancing Script` apenas em destaques de marca.
