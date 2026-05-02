-- =============================================================================
-- Add check_cpf_availability RPC function
-- Data: 2026-04-30
--
-- Função para verificar se um CPF está disponível (não cadastrado).
-- Retorna TRUE se CPF está disponível, FALSE se já existe
-- =============================================================================

BEGIN;

CREATE OR REPLACE FUNCTION public.check_cpf_availability(p_cpf text)
RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_exists boolean;
BEGIN
  -- Verifica se CPF já está cadastrado em outro usuário
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE cpf = p_cpf
      AND cpf IS NOT NULL
      AND user_id <> auth.uid()  -- Permite que o usuário atual atualize seu próprio CPF
  ) INTO v_exists;

  -- Retorna TRUE se CPF está DISPONÍVEL (não existe), FALSE se já está cadastrado
  RETURN NOT v_exists;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING '[KAZA check_cpf_availability] Erro: % — %', SQLSTATE, SQLERRM;
  RETURN false;
END;
$$;

DO $$
BEGIN
  RAISE NOTICE '=================================================';
  RAISE NOTICE '[KAZA] Fix 20260430000002 aplicado com sucesso.';
  RAISE NOTICE '  ✅ check_cpf_availability RPC criada/atualizada';
  RAISE NOTICE '  ✅ Verifica disponibilidade de CPF para novo usuário';
  RAISE NOTICE '=================================================';
END $$;

COMMIT;
