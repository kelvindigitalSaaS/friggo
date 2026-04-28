# 📱 Known Limitations - KAZA App

## 1. **iPhone/iOS - Vibração Não Funciona** 🍎

### Por que?
- **iOS Safari** não suporta a API `navigator.vibrate()` — é uma limitação do WebKit (browser engine do iOS)
- A API só funciona em:
  - ✅ Chrome/Android
  - ✅ Firefox/Android  
  - ✅ Safari em Android (Samsung Internet)
  - ❌ Safari em iOS (não há implementação)

### Workarounds Possíveis

#### Opção 1: Usar Web Audio API para beep
```typescript
function playBeep() {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  
  oscillator.frequency.value = 800;
  oscillator.type = 'sine';
  
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.5);
}
```

#### Opção 2: Usar native Capacitor (se app for hybrid)
```typescript
import { HapticsFeedback } from '@capacitor/haptics';

async function vibrate() {
  await HapticsFeedback.vibrate({ duration: 100 });
}
```

#### Opção 3: Fallback elegante (implementado)
```typescript
const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

if (navigator.vibrate && !isIOS) {
  navigator.vibrate(100);
} else if (isIOS) {
  // Show toast: "iOS não suporta vibração. Som habilitado em vez disso."
  playBeep();
}
```

### Status Atual
✅ **Implementado**: Mensagem clara ao usuário em SettingsTab quando testa vibração em iOS

---

## 2. **App Install & PWA Limitations** 📦

### iOS PWA (Problemas conhecidos)
- ❌ Não suporta Web Push (apenas local notifications)
- ❌ Sem background sync (iOS kills apps)
- ✅ Web Storage (localStorage) funciona

### Android PWA
- ✅ Full Web Push support
- ✅ Background sync com Service Worker
- ✅ Badging API

### Recomendação
- **iOS users**: Usar app nativa (publicar na App Store)
- **Android users**: PWA atual já é excelente

---

## 3. **Offline Mode Limitations** 🌐

### O que funciona offline:
- ✅ Ver itens (cache local)
- ✅ Adicionar itens (enfileirados no sync queue)
- ✅ Editar items
- ✅ Ver receitas (5000 in-app)

### O que NÃO funciona offline:
- ❌ Sincronizar com database
- ❌ Buscar membros do grupo em tempo real
- ❌ Atualizar preferências de notificação
- ❌ Acessar dados do Supabase realtime

### Comportamento
- App fica offline automaticamente quando sem internet
- Items são enfileirados para sincronizar
- Ao voltar online: sincronização automática
- Se error permanente: movido para error queue

---

## 4. **Sub-Account Limitations** 👥

### Restrições de Acesso
- ✅ Sub-account pode ver itens da home
- ✅ Sub-account pode adicionar à shopping list
- ✅ Sub-account pode ver receitas
- ❌ Sub-account NÃO pode:
  - Ver histórico de outros membros
  - Modificar preferências de notificação (apenas master)
  - Desconectar outros usuários (apenas master)
  - Acessar dados de billing

---

## 5. **Database Rate Limits** 📊

### Supabase Free Tier
- Max 500,000 monthly active users (shared)
- Max 2GB database size
- No custom RLS policies (usar defaults)

### Behavior em Limite
- Queries retornam erro 429 (Too Many Requests)
- Dados ficam em sync queue e são retentados
- User vê toast: "Servidor sobrecarregado, tentando novamente..."

---

## 6. **Browser Compatibility** 🌐

### Suportados ✅
| Browser | Mobile | Desktop |
|---------|--------|---------|
| Chrome | ✅ | ✅ |
| Firefox | ✅ | ✅ |
| Safari iOS | ⚠️ | N/A |
| Safari macOS | ⚠️ | ⚠️ |
| Edge | ✅ | ✅ |
| Samsung Internet | ✅ | N/A |

### ⚠️ Limitações (Safari)
- Sem Service Worker pre-cache (funciona mas não persiste bem)
- Sem Web Notifications
- IndexedDB limitado

---

## 7. **Storage Limits** 💾

### localStorage
- Chrome: ~10MB
- Firefox: ~10MB
- Safari: ~5MB
- Edge: ~10MB

### Com 5000 receitas
- Cache recipes: ~4.8MB (já em JS bundle)
- Items cache: ~0.1MB (típico)
- Shopping list: ~0.05MB
- **Total**: ~5MB (safe em todos browsers)

---

## 8. **Network Limitations** 🌍

### Com 3G
- ⚠️ Sincronização pode demorar 5-10 segundos
- ✅ App não congela (async operations)
- ✅ Offline mode suporta trabalho offline

### Com Slow Network (< 100KB/s)
- ⚠️ Imagens de avatar podem demorar
- ✅ Dados críticos (itens, shopping) sincronizam primeiro

---

## 9. **Known Issues Abertos** 🔴

1. **CPF Enumeration Risk**: Sem rate-limit, possível enumerar CPFs válidos
   - Fix: v2 com rate-limiting no RPC
   
2. **localStorage não encriptado**: Dados sensíveis em plain text
   - Fix: v2 com IndexedDB + encriptação
   
3. **Sub-account RLS ambiguidade**: Pode herdar acesso à subscription da master
   - Status: RLS policies configurado mas precisa auditoria
   
4. **Recipe bundle size**: 4.8MB gzipped é grande
   - Recomendação: Lazy-load recipes em v2

---

## 📞 Support Matrix

| Problema | iOS | Android | Web |
|----------|-----|---------|-----|
| Vibração | ❌ | ✅ | ✅ |
| Push Notifications | ⚠️ | ✅ | ⚠️ |
| Offline Mode | ⚠️ | ✅ | ✅ |
| Background Sync | ❌ | ✅ | ✅ |
| Install Prompt | ⚠️ | ✅ | ⚠️ |

---

**Última atualização**: 28/04/2026  
**Versão**: Pre-Production
