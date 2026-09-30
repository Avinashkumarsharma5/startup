drop policy if exists "applications owner update pending" on public.vendor_applications;
drop policy if exists "payment customer create unpaid" on public.payments;
drop policy if exists "review owner update" on public.reviews;
drop policy if exists "orders owner create unpaid" on public.orders;
drop policy if exists "order items owner insert" on public.order_items;

create or replace function public.guard_profile_update()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then raise exception 'Role changes require an administrator'; end if;
  if new.status is distinct from old.status and not public.is_admin() then raise exception 'Profile status changes require an administrator'; end if;
  if new.email is distinct from old.email and not public.is_admin() then raise exception 'Email changes must be made through Supabase Auth'; end if;
  new.updated_at = now(); return new;
end;
$$;

create or replace function public.guard_vendor_profile_update()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.verification_status is distinct from old.verification_status and not public.is_admin() then
    raise exception 'Vendor verification status is controlled by operations';
  end if;
  new.updated_at = now(); return new;
end;
$$;
drop trigger if exists vendor_profiles_guard_update on public.vendor_profiles;
create trigger vendor_profiles_guard_update before update on public.vendor_profiles for each row execute procedure public.guard_vendor_profile_update();

create or replace function public.guard_vendor_application_review_fields()
returns trigger language plpgsql set search_path = '' as $$
begin
  if not public.is_admin() then
    if tg_op='INSERT' and (new.status <> 'PENDING' or new.reviewed_at is not null or new.reviewed_by is not null or new.rejection_reason is not null) then
      raise exception 'Vendor review fields are controlled by operations';
    elsif tg_op='UPDATE' and (new.status is distinct from old.status or new.reviewed_at is distinct from old.reviewed_at or
      new.reviewed_by is distinct from old.reviewed_by or new.rejection_reason is distinct from old.rejection_reason) then
      raise exception 'Vendor review fields are controlled by operations';
    end if;
  end if;
  new.updated_at=now(); return new;
end;
$$;
drop trigger if exists vendor_applications_guard_review_fields on public.vendor_applications;
create trigger vendor_applications_guard_review_fields before insert or update on public.vendor_applications
  for each row execute procedure public.guard_vendor_application_review_fields();

create or replace function public.guard_notification_update()
returns trigger language plpgsql set search_path = '' as $$
begin
  if not public.is_staff_or_admin() and (new.recipient_id is distinct from old.recipient_id or new.type is distinct from old.type or
    new.title is distinct from old.title or new.message is distinct from old.message or new.data is distinct from old.data or
    new.created_at is distinct from old.created_at) then raise exception 'Notification content is immutable'; end if;
  return new;
end;
$$;
drop trigger if exists notifications_guard_update on public.notifications;
create trigger notifications_guard_update before update on public.notifications for each row execute procedure public.guard_notification_update();

create or replace function public.create_order(p_items jsonb, p_shipping_address jsonb, p_shipping_fee numeric default 0)
returns public.orders language plpgsql security definer set search_path = '' as $$
declare
  customer uuid := (select auth.uid());
  item jsonb;
  product public.products;
  item_count integer;
  subtotal_value numeric(12,2) := 0;
  order_row public.orders;
begin
  if customer is null then raise exception 'Authentication required'; end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then raise exception 'Order must contain items'; end if;
  if (select count(*) from jsonb_array_elements(p_items)) <> (select count(distinct value->>'product_id') from jsonb_array_elements(p_items)) then
    raise exception 'Each product may appear only once in the order';
  end if;
  if p_shipping_fee < 0 then raise exception 'Invalid shipping fee'; end if;
  for item in select value from jsonb_array_elements(p_items) loop
    item_count := (item->>'quantity')::integer;
    if item_count < 1 then raise exception 'Invalid quantity'; end if;
    select * into product from public.products where id=(item->>'product_id')::uuid and is_active for update;
    if not found then raise exception 'Product unavailable'; end if;
    if product.stock < item_count then raise exception 'Insufficient stock for %', product.name; end if;
    subtotal_value := subtotal_value + product.price * item_count;
  end loop;
  insert into public.orders(customer_id,subtotal,shipping_fee,total_amount,shipping_address)
    values(customer,subtotal_value,p_shipping_fee,subtotal_value+p_shipping_fee,coalesce(p_shipping_address,'{}'::jsonb)) returning * into order_row;
  for item in select value from jsonb_array_elements(p_items) loop
    item_count := (item->>'quantity')::integer;
    select * into product from public.products where id=(item->>'product_id')::uuid for update;
    insert into public.order_items(order_id,product_id,quantity,unit_price,total_price)
      values(order_row.id,product.id,item_count,product.price,product.price*item_count);
    update public.products set stock=stock-item_count,updated_at=now() where id=product.id;
  end loop;
  return order_row;
end;
$$;
revoke all on function public.create_order(jsonb,jsonb,numeric) from public;
grant execute on function public.create_order(jsonb,jsonb,numeric) to authenticated;
