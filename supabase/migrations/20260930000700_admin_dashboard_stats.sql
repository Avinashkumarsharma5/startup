create or replace function public.admin_dashboard_stats()
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare result jsonb;
begin
  if (select auth.uid()) is null or not public.is_staff_or_admin() then raise exception 'Operations access required'; end if;
  select jsonb_build_object(
    'totalLeads',(select count(*) from public.leads),
    'newLeads',(select count(*) from public.leads where status='NEW'),
    'totalBookings',(select count(*) from public.bookings),
    'confirmedBookings',(select count(*) from public.bookings where booking_status in ('CONFIRMED','ASSIGNED','ACCEPTED','ON_THE_WAY','ARRIVED','IN_PROGRESS','COMPLETED')),
    'totalCustomers',(select count(*) from public.profiles where role='CUSTOMER'),
    'totalVendors',(select count(*) from public.vendor_profiles),
    'pendingVendors',(select count(*) from public.vendor_applications where status='PENDING'),
    'completedBookings',(select count(*) from public.bookings where booking_status='COMPLETED'),
    'cancelledBookings',(select count(*) from public.bookings where booking_status='CANCELLED'),
    'activeVendors',(select count(*) from public.vendor_profiles where verification_status='APPROVED'),
    'pendingPayments',(select count(*) from public.payments where status='PENDING'),
    'revenue',case when exists(select 1 from public.profiles where id=(select auth.uid()) and role in ('ADMIN','SUPER_ADMIN'))
      then coalesce((select sum(amount) from public.payments where status='PAID'),0) else 0 end,
    'monthlyStats',(select coalesce(jsonb_agg(jsonb_build_object('month',month,'bookings',bookings,'revenue',revenue) order by month),'[]'::jsonb)
      from (select date_trunc('month',b.created_at)::date as month,count(distinct b.id) as bookings,
        coalesce(sum(case when p.status='PAID' then p.amount else 0 end),0) as revenue
        from public.bookings b left join public.payments p on p.booking_id=b.id
        where b.created_at >= date_trunc('month',now()) - interval '11 months'
        group by date_trunc('month',b.created_at)::date) monthly)
  ) into result;
  return result;
end;
$$;
revoke all on function public.admin_dashboard_stats() from public;
grant execute on function public.admin_dashboard_stats() to authenticated;
