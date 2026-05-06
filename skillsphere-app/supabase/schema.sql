-- SQL Schema for SkillSphere

-- profiles (extends auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  interests text[] default '{}',
  streak_days int default 0,
  xp_points int default 0,
  updated_at timestamptz default now()
);

-- user_progress
create table user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  course_id text not null,
  pct_complete int default 0,
  updated_at timestamptz default now()
);

-- test_attempts
create table test_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  category text,
  score int,
  total int,
  taken_at timestamptz default now()
);

-- certifications
create table certifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  cert_name text,
  status text check (status in ('earned','pending','locked')),
  earned_at timestamptz
);

-- Turn on RLS
alter table profiles enable row level security;
alter table user_progress enable row level security;
alter table test_attempts enable row level security;
alter table certifications enable row level security;

-- Policies
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

create policy "Users can view own progress" on user_progress for select using (auth.uid() = user_id);
create policy "Users can update own progress" on user_progress for all using (auth.uid() = user_id);

create policy "Users can view own attempts" on test_attempts for select using (auth.uid() = user_id);
create policy "Users can insert own attempts" on test_attempts for insert with check (auth.uid() = user_id);

create policy "Users can view own certs" on certifications for select using (auth.uid() = user_id);
