create table if not exists public.portal_user_profiles (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text,
  contact_number text,
  address_line text,
  city text,
  country text,
  company_name text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists portal_user_profiles_set_updated_at on public.portal_user_profiles;
create trigger portal_user_profiles_set_updated_at
before update on public.portal_user_profiles
for each row execute function public.set_updated_at();
