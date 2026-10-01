-- Reliable event creation and owner-only access for in-app notifications.

create or replace function public.create_booking_notification()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.notifications(recipient_id,type,title,message,data)
    values (new.customer_id,'BOOKING_CREATED','Booking request received',
      'Your booking request has been received.',jsonb_build_object('booking_id',new.id));
  elsif new.booking_status is distinct from old.booking_status then
    insert into public.notifications(recipient_id,type,title,message,data)
    values (
      new.customer_id,
      case new.booking_status
        when 'COMPLETED' then 'BOOKING_COMPLETED'
        when 'CONFIRMED' then 'BOOKING_CONFIRMED'
        when 'ASSIGNED' then 'VENDOR_ASSIGNED'
        when 'ACCEPTED' then 'VENDOR_ACCEPTED'
        when 'ON_THE_WAY' then 'VENDOR_ON_THE_WAY'
        when 'ARRIVED' then 'VENDOR_ARRIVED'
        else 'BOOKING_UPDATED'
      end,
      'Booking update',
      format('Your booking status is now %s.',replace(new.booking_status::text,'_',' ')),
      jsonb_build_object('booking_id',new.id,'status',new.booking_status)
    );
  end if;

  -- Assignment and status commonly change in the same UPDATE.
  if new.provider_id is not null then
    if tg_op = 'INSERT' or new.provider_id is distinct from old.provider_id then
      insert into public.notifications(recipient_id,type,title,message,data)
      values (new.provider_id,'VENDOR_ASSIGNED','New booking assigned',
        'A booking has been assigned to you.',jsonb_build_object('booking_id',new.id));
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists bookings_create_notification on public.bookings;
create trigger bookings_create_notification
after insert or update of booking_status,provider_id on public.bookings
for each row execute procedure public.create_booking_notification();

create or replace function public.create_application_notification()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.notifications(recipient_id,type,title,message,data)
    select p.id,'APPLICATION_SUBMITTED','Vendor application received',
      'A vendor application is ready for review.',jsonb_build_object('application_id',new.id)
    from public.profiles p where p.role in ('ADMIN','SUPER_ADMIN');
  elsif new.status is distinct from old.status then
    insert into public.notifications(recipient_id,type,title,message,data)
    values (
      new.user_id,
      case when new.status='APPROVED' then 'APPLICATION_APPROVED' else 'APPLICATION_REJECTED' end,
      'Vendor application update',
      case when new.status='APPROVED' then 'Your vendor application was approved.'
        else coalesce(new.rejection_reason,'Your vendor application status was updated.') end,
      jsonb_build_object('application_id',new.id,'status',new.status)
    );
  end if;
  return new;
end;
$$;

drop trigger if exists vendor_application_notification on public.vendor_applications;
create trigger vendor_application_notification
after insert or update of status on public.vendor_applications
for each row execute procedure public.create_application_notification();

create or replace function public.create_order_notification()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.notifications(recipient_id,type,title,message,data)
  values (new.customer_id,'ORDER_CREATED','Order received',
    'Your store order has been received. Payment has not been collected.',
    jsonb_build_object('order_id',new.id,'order_status',new.order_status));
  return new;
end;
$$;

drop trigger if exists orders_create_notification on public.orders;
create trigger orders_create_notification
after insert on public.orders
for each row execute procedure public.create_order_notification();

-- Replace legacy permissive notification policies with recipient-scoped access.
drop policy if exists "notifications recipient access" on public.notifications;
drop policy if exists "notifications recipient read" on public.notifications;
drop policy if exists "notifications recipient mark read" on public.notifications;
drop policy if exists "notifications recipient delete" on public.notifications;

create policy "notifications recipient read" on public.notifications
for select to authenticated
using (recipient_id=(select auth.uid()) or public.is_admin());

create policy "notifications recipient mark read" on public.notifications
for update to authenticated
using (recipient_id=(select auth.uid()))
with check (recipient_id=(select auth.uid()));

create policy "notifications recipient delete" on public.notifications
for delete to authenticated
using (recipient_id=(select auth.uid()));

-- The base migration normally adds this table to Realtime. Add it if absent.
do $$
begin
  if not exists (
    select 1 from pg_catalog.pg_publication_tables
    where pubname='supabase_realtime' and schemaname='public' and tablename='notifications'
  ) then
    execute 'alter publication supabase_realtime add table public.notifications';
  end if;
end;
$$;
