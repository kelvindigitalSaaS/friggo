# 🚀 Guia de Deploy Web - Vercel

## ✅ Pré-requisitos

- Conta no Vercel (https://vercel.com)
- GitHub, GitLab ou Bitbucket conectado ao Vercel
- Projeto Git com commits atualizados

## 📝 Passo 1: Fazer Push para Git

```bash
# Adicionar e commitar mudanças
git add .
git commit -m "Deploy: sistema de pagamento PIX com checkout embutido"

# Fazer push para main/master
git push origin main
```

## 🔧 Passo 2: Conectar no Vercel

### Opção A: Via CLI (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy (na pasta do projeto)
vercel
```

### Opção B: Via Dashboard Web

1. Acesse https://vercel.com/dashboard
2. Clique em "Add New..." → "Project"
3. Selecione seu repositório GitHub/GitLab/Bitbucket
4. Vercel detectará automaticamente que é um projeto Vite
5. Clique em "Deploy"

## 🔐 Passo 3: Configurar Variáveis de Ambiente

No painel do Vercel, vá para **Settings → Environment Variables** e adicione:

```
VITE_STRIPE_PUBLISHABLE_KEY = pk_live_... (sua chave Stripe)
VITE_SUPABASE_URL = https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY = eyJ... (sua chave anão Supabase)
```

⚠️ **IMPORTANTE**: Estas variáveis devem ser as **variáveis de produção**, não as de desenvolvimento!

## 📱 Passo 4: Verificar Domínio

Após o deploy, você receberá uma URL como:

```
https://friggo-xxxxx.vercel.app
```

Para usar um domínio customizado:

1. Vá para **Settings → Domains**
2. Adicione seu domínio customizado
3. Configure os DNS records conforme instruções do Vercel

## ✨ Funcionalidades Deployadas

✅ Seletor de método de pagamento (card, PIX, Apple Pay, Google Pay, Boleto)
✅ Checkout embutido do Stripe (sem redirecionamentos)
✅ Duas páginas de sucesso/cancelamento
✅ FluxoTwo-estágios: Selecionar método → Selecionar gateway → Pagamento
✅ Notificações à toast (Sonner)
✅ Suporte multilíngue (PT-BR, EN, ES)

## 🔍 Validar Deploy

1. Acesse a URL do projeto
2. Navegue para "Planos"
3. Clique em "Assinar Agora" em qualquer plano
4. Valide os métodos de pagamento disponíveis
5. Tente iniciar checkout (use modo teste Stripe se apropriado)

## 📊 Monitoramento Pós-Deploy

- **Analytics**: Dashboard Vercel → Analytics
- **Logs**: Dashboard Vercel → Deployments → Logs
- **Erros**: Sentry (configurado em src/lib/sentry.ts)
- **Performance**: Web Vitals no Vercel Analytics

## 🆘 Troubleshooting

### "Build failed"

- Verificar logs do Vercel
- Cada variável de ambiente está configurada?
- `npm run build` funciona localmente?

### Stripe não aparece

- Variável `VITE_STRIPE_PUBLISHABLE_KEY` está configurada?
- Verificar console do navegador (F12) para erros

### Estilo quebrado

- Vercel precisa de rebuild: Settings → Redeploy
- Cache pelo browser: Ctrl+Shift+Delete

## 🔄 Redeploy

Para fazer deploy novamente após mudanças:

```bash
git add .
git commit -m "Fix: descrição da mudança"
git push origin main
```

Vercel detectará automaticamente e fará novo deploy!

## 📞 Support

- Docs Vercel: https://vercel.com/docs
- Comunidade: https://vercel.com/support

---

**Status**: ✅ Pronto para produção
**Data**: 14 de março de 2026
