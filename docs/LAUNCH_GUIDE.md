# Kaza - Guia de Configuração para Lançamento

## 1. Variáveis de Ambiente Necessárias

### Supabase Edge Functions (Secrets)

Configure em: Supabase Dashboard → Project → Edge Functions → Manage Secrets

| Secret                  | Descrição                | Como Obter                                                    |
| ----------------------- | ------------------------ | ------------------------------------------------------------- |
| `STRIPE_SECRET_KEY`     | Chave secreta do Stripe  | Dashboard Stripe → Developers → API Keys → Secret key         |
| `STRIPE_WEBHOOK_SECRET` | Secret do webhook Stripe | Dashboard Stripe → Developers → Webhooks → Signing secret     |
| `LOVABLE_API_KEY`       | API key para IA (Gemini) | Painel Lovable ou substitua pelo Google AI Studio diretamente |

### Frontend (.env)

```env
VITE_SUPABASE_URL=https://pylruhvqjyvbninduzod.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua_anon_key
VITE_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

## 2. Stripe - Configuração de Produção

### Webhook

1. Vá em Stripe Dashboard → Developers → Webhooks
2. Crie um endpoint: `https://pylruhvqjyvbninduzod.supabase.co/functions/v1/stripe-webhook`
3. Eventos a escutar:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copie o Signing Secret e coloque em `STRIPE_WEBHOOK_SECRET`

### Testar Pagamento (Modo Teste)

Use estes cartões de teste do Stripe:

- ✅ Sucesso: `4242 4242 4242 4242` (qualquer data futura, qualquer CVC)
- ❌ Recusado: `4000 0000 0000 0002`
- ⏳ Autenticação 3D: `4000 0025 0000 3155`
- 💳 Saldo insuficiente: `4000 0000 0000 9995`

### Alternar entre Teste e Produção

1. No Dashboard Stripe, alterne o toggle "Test mode" / "Live"
2. Atualize `STRIPE_SECRET_KEY` no Supabase com a chave do modo desejado
3. Atualize os Price IDs se necessário (podem ser diferentes entre test/live)

### Price IDs Atuais (Teste)

- Basic: `price_1SxQCMH9gIP9tzTRnJX7vbWc`
- Standard: `price_1SxQCcH9gIP9tzTRhSGp7AMi`
- Premium: `price_1SxQE1H9gIP9tzTRpqAhJFyB`

## 3. Sentry - Error Tracking

1. Crie um projeto em https://sentry.io
2. Escolha plataforma: React
3. Copie o DSN e adicione ao `.env`:
   ```
   VITE_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
   ```
4. O Sentry está configurado para:
   - Capturar 30% das transactions (performance)
   - Replay de 10% das sessões / 100% das sessões com erro
   - Não enviar eventos em modo development

## 4. Google Sign-In

### Firebase Console

1. Acesse Firebase Console → friggo-7dfdd → Authentication → Sign-in method → Google
2. Certifique-se que Google está habilitado
3. Em Project Settings → Your apps → Android:
   - SHA-1 debug: `7D:98:E8:17:CE:59:10:3C:21:AD:77:AB:8A:2F:72:18:C8:C3:22:68`
   - SHA-1 release: Gere com `keytool -list -v -keystore your-release.keystore`
   - SHA-256 release: Necessária para App Links
4. Baixe `google-services.json` atualizado e substitua em `android/app/`

### Supabase Auth

1. Dashboard → Authentication → Providers → Google
2. Redirect URLs deve incluir:
   - `https://pylruhvqjyvbninduzod.supabase.co/auth/v1/callback`
   - `kaza://auth/callback`
3. Client ID e Secret: Obtidos do Google Cloud Console → Credentials

## 5. Deep Links (Produção)

### Android App Links

1. Gere o SHA-256 do keystore de release:
   ```
   keytool -list -v -keystore your-release.keystore
   ```
2. Edite `public/.well-known/assetlinks.json` com o fingerprint SHA-256
3. Hospede o arquivo em `https://kaza.app/.well-known/assetlinks.json`

### iOS Universal Links

1. Edite `public/.well-known/apple-app-site-association` com seu Team ID
2. Hospede em `https://friggo.app/.well-known/apple-app-site-association`
3. Em Xcode → Signing & Capabilities → adicione "Associated Domains":
   - `applinks:kaza.app`

## 6. Build de Produção

### Android (APK/AAB)

```bash
# Gerar build de produção
npm run build
npx cap sync android

# No Android Studio:
# Build → Generate Signed Bundle/APK → Android App Bundle
# Use seu keystore de release
```

### iOS

```bash
npm run build
npx cap sync ios

# No Xcode:
# Product → Archive → Distribute App
```

## 7. Checklist Pré-Launch

- [ ] `STRIPE_SECRET_KEY` configurada (modo LIVE)
- [ ] `STRIPE_WEBHOOK_SECRET` configurada
- [ ] `LOVABLE_API_KEY` configurada (ou substitua por Google AI Studio)
- [ ] Webhook do Stripe criado com URL de produção
- [ ] Email de verificação testado (Supabase Auth → Enable email confirmations)
- [ ] SMTP customizado configurado (Resend, SendGrid, etc.) em Supabase → Auth → SMTP
- [ ] Google Sign-In com SHA-1 de release adicionada no Firebase
- [ ] `google-services.json` atualizado com oauth_client preenchido
- [ ] `VITE_SENTRY_DSN` configurado
 - [ ] Deep links testados (kaza://auth/callback, kaza://checkout)
- [ ] App Links (assetlinks.json) hospedado no domínio
- [ ] Screenshots e descrição prontos para a loja (ver docs/STORE_LISTING.md)
- [ ] Política de privacidade publicada em URL acessível
- [ ] Termos de serviço publicados
- [ ] Testado fluxo completo: registro → login → adicionar item → gerar receita → checkout → pagamento
- [ ] App funciona offline (fallback local de receitas e lista)
- [ ] Push notifications funcionando no dispositivo real
- [ ] Performance: app carrega em < 3 segundos
