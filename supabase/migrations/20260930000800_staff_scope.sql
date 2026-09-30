drop policy if exists "profiles read self or operations" on public.profiles;
create policy "profiles read self or admins" on public.profiles for select to authenticated
  using (id=(select auth.uid()) or public.is_admin());

drop policy if exists "vendor profiles public approved" on public.vendor_profiles;
create policy "vendor profiles public approved" on public.vendor_profiles for select to anon, authenticated
  using (verification_status='APPROVED' or user_id=(select auth.uid()) or public.is_admin());

drop policy if exists "applications owner or operations read" on public.vendor_applications;
create policy "applications owner or admins read" on public.vendor_applications for select to authenticated
  using (user_id=(select auth.uid()) or public.is_admin());

drop policy if exists "live location booking parties read" on public.live_locations;
create policy "live location booking parties read" on public.live_locations for select to authenticated
  using (exists(select 1 from public.bookings b where b.id=booking_id
    and b.booking_status in ('ASSIGNED','ACCEPTED','ON_THE_WAY','ARRIVED','IN_PROGRESS')
    and (b.customer_id=(select auth.uid()) or b.provider_id=(select auth.uid()) or public.is_admin())));

drop policy if exists "notifications recipient read" on public.notifications;
create policy "notifications recipient read" on public.notifications for select to authenticated
  using (recipient_id=(select auth.uid()) or public.is_admin());

drop policy if exists "vendor docs operations read" on storage.objects;
create policy "vendor documents admin read" on storage.objects for select to authenticated
  using (bucket_id='vendor-documents' and public.is_admin());
create policy "vendor portfolio operations read" on storage.objects for select to authenticated
  using (bucket_id='vendor-portfolio' and public.is_staff_or_admin());

create or replace function public.guard_notification_update()
returns trigger language plpgsql set search_path = '' as $$
begin
  if not public.is_admin() and (new.recipient_id is distinct from old.recipient_id or new.type is distinct from old.type or
    new.title is distinct from old.title or new.message is distinct from old.message or new.data is distinct from old.data or
    new.created_at is distinct from old.created_at) then raise exception 'Notification content is immutable'; end if;
  return new;
end;
$$;
