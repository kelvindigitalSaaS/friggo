<#
apply_best_practices_supabase_cli.ps1

Uso:
  # Executa tentando usar supabase CLI (login via navegador)
  ./apply_best_practices_supabase_cli.ps1 -ProjectRef nrfketkwajzkmrlkvoyd

Observações:
- Requer Supabase CLI instalado: https://github.com/supabase/cli
- O script chama `supabase login` se necessário (abertura do navegador).
- Tenta executar o arquivo `db_best_practices_sql_editor.sql` com `psql -f` via `supabase db connect`.
- Se a execução automática falhar, abre uma sessão interativa `psql` via `supabase db connect` e instrui como rodar o arquivo manualmente.
#>

param(
    [string]$ProjectRef = $env:SUPABASE_PROJECT_REF
)

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$sqlFile = Join-Path $scriptDir 'db_best_practices_sql_editor.sql'
$configFile = Join-Path $scriptDir 'config.toml'

if (-not (Test-Path $sqlFile)) {
    Write-Error "Arquivo SQL não encontrado: $sqlFile"
    exit 1
}

if (-not $ProjectRef -and (Test-Path $configFile)) {
    $cfg = Get-Content $configFile -Raw
    if ($cfg -match 'project_id\s*=\s*"([^"]+)"') {
        $ProjectRef = $matches[1]
        Write-Host "Project ref detectado em supabase/config.toml: $ProjectRef"
    }
}

if (-not $ProjectRef) {
    Write-Host "Nenhum project ref fornecido. Passe -ProjectRef <ref> ou defina SUPABASE_PROJECT_REF."
    Write-Host "Você também pode abrir o Supabase Studio e copiar o ""Project ref"" no painel do projeto."
    exit 1
}

if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
    Write-Error "Supabase CLI não encontrado. Instale: https://github.com/supabase/cli"
    exit 1
}

# Verifica se está logado; se não, abre browser para login
$loggedIn = $true
try {
    & supabase projects list > $null 2>&1
} catch {
    $loggedIn = $false
}

if (-not $loggedIn) {
    Write-Host "Abrindo navegador para login no Supabase..."
    & supabase login
}

Write-Host "Tentando executar o SQL automaticamente via supabase db connect (usando projeto ligado/local)..."

try {
    & supabase db connect -- psql -f "$sqlFile"
    if ($LASTEXITCODE -ne 0) { throw "psql retornou código $LASTEXITCODE" }
    Write-Host "Script executado com sucesso."
    exit 0
} catch {
    Write-Warning "Execução automática falhou (saida: $LASTEXITCODE). Abrindo psql interativo para execução manual..."
    & supabase db connect
    Write-Host "Dentro do psql interativo, rode: \i $sqlFile"
    exit 0
}
