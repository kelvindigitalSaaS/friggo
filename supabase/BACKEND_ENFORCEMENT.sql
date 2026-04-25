-- =============================================================================
-- KAZA — Backend enforcement: item limits + session cleanup cron
-- =============================================================================
-- Execução: Supabase Dashboard > SQL Editor
-- =============================================================================

BEGIN;

-- =============================================================================
-- 1. FUNÇÃO auxiliar: resolve o user_id do dono da casa
-- =============================================================================

CREATE OR REPLACE FUNCTION public.get_home_owner_id(p_home_id uuid, p_fallback_user_id uuid)
RETURNS uuid LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT COALESCE(
    (SELECT hm.user_id FROM public.home_members hm
     WHERE hm.home_id = p_home_id AND hm.role = 'owner'
     LIMIT 1),
    p_fallback_user_id
  );
$$;

-- =============================================================================
-- 2. TRIGGER: bloqueia inserção de itens se acesso revogado (trial expirado sem plano)
-- =============================================================================
-- Modelo de negócio: trial 7 dias (ilimitado) → paga PRO (ilimitado) ou TRAVA.
-- Não existe plano free com limite parcial — é tudo ou nada.

CREATE OR REPLACE FUNCTION public.check_item_access()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_owner_id  uuid;
  v_access    boolean;
BEGIN
  v_owner_id := public.get_home_owner_id(NEW.home_id, NEW.user_id);

  SELECT has_access INTO v_access
  FROM public.v_user_access
  WHERE user_id = v_owner_id;

  -- Se a view não existir ou não retornar, libera (fail-open para não travar onboarding)
  IF v_access IS NULL THEN
    RETURN NEW;
  END IF;

  IF NOT v_access THEN
    RAISE EXCEPTION 'Acesso encerrado. Assine um plano Kaza para continuar adicionando itens.'
      USING ERRCODE = 'P0001';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_check_item_access ON public.items;
CREATE TRIGGER trigger_check_item_access
  BEFORE INSERT ON public.items
  FOR EACH ROW
  EXECUTE FUNCTION public.check_item_access();

-- =============================================================================
-- 3. TRIGGER: bloqueia inserção na lista de compras se acesso revogado
-- =============================================================================

CREATE OR REPLACE FUNCTION public.check_shopping_access()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_owner_id  uuid;
  v_access    boolean;
BEGIN
  v_owner_id := public.get_home_owner_id(NEW.home_id, NEW.user_id);

  SELECT has_access INTO v_access
  FROM public.v_user_access
  WHERE user_id = v_owner_id;

  IF v_access IS NULL THEN RETURN NEW; END IF;

  IF NOT v_access THEN
    RAISE EXCEPTION 'Acesso encerrado. Assine um plano Kaza para continuar usando a lista de compras.'
      USING ERRCODE = 'P0001';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_check_shopping_access ON public.shopping_items;
CREATE TRIGGER trigger_check_shopping_access
  BEFORE INSERT ON public.shopping_items
  FOR EACH ROW
  EXECUTE FUNCTION public.check_shopping_access();

-- =============================================================================
-- 3. CRON: limpeza automática de sessões antigas
-- =============================================================================
-- Se pg_cron NÃO estiver habilitado este bloco é ignorado silenciosamente.
-- Para habilitar: Supabase Dashboard > Database > Extensions > pg_cron
-- Depois rode apenas o bloco abaixo separado:
--
--   SELECT cron.unschedule('cleanup_old_sessions') FROM cron.job
--     WHERE jobname = 'cleanup_old_sessions';
--   SELECT cron.schedule('cleanup_old_sessions','0 3 * * *',
--     $$ SELECT public.cleanup_old_sessions(); $$);

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.schemata WHERE schema_name = 'cron'
  ) THEN
    -- Remove job anterior se existir
    PERFORM cron.unschedule('cleanup_old_sessions')
    WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'cleanup_old_sessions');

    -- Agenda limpeza diária às 03:00 UTC
    PERFORM cron.schedule(
      'cleanup_old_sessions',
      '0 3 * * *',
      $cron$ SELECT public.cleanup_old_sessions(); $cron$
    );
    RAISE NOTICE 'pg_cron: job cleanup_old_sessions agendado.';
  ELSE
    RAISE NOTICE 'pg_cron não habilitado — ative em Database > Extensions para habilitar a limpeza automática de sessões.';
  END IF;
END;
$$;

-- =============================================================================
-- 4. VERIFICAÇÃO
-- =============================================================================

SELECT 'Triggers de limite configurados com sucesso.' AS status;

COMMIT;
