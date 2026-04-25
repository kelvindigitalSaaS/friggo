-- =============================================================================
-- KAZA — RESET SEGURO + CRIAR ADMIN (SEM VAZAR NO F12)
-- =============================================================================
-- Execução: Supabase Dashboard > SQL Editor > Cole tudo > Ctrl+Enter
-- IMPORTANTE: Este script apaga TODOS os dados. Faça backup antes!
-- =============================================================================

BEGIN;

-- =============================================================================
-- PARTE 1: RESETAR TODOS OS DADOS (order matters)
-- =============================================================================

-- Desabilitar RLS para evitar bloqueios
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('ALTER TABLE public.%I DISABLE ROW LEVEL SECURITY', r.tablename);
  END LOOP;
END $$;

-- Limpar todas as tabelas (em ordem de dependência reversa)
TRUNCATE TABLE public.payment_history CASCADE;
TRUNCATE TABLE public.subscriptions CASCADE;
TRUNCATE TABLE public.meal_plans CASCADE;
TRUNCATE TABLE public.item_history CASCADE;
TRUNCATE TABLE public.consumable_logs CASCADE;
TRUNCATE TABLE public.consumables CASCADE;
TRUNCATE TABLE public.shopping_items CASCADE;
TRUNCATE TABLE public.shopping_lists CASCADE;
TRUNCATE TABLE public.recipes CASCADE;
TRUNCATE TABLE public.notification_preferences CASCADE;
TRUNCATE TABLE public.garbage_reminders CASCADE;
TRUNCATE TABLE public.home_settings CASCADE;
TRUNCATE TABLE public.home_members CASCADE;
TRUNCATE TABLE public.homes CASCADE;
TRUNCATE TABLE public.profiles CASCADE;
TRUNCATE TABLE public.sub_account_invites CASCADE;
TRUNCATE TABLE public.sub_account_members CASCADE;
TRUNCATE TABLE public.sub_account_groups CASCADE;

-- Limpar usuários de autenticação (CAREFUL! Isto apaga TODOS os usuários)
DELETE FROM auth.users WHERE true;

COMMIT;

-- =============================================================================
-- PARTE 2: CRIAR CONTA ADMIN (Execute separadamente após COMMIT)
-- =============================================================================
--
-- OPÇÃO A: Usar Supabase Dashboard > Authentication > Add user manualmente
--          Email: admin@kaza.local
--          Senha: GenerateStrongPasswordHere123!@
--
-- OPÇÃO B: Usar cURL + API (mais seguro, sem vazar senha no console)
--
-- Exemplo com cURL (execute no terminal, não no F12):
--
-- curl -X POST "https://nrfketkwajzkmrlkvoyd.supabase.co/auth/v1/admin/users" \
--   -H "Authorization: Bearer [SEU_SERVICE_ROLE_KEY]" \
--   -H "Content-Type: application/json" \
--   -d '{
--     "email": "admin@kaza.local",
--     "password": "GenerateStrongPasswordHere123!@",
--     "email_confirm": true,
--     "user_metadata": {
--       "is_admin": true
--     }
--   }'
--
-- =============================================================================

-- Após criar o usuário via API acima, execute isto para completar o setup:

-- Aguarde 2-3 segundos para garantir que o usuário foi criado

-- Passo 1: Obter o user_id (adapte com o UUID real se necessário)
-- Você verá no retorno da API cURL o "id": "xxx-xxx-xxx"

-- Passo 2: Criar perfil admin
-- Substitua 'ADMIN_USER_ID_AQUI' pelo UUID do usuário criado acima

INSERT INTO public.profiles (
  user_id,
  name,
  cpf,
  plan_type,
  subscription_status,
  onboarding_completed
) VALUES (
  'ADMIN_USER_ID_AQUI'::uuid,  -- SUBSTITUIR AQUI
  'Admin KAZA',
  '00000000000',
  'premium',
  'active',
  true
);

-- Passo 3: Criar home padrão para admin
INSERT INTO public.homes (
  name,
  owner_user_id,
  home_type,
  residents
) VALUES (
  'Casa do Admin',
  'ADMIN_USER_ID_AQUI'::uuid,  -- SUBSTITUIR AQUI
  'house',
  1
) RETURNING id INTO TEMP admin_home_id;

-- Passo 4: Adicionar admin como owner da home
INSERT INTO public.home_members (
  home_id,
  user_id,
  role
) VALUES (
  (SELECT id FROM public.homes WHERE owner_user_id = 'ADMIN_USER_ID_AQUI'::uuid LIMIT 1),
  'ADMIN_USER_ID_AQUI'::uuid,  -- SUBSTITUIR AQUI
  'owner'
);

-- Passo 5: Criar subscription
INSERT INTO public.subscriptions (
  user_id,
  plan,
  plan_tier,
  is_active,
  trial_ends_at
) VALUES (
  'ADMIN_USER_ID_AQUI'::uuid,  -- SUBSTITUIR AQUI
  'premium',
  'premium',
  true,
  now() + interval '365 days'
);

-- Passo 6: Criar home_settings
INSERT INTO public.home_settings (
  home_id,
  fridge_type,
  cooling_level
) VALUES (
  (SELECT id FROM public.homes WHERE owner_user_id = 'ADMIN_USER_ID_AQUI'::uuid LIMIT 1),
  'regular',
  3
);

-- =============================================================================
-- CONFIRMAR
-- =============================================================================
-- Verificar se foi criado corretamente:
SELECT
  p.user_id,
  p.name,
  h.name as home_name,
  s.plan_tier
FROM public.profiles p
LEFT JOIN public.homes h ON h.owner_user_id = p.user_id
LEFT JOIN public.subscriptions s ON s.user_id = p.user_id
WHERE p.user_id = 'ADMIN_USER_ID_AQUI'::uuid;

