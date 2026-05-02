-- =============================================================================
-- KAZA — Fix three critical bugs
-- Data: 2026-05-02
--
-- 1. remove_member_and_convert_to_master: homes INSERT usava user_id (não existe),
--    correto é owner_user_id.
-- 2. complete_user_onboarding: profiles UPDATE não setava onboarding_completed = true,
--    fazendo o app redirecionar para onboarding a cada reload.
-- =============================================================================

BEGIN;

-- ── 0. UNIQUE (home_id, name) em consumables para permitir upsert seguro ──────
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'consumables_home_id_name_key'
      AND conrelid = 'public.consumables'::regclass
  ) THEN
    -- Remover duplicatas mantendo o mais recente por home_id+name
    DELETE FROM public.consumables c
    WHERE ctid NOT IN (
      SELECT DISTINCT ON (home_id, name) ctid
      FROM public.consumables
      WHERE home_id IS NOT NULL AND name IS NOT NULL
      ORDER BY home_id, name, created_at DESC NULLS LAST
    );

    ALTER TABLE public.consumables
      ADD CONSTRAINT consumables_home_id_name_key UNIQUE (home_id, name);

    RAISE NOTICE '[KAZA] UNIQUE (home_id, name) adicionado em consumables';
  ELSE
    RAISE NOTICE '[KAZA] Constraint consumables_home_id_name_key já existe';
  END IF;
END $$;

-- ── 1. Fix remove_member_and_convert_to_master ────────────────────────────────
CREATE OR REPLACE FUNCTION public.remove_member_and_convert_to_master(
  p_member_user_id uuid,
  p_group_id uuid
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_master_user_id uuid;
  v_master_home_id uuid;
  v_new_home_id    uuid;
BEGIN
  SELECT sag.master_user_id, hm.home_id
  INTO v_master_user_id, v_master_home_id
  FROM sub_account_groups sag
  LEFT JOIN home_members hm
    ON hm.user_id = sag.master_user_id AND hm.role = 'owner'
  WHERE sag.id = p_group_id
  LIMIT 1;

  IF v_master_user_id IS NULL THEN
    RETURN json_build_object('error', 'Group not found');
  END IF;

  IF auth.uid() != v_master_user_id THEN
    RETURN json_build_object('error', 'Not authorized');
  END IF;

  -- 1. Remove from sub_account_members
  DELETE FROM sub_account_members
  WHERE user_id = p_member_user_id AND group_id = p_group_id;

  -- 2. Remove from master's home_members
  DELETE FROM home_members
  WHERE user_id = p_member_user_id AND home_id = v_master_home_id;

  -- 3. Create new independent home (FIXED: owner_user_id, não user_id)
  INSERT INTO homes (owner_user_id, name, created_at)
  VALUES (
    p_member_user_id,
    (SELECT COALESCE(name, 'Meu Lar') FROM profiles WHERE user_id = p_member_user_id LIMIT 1),
    now()
  )
  RETURNING id INTO v_new_home_id;

  -- 4. Add as OWNER of new home
  INSERT INTO home_members (home_id, user_id, role, joined_at)
  VALUES (v_new_home_id, p_member_user_id, 'owner', now())
  ON CONFLICT (home_id, user_id) DO NOTHING;

  -- 5. Independent subscription
  INSERT INTO subscriptions (user_id, plan_tier, plan_label, plan, is_active, created_at)
  VALUES (p_member_user_id, 'individualPRO', 'IndividualPRO', 'free', false, now())
  ON CONFLICT (user_id) DO UPDATE
  SET
    plan_tier      = 'individualPRO',
    plan_label     = 'IndividualPRO',
    plan           = 'free',
    is_active      = false,
    group_id       = NULL,
    master_user_id = NULL;

  -- 6. Reset achievements
  DELETE FROM user_achievements WHERE user_id = p_member_user_id;
  INSERT INTO user_achievements (user_id, unlocked)
  VALUES (p_member_user_id, '{}'::jsonb)
  ON CONFLICT (user_id) DO UPDATE SET unlocked = '{}'::jsonb;

  -- 7. Timestamp group
  UPDATE sub_account_groups SET updated_at = now() WHERE id = p_group_id;

  RETURN json_build_object(
    'success',     true,
    'new_home_id', v_new_home_id,
    'message',     'Member converted to independent master account'
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.remove_member_and_convert_to_master(uuid, uuid) TO authenticated;

-- ── 2. Fix complete_user_onboarding — adicionar onboarding_completed = true ──
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
  -- Detectar se é sub-conta ativa
  SELECT EXISTS (
    SELECT 1 FROM public.sub_account_members
    WHERE user_id = v_user_id AND is_active = true
  ) INTO v_is_sub;

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
      v_home_id := v_master_home;
      INSERT INTO public.home_members (home_id, user_id, role, is_active)
      VALUES (v_home_id, v_user_id, 'member', true)
      ON CONFLICT (home_id, user_id) DO UPDATE
        SET is_active = true, role = 'member';
    END IF;
  END IF;

  IF v_home_id IS NULL THEN
    SELECT home_id INTO v_owned_home
    FROM public.home_members
    WHERE user_id    = v_user_id
      AND role::text = 'owner'
      AND is_active  = true
    LIMIT 1;

    IF v_owned_home IS NOT NULL THEN
      v_home_id := v_owned_home;
      UPDATE public.homes
      SET name      = p_home_name,
          home_type = p_home_type,
          residents = p_residents
      WHERE id = v_home_id;
    ELSE
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

  -- Preferências de notificação
  INSERT INTO public.notification_preferences (user_id, home_id)
  VALUES (v_user_id, v_home_id)
  ON CONFLICT (user_id) DO UPDATE
    SET home_id = EXCLUDED.home_id;

  -- Garantir subscription
  INSERT INTO public.subscriptions (
    user_id, plan, plan_tier, is_active,
    trial_started_at, trial_ends_at
  )
  VALUES (v_user_id, 'free', 'free', false, now(), now() + interval '7 days')
  ON CONFLICT (user_id) DO NOTHING;

  -- FIXED: agora seta onboarding_completed = true
  UPDATE public.profiles
  SET name                 = p_user_name,
      onboarding_completed = true,
      cpf = CASE
              WHEN p_user_cpf IS NOT NULL AND p_user_cpf <> ''
                   AND (cpf IS NULL OR cpf = '')
              THEN p_user_cpf
              ELSE cpf
            END,
      theme_preference    = p_theme_preference,
      language_preference = p_language_preference,
      updated_at          = now()
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
  RAISE NOTICE '[KAZA] Fix 20260502000001 aplicado com sucesso.';
  RAISE NOTICE '  ✅ consumables: UNIQUE (home_id, name) adicionado';
  RAISE NOTICE '  ✅ remove_member_and_convert_to_master: owner_user_id corrigido';
  RAISE NOTICE '  ✅ complete_user_onboarding: onboarding_completed = true adicionado';
  RAISE NOTICE '=================================================';
END $$;

COMMIT;
