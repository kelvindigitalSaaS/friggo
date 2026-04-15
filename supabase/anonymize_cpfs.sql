-- anonymize_cpfs.sql
-- Backup and anonymize CPFs in `profile_sensitive` and `profiles`.
-- WARNING: This permanently sets CPF fields to NULL in the live database.
-- Run only if you intend to remove personally-identifying CPFs. A backup table is created.

-- 1) Create backup tables (if not exist) and copy current data
CREATE TABLE IF NOT EXISTS public.profile_sensitive_backup (LIKE public.profile_sensitive INCLUDING ALL);
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='profile_sensitive_backup' AND column_name='backup_created_at'
  ) THEN
    ALTER TABLE public.profile_sensitive_backup ADD COLUMN backup_created_at TIMESTAMP WITH TIME ZONE DEFAULT now();
  END IF;
END $$;

INSERT INTO public.profile_sensitive_backup (id, user_id, cpf, updated_at, backup_created_at)
SELECT id, user_id, cpf, updated_at, now()
FROM public.profile_sensitive;

-- Backup profiles if exists
CREATE TABLE IF NOT EXISTS public.profiles_backup (LIKE public.profiles INCLUDING ALL);
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='profiles_backup' AND column_name='backup_created_at'
  ) THEN
    BEGIN
      ALTER TABLE public.profiles_backup ADD COLUMN backup_created_at TIMESTAMP WITH TIME ZONE DEFAULT now();
    EXCEPTION WHEN undefined_table THEN
      -- profiles might not exist yet; ignore
      NULL;
    END;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='profiles') THEN
    INSERT INTO public.profiles_backup
    SELECT *, now() AS backup_created_at
    FROM public.profiles;
  END IF;
END $$;

-- 2) Remove triggers that prevent CPF updates (temporarily)
DROP TRIGGER IF EXISTS prevent_cpf_update ON public.profile_sensitive;
DROP TRIGGER IF EXISTS prevent_profiles_cpf_update ON public.profiles;

-- 3) Anonimize CPF values
UPDATE public.profile_sensitive SET cpf = NULL WHERE cpf IS NOT NULL;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='profiles' AND column_name='cpf'
  ) THEN
    EXECUTE 'UPDATE public.profiles SET cpf = NULL WHERE cpf IS NOT NULL';
  END IF;
END $$;

-- 4) Recreate triggers to restore immutability rules
-- Recreate prevent_cpf_update on profile_sensitive if function exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'prevent_cpf_update') THEN
    BEGIN
      DROP TRIGGER IF EXISTS prevent_cpf_update ON public.profile_sensitive;
      CREATE TRIGGER prevent_cpf_update
      BEFORE UPDATE ON public.profile_sensitive
      FOR EACH ROW EXECUTE FUNCTION public.prevent_cpf_update();
    EXCEPTION WHEN undefined_table THEN
      RAISE NOTICE 'profile_sensitive not found; skipping trigger recreation.';
    END;
  ELSE
    RAISE NOTICE 'prevent_cpf_update function not found; trigger not recreated.';
  END IF;
END $$;

-- Recreate profiles trigger only if column exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='profiles' AND column_name='cpf'
  ) THEN
    BEGIN
      DROP TRIGGER IF EXISTS prevent_profiles_cpf_update ON public.profiles;
      CREATE TRIGGER prevent_profiles_cpf_update
      BEFORE UPDATE ON public.profiles
      FOR EACH ROW WHEN (OLD.cpf IS NOT NULL AND NEW.cpf IS DISTINCT FROM OLD.cpf)
      EXECUTE FUNCTION public.prevent_cpf_update();
    EXCEPTION WHEN undefined_table THEN
      RAISE NOTICE 'profiles table not found; skipping profiles trigger recreation.';
    END;
  END IF;
END $$;

-- 5) Analyze affected tables
ANALYZE public.profile_sensitive;
ANALYZE public.profiles;

-- Done
SELECT 'ANONYMIZE_COMPLETE' AS status, now() AS executed_at;
