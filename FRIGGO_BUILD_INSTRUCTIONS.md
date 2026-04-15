# 🚀 Instruções de Build - Friggo App

## ✅ Migração Concluída

Todos os arquivos foram atualizados de **Kaza** para **Friggo** com novo design visual (verde #0B5449).

---

## 📦 Dependências Necessárias

Caso encontre erro de Rollup, execute:

```bash
# Opção 1: Limpar e reinstalar (melhor)
rm -rf node_modules package-lock.json
npm install

# Opção 2: Apenas npm install
npm install

# Opção 3: Se usar Yarn
yarn install
```

---

## 🏗️ Build Local

### Desenvolvimento
```bash
npm run dev
# Abre app em http://localhost:5173
```

### Produção
```bash
npm run build
# Gera pasta /dist com build otimizado
```

### Preview (testar build)
```bash
npm run preview
# Simula produção localmente
```

---

## 📱 Build Mobile (Capacitor)

### iOS
```bash
npm run cap:ios
# Sincroniza, constrói e abre Xcode
```

### Android
```bash
npm run cap:android
# Sincroniza, constrói e abre Android Studio
```

### Sync Apenas
```bash
npm run cap:sync
# Atualiza plataformas nativas
```

---

## 🔍 Linting & Validação

### Verificar Erros
```bash
npm run lint
# ESLint valida código

npm run build
# TypeScript compila
```

---

## 📋 Checklist pré-Deploy

- [ ] Executar `npm install` com sucesso
- [ ] `npm run build` completa sem erros
- [ ] `npm run lint` sem warnings críticos
- [ ] Testar `npm run dev` localmente
- [ ] Verificar splash screen com novo design
- [ ] Validar cores em light/dark mode
- [ ] Testar navegação (BottomNav)
- [ ] Validar login com FriggoLogin
- [ ] Testar em dispositivo real (se mobile)
- [ ] Confirmar PWA installation

---

## 🎯 Arquivos Chave para Revisar

```
friggo/
├── src/
│   ├── App.tsx              ← Splash screen atualizada
│   ├── index.css            ← Cores do tema
│   ├── components/
│   │   └── friggo/
│   │       ├── BrandName.tsx         ← "Friggo" default
│   │       ├── FriggoLogin.tsx       ← Renomeado de Kaza
│   │       ├── BottomNav.tsx         ← Cores atualizadas
│   │       └── [outros]              ← Branding atualizado
│   └── pages/
│       └── Auth.tsx                  ← Importação FriggoLogin
├── public/
│   ├── favicon-friggo-light.svg      ← Novo
│   ├── favicon-friggo-dark.svg       ← Novo
│   └── manifest.webmanifest          ← Atualizado
├── index.html                        ← Meta tags atualizadas
└── FRIGGO_MIGRATION_REPORT.md        ← Documentação completa
```

---

## 🐛 Troubleshooting

### Erro: "Cannot find module @rollup/rollup-linux-x64-gnu"
```bash
# Solução
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Erro: "FriggoLogin component not found"
```bash
# Verificar
ls -la src/components/friggo/FriggoLogin.tsx
# Deve existir (renomeado de KazaLogin.tsx)
```

### Cores não aparecem direito
```bash
# Limpar cache Tailwind
rm -rf .next .turbo
npm run build
```

### Dark mode não funciona
```bash
# Verificar se ThemeProvider está ativo
# Buscar por <ThemeProvider> em App.tsx
# Deve estar present por padrão
```

---

## 📊 Resumo das Mudanças

| Aspecto | Antes | Depois |
|---------|-------|--------|
| **Nome** | Kaza | Friggo |
| **Cor Primária** | #22c55e | #0B5449 |
| **Logo** | Casa 🏠 | Letra A |
| **Componente Login** | KazaLogin.tsx | FriggoLogin.tsx |
| **Favicon** | favicon-kaza-* | favicon-friggo-* |
| **LocalStorage** | kaza-* | friggo-* |
| **Domain** | kaza.app | friggo.app |
| **Splash** | Escuro | Verde + Branco |

---

## 🎉 Próximos Passos

1. **Build Local** 
   - Execute `npm run dev` para testar

2. **Testar Interface**
   - Verificar splash screen
   - Validar cores em todas as páginas
   - Testar dark mode

3. **Mobile (Opcional)**
   - `npm run cap:sync` para atualizar nativas
   - Testar em iOS/Android

4. **Deploy**
   - Build: `npm run build`
   - Upload para servidor
   - Atualizar domínio em `https://friggo.app`

5. **App Stores**
   - Atualizar screenshots
   - Atualizar descrição
   - Publicar versão 2.0 (Friggo)

---

## 💡 Dicas

- Sempre fazer `npm install` antes de qualquer build
- Testar `npm run dev` localmente antes de publicar
- Usar `npm run lint` para detectar problemas cedo
- Limpar cache quando encontrar issues

---

## 📞 Suporte

Documentação completa em:
- `FRIGGO_MIGRATION_REPORT.md` - Detalhes técnicos
- `FRIGGO_DESIGN_TOKENS.md` - Sistema de cores

**Build preparado para Produção! 🚀**
