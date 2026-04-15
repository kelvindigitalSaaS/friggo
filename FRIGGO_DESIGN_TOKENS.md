# Friggo Design Tokens & Color System

## 🎨 Paleta de Cores

### Cores Principais
```
Primary (Verde Friggo): #0B5449
RGB: 11, 84, 73
HSL: 162° 72% 27%

Branco: #FFFFFF
RGB: 255, 255, 255
HSL: 0° 0% 100%

Background: #F5F5F5
RGB: 245, 245, 245
HSL: 154° 40% 96%
```

### Cores Secundárias
```
Accent Green: #22c55e (verde claro para destaques)
Accent Orange: #ff7a00 (para alertas)
Muted: #A0A9A5 (cinza neutro)
```

---

## 📏 CSS Design Tokens

### Root Variables (Atualizadas em `src/index.css`)

```css
:root {
  /* Cores */
  --background: 154 40% 96%;
  --foreground: 162 25% 15%;
  --primary: 162 72% 27%;        /* Verde Friggo #0B5449 */
  --primary-foreground: 0 0% 100%; /* Branco */
  --card: 0 0% 100%;
  --card-foreground: 162 25% 15%;
  
  /* Escala Neutral */
  --muted: 154 20% 70%;
  --muted-foreground: 154 18% 50%;
  --border: 154 25% 88%;
  --input: 154 25% 88%;
  
  /* Sombras */
  --shadow-sm: 0 2px 6px rgba(11,84,73,0.06);
  --shadow-md: 0 10px 30px rgba(11,84,73,0.10);
  --shadow-card: 0 2px 12px rgba(11,84,73,0.08);
}
```

---

## 🎯 Componentes Chave

### Splash Screen (Loading)
- **Fundo:** `bg-primary` (verde #0B5449)
- **Logo:** SVG branco em quadrado branco
- **Texto:** Branco (`text-white`)
- **Barra de Progresso:** `bg-white/80`

### Navigation Bottom
- **Ícones Ativos:** `text-primary`
- **Ícones Inativos:** `text-muted-foreground`
- **Fundo:** `bg-white/80` com backdrop blur
- **Borda:** Subtil com `border-black/[0.06]`

### Cards & Containers
- **Fundo:** `bg-white` ou `bg-card`
- **Borda:** `border-border` (cinza claro)
- **Sombra:** Usar `shadow-card`
- **Hover:** Adicionar `shadow-md` transição

### Botões
- **Primário:** `bg-primary text-white hover:bg-primary/90`
- **Secundário:** `bg-muted text-muted-foreground`
- **Outline:** `border-primary text-primary`

### Inputs
- **Fundo:** `bg-input dark:bg-white/5`
- **Borda:** `border-border dark:border-white/10`
- **Focus:** `focus:border-primary/30 focus:shadow-sm`

---

## 🌙 Dark Mode (Automático)

```css
.dark {
  --background: 222 25% 10%;
  --foreground: 154 10% 90%;
  --primary: 162 72% 27%; /* Mantém cor primária */
  --card: 222 15% 15%;
  --card-foreground: 154 10% 90%;
}
```

---

## 📱 Responsive Design

Mantém as mesmas cores em todos os breakpoints:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

---

## 🔤 Tipografia

### Famílias de Fonte
- **Display:** Oswald (bold, tracking tight)
- **Body:** Inter (default, readable)
- **Serif:** Quattrocento (accents)

### Sizes
- h1: `text-4xl font-black`
- h2: `text-2xl font-bold`
- Body: `text-base font-medium`
- Small: `text-sm font-regular`

---

## ✨ Estilos Especiais

### Animações
- Spring animation: `stiffness: 400, damping: 28`
- Duration: `duration-300` (padrão)
- Ease: `ease-out-quart`

### Blur & Glass
- Backdrop: `backdrop-blur-2xl`
- Opacity: `opacity-95` para cards
- Mix-blend: `mix-blend-multiply` para overlays

### Rounded
- Default: `rounded-xl` (1.5rem)
- Cards: `rounded-[2rem]` (maior)
- Small buttons: `rounded-lg`

---

## 🎪 Implementação em Componentes

### Como Usar no React
```jsx
// Cores via Tailwind (recomendado)
<div className="bg-primary text-primary-foreground">
  Usa cores dos tokens CSS
</div>

// Ou inline com CSS vars
<div style={{ color: 'var(--primary)' }}>
  Acesso direto a variáveis
</div>
```

### Em Estilos CSS
```css
.custom-element {
  background-color: hsl(var(--primary));
  color: hsl(var(--foreground));
  box-shadow: var(--shadow-card);
  border-radius: var(--radius);
}
```

---

## 🚀 Guia de Atualização

Se precisar alterar cores no futuro:

1. **Editar** `src/index.css` (`:root` e `.dark`)
2. **Atualizar** hex colors em meta tags (`index.html`)
3. **Renovar** favicons SVG se necessário
4. **Testar** em light e dark mode

Todos os componentes herdarão as cores automaticamente!

---

## 📋 Validação

- [x] Cores testadas em light mode
- [x] Cores testadas em dark mode
- [x] Contraste adequado (AA+)
- [x] Acessibilidade validada
- [x] Responsividade confirmada

**Pronto para Produção!** 🎉
