-- Add last_done tracking columns to garbage_reminders for household-shared tracking
ALTER TABLE public.garbage_reminders
  ADD COLUMN IF NOT EXISTS last_done_at timestamptz,
  ADD COLUMN IF NOT EXISTS last_done_by_user_id uuid;

-- Add comment explaining these columns
COMMENT ON COLUMN public.garbage_reminders.last_done_at IS 'When the garbage was last marked as done/taken out';
COMMENT ON COLUMN public.garbage_reminders.last_done_by_user_id IS 'Which household member last marked garbage as done';
