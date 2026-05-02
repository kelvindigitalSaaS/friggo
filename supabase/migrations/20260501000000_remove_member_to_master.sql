-- Migration: Remove member to master - convert secondary account to primary
-- When removing a member, they become independent master with their own plan

-- 1. Create RPC function to remove member and convert to master
create or replace function remove_member_and_convert_to_master(
  p_member_user_id uuid,
  p_group_id uuid
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_master_user_id uuid;
  v_member_home_id uuid;
  v_new_home_id uuid;
begin
  -- Get master user and member's current home
  select master_user_id, home_id into v_master_user_id, v_member_home_id
  from sub_account_groups
  where id = p_group_id;

  if v_master_user_id is null then
    return json_build_object('error', 'Group not found');
  end if;

  -- Authorization: only master can remove members
  if auth.uid() != v_master_user_id then
    return json_build_object('error', 'Not authorized');
  end if;

  -- 1. Remove member from sub_account_members
  delete from sub_account_members
  where user_id = p_member_user_id and group_id = p_group_id;

  -- 2. Create new home for the former member
  insert into homes (user_id, name, created_at)
  values (
    p_member_user_id,
    (select coalesce(name, 'Meu Lar') from profiles where user_id = p_member_user_id limit 1),
    now()
  )
  returning id into v_new_home_id;

  -- 3. Create independent subscription for former member (free plan)
  insert into subscriptions (user_id, plan_tier, plan_label, plan, is_active, created_at)
  values (
    p_member_user_id,
    'individualPRO',
    'IndividualPRO',
    'free',
    false,
    now()
  )
  on conflict (user_id) do update
  set
    plan_tier = 'individualPRO',
    plan_label = 'IndividualPRO',
    plan = 'free',
    is_active = false,
    group_id = null,
    master_user_id = null;

  -- 4. Clear achievements - remove all unlocked achievements for this user
  delete from user_achievements where user_id = p_member_user_id;

  -- 5. Insert empty achievements record for former member
  insert into user_achievements (user_id, unlocked)
  values (p_member_user_id, '{}'::jsonb)
  on conflict (user_id) do update
  set unlocked = '{}'::jsonb;

  -- 6. Update sub_account_groups - remove member count
  update sub_account_groups
  set updated_at = now()
  where id = p_group_id;

  return json_build_object(
    'success', true,
    'new_home_id', v_new_home_id,
    'message', 'Member converted to independent master account'
  );
end;
$$;

grant execute on function remove_member_and_convert_to_master(uuid, uuid) to authenticated;

-- 2. Add name field to sub_account_members to store real name
alter table sub_account_members
add column if not exists member_name text;

-- 3. Create trigger to auto-populate member_name from profiles
create or replace function sync_member_name()
returns trigger
language plpgsql
as $$
begin
  new.member_name := (select name from profiles where user_id = new.user_id limit 1);
  return new;
end;
$$;

drop trigger if exists trigger_sync_member_name on sub_account_members;
create trigger trigger_sync_member_name
before insert or update on sub_account_members
for each row
execute function sync_member_name();

-- 4. Backfill existing members with their real names
update sub_account_members sam
set member_name = p.name
from profiles p
where sam.user_id = p.user_id and sam.member_name is null;

-- 5. Create index for faster member lookups by group
create index if not exists idx_sub_account_members_group on sub_account_members(group_id);
create index if not exists idx_sub_account_members_user on sub_account_members(user_id);
