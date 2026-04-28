-- ============================================================================
-- KAZA Production Hardening Migration
-- Date: 2026-04-28
-- Purpose: Add missing indexes, soft deletes, audit trails, and data integrity
-- ============================================================================

-- ============================================================================
-- 1. ADD SOFT DELETE SUPPORT FOR AUDITABILITY
-- ============================================================================
-- Add soft delete columns to critical tables

ALTER TABLE public.items
  ADD COLUMN deleted_at timestamptz DEFAULT NULL;

ALTER TABLE public.shopping_items
  ADD COLUMN deleted_at timestamptz DEFAULT NULL;

ALTER TABLE public.consumables
  ADD COLUMN deleted_at timestamptz DEFAULT NULL;

ALTER TABLE public.item_history
  ADD COLUMN deleted_at timestamptz DEFAULT NULL;

-- ============================================================================
-- 2. ADD COMPOSITE INDEXES FOR PERFORMANCE (N+1 Prevention)
-- ============================================================================

-- Items queries ordered by expiry
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_items_home_expiry_date
  ON public.items(home_id, expiry_date DESC)
  WHERE deleted_at IS NULL AND expiry_date IS NOT NULL;

-- Items by location for filtering
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_items_home_location
  ON public.items(home_id, location)
  WHERE deleted_at IS NULL;

-- Shopping items by completion status
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shopping_items_home_checked
  ON public.shopping_items(home_id, checked)
  WHERE deleted_at IS NULL;

-- Account sessions by group and device
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_account_sessions_group_device
  ON public.account_sessions(group_id, device_id)
  WHERE group_id IS NOT NULL;

-- Item history time-based queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_item_history_home_date
  ON public.item_history(home_id, created_at DESC)
  WHERE deleted_at IS NULL;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_item_history_user_date
  ON public.item_history(user_id, created_at DESC)
  WHERE deleted_at IS NULL;

-- Notification preferences by home
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_notification_prefs_home
  ON public.notification_preferences(home_id, user_id);

-- Subscription events timeline
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_subscription_events_user_date
  ON public.subscription_events(user_id, occurred_at DESC);

-- ============================================================================
-- 3. ADD UNIQUE CONSTRAINT FOR ACCOUNT SESSIONS
-- ============================================================================
-- Ensure no duplicate device sessions per user

ALTER TABLE public.account_sessions
  ADD CONSTRAINT account_sessions_user_device_unique
  UNIQUE (user_id, device_id);

-- ============================================================================
-- 4. CREATE AUDIT TRAIL FOR CPF CHANGES (LGPD Compliance)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.user_cpf_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action text NOT NULL CHECK (action IN ('set', 'updated', 'locked')),
  cpf_hash text,
  changed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  changed_at timestamptz DEFAULT now(),
  ip_address text,
  notes text
);

-- Index for audit queries
CREATE INDEX IF NOT EXISTS idx_user_cpf_audit_user_date
  ON public.user_cpf_audit(user_id, changed_at DESC);

-- Log CPF changes via trigger
CREATE OR REPLACE FUNCTION public.audit_cpf_changes()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF (OLD.cpf IS DISTINCT FROM NEW.cpf) AND NEW.cpf IS NOT NULL THEN
    INSERT INTO public.user_cpf_audit (user_id, action, cpf_hash, changed_at)
    VALUES (NEW.user_id, 'updated',
      'sha256:' || encode(digest(NEW.cpf, 'sha256'), 'hex'),
      now());
  END IF;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_audit_cpf_changes ON public.profiles;
CREATE TRIGGER trg_audit_cpf_changes
  AFTER UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_cpf_changes();

-- ============================================================================
-- 5. ADD CONSTRAINTS FOR DATA INTEGRITY
-- ============================================================================

-- Validate subscription plan enum
ALTER TABLE public.subscriptions
  ADD CONSTRAINT subscription_plan_valid
  CHECK (plan IN ('free', 'basic', 'standard', 'premium', 'multiPRO'));

-- Validate theme preference
ALTER TABLE public.profiles
  ADD CONSTRAINT profile_theme_valid
  CHECK (theme_preference IN ('light', 'dark', 'system') OR theme_preference IS NULL);

-- Validate language preference
ALTER TABLE public.profiles
  ADD CONSTRAINT profile_language_valid
  CHECK (language_preference IN ('pt-BR', 'es', 'en') OR language_preference IS NULL);

-- ============================================================================
-- 6. CLEANUP FUNCTION FOR DELETED USERS (Cascade Sessions)
-- ============================================================================
-- When user is deleted from auth.users, cleanup orphaned records

CREATE OR REPLACE FUNCTION public.cleanup_deleted_user()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  -- Delete all sessions
  DELETE FROM public.account_sessions WHERE user_id = OLD.id;

  -- Delete push subscriptions
  DELETE FROM public.push_subscriptions WHERE user_id = OLD.id;

  -- Soft delete user's recipe favorites
  UPDATE public.user_recipe_favorites
    SET deleted_at = now()
    WHERE user_id = OLD.id AND deleted_at IS NULL;

  RETURN OLD;
END; $$;

-- Note: This trigger must be created as a "Before Delete" on auth.users
-- via Supabase SQL Editor manually since we can't directly hook auth.users
-- Alternative: Run this via a scheduled function or use edge functions

-- ============================================================================
-- 7. UPDATE RLS POLICIES TO RESPECT SOFT DELETES
-- ============================================================================

-- Drop old policies that don't check deleted_at
DROP POLICY IF EXISTS "items_select" ON public.items;
DROP POLICY IF EXISTS "items_insert" ON public.items;
DROP POLICY IF EXISTS "items_update" ON public.items;
DROP POLICY IF EXISTS "items_delete" ON public.items;

-- Recreate with soft delete awareness
CREATE POLICY "items_select" ON public.items
  FOR SELECT USING (
    home_id IN (
      SELECT home_id FROM public.home_members
      WHERE user_id = auth.uid() AND is_active = true
    )
    AND deleted_at IS NULL
  );

CREATE POLICY "items_insert" ON public.items
  FOR INSERT WITH CHECK (
    home_id IN (
      SELECT home_id FROM public.home_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "items_update" ON public.items
  FOR UPDATE USING (
    home_id IN (
      SELECT home_id FROM public.home_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  ) WITH CHECK (deleted_at IS NULL OR deleted_at IS NOT DISTINCT FROM NULL);

CREATE POLICY "items_delete" ON public.items
  FOR DELETE USING (
    home_id IN (
      SELECT home_id FROM public.home_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- Similar for shopping items
DROP POLICY IF EXISTS "shopping_items_select" ON public.shopping_items;
CREATE POLICY "shopping_items_select" ON public.shopping_items
  FOR SELECT USING (
    home_id IN (
      SELECT home_id FROM public.home_members
      WHERE user_id = auth.uid() AND is_active = true
    )
    AND deleted_at IS NULL
  );

-- ============================================================================
-- 8. HELPER VIEW FOR ACTIVE RECORDS ONLY
-- ============================================================================
-- Simplify queries by providing views that exclude soft-deleted records

CREATE OR REPLACE VIEW v_active_items AS
  SELECT * FROM public.items WHERE deleted_at IS NULL;

CREATE OR REPLACE VIEW v_active_shopping_items AS
  SELECT * FROM public.shopping_items WHERE deleted_at IS NULL;

CREATE OR REPLACE VIEW v_active_consumables AS
  SELECT * FROM public.consumables WHERE deleted_at IS NULL;

-- ============================================================================
-- 9. MIGRATION NOTES
-- ============================================================================
--
-- This migration adds production-ready features:
--
-- ✅ Soft deletes for auditability (LGPD/GDPR compliance)
-- ✅ Composite indexes to prevent N+1 queries (performance)
-- ✅ CPF audit trail (compliance)
-- ✅ Data integrity constraints (enum validation)
-- ✅ Unique constraints on device sessions (prevent duplicates)
-- ✅ Views for simplified querying of active records
--
-- MANUAL STEPS REQUIRED:
--
-- 1. In Supabase Dashboard, SQL Editor, run this trigger for user deletion:
--    CREATE TRIGGER cleanup_on_user_delete
--      BEFORE DELETE ON auth.users
--      FOR EACH ROW EXECUTE FUNCTION public.cleanup_deleted_user();
--
--    (Alternative: Use Edge Functions or cron jobs via pg_cron)
--
-- 2. Update app code to:
--    - Use WHERE deleted_at IS NULL in queries (or use v_active_* views)
--    - Use UPDATE ... SET deleted_at = now() instead of DELETE
--    - Verify RLS policies work with new constraints
--
-- 3. Validate with test:
--    - Create item, soft delete, verify it's hidden
--    - Create CPF, check audit table
--    - Create duplicate device sessions, verify constraint blocks
--
-- ============================================================================
