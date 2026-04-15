param(
  [Parameter(Mandatory=$true)]
  [string]$SqlFile
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path $SqlFile)) {
  Write-Error "SQL file not found: $SqlFile"
  exit 1
}

if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
  Write-Error "Supabase CLI not found in PATH"
  exit 1
}

Write-Host "Running SQL file via supabase db connect: $SqlFile"

& supabase db connect -- psql -f "$SqlFile"
if ($LASTEXITCODE -ne 0) {
  Write-Error "psql returned code $LASTEXITCODE"
  exit $LASTEXITCODE
}

Write-Host "SQL execution finished."
