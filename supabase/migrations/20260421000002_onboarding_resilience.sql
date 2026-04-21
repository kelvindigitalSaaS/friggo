-- =============================================================================
-- KAZA — MIGRATION 20260421000002: ONBOARDING RESILIENCE & RATE LIMITING
-- =============================================================================

BEGIN;

-- 1. Adicionar coluna de controle de rate limit no perfil se não existir
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'profiles' AND COLUMN_NAME = 'last_onboarding_attempt') THEN
    ALTER TABLE public.profiles ADD COLUMN last_onboarding_attempt TIMESTAMPTZ;
  END IF;
END $$;

-- 2. Atualizar RPC com Rate Limiting e Validação
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
  -- Rate Limit Check (Cooldown de 10 segundos para evitar spam)
  SELECT last_onboarding_attempt INTO v_last_attempt
  FROM public.profiles
  WHERE user_id = v_user_id;

  IF v_last_attempt IS NOT NULL AND (now() - v_last_attempt) < interval '10 seconds' THEN
    RAISE EXCEPTION 'Muitas requisições. Aguarde alguns segundos entre tentativas.' USING ERRCODE = 'P0001';
  END IF;

  -- Atualizar timestamp da tentativa
  UPDATE public.profiles SET last_onboarding_attempt = now() WHERE user_id = v_user_id;

  -- Validação básica
  IF length(p_home_name) < 2 THEN
    RAISE EXCEPTION 'Nome da casa muito curto.' USING ERRCODE = 'P0002';
  END IF;

  -- 1. Validar se o usuário já tem uma casa vinculada
  SELECT home_id INTO v_existing_home_id
  FROM public.home_members
  WHERE user_id = v_user_id
  LIMIT 1;

  -- 2. Criar ou Obter a Casa
  IF v_existing_home_id IS NOT NULL THEN
    v_home_id := v_existing_home_id;
    
    UPDATE public.homes 
    SET name = p_home_name,
        home_type = p_home_type,
        residents = p_residents
    WHERE id = v_home_id;
  ELSE
    INSERT INTO public.homes (name, owner_user_id, home_type, residents)
    VALUES (p_home_name, v_user_id, p_home_type, p_residents)
    RETURNING id INTO v_home_id;

    -- Vincular o Usuário como Owner
    INSERT INTO public.home_members (home_id, user_id, role)
    VALUES (v_home_id, v_user_id, 'owner')
    ON CONFLICT (home_id, user_id) DO NOTHING;
  END IF;

  -- 3. Criar/Atualizar Configurações da Geladeira
  INSERT INTO public.home_settings (home_id, fridge_type, fridge_brand, cooling_level)
  VALUES (v_home_id, p_fridge_type, p_fridge_brand, p_cooling_level)
  ON CONFLICT (home_id) DO UPDATE
    SET fridge_type = p_fridge_type,
        fridge_brand = p_fridge_brand,
        cooling_level = p_cooling_level;

  -- 4. Criar Preferências de Notificação
  INSERT INTO public.notification_preferences (user_id)
  VALUES (v_user_id)
  ON CONFLICT (user_id) DO NOTHING;

  -- 5. Atualizar Perfil e Marcar como Concluído
  UPDATE public.profiles
  SET name = p_user_name,
      cpf = p_user_cpf,
      theme_preference = p_theme_preference,
      language_preference = p_language_preference,
      onboarding_completed = true,
      last_onboarding_attempt = NULL -- Reset após sucesso
  WHERE user_id = v_user_id;

  RETURN v_home_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMIT;
