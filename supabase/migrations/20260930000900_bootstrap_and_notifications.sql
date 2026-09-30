-- A one-time bootstrap callable only from the Supabase SQL editor (no JWT) or by service_role.
-- The function is permanently closed after the first ADMIN/SUPER_ADMIN account is created.
create or replace function public.bootstrap_first_super_admin(p_user_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if coalesce(auth.role(),'') not in ('','service_role') or auth.uid() is not null then
    raise exception 'Run this one-time operation from the Supabase SQL editor';
  end if;
  perform pg_advisory_xact_lock(hashtext('sanskaraa-first-super-admin'));
  if exists(select 1 from public.profiles where role in ('ADMIN','SUPER_ADMIN')) then
    raise exception 'An administrator already exists; bootstrap is closed';
  end if;
  if not exists(select 1 from auth.users where id=p_user_id) then raise exception 'Auth user was not found'; end if;
  -- The trigger checks the marker, target id, caller and empty-admin invariant together.
  perform pg_catalog.set_config('sanskaraa.bootstrap_role_change','on',true);
  perform pg_catalog.set_config('sanskaraa.bootstrap_target',p_user_id::text,true);
  update public.profiles set role='SUPER_ADMIN',updated_at=now()
    where id=p_user_id and role <> 'SUPER_ADMIN';
  if not found then raise exception 'Profile row was not found or was already an administrator'; end if;
  perform pg_catalog.set_config('sanskaraa.bootstrap_role_change','off',true);
  perform pg_catalog.set_config('sanskaraa.bootstrap_target','',true);
end;
$$;
revoke all on function public.bootstrap_first_super_admin(uuid) from public, anon, authenticated;
grant execute on function public.bootstrap_first_super_admin(uuid) to service_role;

create or replace function public.guard_profile_update()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.role is distinct from old.role then
    if not exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='SUPER_ADMIN')
      and not (
      current_user in ('postgres','supabase_admin')
      and (select auth.uid()) is null
      and coalesce(pg_catalog.current_setting('sanskaraa.bootstrap_role_change',true),'')='on'
      and coalesce(pg_catalog.current_setting('sanskaraa.bootstrap_target',true),'')=new.id::text
      and new.role='SUPER_ADMIN'
      and not exists(select 1 from public.profiles p where p.role in ('ADMIN','SUPER_ADMIN'))
    ) and not (
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
  new.updated_at=now(); return new;
end;
$$;

create or replace function public.create_booking_notification()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if tg_op='INSERT' then
    insert into public.notifications(recipient_id,type,title,message,data)
      values(new.customer_id,'BOOKING_CREATED','Booking request received','Your booking request has been received.',jsonb_build_object('booking_id',new.id));
  elsif new.booking_status is distinct from old.booking_status then
    insert into public.notifications(recipient_id,type,title,message,data)
      values(new.customer_id,case new.booking_status when 'COMPLETED' then 'BOOKING_COMPLETED' when 'CONFIRMED' then 'BOOKING_CONFIRMED' when 'ASSIGNED' then 'VENDOR_ASSIGNED' when 'ACCEPTED' then 'VENDOR_ACCEPTED' when 'ON_THE_WAY' then 'VENDOR_ON_THE_WAY' when 'ARRIVED' then 'VENDOR_ARRIVED' else 'BOOKING_UPDATED' end,
        'Booking update',format('Your booking status is now %s.',replace(new.booking_status::text,'_',' ')),jsonb_build_object('booking_id',new.id,'status',new.booking_status));
  end if;
  if new.provider_id is not null and new.provider_id is distinct from old.provider_id then
    insert into public.notifications(recipient_id,type,title,message,data)
      values(new.provider_id,'VENDOR_ASSIGNED','New booking assigned','A booking has been assigned to you.',jsonb_build_object('booking_id',new.id));
  end if;
  return new;
end;
$$;
drop trigger if exists bookings_create_notification on public.bookings;
create trigger bookings_create_notification after insert or update of booking_status,provider_id on public.bookings
  for each row execute procedure public.create_booking_notification();

create or replace function public.create_application_notification()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if tg_op='INSERT' then
    insert into public.notifications(recipient_id,type,title,message,data)
      select id,'APPLICATION_SUBMITTED','Vendor application received','A vendor application is ready for review.',jsonb_build_object('application_id',new.id)
      from public.profiles where role in ('ADMIN','SUPER_ADMIN');
  elsif new.status is distinct from old.status then
    insert into public.notifications(recipient_id,type,title,message,data)
      values(new.user_id,case when new.status='APPROVED' then 'APPLICATION_APPROVED' else 'APPLICATION_REJECTED' end,
        'Vendor application update',case when new.status='APPROVED' then 'Your vendor application was approved.' else coalesce(new.rejection_reason,'Your vendor application status was updated.') end,
        jsonb_build_object('application_id',new.id,'status',new.status));
  end if;
  return new;
end;
$$;
drop trigger if exists vendor_application_notification on public.vendor_applications;
create trigger vendor_application_notification after insert or update of status on public.vendor_applications
  for each row execute procedure public.create_application_notification();

-- Vendor type remains as supplied in the application; common Pandit service labels get PANDIT role.
create or replace function public.review_vendor_application(p_application_id uuid, p_status public.vendor_status, p_rejection_reason text default null)
returns public.vendor_applications language plpgsql security definer set search_path = '' as $$
declare a public.vendor_applications; reviewer uuid := (select auth.uid()); role_value public.app_role;
begin
  if reviewer is null or not public.is_admin() then raise exception 'Administrator privileges required'; end if;
  if p_status not in ('APPROVED','REJECTED','SUSPENDED') then raise exception 'Invalid review status'; end if;
  update public.vendor_applications set status=p_status,rejection_reason=case when p_status='REJECTED' then p_rejection_reason else null end,
    reviewed_at=now(),reviewed_by=reviewer,updated_at=now() where id=p_application_id returning * into a;
  if not found then raise exception 'Application not found'; end if;
  role_value := case when p_status='APPROVED' and a.vendor_type ilike any(array['%pandit%','%priest%','%astrologer%']) then 'PANDIT'::public.app_role
    when p_status='APPROVED' then 'VENDOR'::public.app_role when p_status='SUSPENDED' then 'VENDOR'::public.app_role else 'CUSTOMER'::public.app_role end;
  perform pg_catalog.set_config('sanskaraa.vendor_review_role_change','on',true);
  update public.profiles set role=role_value,updated_at=now() where id=a.user_id;
  perform pg_catalog.set_config('sanskaraa.vendor_review_role_change','off',true);
  if p_status='APPROVED' then
    insert into public.vendor_profiles(user_id,vendor_type,business_name,description,phone,email,address,city,state,pincode,verification_status)
      values(a.user_id,a.vendor_type,a.business_name,a.experience,a.phone,a.email,a.address,a.city,a.state,a.pincode,'APPROVED')
      on conflict(user_id) do update set vendor_type=excluded.vendor_type,business_name=excluded.business_name,description=excluded.description,
        phone=excluded.phone,email=excluded.email,address=excluded.address,city=excluded.city,state=excluded.state,pincode=excluded.pincode,
        verification_status='APPROVED',updated_at=now();
  else update public.vendor_profiles set verification_status=p_status,updated_at=now() where user_id=a.user_id; end if;
  return a;
end;
$$;
