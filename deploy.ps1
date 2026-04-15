# ========================================================
#  FRIGGO — Deploy Edge Functions no Supabase
#  Execute este script com PowerShell:
#    .\deploy.ps1
# ========================================================

# ── 1. PREENCHA SUAS CHAVES AQUI ─────────────────────────

# Supabase: https://supabase.com/dashboard/account/tokens → Create new token
$SUPABASE_ACCESS_TOKEN = "COLE_SEU_SUPABASE_ACCESS_TOKEN_AQUI"

# Stripe: https://dashboard.stripe.com/apikeys → Secret key (use sk_test_ para testes)
$STRIPE_SECRET_KEY = "sk_live_COLE_SUA_STRIPE_SECRET_KEY_AQUI"

# Stripe Webhook: https://dashboard.stripe.com/webhooks → seu endpoint → Signing secret
$STRIPE_WEBHOOK_SECRET = "whsec_COLE_SEU_WEBHOOK_SECRET_AQUI"

# ⚠️  NUNCA commite este arquivo com chaves preenchidas!
# Adicione deploy.ps1 ao .gitignore se necessário.

# ── 2. NÃO MUDE NADA ABAIXO ──────────────────────────────

$SUPABASE_EXE = "C:\Users\PC\AppData\Local\supabase\supabase.exe"
$PROJECT_REF  = "nrfketkwajzkmrlkvoyd"
$PROJECT_DIR  = $PSScriptRoot

# Validar que as chaves foram preenchidas
if ($SUPABASE_ACCESS_TOKEN -like "COLE_*" -or $STRIPE_SECRET_KEY -like "sk_live_COLE_*") {
    Write-Host "❌ ERRO: Preencha SUPABASE_ACCESS_TOKEN e STRIPE_SECRET_KEY no script antes de rodar." -ForegroundColor Red
    exit 1
}

$env:SUPABASE_ACCESS_TOKEN = $SUPABASE_ACCESS_TOKEN
$env:PATH += ";C:\Users\PC\AppData\Local\supabase"

Set-Location $PROJECT_DIR

Write-Host "🔗 Linkando projeto Supabase..." -ForegroundColor Cyan
& $SUPABASE_EXE link --project-ref $PROJECT_REF
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Falha no link" -ForegroundColor Red; exit 1 }

Write-Host "🔑 Configurando secrets..." -ForegroundColor Cyan
& $SUPABASE_EXE secrets set STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
if ($STRIPE_WEBHOOK_SECRET -notlike "whsec_COLE_*") {
    & $SUPABASE_EXE secrets set STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK_SECRET
}

Write-Host "🚀 Fazendo deploy das Edge Functions..." -ForegroundColor Cyan
& $SUPABASE_EXE functions deploy create-checkout    --project-ref $PROJECT_REF
& $SUPABASE_EXE functions deploy check-subscription --project-ref $PROJECT_REF
& $SUPABASE_EXE functions deploy customer-portal    --project-ref $PROJECT_REF
& $SUPABASE_EXE functions deploy stripe-webhook     --project-ref $PROJECT_REF
& $SUPABASE_EXE functions deploy generate-recipes   --project-ref $PROJECT_REF
& $SUPABASE_EXE functions deploy generate-shopping-list --project-ref $PROJECT_REF
& $SUPABASE_EXE functions deploy smart-fridge       --project-ref $PROJECT_REF

Write-Host ""
Write-Host "✅ Deploy concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 PRÓXIMO PASSO — Webhook no Stripe:" -ForegroundColor Yellow
Write-Host "   1. Acesse: https://dashboard.stripe.com/webhooks" -ForegroundColor White
Write-Host "   2. Clique em 'Add endpoint'" -ForegroundColor White
Write-Host "   3. URL: https://pylruhvqjyvbninduzod.supabase.co/functions/v1/stripe-webhook" -ForegroundColor White
Write-Host "   4. Eventos: checkout.session.completed, customer.subscription.*,invoice.*" -ForegroundColor White
Write-Host "   5. Copie o Signing secret (whsec_xxx) e rode o script novamente com ele preenchido" -ForegroundColor White
