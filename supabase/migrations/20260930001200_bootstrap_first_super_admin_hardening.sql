-- Upgrade-safe reapplication of the one-time first SUPER_ADMIN bootstrap.
-- This migration does not touch migrations 001-008 or alter RLS policies.

create or replace function public.bootstrap_first_super_admin(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if coalesce(auth.role(),'') not in ('','service_role') or auth.uid() is not null then
    raise exception 'Run this one-time operation from the Supabase SQL editor or service_role';
  end if;

  -- Serialize competing first-admin attempts so they cannot both pass the empty check.
  perform pg_advisory_xact_lock(hashtext('sanskaraa-first-super-admin'));

  if exists (select 1 from public.profiles where role in ('ADMIN','SUPER_ADMIN')) then
    raise exception 'An administrator already exists; bootstrap is permanently closed';
  end if;
  if not exists (select 1 from auth.users where id = p_user_id) then
    raise exception 'Auth user was not found';
  end if;

  -- Transaction-local, target-bound marker consumed by the profile trigger below.
  perform pg_catalog.set_config('sanskaraa.bootstrap_role_change','on',true);
  perform pg_catalog.set_config('sanskaraa.bootstrap_target',p_user_id::text,true);
  update public.profiles
    set role='SUPER_ADMIN', updated_at=now()
    where id=p_user_id and role not in ('ADMIN','SUPER_ADMIN');
  if not found then
    raise exception 'Profile row was not found or was already an administrator';
  end if;
  perform pg_catalog.set_config('sanskaraa.bootstrap_role_change','off',true);
  perform pg_catalog.set_config('sanskaraa.bootstrap_target','',true);
end;
$$;

revoke all on function public.bootstrap_first_super_admin(uuid) from public, anon, authenticated;
grant execute on function public.bootstrap_first_super_admin(uuid) to service_role;

create or replace function public.guard_profile_update()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.role is distinct from old.role then
    -- Ordinary callers, including CUSTOMER and ADMIN, cannot change any user's role.
    -- The only no-admin exception is a target-bound invocation from the secured bootstrap.
    if not exists (
      select 1 from public.profiles p
      where p.id=(select auth.uid()) and p.role='SUPER_ADMIN'
    ) and not (
      current_user in ('postgres','supabase_admin')
      and (select auth.uid()) is null
      and coalesce(pg_catalog.current_setting('sanskaraa.bootstrap_role_change',true),'')='on'
      and coalesce(pg_catalog.current_setting('sanskaraa.bootstrap_target',true),'')=new.id::text
      and new.role='SUPER_ADMIN'
      and not exists (select 1 from public.profiles p where p.role in ('ADMIN','SUPER_ADMIN'))
    ) and not (
      -- Admin review may set only vendor lifecycle roles for a different account.
      current_user in ('postgres','supabase_admin')
      and (select auth.uid()) is not null
      and public.is_admin()
      and (select auth.uid()) is distinct from new.id
      and coalesce(pg_catalog.current_setting('sanskaraa.vendor_review_role_change',true),'')='on'
      and new.role in ('CUSTOMER','VENDOR','PANDIT')
    ) then
      raise exception 'Role changes require SUPER_ADMIN privileges';
    end if;
  end if;

  if new.status is distinct from old.status and not public.is_admin()
    and not ((select auth.uid()) is null and current_user in ('postgres','supabase_admin')) then
    raise exception 'Profile status changes require an administrator';
  end if;
  if new.email is distinct from old.email and not public.is_admin()
    and not ((select auth.uid()) is null and current_user in ('postgres','supabase_admin')) then
    raise exception 'Email changes must be made through Supabase Auth';
  end if;
  new.updated_at=now();
  return new;
end;
$$;
