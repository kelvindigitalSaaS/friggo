# 🚀 DEPLOY AGORA - Instruções Simples

## 1️⃣ Deploy Frontend (Escolha Um)

### Opção A: Netlify (Mais Fácil) ⭐

```
1. Acesse: https://app.netlify.com
2. Login com conta
3. Clique: "Add new site"
4. Escolha: "Deploy manually"
5. Drag & drop: paste C:\Users\PC\Downloads\friggo-main\friggo-main\dist
6. Pronto! Seu site está live 🎉
```

**URL será:** `seu-site.netlify.app`

### Opção B: Vercel

```bash
npm install -g vercel
cd c:\Users\PC\Downloads\friggo-main\friggo-main
vercel deploy --prod
```

### Opção C: GitHub Pages / Firebase / Outro

Use o método do seu provedor para deploya pasta `dist/`

---

## 2️⃣ Teste em Produção

1. Abra seu site deployado
2. Vá para `/plans`
3. Clique: "Assinar Agora"
4. Selecione: PIX
5. Clique: "Continuar"
6. ✅ Deve mostrar formulário de pagamento (SEM sair da página)

---

## 3️⃣ Problemas Comuns

### Erro: "Chave do Stripe não configurada"

- Verificar se `VITE_STRIPE_PUBLISHABLE_KEY` está em `.env` local
- No Netlify/Vercel: adicionar em Environment Variables

### Erro: "clientSecret é null"

- Verificar se Edge Function `create-checkout` foi deployada
- Dashboard: https://app.supabase.io → Functions → create-checkout → deve estar v22 ou superior

### Formulário não aparece

- Abrir F12 (DevTools)
- Verificar console por erros
- Verificar se Stripe está carregando

---

## 📝 Resumo do Que Você Tem

| Item           | Status        | Localização          |
| -------------- | ------------- | -------------------- |
| Frontend Build | ✅ Pronto     | `dist/`              |
| Edge Functions | ✅ Deployadas | Supabase             |
| Documentação   | ✅ Completa   | `CHECKOUT_RESUMO.md` |
| Build Time     | ✅ 6.97s      | Rápido 🚀            |

---

## 🎯 Proximamente (Após Deploy)

1. **Testar PIX em produção**
2. **Testar Apple Pay (em Mac/iPhone)**
3. **Testar Google Pay (em Android)**
4. **Monitorar logs de erro**

---

**Qualquer dúvida, leia:** `CHECKOUT_EMBUTIDO.md`

**Deploy agora mesmo!** 🚀
