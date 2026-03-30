-- Run this after schema.sql
-- Update the emails below if you want different accounts.

insert into public.companies (company_name, contact_name, contact_email, region, status)
values (
  'Abdullah Ventures',
  'Partner Operations Team',
  'mdsalmantd5@gmail.com',
  'Bangladesh',
  'Active'
)
on conflict (contact_email) do update
set company_name = excluded.company_name,
    contact_name = excluded.contact_name,
    region = excluded.region,
    status = excluded.status;

insert into public.company_users (company_id, full_name, email, role)
select
  c.id,
  'Partner Operations Team',
  'mdsalmantd5@gmail.com',
  'admin'
from public.companies c
where c.contact_email = 'mdsalmantd5@gmail.com'
on conflict (email) do update
set company_id = excluded.company_id,
    full_name = excluded.full_name,
    role = excluded.role;

insert into public.company_users (company_id, full_name, email, role)
values (
  null,
  'Platform Owner',
  'owner@abdullahventures.com',
  'super_admin'
)
on conflict (email) do update
set company_id = excluded.company_id,
    full_name = excluded.full_name,
    role = excluded.role;

insert into public.company_users (company_id, full_name, email, role)
select
  c.id,
  'John Doe',
  'john@abdullahventures.com',
  'user'
from public.companies c
where c.contact_email = 'mdsalmantd5@gmail.com'
on conflict (email) do update
set company_id = excluded.company_id,
    full_name = excluded.full_name,
    role = excluded.role;

insert into public.company_shipments (
  company_id,
  tracking_id,
  origin_port,
  destination_port,
  cargo_type,
  status,
  eta_delivery
)
select
  c.id,
  'AV-KR-2026-102',
  'Busan Hub, South Korea',
  'Chittagong, Bangladesh',
  'Medical Equipment',
  'IN-TRANSIT',
  '12 April 2026'
from public.companies c
where c.contact_email = 'mdsalmantd5@gmail.com'
on conflict (tracking_id) do update
set company_id = excluded.company_id,
    origin_port = excluded.origin_port,
    destination_port = excluded.destination_port,
    cargo_type = excluded.cargo_type,
    status = excluded.status,
    eta_delivery = excluded.eta_delivery;

insert into public.company_shipments (
  company_id,
  tracking_id,
  origin_port,
  destination_port,
  cargo_type,
  status,
  eta_delivery
)
select
  c.id,
  'AV-ME-2026-333',
  'Dubai, UAE',
  'Dhaka, Bangladesh',
  'Bitumen',
  'CUSTOMS',
  '14 April 2026'
from public.companies c
where c.contact_email = 'mdsalmantd5@gmail.com'
on conflict (tracking_id) do update
set company_id = excluded.company_id,
    origin_port = excluded.origin_port,
    destination_port = excluded.destination_port,
    cargo_type = excluded.cargo_type,
    status = excluded.status,
    eta_delivery = excluded.eta_delivery;

insert into public.company_shipments (
  company_id,
  tracking_id,
  origin_port,
  destination_port,
  cargo_type,
  status,
  eta_delivery
)
select
  c.id,
  'AV-IN-2026-221',
  'Mumbai, India',
  'Dhaka, Bangladesh',
  'Industrial Raw Materials',
  'PENDING',
  '23 April 2026'
from public.companies c
where c.contact_email = 'mdsalmantd5@gmail.com'
on conflict (tracking_id) do update
set company_id = excluded.company_id,
    origin_port = excluded.origin_port,
    destination_port = excluded.destination_port,
    cargo_type = excluded.cargo_type,
    status = excluded.status,
    eta_delivery = excluded.eta_delivery;
