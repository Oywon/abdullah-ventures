# Setup Guide

## 1. Install project dependencies

```powershell
npm install
```

## 2. Configure `.env`

Set these values in `.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_PARTNER_DEMO_EMAIL=mdsalmantd5@gmail.com
VITE_ADMIN_EMAIL=mdsalmantd5@gmail.com
```

## 3. Prepare Supabase

Open Supabase SQL Editor and run these files in order:

1. `supabase/schema.sql`
2. `supabase/seed_admin_setup.sql`

That creates the tables and seeds:

- company admin: `mdsalmantd5@gmail.com`
- normal user: `john@abdullahventures.com`
- super admin: `owner@abdullahventures.com`

## 4. Create the same users in Clerk

Create Clerk accounts using the exact same email addresses:

- `mdsalmantd5@gmail.com`
- `john@abdullahventures.com`
- `owner@abdullahventures.com`

The email must match `company_users.email`.

## 5. Start the app

```powershell
npm run dev
```

Open:

```text
http://localhost:5173
```

## 6. Login behavior

- `mdsalmantd5@gmail.com`
  role: `admin`
  access: own company data and `/admin`

- `john@abdullahventures.com`
  role: `user`
  access: dashboard only

- `owner@abdullahventures.com`
  role: `super_admin`
  access: all companies, all users, all shipments, full admin

## Useful commands

Development server:

```powershell
npm run dev
```

Production build:

```powershell
npm run build
```

Run tests:

```powershell
npm run test
```

## If admin does not work

Check:

1. `schema.sql` ran successfully.
2. `seed_admin_setup.sql` ran successfully.
3. The Clerk email exactly matches the seeded email.
4. The user exists in `company_users` with role `admin` or `super_admin`.
