-- Sanskaraa core schema. Apply with `supabase db push` after linking the project.
create extension if not exists pgcrypto;

create type public.app_role as enum ('CUSTOMER','VENDOR','PANDIT','STAFF','ADMIN','SUPER_ADMIN');
create type public.vendor_status as enum ('PENDING','APPROVED','REJECTED','SUSPENDED');
create type public.booking_state as enum ('PENDING','CONFIRMED','ASSIGNED','ACCEPTED','ON_THE_WAY','ARRIVED','IN_PROGRESS','COMPLETED','CANCELLED','REJECTED');
create type public.payment_state as enum ('UNPAID','PARTIAL','PAID','REFUNDED','FAILED');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '', email text not null default '', phone text,
  avatar_url text, role public.app_role not null default 'CUSTOMER', status text not null default 'ACTIVE',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index profiles_role_idx on public.profiles(role);

create table public.vendor_profiles (
  id uuid primary key default gen_random_uuid(), user_id uuid not null unique references public.profiles(id) on delete cascade,
  vendor_type text not null, business_name text not null, description text, phone text, email text,
  address text, city text, state text, pincode text, latitude double precision, longitude double precision,
  service_radius numeric(8,2), verification_status public.vendor_status not null default 'PENDING',
  profile_photo_url text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index vendor_profiles_city_idx on public.vendor_profiles(city);
create index vendor_profiles_status_idx on public.vendor_profiles(verification_status);

create table public.vendor_applications (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
  business_name text not null, vendor_type text not null, phone text, email text, address text, city text, state text,
  pincode text, aadhaar_document_url text, pan_document_url text, business_proof_url text,
  portfolio_urls text[] not null default '{}', bank_account_last4 char(4), ifsc text, gst_number text,
  status public.vendor_status not null default 'PENDING', rejection_reason text, submitted_at timestamptz not null default now(),
  reviewed_at timestamptz, reviewed_by uuid references public.profiles(id), created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index vendor_applications_user_idx on public.vendor_applications(user_id);
create index vendor_applications_status_idx on public.vendor_applications(status);

create table public.services (
  id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique, category text not null,
  description text, image_url text, base_price numeric(12,2) not null default 0 check (base_price >= 0),
  is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(), customer_id uuid not null references public.profiles(id),
  provider_id uuid references public.profiles(id), service_id uuid references public.services(id), booking_type text not null,
  event_date date, start_time time, end_time time, address text, city text, state text, pincode text,
  latitude double precision, longitude double precision, notes text,
  subtotal numeric(12,2) not null default 0 check (subtotal >= 0), discount numeric(12,2) not null default 0 check (discount >= 0),
  total_amount numeric(12,2) not null default 0 check (total_amount >= 0), payment_status public.payment_state not null default 'UNPAID',
  booking_status public.booking_state not null default 'PENDING', provider_status text, cancellation_reason text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check (end_time is null or start_time is null or end_time > start_time)
);
create index bookings_customer_idx on public.bookings(customer_id, created_at desc);
create index bookings_provider_idx on public.bookings(provider_id, created_at desc);
create index bookings_status_idx on public.bookings(booking_status);
create index bookings_event_date_idx on public.bookings(event_date);

create table public.live_locations (
  id uuid primary key default gen_random_uuid(), booking_id uuid not null unique references public.bookings(id) on delete cascade,
  provider_id uuid not null references public.profiles(id) on delete cascade, latitude double precision not null,
  longitude double precision not null, accuracy double precision, heading double precision, speed double precision,
  is_sharing boolean not null default true, updated_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(), recipient_id uuid not null references public.profiles(id) on delete cascade,
  type text not null, title text not null, message text not null, data jsonb not null default '{}',
  is_read boolean not null default false, created_at timestamptz not null default now()
);
create index notifications_recipient_idx on public.notifications(recipient_id, created_at desc);
create index notifications_unread_idx on public.notifications(recipient_id, is_read) where not is_read;

create table public.reviews (
  id uuid primary key default gen_random_uuid(), booking_id uuid not null unique references public.bookings(id) on delete cascade,
  customer_id uuid not null references public.profiles(id), provider_id uuid not null references public.profiles(id),
  rating integer not null check (rating between 1 and 5), comment text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index reviews_provider_idx on public.reviews(provider_id, created_at desc);

create table public.payments (
  id uuid primary key default gen_random_uuid(), booking_id uuid not null references public.bookings(id),
  customer_id uuid not null references public.profiles(id), amount numeric(12,2) not null check (amount > 0),
  currency char(3) not null default 'INR', provider text not null default 'razorpay', gateway_order_id text,
  gateway_payment_id text, gateway_signature text, status text not null default 'PENDING',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique, description text,
  category text, price numeric(12,2) not null check (price >= 0), stock integer not null default 0 check (stock >= 0),
  image_url text, is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.orders (
  id uuid primary key default gen_random_uuid(), customer_id uuid not null references public.profiles(id),
  subtotal numeric(12,2) not null default 0, shipping_fee numeric(12,2) not null default 0, discount numeric(12,2) not null default 0,
  total_amount numeric(12,2) not null default 0, payment_status public.payment_state not null default 'UNPAID',
  order_status text not null default 'PENDING', shipping_address jsonb not null default '{}',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index orders_customer_idx on public.orders(customer_id, created_at desc);
create table public.order_items (
  id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id), quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0), total_price numeric(12,2) not null check (total_price >= 0)
);

create or replace function public.is_staff_or_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.profiles p where p.id = (select auth.uid()) and p.role in ('STAFF','ADMIN','SUPER_ADMIN'));
$$;
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.profiles p where p.id = (select auth.uid()) and p.role in ('ADMIN','SUPER_ADMIN'));
$$;

-- Minimal profile bootstrap. Role is always CUSTOMER; signup metadata cannot set privileges.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles(id, name, email, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'name',''), coalesce(new.email,''), 'CUSTOMER')
  on conflict (id) do nothing;
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- Prevent clients from changing role or server-controlled payment/booking state via direct updates.
create or replace function public.guard_profile_update()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then raise exception 'Role changes require an administrator'; end if;
  new.updated_at = now(); return new;
end;
$$;
create trigger profiles_guard_update before update on public.profiles for each row execute procedure public.guard_profile_update();

create or replace function public.transition_booking(p_booking_id uuid, p_next public.booking_state, p_reason text default null)
returns public.bookings language plpgsql security definer set search_path = '' as $$
declare b public.bookings;
begin
  select * into b from public.bookings where id = p_booking_id for update;
  if not found then raise exception 'Booking not found'; end if;
  if (select auth.uid()) is null then raise exception 'Authentication required'; end if;
  if public.is_admin() then null;
  elsif p_next = 'CANCELLED' and b.customer_id = (select auth.uid()) and b.booking_status in ('PENDING','CONFIRMED','ASSIGNED') then null;
  elsif b.provider_id = (select auth.uid()) and p_next in ('ACCEPTED','REJECTED','ON_THE_WAY','ARRIVED','IN_PROGRESS','COMPLETED')
    and ((b.booking_status = 'ASSIGNED' and p_next in ('ACCEPTED','REJECTED')) or
         (b.booking_status = 'ACCEPTED' and p_next = 'ON_THE_WAY') or
         (b.booking_status = 'ON_THE_WAY' and p_next = 'ARRIVED') or
         (b.booking_status = 'ARRIVED' and p_next = 'IN_PROGRESS') or
         (b.booking_status = 'IN_PROGRESS' and p_next = 'COMPLETED')) then null;
  else raise exception 'Transition not permitted'; end if;
  update public.bookings set booking_status = p_next, cancellation_reason = case when p_next='CANCELLED' then p_reason else cancellation_reason end,
    updated_at = now() where id = p_booking_id returning * into b;
  if p_next in ('COMPLETED','CANCELLED','REJECTED') then update public.live_locations set is_sharing=false, updated_at=now() where booking_id=p_booking_id; end if;
  return b;
end;
$$;
revoke all on function public.transition_booking(uuid, public.booking_state, text) from public;
grant execute on function public.transition_booking(uuid, public.booking_state, text) to authenticated;

-- RLS
do $$ declare t text; begin
  foreach t in array array['profiles','vendor_profiles','vendor_applications','services','bookings','live_locations','notifications','reviews','payments','products','orders','order_items'] loop
    execute format('alter table public.%I enable row level security', t);
  end loop;
end $$;
create policy "profiles read self or operations" on public.profiles for select to authenticated using (id=(select auth.uid()) or public.is_staff_or_admin());
create policy "profiles update self or admin" on public.profiles for update to authenticated using (id=(select auth.uid()) or public.is_admin()) with check (id=(select auth.uid()) or public.is_admin());
create policy "vendor profiles public approved" on public.vendor_profiles for select to anon, authenticated using (verification_status='APPROVED' or user_id=(select auth.uid()) or public.is_staff_or_admin());
create policy "vendor profile owner insert" on public.vendor_profiles for insert to authenticated with check (user_id=(select auth.uid()) and verification_status='PENDING');
create policy "vendor profile owner update" on public.vendor_profiles for update to authenticated using (user_id=(select auth.uid()) or public.is_admin()) with check ((user_id=(select auth.uid()) and verification_status <> 'APPROVED') or public.is_admin());
create policy "applications owner or operations read" on public.vendor_applications for select to authenticated using (user_id=(select auth.uid()) or public.is_staff_or_admin());
create policy "applications owner insert" on public.vendor_applications for insert to authenticated with check (user_id=(select auth.uid()) and status='PENDING');
create policy "applications owner update pending" on public.vendor_applications for update to authenticated using (user_id=(select auth.uid()) and status in ('PENDING','REJECTED')) with check (user_id=(select auth.uid()) and status in ('PENDING','REJECTED'));
create policy "applications admin update" on public.vendor_applications for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "services public active read" on public.services for select to anon, authenticated using (is_active or public.is_admin());
create policy "services admin write" on public.services for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "bookings parties read" on public.bookings for select to authenticated using (customer_id=(select auth.uid()) or provider_id=(select auth.uid()) or public.is_staff_or_admin());
create policy "customer booking insert" on public.bookings for insert to authenticated with check (customer_id=(select auth.uid()) and provider_id is null and payment_status='UNPAID' and booking_status='PENDING');
create policy "booking operations assignment" on public.bookings for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "live location booking parties read" on public.live_locations for select to authenticated using (exists(select 1 from public.bookings b where b.id=booking_id and b.booking_status in ('ASSIGNED','ACCEPTED','ON_THE_WAY','ARRIVED','IN_PROGRESS') and (b.customer_id=(select auth.uid()) or b.provider_id=(select auth.uid()) or public.is_staff_or_admin())));
create policy "assigned provider publishes location" on public.live_locations for all to authenticated using (provider_id=(select auth.uid()) and exists(select 1 from public.bookings b where b.id=booking_id and b.provider_id=(select auth.uid()) and b.booking_status in ('ASSIGNED','ACCEPTED','ON_THE_WAY','ARRIVED','IN_PROGRESS'))) with check (provider_id=(select auth.uid()) and exists(select 1 from public.bookings b where b.id=booking_id and b.provider_id=(select auth.uid()) and b.booking_status in ('ASSIGNED','ACCEPTED','ON_THE_WAY','ARRIVED','IN_PROGRESS')));
create policy "notifications recipient access" on public.notifications for all to authenticated using (recipient_id=(select auth.uid()) or public.is_staff_or_admin()) with check (recipient_id=(select auth.uid()) or public.is_staff_or_admin());
create policy "reviews public read" on public.reviews for select to anon, authenticated using (true);
create policy "eligible booking review" on public.reviews for insert to authenticated with check (customer_id=(select auth.uid()) and exists(select 1 from public.bookings b where b.id=booking_id and b.customer_id=(select auth.uid()) and b.provider_id=provider_id and b.booking_status='COMPLETED'));
create policy "review owner update" on public.reviews for update to authenticated using (customer_id=(select auth.uid())) with check (customer_id=(select auth.uid()));
create policy "payment customer read" on public.payments for select to authenticated using (customer_id=(select auth.uid()) or public.is_admin());
create policy "payment customer create unpaid" on public.payments for insert to authenticated with check (customer_id=(select auth.uid()) and status='PENDING' and exists(select 1 from public.bookings b where b.id=booking_id and b.customer_id=(select auth.uid())));
create policy "products public active read" on public.products for select to anon, authenticated using (is_active or public.is_admin());
create policy "products admin write" on public.products for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "orders owner read" on public.orders for select to authenticated using (customer_id=(select auth.uid()) or public.is_admin());
create policy "orders owner create unpaid" on public.orders for insert to authenticated with check (customer_id=(select auth.uid()) and payment_status='UNPAID');
create policy "order items owner read" on public.order_items for select to authenticated using (exists(select 1 from public.orders o where o.id=order_id and (o.customer_id=(select auth.uid()) or public.is_admin())));
create policy "order items owner insert" on public.order_items for insert to authenticated with check (exists(select 1 from public.orders o where o.id=order_id and o.customer_id=(select auth.uid()) and o.payment_status='UNPAID'));

-- Realtime publication for narrow, user-facing event streams.
alter publication supabase_realtime add table public.notifications;
alter publication supabase_realtime add table public.bookings;
alter publication supabase_realtime add table public.live_locations;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values
 ('avatars','avatars',true,5242880,array['image/jpeg','image/png','image/webp']),
 ('vendor-documents','vendor-documents',false,10485760,array['application/pdf','image/jpeg','image/png']),
 ('vendor-portfolio','vendor-portfolio',false,10485760,array['image/jpeg','image/png','image/webp','application/pdf']),
 ('service-images','service-images',true,5242880,array['image/jpeg','image/png','image/webp']),
 ('product-images','product-images',true,5242880,array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
create policy "public image bucket read" on storage.objects for select to anon, authenticated using (bucket_id in ('avatars','service-images','product-images'));
create policy "user avatar own path write" on storage.objects for insert to authenticated with check (bucket_id='avatars' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy "user avatar own path update" on storage.objects for update to authenticated using (bucket_id='avatars' and (storage.foldername(name))[1]=(select auth.uid())::text) with check (bucket_id='avatars' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy "vendor private documents own path" on storage.objects for all to authenticated using (bucket_id in ('vendor-documents','vendor-portfolio') and (storage.foldername(name))[1]=(select auth.uid())::text) with check (bucket_id in ('vendor-documents','vendor-portfolio') and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy "vendor docs operations read" on storage.objects for select to authenticated using (bucket_id in ('vendor-documents','vendor-portfolio') and public.is_staff_or_admin());
