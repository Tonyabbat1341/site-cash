-- MyAI Dev Studio schema (MVP)

create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- Profiles (linked to auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  plan text default 'free',
  created_at timestamp with time zone default now()
);

-- Projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamp with time zone default now()
);

-- Workflows
create table if not exists public.workflows (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  owner_id uuid references auth.users(id) on delete cascade,
  name text not null,
  graph_json jsonb not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists idx_workflows_owner on public.workflows(owner_id);
create index if not exists idx_workflows_project on public.workflows(project_id);

-- API tokens (optional MVP placeholder)
create table if not exists public.api_tokens (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  provider text not null,
  token text not null,
  created_at timestamp with time zone default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.workflows enable row level security;
alter table public.api_tokens enable row level security;

create policy "profiles self" on public.profiles
  for select using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "projects owner" on public.projects
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "workflows owner" on public.workflows
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "api_tokens owner" on public.api_tokens
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

