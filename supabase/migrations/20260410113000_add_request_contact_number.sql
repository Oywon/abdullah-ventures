alter table if exists public.company_service_requests
add column if not exists contact_number text;
