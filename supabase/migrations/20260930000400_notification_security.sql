drop policy if exists "notifications recipient access" on public.notifications;
create policy "notifications recipient read" on public.notifications for select to authenticated
  using (recipient_id=(select auth.uid()) or public.is_staff_or_admin());
create policy "notifications recipient mark read" on public.notifications for update to authenticated
  using (recipient_id=(select auth.uid())) with check (recipient_id=(select auth.uid()));
create policy "notifications recipient delete" on public.notifications for delete to authenticated
  using (recipient_id=(select auth.uid()));

create or replace function public.guard_profile_update()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then raise exception 'Role changes require an administrator'; end if;
  if new.email is distinct from old.email and not public.is_admin() then raise exception 'Email changes must be made through Supabase Auth'; end if;
  new.updated_at = now(); return new;
end;
$$;
