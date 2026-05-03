-- Corrigir RLS de garbage_reminders para permitir acesso por home_id
-- O problema: RLS estava bloqueando quando tentamos carregar config do lar (home_id)
-- porque o user_id poderia ser de outro membro da casa

-- Dropar as políticas antigas que usam só user_id
DROP POLICY IF EXISTS garbage_reminders_select ON public.garbage_reminders;
DROP POLICY IF EXISTS garbage_reminders_ins ON public.garbage_reminders;
DROP POLICY IF EXISTS garbage_reminders_upd ON public.garbage_reminders;
DROP POLICY IF EXISTS garbage_reminders_del ON public.garbage_reminders;

-- Nova política: permitir se for member da casa OU owner da config
CREATE POLICY garbage_reminders_select ON public.garbage_reminders
  FOR SELECT TO authenticated
  USING (
    home_id IN (SELECT public.user_home_ids())
    OR user_id = auth.uid()
  );

CREATE POLICY garbage_reminders_ins ON public.garbage_reminders
  FOR INSERT TO authenticated
  WITH CHECK (
    home_id IN (SELECT public.user_home_ids())
    AND user_id = auth.uid()
  );

CREATE POLICY garbage_reminders_upd ON public.garbage_reminders
  FOR UPDATE TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()))
  WITH CHECK (home_id IN (SELECT public.user_home_ids()));

CREATE POLICY garbage_reminders_del ON public.garbage_reminders
  FOR DELETE TO authenticated
  USING (home_id IN (SELECT public.user_home_ids()));
