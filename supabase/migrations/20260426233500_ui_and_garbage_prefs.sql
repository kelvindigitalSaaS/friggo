-- Add auto_update_prompt to profiles if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'auto_update_prompt') THEN
        ALTER TABLE profiles ADD COLUMN auto_update_prompt BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Add garbage_reminder to notification_preferences if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'notification_preferences' AND column_name = 'garbage_reminder') THEN
        ALTER TABLE notification_preferences ADD COLUMN garbage_reminder BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Update the RLS to make sure it can be updated
-- Note: the RLS policies on profiles and notification_preferences usually cover all columns, but just in case, this is a schema change.
