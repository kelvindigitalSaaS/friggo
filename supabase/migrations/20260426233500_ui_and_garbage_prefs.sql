-- Add auto_update_prompt to profiles if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'auto_update_prompt') THEN
        ALTER TABLE profiles ADD COLUMN auto_update_prompt BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Add garbage_reminder and achievement_updates to notification_preferences if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'notification_preferences' AND column_name = 'garbage_reminder') THEN
        ALTER TABLE notification_preferences ADD COLUMN garbage_reminder BOOLEAN DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'notification_preferences' AND column_name = 'achievement_updates') THEN
        ALTER TABLE notification_preferences ADD COLUMN achievement_updates BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Add force_notifications to home_settings if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_settings' AND column_name = 'force_notifications') THEN
        ALTER TABLE home_settings ADD COLUMN force_notifications BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Update the RLS to make sure it can be updated
-- Note: the RLS policies on profiles, notification_preferences and home_settings usually cover all columns, but just in case, this is a schema change.
