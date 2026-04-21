-- =============================================================================
-- KAZA — MIGRATION 20260421000000: SECURE ONBOARDING & ZERO LEAKAGE
-- =============================================================================
-- Objetivo: Automação de cadastro via Google, Onboarding Atômico e Blindagem.
-- =============================================================================

BEGIN;

-- ═════════════════════════════════════════════════════════════════════════════
-- 1. GATILHO DE AUTOCADASTRO (GOOGLE AUTH)
-- ═════════════════════════════════════════════════════════════════════════════
-- Cria o perfil automaticamente quando o usuário loga via OAuth/Email.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, onboarding_completed)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Usuário Kaza'),
    false
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Garantir que o trigger exista
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ═════════════════════════════════════════════════════════════════════════════
-- 2. RPC DE ONBOARDING ATÔMICO (ESTRUTURA ÚNICA)
-- ═════════════════════════════════════════════════════════════════════════════
-- Executa todo o setup inicial em uma única transação protegida.

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
BEGIN
  -- 1. Validar se o usuário já tem uma casa vinculada (Evitar Estruturas Repetidas)
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
      onboarding_completed = true
  WHERE user_id = v_user_id;

  RETURN v_home_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ═════════════════════════════════════════════════════════════════════════════
-- 3. BLINDAGEM DE BACKUPS (ZERO LEAKAGE)
-- ═════════════════════════════════════════════════════════════════════════════

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

COMMIT;
