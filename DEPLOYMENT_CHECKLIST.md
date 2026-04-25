# ✅ Checklist de Deployment — Remover Admin + Feedback

## Status: PRONTO PARA PRODUÇÃO

---

## 📦 Build Verificado

```
✅ npm run build — Sucesso em 16.06s
✅ AdminDashboard — NÃO está no bundle
✅ Nenhum erro de TypeScript
✅ PWA service worker gerado
```

---

## 🔧 Implementação Concluída

| Item | Status | Arquivo |
|------|--------|---------|
| Remover rota admin | ✅ | `src/App.tsx` |
| SubscriptionContext com feedbackSubmitted | ✅ | `src/contexts/SubscriptionContext.tsx` |
| Hook useFeedbackSurvey | ✅ | `src/hooks/useFeedbackSurvey.ts` |
| Página FeedbackSurvey (4 steps) | ✅ | `src/pages/FeedbackSurvey/index.tsx` |
| SQL de setup | ✅ | `supabase/FEEDBACK_SURVEYS_SETUP.sql` |
| Queries de relatório | ✅ | `supabase/FEEDBACK_REPORTS.sql` |
| Guia de implementação | ✅ | `IMPLEMENTATION_GUIDE.md` |

---

## 🚀 Antes de Fazer Deploy

### 1. Executar SQL no Supabase (CRÍTICO)

```
Supabase Dashboard > SQL Editor > Cole supabase/FEEDBACK_SURVEYS_SETUP.sql > Execute
```

Resultado esperado:
- ✅ `ALTER TABLE profiles ADD COLUMN feedback_submitted`
- ✅ `CREATE TABLE feedback_surveys`
- ✅ `ALTER TABLE feedback_surveys ENABLE ROW LEVEL SECURITY`
- ✅ `CREATE POLICY feedback_insert_own`
- ✅ Índices criados

### 2. Testar Localmente

```bash
npm run dev
```

**Teste A:** Usuário com trial ativo
- ✅ Home carrega normalmente
- ✅ Sem survey

**Teste B:** Usuário com trial expirado + feedback_submitted = false
- ✅ Redireciona para `/app/feedback-survey`
- ✅ Formulário com 4 steps aparece

**Teste C:** Submeter feedback
- ✅ Validação de campos obrigatórios funciona
- ✅ Dados salvos em `feedback_surveys`
- ✅ Redireciona para paywall após submit

**Teste D:** Pular feedback
- ✅ Marca `feedback_submitted = true` sem inserir dados
- ✅ Vai direto para paywall

**Teste E:** Reload após responder
- ✅ Não volta para survey
- ✅ Fica na paywall

### 3. Verificar Segurança

```sql
-- No Supabase Dashboard, como user logado:
SELECT * FROM public.feedback_surveys;

-- Resultado esperado: Vazio ou erro "insufficient privileges"
-- (usuário normal não consegue ler feedback de outro usuário)
```

### 4. Publicar

```bash
git add -A
git commit -m "feat: remove admin UI, add post-trial feedback survey"
git push origin main
# Deploy automático no Netlify
```

---

## 🎯 Fluxo Pós-Deploy (para usuários)

```
Trial de 7 dias termina
        ↓
Usuário tenta acessar app
        ↓
Sistema detecta: isLocked = true + feedbackSubmitted = false
        ↓
Redireciona para /app/feedback-survey
        ↓
Usuário responde 4 perguntas (ou pula)
        ↓
Sistema marca: feedback_submitted = true
        ↓
Redireciona para Paywall (planos Individual/MultiPRO)
        ↓
Usuário escolhe plano ou cancela
```

---

## 📊 Analisar Feedback Depois

Depois de ter algumas respostas, use:

```bash
# Copie e execute no Supabase > SQL Editor:
# Arquivo: supabase/FEEDBACK_REPORTS.sql
```

Exemplos de queries:

**Resumo geral:**
```sql
SELECT COUNT(*) as total, ROUND(AVG(rating)::numeric, 2) as nota_media
FROM public.feedback_surveys;
```

**Features mais gostadas:**
```sql
SELECT unnest(liked_features) as feature, COUNT(*) as total
FROM public.feedback_surveys
GROUP BY feature ORDER BY total DESC;
```

**Motivos para não assinar:**
```sql
SELECT no_purchase_reason, COUNT(*) as total
FROM public.feedback_surveys
WHERE no_purchase_reason IS NOT NULL
GROUP BY no_purchase_reason ORDER BY total DESC;
```

---

## 🆘 Troubleshooting

### "Erro ao submeter feedback"
- Verificar que SQL foi executado no Supabase
- Verificar RLS: `SELECT * FROM pg_policies WHERE tablename = 'feedback_surveys';`

### "AdminDashboard ainda aparece em produção"
- Limpar cache do Netlify: Settings > Builds & deploys > Clear cache and redeploy

### "Feedback não aparece no relatório"
- Verificar que coluna `feedback_submitted` foi adicionada
- Testar insert direto: `INSERT INTO feedback_surveys VALUES (...)`

### "Survey mostra branco"
- Verificar console do navegador (F12) para erros
- Verificar que FeedbackSurvey foi importado corretamente em App.tsx

---

## 📞 Informações Importantes

| Campo | Valor |
|-------|-------|
| Projeto Supabase | nrfketkwajzkmrlkvoyd |
| Admin via | Supabase Dashboard (não via UI) |
| Dados de feedback | Tabela `feedback_surveys` |
| Rastreamento | Campo `feedback_submitted` em `profiles` |
| RLS Status | Habilitado — usuários não conseguem ler dados uns dos outros |

---

## ✨ O que muda para o usuário?

**Antes:**
- Trial expira → Paywall direto

**Depois:**
- Trial expira → Survey (4 perguntas) → Paywall

**Benefício:**
- Coleta feedback antes de propor assinatura
- Entende por que usuários não converteram
- Dados para melhorar o app

---

## 🎬 Pronto para Deploy?

- [ ] SQL executado no Supabase
- [ ] Build local OK (`npm run build`)
- [ ] AdminDashboard não no bundle
- [ ] Testes locais passaram
- [ ] RLS verificado
- [ ] Equipe informada
- [ ] Backup do banco feito

**Se tudo OK → Deploy com confiança! 🚀**

---

**Última atualização:** 2026-04-24
**Status:** Pronto para produção ✅
