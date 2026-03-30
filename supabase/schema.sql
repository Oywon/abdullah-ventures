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
