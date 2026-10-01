-- Keep public.profiles.role as the single application role source.
-- Record role changes and require privileged changes to use the guarded RPC.

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id=(select auth.uid()) and p.role='SUPER_ADMIN'
  );
$$;
revoke all on function public.is_super_admin() from public, anon;
grant execute on function public.is_super_admin() to authenticated;

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.profiles(id) on delete set null,
  target_user_id uuid references public.profiles(id) on delete set null,
  old_role public.app_role,
  new_role public.app_role,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists audit_logs_target_created_idx on public.audit_logs(target_user_id,created_at desc);
create index if not exists audit_logs_actor_created_idx on public.audit_logs(actor_user_id,created_at desc);
alter table public.audit_logs enable row level security;
drop policy if exists "super admins read audit logs" on public.audit_logs;
create policy "super admins read audit logs" on public.audit_logs
for select to authenticated using (public.is_super_admin());
revoke all on public.audit_logs from anon, authenticated;
grant select on public.audit_logs to authenticated;

create or replace function public.audit_profile_role_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare change_action text := 'ROLE_CHANGED';
begin
  if new.role is distinct from old.role then
    if coalesce(pg_catalog.current_setting('sanskaraa.bootstrap_role_change',true),'')='on' then
      change_action := 'FIRST_SUPER_ADMIN_BOOTSTRAP';
    elsif coalesce(pg_catalog.current_setting('sanskaraa.vendor_review_role_change',true),'')='on' then
      change_action := 'VENDOR_REVIEW_ROLE_CHANGE';
    end if;
    insert into public.audit_logs(actor_user_id,target_user_id,old_role,new_role,action,metadata)
    values ((select auth.uid()),new.id,old.role,new.role,change_action,
      jsonb_build_object('source','profiles.role trigger'));
  end if;
  return new;
end;
$$;
drop trigger if exists profiles_audit_role_change on public.profiles;
create trigger profiles_audit_role_change
after update of role on public.profiles
for each row execute procedure public.audit_profile_role_change();

create or replace function public.guard_profile_update()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.role is distinct from old.role and not (
    current_user in ('postgres','supabase_admin')
    and coalesce(pg_catalog.current_setting('sanskaraa.bootstrap_role_change',true),'')='on'
    and coalesce(pg_catalog.current_setting('sanskaraa.bootstrap_target',true),'')=new.id::text
    and (select auth.uid()) is null
    and new.role='SUPER_ADMIN'
    and not exists (select 1 from public.profiles p where p.role in ('ADMIN','SUPER_ADMIN'))
  ) and not (
    current_user in ('postgres','supabase_admin')
    and coalesce(pg_catalog.current_setting('sanskaraa.role_management_change',true),'')='on'
    and coalesce(pg_catalog.current_setting('sanskaraa.role_management_target',true),'')=new.id::text
    and public.is_super_admin()
  ) and not (
    current_user in ('postgres','supabase_admin')
    and (select auth.uid()) is not null
    and public.is_admin()
    and (select auth.uid()) is distinct from new.id
    and coalesce(pg_catalog.current_setting('sanskaraa.vendor_review_role_change',true),'')='on'
    and old.role not in ('ADMIN','SUPER_ADMIN','STAFF')
    and new.role in ('CUSTOMER','VENDOR','PANDIT')
  ) then
    raise exception 'Role changes require the authorized SUPER_ADMIN or bootstrap function';
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

create or replace function public.manage_profile_role(p_target_user_id uuid,p_new_role public.app_role)
returns public.profiles
language plpgsql
security definer
set search_path = ''
as $$
declare target public.profiles;
begin
  if (select auth.uid()) is null or not public.is_super_admin() then
    raise exception 'SUPER_ADMIN privileges required';
  end if;
  perform pg_advisory_xact_lock(hashtext('sanskaraa-role-management'));
  select * into target from public.profiles where id=p_target_user_id for update;
  if not found then raise exception 'Profile not found'; end if;
  if target.role='SUPER_ADMIN' and p_new_role <> 'SUPER_ADMIN'
     and (select count(*) from public.profiles where role='SUPER_ADMIN') <= 1 then
    raise exception 'At least one SUPER_ADMIN must remain';
  end if;
  if target.role is not distinct from p_new_role then return target; end if;

  perform pg_catalog.set_config('sanskaraa.role_management_change','on',true);
  perform pg_catalog.set_config('sanskaraa.role_management_target',p_target_user_id::text,true);
  update public.profiles set role=p_new_role,updated_at=now()
    where id=p_target_user_id returning * into target;
  perform pg_catalog.set_config('sanskaraa.role_management_change','off',true);
  perform pg_catalog.set_config('sanskaraa.role_management_target','',true);
  return target;
end;
$$;
revoke all on function public.manage_profile_role(uuid,public.app_role) from public,anon;
grant execute on function public.manage_profile_role(uuid,public.app_role) to authenticated;
