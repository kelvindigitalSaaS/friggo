-- =============================================================================
-- KAZA — SETUP BANCO DE DADOS (VERSÃO 3.1 — THE HYBRID HARMONY)
-- =============================================================================
-- Ajuste de ENUMs e Blindagem Total da Função de Onboarding.
-- =============================================================================

-- ═════════════════════════════════════════════════════════════════════════════
-- 1. CONFIGURAÇÃO DE TIPOS (ENUMS QUE VOCÊ SOLICITOU)
-- ═════════════════════════════════════════════════════════════════════════════

DO $$ BEGIN
  -- Criar o tipo se não existir
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subscription_plan') THEN
    CREATE TYPE public.subscription_plan AS ENUM ('trial', 'individual', 'multi');
  END IF;
  
  -- Adicionar valores com segurança
  IF NOT EXISTS (SELECT 1 FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid WHERE t.typname = 'subscription_plan' AND e.enumlabel = 'trial') THEN
    ALTER TYPE public.subscription_plan ADD VALUE 'trial';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid WHERE t.typname = 'subscription_plan' AND e.enumlabel = 'individual') THEN
    ALTER TYPE public.subscription_plan ADD VALUE 'individual';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid WHERE t.typname = 'subscription_plan' AND e.enumlabel = 'multi') THEN
    ALTER TYPE public.subscription_plan ADD VALUE 'multi';
  END IF;
  -- Adicionar os valores PRO para retrocompatibilidade com o frontend atual
  IF NOT EXISTS (SELECT 1 FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid WHERE t.typname = 'subscription_plan' AND e.enumlabel = 'individualPRO') THEN
    ALTER TYPE public.subscription_plan ADD VALUE 'individualPRO';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid WHERE t.typname = 'subscription_plan' AND e.enumlabel = 'multiPRO') THEN
    ALTER TYPE public.subscription_plan ADD VALUE 'multiPRO';
  END IF;
END $$;

-- ═════════════════════════════════════════════════════════════════════════════
-- 2. MIGRAÇÃO FORÇADA PARA TEXTO (OPCIONAL MAS RECOMENDADO PARA ESTABILIDADE)
-- ═════════════════════════════════════════════════════════════════════════════

DROP VIEW IF EXISTS public.v_user_access CASCADE;

DO $$ BEGIN
  ALTER TABLE public.subscriptions ALTER COLUMN plan TYPE TEXT USING (plan::TEXT);
  ALTER TABLE public.homes ALTER COLUMN home_type TYPE TEXT USING (home_type::TEXT);
EXCEPTION WHEN OTHERS THEN 
  RAISE NOTICE 'Aviso: As colunas já são texto ou estão bloqueadas. Usaremos Casting dinâmico.';
END $$;

-- ═════════════════════════════════════════════════════════════════════════════
-- 3. FUNÇÃO DE ONBOARDING CORRIGIDA E BLINDADA
-- ═════════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.complete_user_onboarding(
  p_home_name           TEXT,
  p_user_name           TEXT,
  p_user_cpf            TEXT,
  p_selected_plan       TEXT DEFAULT 'multiPRO',
  p_home_type           TEXT DEFAULT 'apartment',
  p_residents           INT DEFAULT 1,
  p_fridge_type         TEXT DEFAULT 'regular',
  p_fridge_brand        TEXT DEFAULT NULL,
  p_cooling_level       INT DEFAULT 3,
  p_theme_preference    TEXT DEFAULT 'system',
  p_language_preference TEXT DEFAULT 'pt-BR'
)
RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_home_id UUID;
  v_group_id UUID;
  v_existing_home_id UUID;
BEGIN
  -- 1. Validação de CPF
  IF EXISTS (SELECT 1 FROM public.profiles WHERE cpf = p_user_cpf AND user_id != v_user_id) THEN
     RAISE EXCEPTION 'CPF já cadastrado em outra conta.' USING ERRCODE = '23505';
  END IF;

  -- 2. Gestão de Casa (Uso de TRY-CATCH Inteligente)
  SELECT home_id INTO v_existing_home_id FROM public.home_members WHERE user_id = v_user_id LIMIT 1;
  
  IF v_existing_home_id IS NOT NULL THEN
    v_home_id := v_existing_home_id;
    BEGIN
      UPDATE public.homes SET name = p_home_name, home_type = p_home_type::public.home_type, residents = p_residents WHERE id = v_home_id;
    EXCEPTION WHEN OTHERS THEN
      UPDATE public.homes SET name = p_home_name, home_type = p_home_type, residents = p_residents WHERE id = v_home_id;
    END;
  ELSE
    BEGIN
      INSERT INTO public.homes (name, owner_user_id, home_type, residents)
      VALUES (p_home_name, v_user_id, p_home_type::public.home_type, p_residents) RETURNING id INTO v_home_id;
    EXCEPTION WHEN OTHERS THEN
      INSERT INTO public.homes (name, owner_user_id, home_type, residents)
      VALUES (p_home_name, v_user_id, p_home_type, p_residents) RETURNING id INTO v_home_id;
    END;
    INSERT INTO public.home_members (home_id, user_id, role) VALUES (v_home_id, v_user_id, 'owner') ON CONFLICT DO NOTHING;
  END IF;

  -- 3. Configurações Dinâmicas
  BEGIN
    INSERT INTO public.home_settings (home_id, fridge_type, fridge_brand, cooling_level)
    VALUES (v_home_id, p_fridge_type::public.fridge_type, p_fridge_brand, p_cooling_level)
    ON CONFLICT (home_id) DO UPDATE SET fridge_type = EXCLUDED.fridge_type, cooling_level = EXCLUDED.cooling_level;
  EXCEPTION WHEN OTHERS THEN
    INSERT INTO public.home_settings (home_id, fridge_type, fridge_brand, cooling_level)
    VALUES (v_home_id, p_fridge_type, p_fridge_brand, p_cooling_level)
    ON CONFLICT (home_id) DO UPDATE SET fridge_type = EXCLUDED.fridge_type, cooling_level = EXCLUDED.cooling_level;
  END;

  -- 4. SaaS e Assinaturas (Corrigido: Fallback sem Cast)
  INSERT INTO public.sub_account_groups (master_user_id, plan_tier, max_members)
  VALUES (v_user_id, p_selected_plan, CASE WHEN p_selected_plan = 'multiPRO' THEN 3 ELSE 1 END)
  ON CONFLICT (master_user_id) DO UPDATE SET plan_tier = EXCLUDED.plan_tier RETURNING id INTO v_group_id;
  
  BEGIN
    INSERT INTO public.subscriptions (user_id, plan, plan_tier, is_active, trial_ends_at, group_id)
    VALUES (v_user_id, p_selected_plan::public.subscription_plan, p_selected_plan, true, now() + interval '7 days', v_group_id)
    ON CONFLICT (user_id) DO UPDATE SET is_active = true, trial_ends_at = EXCLUDED.trial_ends_at, group_id = v_group_id;
  EXCEPTION WHEN OTHERS THEN
    -- Fallback: Insere como texto puro se o ENUM falhar
    INSERT INTO public.subscriptions (user_id, plan, plan_tier, is_active, trial_ends_at, group_id)
    VALUES (v_user_id, p_selected_plan, p_selected_plan, true, now() + interval '7 days', v_group_id)
    ON CONFLICT (user_id) DO UPDATE SET is_active = true, trial_ends_at = EXCLUDED.trial_ends_at, group_id = v_group_id;
  END;

  -- 5. Finalização de Perfil
  UPDATE public.profiles SET 
    name = p_user_name, cpf = p_user_cpf, 
    onboarding_completed = true, theme_preference = p_theme_preference
  WHERE user_id = v_user_id;

  RETURN v_home_id;
END; $$;

-- ═════════════════════════════════════════════════════════════════════════════
-- 4. VIEW DE DASHBOARD (COMPATIBILIDADE TOTAL)
-- ═════════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE VIEW public.v_user_access WITH (security_invoker = true) AS
SELECT 
    p.user_id, 
    COALESCE(s.plan_tier, 'free') as plan_tier, 
    COALESCE(s.is_active, false) as is_active, 
    s.trial_ends_at, 
    (COALESCE(s.trial_ends_at, now() - interval '1 day') > now()) AS in_trial,
    (COALESCE(s.is_active, false) = true OR COALESCE(s.trial_ends_at, now() - interval '1 day') > now()) AS has_access,
    GREATEST(0, EXTRACT(DAY FROM s.trial_ends_at - now()))::INT AS trial_days_left,
    (COALESCE(s.trial_ends_at, now()) < now() + interval '2 days') AS billing_soon
FROM public.profiles p 
LEFT JOIN public.subscriptions s ON s.user_id = p.user_id;

GRANT SELECT ON public.v_user_access TO authenticated;
GRANT EXECUTE ON FUNCTION public.complete_user_onboarding TO authenticated;
NOTIFY pgrst, 'reload schema';
