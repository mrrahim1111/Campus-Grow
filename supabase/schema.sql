-- ============================================================
-- CampusGrow – Supabase Database Master Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ── Extensions ────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── 1. Profiles (extends Supabase auth.users) ─────────────
create table if not exists public.profiles (
  id               uuid primary key references auth.users(id) on delete cascade,
  email            text not null,
  name             text,
  branch           text,                  -- e.g. "CSC", "AIML"
  year             text,                  -- e.g. "1st Year", "3rd Year"
  avatar_url       text,
  is_pro           boolean not null default false,
  role_target      text,                  -- e.g. "Full-Stack SDE"
  current_semester text,                  -- e.g. "Semester 2"
  streak_days      integer not null default 0,
  xp_points        integer not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ── 2. Subscriptions ──────────────────────────────────────
create table if not exists public.subscriptions (
  id                       uuid primary key default uuid_generate_v4(),
  user_id                  uuid not null unique references public.profiles(id) on delete cascade,
  stripe_customer_id       text unique,
  stripe_subscription_id   text unique,
  stripe_price_id          text,
  razorpay_subscription_id text unique,
  razorpay_payment_id      text,
  plan                     text not null default 'free',     -- 'free' | 'pro'
  billing_cycle            text,                             -- 'monthly' | 'annual'
  status                   text not null default 'inactive', -- 'active' | 'inactive' | 'canceled' | 'past_due'
  current_period_start     timestamptz,
  current_period_end       timestamptz,
  cancel_at_period_end     boolean default false,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

-- ── 3. Diagnostic Assessments ─────────────────────────────
create table if not exists public.assessments (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  branch       text not null,
  year         text,
  score        integer not null,
  total        integer not null,
  percentage   numeric(5,2) not null,
  tier         text not null,          -- 'Foundational' | 'Intermediate' | 'Advanced'
  path_data    jsonb,                  -- full PersonalizedPath object
  created_at   timestamptz not null default now()
);

-- ── 4. Student Onboarding & Discovery Data ────────────────
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

-- ── 5. Lesson Progress (Includes Dates, Duration & 5-Stars) ──
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

-- ── 6. Daily Progress Logs (Everyday Habit Log with Date & Day) ──
create table if not exists public.daily_progress_logs (
  id                 uuid primary key default uuid_generate_v4(),
  user_id            uuid not null references public.profiles(id) on delete cascade,
  log_date           date not null,
  day_name           text not null,            -- e.g. "Sunday"
  day_short          text not null,            -- e.g. "Sun"
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

-- ── 7. Career Roadmap Milestones (4-Year Flowchart & 5-Stars) ──
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

-- ── 8. Quiz Results ────────────────────────────────────────
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

-- ── 9. Projects Progress (4 Milestone Portfolio Builds) ────
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

-- ── 10. Interview Sessions ─────────────────────────────────
create table if not exists public.interview_sessions (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  type         text not null,          -- 'technical' | 'hr' | 'system_design'
  difficulty   text not null,
  questions    jsonb,
  answers      jsonb,
  feedback     jsonb,
  score        integer,
  completed_at timestamptz not null default now()
);

-- ── 11. Resume Snapshots & ATS Evaluations ─────────────────
create table if not exists public.resumes (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  content      jsonb not null,         -- full resume JSON
  target_role  text,
  ats_score    integer,
  version      integer not null default 1,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ============================================================
-- Indexes for High Performance Querying
-- ============================================================
create index if not exists idx_profiles_email on public.profiles(email);
create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);
create index if not exists idx_assessments_user_id on public.assessments(user_id);
create index if not exists idx_student_data_user_id on public.student_data(user_id);
create index if not exists idx_lesson_progress_user_id on public.lesson_progress(user_id);
create index if not exists idx_lesson_progress_lesson_id on public.lesson_progress(lesson_id);
create index if not exists idx_daily_progress_logs_user_date on public.daily_progress_logs(user_id, log_date);
create index if not exists idx_career_milestones_user_id on public.career_milestones(user_id);
create index if not exists idx_quiz_results_user_id on public.quiz_results(user_id);
create index if not exists idx_projects_progress_user_id on public.projects_progress(user_id);
create index if not exists idx_interview_sessions_user_id on public.interview_sessions(user_id);
create index if not exists idx_resumes_user_id on public.resumes(user_id);

-- ============================================================
-- Row Level Security (RLS) – Multi-tenant User Isolation
-- ============================================================
alter table public.profiles             enable row level security;
alter table public.subscriptions        enable row level security;
alter table public.assessments          enable row level security;
alter table public.student_data         enable row level security;
alter table public.lesson_progress      enable row level security;
alter table public.daily_progress_logs  enable row level security;
alter table public.career_milestones    enable row level security;
alter table public.quiz_results         enable row level security;
alter table public.projects_progress    enable row level security;
alter table public.interview_sessions   enable row level security;
alter table public.resumes              enable row level security;

-- Profiles Policies
create policy "Users can view own profile"   on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Subscriptions Policies
create policy "Users can view own subscription"   on public.subscriptions for select using (auth.uid() = user_id);

-- Assessments Policies
create policy "Users can view own assessments"   on public.assessments for select using (auth.uid() = user_id);
create policy "Users can insert own assessments" on public.assessments for insert with check (auth.uid() = user_id);

-- Student Data Policies
create policy "Users can view own student data"   on public.student_data for select using (auth.uid() = user_id);
create policy "Users can upsert own student data" on public.student_data for insert with check (auth.uid() = user_id);
create policy "Users can update own student data" on public.student_data for update using (auth.uid() = user_id);

-- Lesson Progress Policies
create policy "Users can view own progress"   on public.lesson_progress for select using (auth.uid() = user_id);
create policy "Users can upsert own progress" on public.lesson_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress" on public.lesson_progress for update using (auth.uid() = user_id);

-- Daily Progress Logs Policies
create policy "Users can view own daily logs"   on public.daily_progress_logs for select using (auth.uid() = user_id);
create policy "Users can insert own daily logs" on public.daily_progress_logs for insert with check (auth.uid() = user_id);
create policy "Users can update own daily logs" on public.daily_progress_logs for update using (auth.uid() = user_id);

-- Career Milestones Policies
create policy "Users can view own career milestones"   on public.career_milestones for select using (auth.uid() = user_id);
create policy "Users can upsert own career milestones" on public.career_milestones for insert with check (auth.uid() = user_id);
create policy "Users can update own career milestones" on public.career_milestones for update using (auth.uid() = user_id);

-- Projects Progress Policies
create policy "Users can view own projects progress"   on public.projects_progress for select using (auth.uid() = user_id);
create policy "Users can upsert own projects progress" on public.projects_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own projects progress" on public.projects_progress for update using (auth.uid() = user_id);

-- Quiz Results Policies
create policy "Users can view own quiz results"   on public.quiz_results for select using (auth.uid() = user_id);
create policy "Users can insert own quiz results" on public.quiz_results for insert with check (auth.uid() = user_id);

-- Interview Sessions Policies
create policy "Users can view own interviews"   on public.interview_sessions for select using (auth.uid() = user_id);
create policy "Users can insert own interviews" on public.interview_sessions for insert with check (auth.uid() = user_id);

-- Resumes Policies
create policy "Users can view own resumes"   on public.resumes for select using (auth.uid() = user_id);
create policy "Users can insert own resumes" on public.resumes for insert with check (auth.uid() = user_id);
create policy "Users can update own resumes" on public.resumes for update using (auth.uid() = user_id);

-- ============================================================
-- Triggers: Automation & Timestamps
-- ============================================================

-- Auto-create profile row & free subscription on new user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, branch, year)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'branch',
    new.raw_user_meta_data->>'year'
  );

  insert into public.subscriptions (user_id, plan, status)
  values (new.id, 'free', 'active');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at timestamp trigger
create or replace function public.update_updated_at()
returns trigger language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at();

drop trigger if exists subscriptions_updated_at on public.subscriptions;
create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute procedure public.update_updated_at();

drop trigger if exists lesson_progress_updated_at on public.lesson_progress;
create trigger lesson_progress_updated_at
  before update on public.lesson_progress
  for each row execute procedure public.update_updated_at();

drop trigger if exists daily_progress_logs_updated_at on public.daily_progress_logs;
create trigger daily_progress_logs_updated_at
  before update on public.daily_progress_logs
  for each row execute procedure public.update_updated_at();

drop trigger if exists career_milestones_updated_at on public.career_milestones;
create trigger career_milestones_updated_at
  before update on public.career_milestones
  for each row execute procedure public.update_updated_at();

drop trigger if exists projects_progress_updated_at on public.projects_progress;
create trigger projects_progress_updated_at
  before update on public.projects_progress
  for each row execute procedure public.update_updated_at();

drop trigger if exists resumes_updated_at on public.resumes;
create trigger resumes_updated_at
  before update on public.resumes
  for each row execute procedure public.update_updated_at();

-- ============================================================
-- 12. Engineering Knowledge Hub (15 Domains, Courses, Lessons, Roadmaps)
-- ============================================================
create table if not exists public.learning_domains (
  id          text primary key,
  number      integer not null unique check (number >= 1 and number <= 15),
  title       text not null,
  subtitle    text,
  description text not null,
  icon        text not null default '💻',
  badge       text,
  color       text default 'from-emerald-600 to-teal-700',
  technologies text[] not null default '{}',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.hub_courses (
  id              text primary key,
  domain_id       text not null references public.learning_domains(id) on delete cascade,
  title           text not null,
  subtitle        text,
  description     text not null,
  icon            text not null default '📚',
  difficulty      text not null check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  duration_hours  integer not null default 10,
  technologies    text[] not null default '{}',
  career_tags     text[] not null default '{}',
  target_branches text[] not null default '{}',
  image           text,
  is_published    boolean not null default true,
  featured        boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists public.hub_modules (
  id          text primary key,
  course_id   text not null references public.hub_courses(id) on delete cascade,
  title       text not null,
  description text,
  order_index integer not null default 1,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.hub_lessons (
  id                  text primary key,
  module_id           text not null references public.hub_modules(id) on delete cascade,
  title               text not null,
  order_index         integer not null default 1,
  duration            text not null default '45 min interactive sprint',
  difficulty          text not null check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  learning_objectives text[] not null default '{}',
  youtube_url         text,
  youtube_embed_id    text,
  pdf_notes_url       text,
  overview            text not null,
  key_concepts        jsonb not null default '[]'::jsonb,
  practical_examples  jsonb not null default '[]'::jsonb,
  code_samples        jsonb not null default '[]'::jsonb,
  practice_questions  text[] not null default '{}',
  mcq_questions       jsonb not null default '[]'::jsonb,
  assignment          jsonb not null default '{}'::jsonb,
  prerequisites       text[] not null default '{}',
  tags                text[] not null default '{}',
  is_published        boolean not null default true,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table if not exists public.student_roadmaps (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references public.profiles(id) on delete cascade unique,
  academic_year    text not null,
  branch           text not null,
  skill_level      text not null,
  interests        text[] not null default '{}',
  career_goal      text not null,
  completed_techs  text[] not null default '{}',
  roadmap_data     jsonb not null default '{}'::jsonb,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table if not exists public.hub_lesson_completions (
  id                     uuid primary key default uuid_generate_v4(),
  user_id                uuid not null references public.profiles(id) on delete cascade,
  lesson_id              text not null references public.hub_lessons(id) on delete cascade,
  video_watched_seconds  integer not null default 0,
  pdf_downloaded         boolean not null default false,
  quiz_score             integer not null default 0,
  quiz_total             integer not null default 0,
  quiz_passed            boolean not null default false,
  assignment_submitted   boolean not null default false,
  assignment_submission  jsonb,
  completed_at           timestamptz not null default now(),
  unique(user_id, lesson_id)
);
