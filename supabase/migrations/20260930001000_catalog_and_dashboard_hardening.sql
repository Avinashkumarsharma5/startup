-- Storefront catalog bootstrap. Conflict-safe so live admin edits are preserved.
insert into public.products(id,name,slug,description,category,price,stock,image_url,is_active) values
('10000000-0000-4000-8000-000000000001','Royal Rajwada Invite','royal-rajwada-invite','Handcrafted velvet box invite with pure gold foil detailing and custom wax seal.','Invitations',15000,15,'/images/invitation01.png',true),
('10000000-0000-4000-8000-000000000002','Golden Acrylic Signage','golden-acrylic-signage','Welcome guests with elegant mirror-gold acrylic signage.','Decor',4500,42,'/images/invitation02.png',true),
('10000000-0000-4000-8000-000000000003','Saffron & Rose Hamper','saffron-rose-hamper','Premium Kashmiri saffron, dried roses, and artisanal sweets.','Gifting',9500,28,'/images/invitation03.png',true),
('10000000-0000-4000-8000-000000000004','Vintage Brass Diya Set','vintage-brass-diya-set','Set of 4 antique-finish brass lamps with traditional carvings.','Decor',12000,8,'/images/invitation04.png',true),
('10000000-0000-4000-8000-000000000005','Floral Varmala Set','floral-varmala-set','Fresh red roses and baby breath garlands.','Essentials',6500,35,'/images/invitation05.png',true),
('10000000-0000-4000-8000-000000000006','Shagun Envelopes (100pc)','shagun-envelopes-100pc','Silk fabric envelopes with coin holder and magnetic closure.','Stationery',2500,150,'/images/invitation06.png',true)
on conflict (slug) do nothing;

-- Recalculate every line item from catalog data, never from browser-supplied prices/totals.
create or replace function public.create_order(p_items jsonb, p_shipping_address jsonb, p_shipping_fee numeric default 0)
returns public.orders language plpgsql security definer set search_path = '' as $$
declare
  customer uuid := (select auth.uid());
  item jsonb;
  product public.products;
  item_count integer;
  subtotal_value numeric(12,2) := 0;
  tax_value numeric(12,2) := 0;
  shipping_value numeric(12,2) := 0;
  order_row public.orders;
begin
  if customer is null then raise exception 'Authentication required'; end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then raise exception 'Order must contain items'; end if;
  if (select count(*) from jsonb_array_elements(p_items)) <> (select count(distinct value->>'product_id') from jsonb_array_elements(p_items)) then raise exception 'Each product may appear only once in the order'; end if;
  for item in select value from jsonb_array_elements(p_items) loop
    item_count := (item->>'quantity')::integer;
    if item_count < 1 or item_count > 100 then raise exception 'Invalid quantity'; end if;
    select * into product from public.products where id=(item->>'product_id')::uuid and is_active for update;
    if not found then raise exception 'Product unavailable'; end if;
    if product.stock < item_count then raise exception 'Insufficient stock for %', product.name; end if;
    subtotal_value := subtotal_value + product.price * item_count;
    if product.category='Single Items' then tax_value := tax_value + round(product.price * item_count * 0.18,2); end if;
  end loop;
  -- Shipping and tax are policy-calculated; p_shipping_fee is ignored by design.
  if tax_value > 0 and subtotal_value + tax_value < 999 then shipping_value := 50; end if;
  insert into public.orders(customer_id,subtotal,shipping_fee,total_amount,shipping_address,payment_status)
    values(customer,subtotal_value,shipping_value,subtotal_value+tax_value+shipping_value,coalesce(p_shipping_address,'{}'::jsonb),'UNPAID') returning * into order_row;
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

-- End provider sharing at the database boundary for every path that ends a booking.
create or replace function public.stop_location_for_ended_booking()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.booking_status in ('COMPLETED','CANCELLED','REJECTED') and new.booking_status is distinct from old.booking_status then
    update public.live_locations set is_sharing=false,updated_at=now() where booking_id=new.id and is_sharing;
  end if;
  return new;
end;
$$;
drop trigger if exists bookings_stop_location on public.bookings;
create trigger bookings_stop_location after update of booking_status on public.bookings
for each row execute procedure public.stop_location_for_ended_booking();

-- Operational dashboard counts only; payments and revenue remain out of scope.
create or replace function public.admin_dashboard_stats()
returns jsonb language plpgsql stable security definer set search_path = '' as $$
begin
  if (select auth.uid()) is null or not public.is_staff_or_admin() then raise exception 'Operations access required'; end if;
  return jsonb_build_object(
    'totalUsers',(select count(*) from public.profiles),
    'totalCustomers',(select count(*) from public.profiles where role='CUSTOMER'),
    'totalVendors',(select count(*) from public.profiles where role='VENDOR'),
    'totalPandits',(select count(*) from public.profiles where role='PANDIT'),
    'totalBookings',(select count(*) from public.bookings),
    'confirmedBookings',(select count(*) from public.bookings where booking_status in ('CONFIRMED','ASSIGNED','ACCEPTED','ON_THE_WAY','ARRIVED','IN_PROGRESS','COMPLETED')),
    'completedBookings',(select count(*) from public.bookings where booking_status='COMPLETED'),
    'cancelledBookings',(select count(*) from public.bookings where booking_status='CANCELLED'),
    'totalOrders',(select count(*) from public.orders),
    'totalProducts',(select count(*) from public.products),
    'pendingApplications',(select count(*) from public.vendor_applications where status='PENDING'),
    'approvedApplications',(select count(*) from public.vendor_applications where status='APPROVED'),
    'totalLeads',(select count(*) from public.leads),
    'newLeads',(select count(*) from public.leads where status='NEW'),
    'totalReviews',(select count(*) from public.reviews),
    'unreadNotifications',(select count(*) from public.notifications where not is_read)
  );
end;
$$;
revoke all on function public.admin_dashboard_stats() from public;
grant execute on function public.admin_dashboard_stats() to authenticated;

-- Puja kits single-item inventory; stable IDs derive from the UI item ID.
insert into public.products(id,name,slug,description,category,price,stock,image_url,is_active) values
('10000000-0000-4000-8000-000000000101','Nariyal / नारियल','puja-single-101','Nariyal / नारियल','Single Items',25,0,'/images/coconut.png',true),
('10000000-0000-4000-8000-000000000105','Flower Garland / फूल माला','puja-single-105','Flower Garland / फूल माला','Single Items',40,0,'/images/flower.png',true),
('10000000-0000-4000-8000-000000000106','Marigold Flowers / गेंदे के फूल','puja-single-106','Marigold Flowers / गेंदे के फूल','Single Items',40,0,'/images/marigold.png',true),
('10000000-0000-4000-8000-000000000107','Rose Petals / गुलाब की पंखुड़ी','puja-single-107','Rose Petals / गुलाब की पंखुड़ी','Single Items',30,0,'/images/rose.png',true),
('10000000-0000-4000-8000-000000000108','Agarbatti / अगरबत्ती','puja-single-108','Agarbatti / अगरबत्ती','Single Items',15,0,'/images/agarbati.png',true),
('10000000-0000-4000-8000-000000000109','Dhoop Sticks / धूप','puja-single-109','Dhoop Sticks / धूप','Single Items',60,0,'/images/dhup.png',true),
('10000000-0000-4000-8000-000000000110','Guggal / गुग्गुल','puja-single-110','Guggal / गुग्गुल','Single Items',10,0,'/images/guggal.png',true),
('10000000-0000-4000-8000-000000000111','Loban / लोबान','puja-single-111','Loban / लोबान','Single Items',45,0,'/images/loban.png',true),
('10000000-0000-4000-8000-000000000112','Kapoor / कपूर','puja-single-112','Kapoor / कपूर','Single Items',25,0,'/images/kapoor.png',true),
('10000000-0000-4000-8000-000000000113','Havan Samagri / हवन सामग्री','puja-single-113','Havan Samagri / हवन सामग्री','Single Items',60,0,'/images/havan-samagri.png',true),
('10000000-0000-4000-8000-000000000114','Samidha Sticks / समिधा','puja-single-114','Samidha Sticks / समिधा','Single Items',30,0,'/images/samidha.png',true),
('10000000-0000-4000-8000-000000000115','Ghee Bottle / घी','puja-single-115','Ghee Bottle / घी','Single Items',120,0,'/images/ghee.png',true),
('10000000-0000-4000-8000-000000000116','Camphor Tablets / कपूर टेबलेट','puja-single-116','Camphor Tablets / कपूर टेबलेट','Single Items',40,0,'/images/capoor-table.png',true),
('10000000-0000-4000-8000-000000000117','Ghee Batti / घी बत्ती','puja-single-117','Ghee Batti / घी बत्ती','Single Items',50,0,'/images/capoor-table.png',true),
('10000000-0000-4000-8000-000000000118','Cotton Wick / बाती','puja-single-118','Cotton Wick / बाती','Single Items',20,0,'/images/cotton-bati.png',true),
('10000000-0000-4000-8000-000000000119','Clay Diya / मिट्टी का दिया','puja-single-119','Clay Diya / मिट्टी का दिया','Single Items',10,0,'/images/clay-diya.png',true),
('10000000-0000-4000-8000-000000000121','Roli / रोली','puja-single-121','Roli / रोली','Single Items',15,0,'/images/roli.png',true),
('10000000-0000-4000-8000-000000000122','Chawal (Akshat) / अक्षत','puja-single-122','Chawal (Akshat) / अक्षत','Single Items',20,0,'/images/akchat.png',true),
('10000000-0000-4000-8000-000000000123','Sindoor / सिंदूर','puja-single-123','Sindoor / सिंदूर','Single Items',20,0,'/images/sindoor.png',true),
('10000000-0000-4000-8000-000000000124','Haldi Powder / हल्दी','puja-single-124','Haldi Powder / हल्दी','Single Items',20,0,'/images/haldi.png',true),
('10000000-0000-4000-8000-000000000125','Kumkum / कुमकुम','puja-single-125','Kumkum / कुमकुम','Single Items',20,0,'/images/kumkum.png',true),
('10000000-0000-4000-8000-000000000126','Panchamrit Pack / पंचामृत','puja-single-126','Panchamrit Pack / पंचामृत','Single Items',60,0,'/images/panchamrit.png',true),
('10000000-0000-4000-8000-000000000127','Mishri / मिश्री','puja-single-127','Mishri / मिश्री','Single Items',20,0,'/images/misri.png',true),
('10000000-0000-4000-8000-000000000128','Dry Fruits Mix / ड्राई फ्रूट्स','puja-single-128','Dry Fruits Mix / ड्राई फ्रूट्स','Single Items',70,0,'/images/dry-fruit.png',true),
('10000000-0000-4000-8000-000000000129','Laddu Prasad / लड्डू प्रसाद','puja-single-129','Laddu Prasad / लड्डू प्रसाद','Single Items',50,0,'/images/ladoo.png',true),
('10000000-0000-4000-8000-000000000130','Jaggery / गुड़','puja-single-130','Jaggery / गुड़','Single Items',30,0,'/images/jaggery.png',true),
('10000000-0000-4000-8000-000000000131','Red Cloth / लाल कपड़ा','puja-single-131','Red Cloth / लाल कपड़ा','Single Items',40,0,'/images/lal-cloth.png',true),
('10000000-0000-4000-8000-000000000132','Yellow Cloth / पीला कपड़ा','puja-single-132','Yellow Cloth / पीला कपड़ा','Single Items',40,0,'/images/yellow-cloths.png',true),
('10000000-0000-4000-8000-000000000133','Dupatta Chunri / चुनरी','puja-single-133','Dupatta Chunri / चुनरी','Single Items',50,0,'/images/chunri.png',true),
('10000000-0000-4000-8000-000000000134','Puja Bell / घंटी','puja-single-134','Puja Bell / घंटी','Single Items',60,0,'/images/bell.png',true),
('10000000-0000-4000-8000-000000000135','Kalash / कलश','puja-single-135','Kalash / कलश','Single Items',120,0,'/images/kalas.png',true),
('10000000-0000-4000-8000-000000000136','Steel Plate / थाली','puja-single-136','Steel Plate / थाली','Single Items',80,0,'/images/steel-plate.png',true),
('10000000-0000-4000-8000-000000000137','Gangajal / गंगाजल','puja-single-137','Gangajal / गंगाजल','Single Items',25,0,'/images/ganga-jal.png',true),
('10000000-0000-4000-8000-000000000138','Honey / शहद','puja-single-138','Honey / शहद','Single Items',30,0,'/images/honey.png',true),
('10000000-0000-4000-8000-000000000139','Black Sesame / काला तिल','puja-single-139','Black Sesame / काला तिल','Single Items',20,0,'/images/kala-til.png',true),
('10000000-0000-4000-8000-000000000140','Sugar / शक्कर','puja-single-140','Sugar / शक्कर','Single Items',20,0,'/images/suger.png',true),
('10000000-0000-4000-8000-000000000141','Matchbox / माचिस','puja-single-141','Matchbox / माचिस','Single Items',10,0,'/images/matchbox.png',true),
('10000000-0000-4000-8000-000000000142','Moli / मौली','puja-single-142','Moli / मौली','Single Items',10,0,'/images/moli.png',true),
('10000000-0000-4000-8000-000000000143','Supari / सुपारी','puja-single-143','Supari / सुपारी','Single Items',15,0,'/images/supari.png',true),
('10000000-0000-4000-8000-000000000144','Betel Leaves / पान के पत्ते','puja-single-144','Betel Leaves / पान के पत्ते','Single Items',10,0,'/images/pan-patta.png',true),
('10000000-0000-4000-8000-000000000145','Camphor Oil / कपूर तेल','puja-single-145','Camphor Oil / कपूर तेल','Single Items',50,0,'/images/kapoor-oil.png',true)
on conflict do nothing;
