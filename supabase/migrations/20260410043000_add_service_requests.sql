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

drop trigger if exists company_service_requests_set_updated_at on public.company_service_requests;
create trigger company_service_requests_set_updated_at
before update on public.company_service_requests
for each row execute function public.set_updated_at();
