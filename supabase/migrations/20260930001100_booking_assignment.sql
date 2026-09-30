create or replace function public.assign_booking(p_booking_id uuid,p_provider_id uuid)
returns public.bookings language plpgsql security definer set search_path = '' as $$
declare b public.bookings;
begin
  if (select auth.uid()) is null or not public.is_admin() then raise exception 'Administrator privileges required'; end if;
  if not exists(select 1 from public.vendor_profiles v join public.profiles p on p.id=v.user_id
    where v.user_id=p_provider_id and v.verification_status='APPROVED' and p.role in ('VENDOR','PANDIT')) then
    raise exception 'Provider must have an approved vendor profile';
  end if;
  update public.bookings set provider_id=p_provider_id,booking_status='ASSIGNED',updated_at=now()
    where id=p_booking_id and provider_id is null and booking_status in ('PENDING','CONFIRMED') returning * into b;
  if not found then raise exception 'Booking is no longer available for assignment'; end if;
  return b;
end;
$$;
revoke all on function public.assign_booking(uuid,uuid) from public,anon;
grant execute on function public.assign_booking(uuid,uuid) to authenticated;

create or replace function public.update_pending_booking_details(
  p_booking_id uuid,
  p_event_date date,
  p_start_time time,
  p_address text,
  p_notes text
)
returns public.bookings language plpgsql security definer set search_path = '' as $$
declare b public.bookings;
begin
  if (select auth.uid()) is null then raise exception 'Authentication required'; end if;
  if p_address is not null and length(p_address)>1000 then raise exception 'Address is too long'; end if;
  if p_notes is not null and length(p_notes)>4000 then raise exception 'Notes are too long'; end if;
  update public.bookings set event_date=p_event_date,start_time=p_start_time,address=p_address,notes=p_notes,updated_at=now()
    where id=p_booking_id and customer_id=(select auth.uid()) and provider_id is null and booking_status='PENDING'
    returning * into b;
  if not found then raise exception 'Only your unassigned pending bookings can be edited'; end if;
  return b;
end;
$$;
revoke all on function public.update_pending_booking_details(uuid,date,time,text,text) from public,anon;
grant execute on function public.update_pending_booking_details(uuid,date,time,text,text) to authenticated;
