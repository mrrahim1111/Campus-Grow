-- ============================================================
-- Migration: 20261011_update_all_tables.sql
-- CampusGrow – Comprehensive Database Tables Update
-- Safe migration: alters existing tables with missing columns
-- and creates all new tables, indexes, and RLS policies.
-- ============================================================

-- ── 1. Enable Required Extensions ───────────────────────────
create extension if not exists "uuid-ossp";

-- ── 2. Update Profiles Table ────────────────────────────────
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text not null,
  name         text,
  branch       text,
  year         text,
  avatar_url   text,
  is_pro       boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.profiles
  add column if not exists role_target text,
  add column if not exists current_semester text,
  add column if not exists streak_days integer not null default 0,
  add column if not exists xp_points integer not null default 0;

-- ── 3. Update Subscriptions Table ───────────────────────────
create table if not exists public.subscriptions (
  id                     uuid primary key default uuid_generate_v4(),
  user_id                uuid not null unique references public.profiles(id) on delete cascade,
  stripe_customer_id     text unique,
  stripe_subscription_id text unique,
  stripe_price_id        text,
  razorpay_subscription_id text unique,
  razorpay_payment_id    text,
  plan                   text not null default 'free',
  billing_cycle          text,
  status                 text not null default 'inactive',
  current_period_start   timestamptz,
  current_period_end     timestamptz,
  cancel_at_period_end   boolean default false,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

alter table public.subscriptions
  add column if not exists razorpay_subscription_id text,
  add column if not exists razorpay_payment_id text,
  add column if not exists cancel_at_period_end boolean default false;

create unique index if not exists subscriptions_user_id_key
  on public.subscriptions (user_id);

create unique index if not exists subscriptions_razorpay_subscription_id_key
  on public.subscriptions (razorpay_subscription_id)
  where razorpay_subscription_id is not null;

-- ── 4. Update Student Data Table ────────────────────────────
create table if not exists public.student_data (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid not null references public.profiles(id) on delete cascade unique,
  interests           text[],
  goal                text,
  knowledge_level     text,
  target_role         text,
  study_hours_weekly  integer,
  tech_skills         text[],
  role_discovery_data jsonb,
  updated_at          timestamptz not null default now()
);

alter table public.student_data
  add column if not exists target_role text,
  add column if not exists study_hours_weekly integer,
  add column if not exists tech_skills text[],
  add column if not exists role_discovery_data jsonb;

-- ── 5. Update Lesson Progress Table (Date Started, Ended & 5-Stars) ──
create table if not exists public.lesson_progress (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references public.profiles(id) on delete cascade,
  lesson_id        text not null,
  lesson_title     text,
  category         text,
  track_name       text,
  completed        boolean not null default false,
  date_started     timestamptz,
  date_ended       timestamptz,
  duration_minutes integer not null default 0,
  quiz_score       integer not null default 0,
  quiz_total       integer not null default 0,
  quiz_percentage  numeric(5,2) not null default 0,
  stars            integer not null default 0 check (stars >= 0 and stars <= 5),
  performance_tier text default 'Mastery',
  status           text not null default 'completed',
  completed_at     timestamptz,
  updated_at       timestamptz not null default now(),
  unique(user_id, lesson_id)
);

alter table public.lesson_progress
  add column if not exists lesson_title text,
  add column if not exists category text,
  add column if not exists track_name text,
  add column if not exists date_started timestamptz,
  add column if not exists date_ended timestamptz,
  add column if not exists duration_minutes integer not null default 0,
  add column if not exists quiz_score integer not null default 0,
  add column if not exists quiz_total integer not null default 0,
  add column if not exists quiz_percentage numeric(5,2) not null default 0,
  add column if not exists stars integer not null default 0,
  add column if not exists performance_tier text default 'Mastery',
  add column if not exists status text not null default 'completed',
  add column if not exists updated_at timestamptz not null default now();

-- ── 6. Create / Update Daily Progress Logs Table (Date & Day tracking) ──
create table if not exists public.daily_progress_logs (
  id                 uuid primary key default uuid_generate_v4(),
  user_id            uuid not null references public.profiles(id) on delete cascade,
  log_date           date not null,
  day_name           text not null, -- e.g. "Sunday"
  day_short          text not null, -- e.g. "Sun"
  study_time_minutes integer not null default 0,
  quizzes_taken      integer not null default 0,
  average_quiz_score numeric(5,2) not null default 0,
  stars_earned       integer not null default 0,
  goal_met           boolean not null default false,
  status_text        text,
  lessons_completed  jsonb not null default '[]'::jsonb,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  unique(user_id, log_date)
);

-- ── 7. Create / Update Career Milestones Table (4-Year Roadmap & 5-Stars) ──
create table if not exists public.career_milestones (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references public.profiles(id) on delete cascade,
  milestone_id     text not null,
  year             integer not null check (year between 1 and 4),
  milestone_title  text not null,
  completed        boolean not null default false,
  stars            numeric(3,1) not null default 0.0,
  score_percentage numeric(5,2) not null default 0.0,
  completed_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique(user_id, milestone_id)
);

-- ── 8. Update Quiz Results Table ────────────────────────────
create table if not exists public.quiz_results (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  topic        text not null,
  score        integer not null,
  total        integer not null,
  percentage   numeric(5,2) not null default 0,
  stars        integer not null default 0 check (stars >= 0 and stars <= 5),
  answers      jsonb,
  completed_at timestamptz not null default now()
);

alter table public.quiz_results
  add column if not exists percentage numeric(5,2) not null default 0,
  add column if not exists stars integer not null default 0;

-- ── 9. Create / Update Projects Progress Table ──────────────
create table if not exists public.projects_progress (
  id                 uuid primary key default uuid_generate_v4(),
  user_id            uuid not null references public.profiles(id) on delete cascade,
  project_id         text not null,
  current_milestone  integer not null default 1,
  status             text not null default 'in_progress',
  code_submissions   jsonb,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  unique(user_id, project_id)
);

-- ── 10. Update Interview Sessions Table ─────────────────────
create table if not exists public.interview_sessions (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  type         text not null,
  difficulty   text not null,
  questions    jsonb,
  answers      jsonb,
  feedback     jsonb,
  score        integer,
  completed_at timestamptz not null default now()
);

-- ── 11. Update Resumes Table ────────────────────────────────
create table if not exists public.resumes (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  content      jsonb not null,
  target_role  text,
  ats_score    integer,
  version      integer not null default 1,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.resumes
  add column if not exists target_role text,
  add column if not exists ats_score integer,
  add column if not exists updated_at timestamptz not null default now();

-- ── 12. Update Assessments Table ────────────────────────────
create table if not exists public.assessments (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  branch       text not null,
  year         text,
  score        integer not null,
  total        integer not null,
  percentage   numeric(5,2) not null,
  tier         text not null,
  path_data    jsonb,
  created_at   timestamptz not null default now()
);

-- ── 13. Enable Row Level Security (RLS) On All Tables ───────
alter table public.profiles             enable row level security;
alter table public.subscriptions        enable row level security;
alter table public.assessments          enable row level security;
alter table public.student_data         enable row level security;
alter table public.quiz_results         enable row level security;
alter table public.lesson_progress      enable row level security;
alter table public.daily_progress_logs  enable row level security;
alter table public.career_milestones    enable row level security;
alter table public.projects_progress    enable row level security;
alter table public.interview_sessions   enable row level security;
alter table public.resumes              enable row level security;

-- ── 14. Configure RLS Policies ──────────────────────────────
-- Profiles
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Subscriptions
drop policy if exists "Users can view own subscription" on public.subscriptions;
create policy "Users can view own subscription" on public.subscriptions for select using (auth.uid() = user_id);

-- Assessments
drop policy if exists "Users can view own assessments" on public.assessments;
create policy "Users can view own assessments" on public.assessments for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own assessments" on public.assessments;
create policy "Users can insert own assessments" on public.assessments for insert with check (auth.uid() = user_id);

-- Student Data
drop policy if exists "Users can view own student data" on public.student_data;
create policy "Users can view own student data" on public.student_data for select using (auth.uid() = user_id);

drop policy if exists "Users can upsert own student data" on public.student_data;
create policy "Users can upsert own student data" on public.student_data for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own student data" on public.student_data;
create policy "Users can update own student data" on public.student_data for update using (auth.uid() = user_id);

-- Lesson Progress
drop policy if exists "Users can view own progress" on public.lesson_progress;
create policy "Users can view own progress" on public.lesson_progress for select using (auth.uid() = user_id);

drop policy if exists "Users can upsert own progress" on public.lesson_progress;
create policy "Users can upsert own progress" on public.lesson_progress for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own progress" on public.lesson_progress;
create policy "Users can update own progress" on public.lesson_progress for update using (auth.uid() = user_id);

-- Daily Progress Logs
drop policy if exists "Users can view own daily logs" on public.daily_progress_logs;
create policy "Users can view own daily logs" on public.daily_progress_logs for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own daily logs" on public.daily_progress_logs;
create policy "Users can insert own daily logs" on public.daily_progress_logs for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own daily logs" on public.daily_progress_logs;
create policy "Users can update own daily logs" on public.daily_progress_logs for update using (auth.uid() = user_id);

-- Career Milestones
drop policy if exists "Users can view own career milestones" on public.career_milestones;
create policy "Users can view own career milestones" on public.career_milestones for select using (auth.uid() = user_id);

drop policy if exists "Users can upsert own career milestones" on public.career_milestones;
create policy "Users can upsert own career milestones" on public.career_milestones for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own career milestones" on public.career_milestones;
create policy "Users can update own career milestones" on public.career_milestones for update using (auth.uid() = user_id);

-- Projects Progress
drop policy if exists "Users can view own projects progress" on public.projects_progress;
create policy "Users can view own projects progress" on public.projects_progress for select using (auth.uid() = user_id);

drop policy if exists "Users can upsert own projects progress" on public.projects_progress;
create policy "Users can upsert own projects progress" on public.projects_progress for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own projects progress" on public.projects_progress;
create policy "Users can update own projects progress" on public.projects_progress for update using (auth.uid() = user_id);

-- Quiz Results
drop policy if exists "Users can view own quiz results" on public.quiz_results;
create policy "Users can view own quiz results" on public.quiz_results for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own quiz results" on public.quiz_results;
create policy "Users can insert own quiz results" on public.quiz_results for insert with check (auth.uid() = user_id);

-- Interview Sessions
drop policy if exists "Users can view own interviews" on public.interview_sessions;
create policy "Users can view own interviews" on public.interview_sessions for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own interviews" on public.interview_sessions;
create policy "Users can insert own interviews" on public.interview_sessions for insert with check (auth.uid() = user_id);

-- Resumes
drop policy if exists "Users can view own resumes" on public.resumes;
create policy "Users can view own resumes" on public.resumes for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own resumes" on public.resumes;
create policy "Users can insert own resumes" on public.resumes for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own resumes" on public.resumes;
create policy "Users can update own resumes" on public.resumes for update using (auth.uid() = user_id);

-- ── 15. Create Performance Indexes ──────────────────────────
create index if not exists idx_lesson_progress_user_id on public.lesson_progress(user_id);
create index if not exists idx_lesson_progress_lesson_id on public.lesson_progress(lesson_id);
create index if not exists idx_daily_progress_logs_user_date on public.daily_progress_logs(user_id, log_date);
create index if not exists idx_career_milestones_user_id on public.career_milestones(user_id);
create index if not exists idx_projects_progress_user_id on public.projects_progress(user_id);
create index if not exists idx_assessments_user_id on public.assessments(user_id);
create index if not exists idx_quiz_results_user_id on public.quiz_results(user_id);
create index if not exists idx_resumes_user_id on public.resumes(user_id);
