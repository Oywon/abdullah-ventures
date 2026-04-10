create table if not exists public.company_service_requests (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  requester_name text not null,
  requester_email text not null,
  service_name text not null,
  service_details text,
  status text not null default 'REQUESTED',
  progress_percent integer not null default 0 check (progress_percent >= 0 and progress_percent <= 100),
  admin_note text,
  completed_at timestamptz,
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

drop trigger if exists company_service_requests_set_updated_at on public.company_service_requests;
create trigger company_service_requests_set_updated_at
before update on public.company_service_requests
for each row execute function public.set_updated_at();

insert into public.company_service_requests (
  company_id,
  requester_name,
  requester_email,
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
