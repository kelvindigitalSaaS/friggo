-- =============================================================================
-- Fix notification_preferences INSERT in complete_user_onboarding
-- Data: 2026-04-30
--
-- Problema: complete_user_onboarding estava inserindo em notification_preferences
-- sem home_id, mas a tabela tem constraint NOT NULL em home_id.
-- Erro: "null value in column \"home_id\" violates not-null constraint"
--
-- Solução: Atualizar INSERT para incluir v_home_id
-- =============================================================================

BEGIN;

CREATE OR REPLACE FUNCTION public.complete_user_onboarding(
  p_home_name           text,
  p_user_name           text,
  p_user_cpf            text    DEFAULT NULL,
  p_home_type           text    DEFAULT 'apartment',
  p_residents           int     DEFAULT 1,
  p_fridge_type         text    DEFAULT 'regular',
  p_fridge_brand        text    DEFAULT NULL,
  p_cooling_level       int     DEFAULT 3,
  p_theme_preference    text    DEFAULT 'system',
  p_language_preference text    DEFAULT 'pt-BR'
)
RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_user_id    uuid := auth.uid();
  v_home_id    uuid;
  v_owned_home uuid;
  v_is_sub     boolean;
  v_master_home uuid;
  v_master_id  uuid;
BEGIN
  -- Detectar se é sub-conta ativa de outro master
  SELECT EXISTS (
    SELECT 1 FROM public.sub_account_members
    WHERE user_id = v_user_id AND is_active = true
  ) INTO v_is_sub;

  -- Se é sub-conta, buscar home_id do master
  IF v_is_sub THEN
    SELECT hm.home_id, sag.master_user_id
    INTO v_master_home, v_master_id
    FROM public.sub_account_members sam
    JOIN public.sub_account_groups sag ON sam.group_id = sag.id
    JOIN public.home_members hm ON hm.user_id = sag.master_user_id
      AND hm.role::text = 'owner'
      AND hm.is_active = true
    WHERE sam.user_id = v_user_id
      AND sam.is_active = true
    LIMIT 1;

    IF v_master_home IS NOT NULL THEN
      -- Vincular sub-conta à casa do master
      v_home_id := v_master_home;
      INSERT INTO public.home_members (home_id, user_id, role, is_active)
      VALUES (v_home_id, v_user_id, 'member', true)
      ON CONFLICT (home_id, user_id) DO UPDATE
        SET is_active = true, role = 'member';
    END IF;
  END IF;

  -- Se não é sub-conta ou não encontrou home do master, usar lógica normal
  IF v_home_id IS NULL THEN
    -- Buscar casa que o próprio usuário é OWNER
    SELECT home_id INTO v_owned_home
    FROM public.home_members
    WHERE user_id    = v_user_id
      AND role::text = 'owner'
      AND is_active  = true
    LIMIT 1;

    IF v_owned_home IS NOT NULL THEN
      -- Usuário já é owner: atualiza a casa existente (re-onboarding)
      v_home_id := v_owned_home;
      UPDATE public.homes
      SET name      = p_home_name,
          home_type = p_home_type,
          residents = p_residents
      WHERE id = v_home_id;

    ELSE
      -- Usuário novo sem casa: criar casa e vincular como owner
      INSERT INTO public.homes (name, owner_user_id, home_type, residents)
      VALUES (p_home_name, v_user_id, p_home_type, p_residents)
      RETURNING id INTO v_home_id;

      INSERT INTO public.home_members (home_id, user_id, role, is_active)
      VALUES (v_home_id, v_user_id, 'owner', true)
      ON CONFLICT (home_id, user_id) DO NOTHING;
    END IF;
  END IF;

  -- Configurações da geladeira
  INSERT INTO public.home_settings (home_id, fridge_type, fridge_brand, cooling_level)
  VALUES (v_home_id, p_fridge_type, p_fridge_brand, p_cooling_level)
  ON CONFLICT (home_id) DO UPDATE
    SET fridge_type   = EXCLUDED.fridge_type,
        fridge_brand  = EXCLUDED.fridge_brand,
        cooling_level = EXCLUDED.cooling_level;

  -- ⚠️ FIXED: Agora inclui home_id (obrigatório)
  INSERT INTO public.notification_preferences (user_id, home_id)
  VALUES (v_user_id, v_home_id)
  ON CONFLICT (user_id) DO UPDATE
    SET home_id = EXCLUDED.home_id;

  -- Garantir linha de subscription
  INSERT INTO public.subscriptions (
    user_id, plan, plan_tier, is_active,
    trial_started_at, trial_ends_at
  )
  VALUES (v_user_id, 'free', 'free', false, now(), now() + interval '7 days')
  ON CONFLICT (user_id) DO NOTHING;

  -- Atualizar perfil (nome sempre editável; CPF só na primeira vez)
  UPDATE public.profiles
  SET name = p_user_name,
      cpf  = CASE
               WHEN p_user_cpf IS NOT NULL AND p_user_cpf <> ''
                    AND (cpf IS NULL OR cpf = '')
               THEN p_user_cpf
               ELSE cpf
             END,
      theme_preference    = p_theme_preference,
      language_preference = p_language_preference,
      updated_at = now()
  WHERE user_id = v_user_id;

  RAISE NOTICE '[KAZA] Onboarding concluído para user % com home %', v_user_id, v_home_id;
  RETURN v_home_id;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING '[KAZA complete_user_onboarding] Erro: % — %', SQLSTATE, SQLERRM;
  RAISE;
END;
$$;

DO $$
BEGIN
  RAISE NOTICE '=================================================';
  RAISE NOTICE '[KAZA] Fix 20260430000001 aplicado com sucesso.';
  RAISE NOTICE '  ✅ notification_preferences INSERT agora inclui home_id';
  RAISE NOTICE '  ✅ ON CONFLICT DO UPDATE garante home_id sempre preenchido';
  RAISE NOTICE '=================================================';
END $$;

COMMIT;
