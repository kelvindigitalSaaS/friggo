#!/bin/bash
# =============================================================================
# KAZA — Criar Admin Seguro (sem vazar no F12)
# =============================================================================
# Uso: bash ./create-admin-safe.sh

SUPABASE_URL="https://nrfketkwajzkmrlkvoyd.supabase.co"
ADMIN_EMAIL="admin@kaza.local"

echo "=========================================="
echo "🔐 KAZA — Setup Admin Seguro"
echo "=========================================="

# Ler SERVICE_ROLE_KEY
read -p "Cole aqui sua SERVICE_ROLE_KEY (Settings > API): " SERVICE_ROLE_KEY

# Ler senha
read -sp "Defina a senha do admin: " ADMIN_PASSWORD
echo ""

# Validar inputs
if [ -z "$SERVICE_ROLE_KEY" ] || [ -z "$ADMIN_PASSWORD" ]; then
    echo "❌ Erro: SERVICE_ROLE_KEY ou senha vazios"
    exit 1
fi

echo -e "\n=========================================="
echo "1️⃣  Criando usuário admin..."
echo "=========================================="

# Criar usuário via API
RESPONSE=$(curl -s -X POST "$SUPABASE_URL/auth/v1/admin/users" \
  -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'$ADMIN_EMAIL'",
    "password": "'$ADMIN_PASSWORD'",
    "email_confirm": true,
    "user_metadata": {
      "is_admin": true
    }
  }')

# Extrair user_id
ADMIN_USER_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*' | cut -d'"' -f4)

if [ -z "$ADMIN_USER_ID" ]; then
    echo "❌ Erro ao criar usuário!"
    echo "$RESPONSE"
    exit 1
fi

echo "✅ Usuário criado! ID: $ADMIN_USER_ID"

# Aguardar propagação
echo "⏳ Aguardando propagação (3s)..."
sleep 3

echo -e "\n=========================================="
echo "2️⃣  Execute isto no Supabase SQL Editor:"
echo "=========================================="
echo "Endereço: https://supabase.com/dashboard/project/nrfketkwajzkmrlkvoyd/sql"
echo ""

# Gerar SQL
cat > "admin-setup-$ADMIN_USER_ID.sql" << EOF
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
EOF

cat "admin-setup-$ADMIN_USER_ID.sql"

echo ""
echo "=========================================="
echo "✅ RESUMO:"
echo "=========================================="
echo "Email: $ADMIN_EMAIL"
echo "User ID: $ADMIN_USER_ID"
echo "Arquivo SQL: admin-setup-$ADMIN_USER_ID.sql"
echo ""
echo "⚠️  PRÓXIMOS PASSOS:"
echo "1. Copie o conteúdo acima"
echo "2. Vá para: https://supabase.com/dashboard/project/nrfketkwajzkmrlkvoyd/sql"
echo "3. Cole e execute"
echo "4. Login no app: $ADMIN_EMAIL / [sua senha]"
echo ""
echo "⚠️  NUNCA compartilhe o SERVICE_ROLE_KEY!"
