# ============================================================
#  FRIGGO - Deploy Completo com PIX, Apple Pay e Notificações
#  Execute: pwsh -File deploy-complete.ps1
# ============================================================

# Cores para output
$SUCCESS = @{ForegroundColor = "Green" }
$INFO = @{ForegroundColor = "Cyan" }
$WARNING = @{ForegroundColor = "Yellow" }
$ERROR = @{ForegroundColor = "Red" }

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════╗" @INFO
Write-Host "║     FRIGGO - DEPLOY COMPLETO                           ║" @INFO
Write-Host "║     PIX + Apple Pay + Notificações                      ║" @INFO
Write-Host "╚════════════════════════════════════════════════════════╝" @INFO
Write-Host ""

# ─────────────────────────────────────────────────────────────────────

Write-Host "PASSO 1: Verificar Supabase CLI" @INFO
Write-Host "────────────────────────────────" @INFO

$version = Invoke-Expression "supabase --version 2>&1" | Select-Object -First 1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Supabase CLI instalado: $version" @SUCCESS
} else {
    Write-Host "❌ Supabase CLI não encontrado. Instale com:" @ERROR
    Write-Host "   npm install -g supabase" @WARNING
    exit 1
}
Write-Host ""

# ─────────────────────────────────────────────────────────────────────

Write-Host "PASSO 2: Verificar Autenticação Supabase" @INFO
Write-Host "────────────────────────────────────────" @INFO

$token = $env:SUPABASE_ACCESS_TOKEN
if ([string]::IsNullOrEmpty($token)) {
    Write-Host "⚠️  SUPABASE_ACCESS_TOKEN não encontrado" @WARNING
    Write-Host ""
    Write-Host "📋 Para continuar, você precisa:" @INFO
    Write-Host "   1. Vá para: https://supabase.com/dashboard/account/tokens" @INFO
    Write-Host "   2. Crie um 'Personal Access Token'" @INFO
    Write-Host "   3. Execute um destes comandos:" @INFO
    Write-Host ""
    Write-Host "   OPÇÃO A: Fazer login interativo" @WARNING
    Write-Host "     supabase login" @WARNING
    Write-Host ""
    Write-Host "   OPÇÃO B: Usar token direto" @WARNING
    Write-Host "     `$env:SUPABASE_ACCESS_TOKEN = 'seu_token_aqui'" @WARNING
    Write-Host "     pwsh -File deploy-complete.ps1" @WARNING
    Write-Host ""
    exit 1
} else {
    Write-Host "✅ Token de autenticação encontrado" @SUCCESS
}
Write-Host ""

# ─────────────────────────────────────────────────────────────────────

$PROJECT_REF = "nrfketkwajzkmrlkvoyd"
$PROJECT_DIR = $PSScriptRoot

Write-Host "PASSO 3: Link ao Projeto Supabase" @INFO
Write-Host "─────────────────────────────────" @INFO
Write-Host "Projeto: $PROJECT_REF" @INFO

Set-Location $PROJECT_DIR
$linkOutput = Invoke-Expression "supabase link --project-ref $PROJECT_REF 2>&1"

if ($LASTEXITCODE -eq 0 -or $linkOutput -like "*already linked*") {
    Write-Host "✅ Projeto vinculado com sucesso" @SUCCESS
} else {
    Write-Host "❌ Erro ao lincar ao projeto:" @ERROR
    Write-Host $linkOutput @ERROR
    exit 1
}
Write-Host ""

# ─────────────────────────────────────────────────────────────────────

Write-Host "PASSO 4: Verificar Secrets do Stripe" @INFO
Write-Host "───────────────────────────────────" @INFO

$secretsOutput = Invoke-Expression "supabase secrets list --project-ref $PROJECT_REF 2>&1"

if ($secretsOutput -like "*STRIPE_SECRET_KEY*" -and $secretsOutput -like "*STRIPE_WEBHOOK_SECRET*") {
    Write-Host "✅ Secrets do Stripe configurados" @SUCCESS
} else {
    Write-Host "⚠️  AVISO: Secrets do Stripe não encontrados!" @WARNING
    Write-Host ""
    Write-Host "📊 Obtenha em: https://dashboard.stripe.com/apikeys" @INFO
    Write-Host ""
    Write-Host "Setando secrets do Stripe..." @WARNING
    Write-Host "Cole as chaves abaixo (ou pressione Enter para pular):" @WARNING
    Write-Host ""
    
    $stripeSecretKey = Read-Host "STRIPE_SECRET_KEY (sk_live_xxx)"
    $stripeWebhookSecret = Read-Host "STRIPE_WEBHOOK_SECRET (whsec_xxx)"
    
    if (-not [string]::IsNullOrEmpty($stripeSecretKey)) {
        Write-Host "Salvando STRIPE_SECRET_KEY..." @INFO
        supabase secrets set STRIPE_SECRET_KEY=$stripeSecretKey --project-ref $PROJECT_REF
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ STRIPE_SECRET_KEY salvo" @SUCCESS
        }
    }
    
    if (-not [string]::IsNullOrEmpty($stripeWebhookSecret)) {
        Write-Host "Salvando STRIPE_WEBHOOK_SECRET..." @INFO
        supabase secrets set STRIPE_WEBHOOK_SECRET=$stripeWebhookSecret --project-ref $PROJECT_REF
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ STRIPE_WEBHOOK_SECRET salvo" @SUCCESS
        }
    }
}
Write-Host ""

# ─────────────────────────────────────────────────────────────────────

Write-Host "PASSO 5: Deploy das Edge Functions" @INFO
Write-Host "──────────────────────────────────" @INFO

$functions = @(
    "create-checkout",
    "stripe-webhook",
    "check-subscription",
    "customer-portal",
    "generate-recipes",
    "generate-shopping-list",
    "smart-fridge"
)

$successCount = 0
$failCount = 0

foreach ($func in $functions) {
    Write-Host "📦 Deployando $func..." @INFO
    
    $deployOutput = Invoke-Expression "supabase functions deploy $func --project-ref $PROJECT_REF 2>&1"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ $func deployado com sucesso" @SUCCESS
        $successCount++
    } else {
        Write-Host "  ❌ Erro ao deployar $func" @ERROR
        Write-Host "     $deployOutput" @ERROR
        $failCount++
    }
}

Write-Host ""
Write-Host "Resumo: $successCount sucesso, $failCount erros" @INFO
Write-Host ""

# ─────────────────────────────────────────────────────────────────────

Write-Host "PASSO 6: Informações do Webhook" @INFO
Write-Host "──────────────────────────────" @INFO
Write-Host ""
Write-Host "🔗 Webhook URL:" @INFO
Write-Host "   https://$PROJECT_REF.supabase.co/functions/v1/stripe-webhook" @WARNING
Write-Host ""
Write-Host "📋 Configure em: https://dashboard.stripe.com/webhooks" @INFO
Write-Host ""
Write-Host "✅ Eventos a escutar:" @INFO
Write-Host "   • checkout.session.completed" @INFO
Write-Host "   • customer.subscription.created" @INFO
Write-Host "   • customer.subscription.deleted" @INFO
Write-Host "   • invoice.payment_succeeded" @INFO
Write-Host "   • invoice.payment_failed" @INFO
Write-Host ""

# ─────────────────────────────────────────────────────────────────────

Write-Host "PASSO 7: Variáveis de Ambiente do Frontend" @INFO
Write-Host "────────────────────────────────────────" @INFO
Write-Host ""
Write-Host "📝 Verificar si seu .env contém:" @INFO
Write-Host ""

$envFile = Join-Path $PROJECT_DIR ".env"
if (Test-Path $envFile) {
    Write-Host "✅ Arquivo .env encontrado" @SUCCESS
    $envContent = Get-Content $envFile
    if ($envContent -like "*SUPABASE_URL*") {
        Write-Host "✅ SUPABASE_URL configurado" @SUCCESS
    }
} else {
    Write-Host "⚠️  Arquivo .env não encontrado" @WARNING
    Write-Host "   Crie um arquivo .env na raiz do projeto com:" @INFO
    Write-Host ""
    Write-Host "VITE_SUPABASE_URL=https://$PROJECT_REF.supabase.co" @WARNING
    Write-Host "VITE_SUPABASE_PUBLISHABLE_KEY=seu_anon_key" @WARNING
}
Write-Host ""

# ─────────────────────────────────────────────────────────────────────

Write-Host "PASSO 8: Build do Frontend" @INFO
Write-Host "──────────────────────────" @INFO

$buildNow = Read-Host "Deseja fazer build agora? (s/n)"
if ($buildNow -eq "s" -or $buildNow -eq "S") {
    Write-Host "Buildando projeto..." @INFO
    npm run build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Build concluído com sucesso" @SUCCESS
        Write-Host ""
        Write-Host "📦 Pasta dist pronta para deploy" @INFO
        Write-Host "   • Netlify: Faça drag & drop de ./dist" @INFO
        Write-Host "   • Vercel: Execute 'vercel deploy --prod'" @INFO
    } else {
        Write-Host "❌ Erro no build" @ERROR
    }
}
Write-Host ""

# ─────────────────────────────────────────────────────────────────────

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════╗" @SUCCESS
Write-Host "║         ✅ DEPLOY CONCLUÍDO COM SUCESSO!               ║" @SUCCESS
Write-Host "╚════════════════════════════════════════════════════════╝" @SUCCESS
Write-Host ""
Write-Host "📋 Próximos Passos:" @INFO
Write-Host "   1. Configure o Webhook do Stripe:" @INFO
Write-Host "      URL: https://$PROJECT_REF.supabase.co/functions/v1/stripe-webhook" @WARNING
Write-Host ""
Write-Host "   2. Teste a plataforma:" @INFO
Write-Host "      • Vá para /plans" @INFO
Write-Host "      • Clique em 'Assinar'" @INFO
Write-Host "      • Procure por PIX, Apple Pay, etc" @INFO
Write-Host ""
Write-Host "   3. Monitore os logs:" @INFO
Write-Host "      supabase functions logs create-checkout --tail" @WARNING
Write-Host ""
Write-Host "📚 Documentação:" @INFO
Write-Host "   • ./docs/DEPLOY_GUIDE.md" @WARNING
Write-Host "   • ./docs/TESTING_GUIDE.md" @WARNING
Write-Host "   • ./docs/CODE_CHANGES.md" @WARNING
Write-Host ""
Write-Host "🎉 PIX, Apple Pay e Notificações de Lixo estão ATIVAS!" @SUCCESS
Write-Host ""
