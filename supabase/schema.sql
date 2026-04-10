create extension if not exists pgcrypto;

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null,
  contact_email text not null unique,
  region text not null,
  status text not null default 'Active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.company_shipments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  tracking_id text not null unique,
  origin_port text not null,
  destination_port text not null,
  cargo_type text not null,
  status text not null default 'PENDING',
  eta_delivery text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.company_service_requests (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  requester_name text not null,
  requester_email text not null,
  contact_number text,
  service_name text not null,
  service_details text,
  status text not null default 'REQUESTED',
  progress_percent integer not null default 0 check (progress_percent >= 0 and progress_percent <= 100),
  admin_note text,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.partnership_requests (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  company_name text not null,
  contact_name text not null,
  contact_email text not null,
  region text not null,
  notes text,
  status text not null default 'Pending',
  created_at timestamptz not null default now()
);

create table if not exists public.company_users (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  role text not null default 'user',
  created_at timestamptz not null default now()
);

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

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists companies_set_updated_at on public.companies;
create trigger companies_set_updated_at
before update on public.companies
for each row execute function public.set_updated_at();

drop trigger if exists company_shipments_set_updated_at on public.company_shipments;
create trigger company_shipments_set_updated_at
before update on public.company_shipments
for each row execute function public.set_updated_at();

drop trigger if exists company_service_requests_set_updated_at on public.company_service_requests;
create trigger company_service_requests_set_updated_at
before update on public.company_service_requests
for each row execute function public.set_updated_at();

drop trigger if exists portal_user_profiles_set_updated_at on public.portal_user_profiles;
create trigger portal_user_profiles_set_updated_at
before update on public.portal_user_profiles
for each row execute function public.set_updated_at();

insert into public.companies (company_name, contact_name, contact_email, region, status)
values ('Abdullah Ventures', 'Partner Operations Team', 'mdsalmantd5@gmail.com', 'Bangladesh', 'Active')
on conflict (contact_email) do update
set company_name = excluded.company_name,
    contact_name = excluded.contact_name,
    region = excluded.region,
    status = excluded.status;

insert into public.company_shipments (company_id, tracking_id, origin_port, destination_port, cargo_type, status, eta_delivery)
select c.id, 'AV-KR-2026-102', 'Busan Hub, South Korea', 'Chittagong, Bangladesh', 'Medical Equipment', 'IN-TRANSIT', '12 April 2026'
from public.companies c
where c.contact_email = 'mdsalmantd5@gmail.com'
on conflict (tracking_id) do update
set origin_port = excluded.origin_port,
    destination_port = excluded.destination_port,
    cargo_type = excluded.cargo_type,
    status = excluded.status,
    eta_delivery = excluded.eta_delivery;

insert into public.company_shipments (company_id, tracking_id, origin_port, destination_port, cargo_type, status, eta_delivery)
select c.id, 'AV-ME-2026-333', 'Dubai, UAE', 'Dhaka, Bangladesh', 'Bitumen', 'CUSTOMS', '14 April 2026'
from public.companies c
where c.contact_email = 'mdsalmantd5@gmail.com'
on conflict (tracking_id) do update
set origin_port = excluded.origin_port,
    destination_port = excluded.destination_port,
    cargo_type = excluded.cargo_type,
    status = excluded.status,
    eta_delivery = excluded.eta_delivery;

insert into public.company_users (company_id, full_name, email, role)
select c.id, 'Partner Operations Team', 'mdsalmantd5@gmail.com', 'admin'
from public.companies c
where c.contact_email = 'mdsalmantd5@gmail.com'
on conflict (email) do update
set company_id = excluded.company_id,
    full_name = excluded.full_name,
    role = excluded.role;

insert into public.company_service_requests (
  company_id,
  requester_name,
  requester_email,
  contact_number,
  service_name,
  service_details,
  status,
  progress_percent,
  admin_note
)
select
  c.id,
  'Partner Operations Team',
  'mdsalmantd5@gmail.com',
  '+8801700000001',
  'Licensing & regulatory approvals',
  'Need end-to-end support for licenses and regulatory approvals for initial operations.',
  'IN_PROGRESS',
  60,
  'Primary regulator submission is in progress.'
from public.companies c
where c.contact_email = 'mdsalmantd5@gmail.com'
and not exists (
  select 1
  from public.company_service_requests csr
  where csr.company_id = c.id
    and csr.requester_email = 'mdsalmantd5@gmail.com'
    and csr.service_name = 'Licensing & regulatory approvals'
);
