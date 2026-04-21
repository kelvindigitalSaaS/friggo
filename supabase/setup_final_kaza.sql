-- =============================================================================
-- KAZA — SETUP COMPLETO DO BANCO DE DADOS (VERSÃO FINAL)
-- =============================================================================
-- Este arquivo consolida todas as funções, triggers e políticas necessárias
-- para o funcionamento do Kaza SaaS: Onboarding, Assinaturas e Segurança.
-- =============================================================================

BEGIN;

-- ═════════════════════════════════════════════════════════════════════════════
-- 1. EXTENSÕES E SCHEMAS
-- ═════════════════════════════════════════════════════════════════════════════
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═════════════════════════════════════════════════════════════════════════════
-- 2. GESTÃO DE PERFIS E AUTOCADASTRO (GOOGLE/EMAIL)
-- ═════════════════════════════════════════════════════════════════════════════

-- Função para criar automaticamente o perfil do usuário após o signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, onboarding_completed, plan_type, subscription_status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Usuário Kaza'),
    false,
    'free',
    'trialing'
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger disparado após inserção em auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Adicionar coluna de controle de rate limit se não existir
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'profiles' AND COLUMN_NAME = 'last_onboarding_attempt') THEN
    ALTER TABLE public.profiles ADD COLUMN last_onboarding_attempt TIMESTAMPTZ;
  END IF;
END $$;

-- ═════════════════════════════════════════════════════════════════════════════
-- 3. RPC DE ONBOARDING ATÔMICO (COM RATE LIMITING)
-- ═════════════════════════════════════════════════════════════════════════════
-- Realiza todo o setup inicial (Casa, Geladeira, Preferências) em uma única transação.

CREATE OR REPLACE FUNCTION public.complete_user_onboarding(
  p_home_name           TEXT,
  p_user_name           TEXT,
  p_user_cpf            TEXT,
  p_home_type           TEXT DEFAULT 'apartment',
  p_residents           INT DEFAULT 1,
  p_fridge_type         TEXT DEFAULT 'regular',
  p_fridge_brand        TEXT DEFAULT NULL,
  p_cooling_level       INT DEFAULT 3,
  p_theme_preference    TEXT DEFAULT 'system',
  p_language_preference TEXT DEFAULT 'pt-BR'
)
RETURNS UUID AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_home_id UUID;
  v_existing_home_id UUID;
  v_last_attempt TIMESTAMPTZ;
BEGIN
  -- Verificação de Rate Limit (Proteção contra spam de requisições)
  SELECT last_onboarding_attempt INTO v_last_attempt
  FROM public.profiles
  WHERE user_id = v_user_id;

  IF v_last_attempt IS NOT NULL AND (now() - v_last_attempt) < interval '10 seconds' THEN
    RAISE EXCEPTION 'Muitas requisições. Aguarde 10 segundos entre tentativas.' USING ERRCODE = 'P0001';
  END IF;

  -- Atualizar timestamp da última tentativa
  UPDATE public.profiles SET last_onboarding_attempt = now() WHERE user_id = v_user_id;

  -- Validações de entrada
  IF length(p_home_name) < 2 THEN
    RAISE EXCEPTION 'O nome da casa deve ter pelo menos 2 caracteres.' USING ERRCODE = 'P0002';
  END IF;

  -- 1. Verificar se o usuário já possui vínculo com alguma casa
  SELECT home_id INTO v_existing_home_id
  FROM public.home_members
  WHERE user_id = v_user_id
  LIMIT 1;

  -- 2. Criar ou Atualizar a Casa
  IF v_existing_home_id IS NOT NULL THEN
    v_home_id := v_existing_home_id;
    
    UPDATE public.homes 
    SET name = p_home_name,
        home_type = p_home_type::home_type,
        residents = p_residents
    WHERE id = v_home_id;
  ELSE
    INSERT INTO public.homes (name, owner_user_id, home_type, residents)
    VALUES (p_home_name, v_user_id, p_home_type::home_type, p_residents)
    RETURNING id INTO v_home_id;

    -- Vincular o Usuário como Proprietário (Owner)
    INSERT INTO public.home_members (home_id, user_id, role)
    VALUES (v_home_id, v_user_id, 'owner')
    ON CONFLICT (home_id, user_id) DO NOTHING;
  END IF;

  -- 3. Configurações da Geladeira / Lar
  INSERT INTO public.home_settings (home_id, fridge_type, fridge_brand, cooling_level)
  VALUES (v_home_id, p_fridge_type::fridge_type, p_fridge_brand, p_cooling_level)
  ON CONFLICT (home_id) DO UPDATE
    SET fridge_type = p_fridge_type::fridge_type,
        fridge_brand = p_fridge_brand,
        cooling_level = p_cooling_level;

  -- 4. Preferências de Notificação
  INSERT INTO public.notification_preferences (user_id)
  VALUES (v_user_id)
  ON CONFLICT (user_id) DO NOTHING;

  -- 5. Atualizar Perfil Final
  UPDATE public.profiles
  SET name = p_user_name,
      cpf = p_user_cpf,
      theme_preference = p_theme_preference,
      language_preference = p_language_preference,
      onboarding_completed = true,
      last_onboarding_attempt = NULL -- Resetar após sucesso
  WHERE user_id = v_user_id;

  RETURN v_home_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ═════════════════════════════════════════════════════════════════════════════
-- 4. BLINDAGEM DE SEGURANÇA E BACKUPS (POLÍTICAS RLS)
-- ═════════════════════════════════════════════════════════════════════════════

-- Bloquear acesso público/direto a qualquer tabela de backup
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN (
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename LIKE '%backup%'
  )
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', r.tablename);
    EXECUTE format('DROP POLICY IF EXISTS backup_deny_all ON public.%I', r.tablename);
    EXECUTE format('CREATE POLICY backup_deny_all ON public.%I FOR ALL USING (false)', r.tablename);
  END LOOP;
END $$;

-- ═════════════════════════════════════════════════════════════════════════════
-- 5. POLÍTICAS DE ASSINATURA (SAAS)
-- ═════════════════════════════════════════════════════════════════════════════

-- Política para permitir que o usuário veja sua própria assinatura
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuários podem ver suas próprias assinaturas" ON public.subscriptions;
CREATE POLICY "Usuários podem ver suas próprias assinaturas"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Permitir que o mestre do grupo veja assinaturas dos membros (se necessário)
DROP POLICY IF EXISTS "Mestres podem ver assinaturas do grupo" ON public.subscriptions;
CREATE POLICY "Mestres podem ver assinaturas do grupo"
  ON public.subscriptions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.sub_account_members
      WHERE user_id = auth.uid() AND group_id = subscriptions.group_id
    )
  );

COMMIT;
