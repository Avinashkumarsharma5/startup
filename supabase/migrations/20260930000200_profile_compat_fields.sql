alter table public.profiles
  add column if not exists date_of_birth date,
  add column if not exists gender text,
  add column if not exists address text,
  add column if not exists city text,
  add column if not exists state text,
  add column if not exists phone_verified boolean not null default false;
