-- check_cpfs.sql
-- Simple checks after anonymization
SELECT 'profile_sensitive_cpfs_not_null' AS label, count(*) AS value FROM public.profile_sensitive WHERE cpf IS NOT NULL;
SELECT 'profile_sensitive_total' AS label, count(*) AS value FROM public.profile_sensitive;
SELECT 'profile_sensitive_backup_total' AS label, count(*) AS value FROM public.profile_sensitive_backup;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='profiles' AND column_name='cpf'
  ) THEN
    PERFORM 1; -- just to ensure SELECT below runs
    RAISE NOTICE 'profiles_cpfs_not_null: %', (SELECT count(*) FROM public.profiles WHERE cpf IS NOT NULL);
  ELSE
    RAISE NOTICE 'profiles table or cpf column not present';
  END IF;
END $$;
