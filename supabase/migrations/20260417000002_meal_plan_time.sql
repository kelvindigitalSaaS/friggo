-- Add time and notification flag to meal plans
-- Allows scheduling meals at specific times and notifying group members

ALTER TABLE meal_plans ADD COLUMN planned_time time DEFAULT NULL;
ALTER TABLE meal_plans ADD COLUMN notify_members boolean DEFAULT true;
ALTER TABLE meal_plans ADD COLUMN created_by uuid DEFAULT NULL;

-- Track who created the meal plan entry
ALTER TABLE meal_plans ADD CONSTRAINT fk_meal_plans_user
  FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL;
