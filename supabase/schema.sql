-- Supabase schema for the app
-- Run in Supabase SQL editor or via psql using the service role key

-- Ensure uuid generation is available
create extension if not exists "pgcrypto";

-- Income
create table if not exists income (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  date date not null,
  source text check (source in ('SALARY','AI_FACTORY','AI_CONTENT','AI_SAAS','MUSIC')),
  amount numeric not null,
  recurring boolean default false,
  notes text,
  created_at timestamptz default now()
);

-- Clients
create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  name text not null,
  businessType text,
  service text,
  status text,
  monthlyValue numeric,
  startDate date,
  created_at timestamptz default now()
);

-- Outreach
create table if not exists outreach (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  platform text,
  sent boolean,
  replied boolean,
  date date,
  created_at timestamptz default now()
);

-- Music releases
create table if not exists music_releases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  artist text,
  title text,
  platform text,
  streams integer,
  release_date date,
  created_at timestamptz default now()
);

-- Discipline
create table if not exists discipline (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  date date,
  plannedHours integer,
  workedHours integer,
  completed boolean,
  created_at timestamptz default now()
);

-- Enable RLS and create basic policies per table (restrict to owner)

alter table income enable row level security;
create policy "Users manage own income" on income for all using (auth.uid() = user_id);

alter table clients enable row level security;
create policy "Users manage own clients" on clients for all using (auth.uid() = user_id);

alter table outreach enable row level security;
create policy "Users manage own outreach" on outreach for all using (auth.uid() = user_id);

alter table music_releases enable row level security;
create policy "Users manage own releases" on music_releases for all using (auth.uid() = user_id);

alter table discipline enable row level security;
create policy "Users manage own discipline" on discipline for all using (auth.uid() = user_id);

-- Add default policies for authenticated users to insert (allows users to insert rows with their user_id)
-- Optionally create additional policies for admins as needed

