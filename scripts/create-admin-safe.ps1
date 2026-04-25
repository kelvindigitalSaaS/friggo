# =============================================================================
# KAZA — Criar Admin Seguro (sem vazar no F12)
# =============================================================================
# Uso: PowerShell.exe -ExecutionPolicy Bypass -File .\create-admin-safe.ps1

# CONFIGURAÇÃO
$SUPABASE_URL = "https://nrfketkwajzkmrlkvoyd.supabase.co"
$SERVICE_ROLE_KEY = Read-Host "Cole aqui sua SERVICE_ROLE_KEY do Supabase (Settings > API)"
$ADMIN_EMAIL = "admin@kaza.local"
$ADMIN_PASSWORD = Read-Host "Defina a senha do admin" -AsSecureString
$ADMIN_PASSWORD_PLAIN = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToCoTaskMemUnicode($ADMIN_PASSWORD))

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "1. Criando usuário admin..." -ForegroundColor Yellow

# Preparar JSON
$body = @{
    email = $ADMIN_EMAIL
    password = $ADMIN_PASSWORD_PLAIN
    email_confirm = $true
    user_metadata = @{
        is_admin = $true
    }
} | ConvertTo-Json

# Criar usuário via API
try {
    $response = Invoke-RestMethod `
        -Uri "$SUPABASE_URL/auth/v1/admin/users" `
        -Method Post `
        -Headers @{
            "Authorization" = "Bearer $SERVICE_ROLE_KEY"
            "Content-Type" = "application/json"
        } `
        -Body $body `
        -ErrorAction Stop

    $ADMIN_USER_ID = $response.id
    Write-Host "✅ Usuário criado! ID: $ADMIN_USER_ID" -ForegroundColor Green

    # Aguardar propagação
    Write-Host "⏳ Aguardando propagação (3s)..." -ForegroundColor Yellow
    Start-Sleep -Seconds 3

    # Preparar script SQL final
    $sqlScript = @"
-- Passo 1: Criar perfil
INSERT INTO public.profiles (
  user_id, name, cpf, plan_type, subscription_status, onboarding_completed
) VALUES (
  '$ADMIN_USER_ID'::uuid, 'Admin KAZA', '00000000000', 'premium', 'active', true
);

-- Passo 2: Criar home
INSERT INTO public.homes (
  name, owner_user_id, home_type, residents
) VALUES (
  'Casa do Admin', '$ADMIN_USER_ID'::uuid, 'house', 1
);

-- Passo 3: Adicionar como owner
INSERT INTO public.home_members (
  home_id, user_id, role
) VALUES (
  (SELECT id FROM public.homes WHERE owner_user_id = '$ADMIN_USER_ID'::uuid LIMIT 1),
  '$ADMIN_USER_ID'::uuid,
  'owner'
);

-- Passo 4: Criar subscription
INSERT INTO public.subscriptions (
  user_id, plan, plan_tier, is_active, trial_ends_at
) VALUES (
  '$ADMIN_USER_ID'::uuid, 'premium', 'premium', true, now() + interval '365 days'
);

-- Passo 5: Criar home_settings
INSERT INTO public.home_settings (
  home_id, fridge_type, cooling_level
) VALUES (
  (SELECT id FROM public.homes WHERE owner_user_id = '$ADMIN_USER_ID'::uuid LIMIT 1),
  'regular', 3
);

-- Verificar
SELECT p.user_id, p.name FROM public.profiles p WHERE p.user_id = '$ADMIN_USER_ID'::uuid;
"@

    Write-Host "`n==========================================" -ForegroundColor Cyan
    Write-Host "2. Execute isto no Supabase SQL Editor:" -ForegroundColor Yellow
    Write-Host "`nEndereço: https://supabase.com/dashboard/project/nrfketkwajzkmrlkvoyd/sql" -ForegroundColor Blue
    Write-Host "`n[Cole o código abaixo no SQL Editor e execute]`n" -ForegroundColor Yellow
    Write-Host $sqlScript -ForegroundColor Gray

    # Salvar em arquivo para fácil cópia
    $sqlScript | Out-File -FilePath ".\admin-setup-$ADMIN_USER_ID.sql" -Encoding UTF8
    Write-Host "`n✅ Código também salvo em: admin-setup-$ADMIN_USER_ID.sql" -ForegroundColor Green

    Write-Host "`n==========================================" -ForegroundColor Cyan
    Write-Host "RESUMO:" -ForegroundColor Yellow
    Write-Host "Email: $ADMIN_EMAIL" -ForegroundColor White
    Write-Host "User ID: $ADMIN_USER_ID" -ForegroundColor White
    Write-Host "`n⚠️  NUNCA compartilhe o SERVICE_ROLE_KEY!" -ForegroundColor Red

} catch {
    Write-Host "❌ ERRO ao criar usuário!" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host "`nVerifique:"
    Write-Host "1. SERVICE_ROLE_KEY está correto?"
    Write-Host "2. Email já existe?"
    Write-Host "3. Projeto Supabase está acessível?"
}
