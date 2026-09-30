alter table public.vendor_applications
  add column if not exists applicant_name text,
  add column if not exists location_text text,
  add column if not exists services text[] not null default '{}',
  add column if not exists experience text,
  add column if not exists certifications text,
  add column if not exists pricing text,
  add column if not exists bank_name text,
  add column if not exists files_meta jsonb not null default '{}';

create or replace function public.review_vendor_application(p_application_id uuid, p_status public.vendor_status, p_rejection_reason text default null)
returns public.vendor_applications language plpgsql security definer set search_path = '' as $$
declare a public.vendor_applications; reviewer uuid := (select auth.uid());
begin
  if reviewer is null or not public.is_admin() then raise exception 'Administrator privileges required'; end if;
  if p_status not in ('APPROVED','REJECTED','SUSPENDED') then raise exception 'Invalid review status'; end if;
  update public.vendor_applications set status=p_status, rejection_reason=case when p_status='REJECTED' then p_rejection_reason else null end,
    reviewed_at=now(), reviewed_by=reviewer, updated_at=now()
    where id=p_application_id returning * into a;
  if not found then raise exception 'Application not found'; end if;
  update public.profiles set role=case when p_status='APPROVED' then 'VENDOR'::public.app_role when p_status='SUSPENDED' then role else 'CUSTOMER'::public.app_role end,
    updated_at=now() where id=a.user_id;
  if p_status='APPROVED' then
    insert into public.vendor_profiles(user_id,vendor_type,business_name,description,phone,email,address,city,state,pincode,verification_status)
    values(a.user_id,a.vendor_type,a.business_name,a.experience,a.phone,a.email,a.address,a.city,a.state,a.pincode,'APPROVED')
    on conflict(user_id) do update set vendor_type=excluded.vendor_type,business_name=excluded.business_name,description=excluded.description,
      phone=excluded.phone,email=excluded.email,address=excluded.address,city=excluded.city,state=excluded.state,pincode=excluded.pincode,
      verification_status='APPROVED',updated_at=now();
  else
    update public.vendor_profiles set verification_status=p_status, updated_at=now() where user_id=a.user_id;
  end if;
  return a;
end;
$$;
revoke all on function public.review_vendor_application(uuid, public.vendor_status, text) from public;
grant execute on function public.review_vendor_application(uuid, public.vendor_status, text) to authenticated;
