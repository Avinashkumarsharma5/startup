create table public.leads (
  id uuid primary key default gen_random_uuid(), user_id uuid references public.profiles(id) on delete set null,
  name text not null, phone text not null, email text, city text, service text not null default 'General Enquiry',
  event_type text, event_date date, event_time text, budget text, address text, message text,
  source text not null default 'Website', campaign text, medium text, content text, term text, landing_page text, referrer text,
  status text not null default 'NEW' check (status in ('NEW','CONTACTED','QUALIFIED','QUOTE_SENT','FOLLOW_UP','BOOKED','COMPLETED','LOST','CANCELLED')),
  priority text not null default 'MEDIUM' check (priority in ('LOW','MEDIUM','HIGH','URGENT')),
  assigned_to text, assigned_vendor_id uuid references public.vendor_profiles(id), notes text,
  last_contacted_at timestamptz, next_follow_up_at timestamptz,
  history jsonb not null default '[]', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index leads_created_idx on public.leads(created_at desc);
create index leads_status_idx on public.leads(status,created_at desc);
create index leads_service_city_idx on public.leads(service,city);
alter table public.leads enable row level security;
create policy "leads public submit" on public.leads for insert to anon, authenticated
  with check (status='NEW' and assigned_to is null and assigned_vendor_id is null and (user_id is null or user_id=(select auth.uid())));
create policy "leads operations read" on public.leads for select to authenticated using (public.is_staff_or_admin());

create or replace function public.guard_lead_submit()
returns trigger language plpgsql set search_path = '' as $$
begin
  if not public.is_staff_or_admin() then
    new.status='NEW'; new.priority='MEDIUM'; new.assigned_to=null; new.assigned_vendor_id=null;
    new.notes=null; new.last_contacted_at=null; new.next_follow_up_at=null; new.history='[]'::jsonb;
  end if;
  new.updated_at=now(); return new;
end;
$$;
create trigger leads_guard_submit before insert on public.leads for each row execute procedure public.guard_lead_submit();

create or replace function public.update_lead_status(p_lead_id uuid, p_status text, p_changed_by text default null)
returns public.leads language plpgsql security definer set search_path = '' as $$
declare l public.leads;
begin
  if (select auth.uid()) is null or not public.is_staff_or_admin() then raise exception 'Operations access required'; end if;
  if p_status not in ('NEW','CONTACTED','QUALIFIED','QUOTE_SENT','FOLLOW_UP','BOOKED','COMPLETED','LOST','CANCELLED') then raise exception 'Invalid lead status'; end if;
  update public.leads set status=p_status, updated_at=now(), last_contacted_at=case when p_status in ('CONTACTED','QUALIFIED','QUOTE_SENT','FOLLOW_UP') then now() else last_contacted_at end,
    history=history || jsonb_build_array(jsonb_build_object('status',p_status,'changedBy',coalesce(p_changed_by,'operations'),'changedAt',now()))
    where id=p_lead_id returning * into l;
  if not found then raise exception 'Lead not found'; end if;
  return l;
end;
$$;
revoke all on function public.update_lead_status(uuid,text,text) from public;
grant execute on function public.update_lead_status(uuid,text,text) to authenticated;
