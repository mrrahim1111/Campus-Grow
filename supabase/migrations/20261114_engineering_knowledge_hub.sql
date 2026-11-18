-- ============================================================
-- Migration: 20261114_engineering_knowledge_hub.sql
-- Adds 15 Learning Domains, Courses, Modules, Lessons with YouTube/PDF resources,
-- and Student Journey Roadmaps to Supabase.
-- ============================================================

-- 1. Learning Domains (15 Major Domains)
create table if not exists public.learning_domains (
  id          text primary key, -- slug e.g. 'programming-languages'
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

-- 2. Courses
create table if not exists public.hub_courses (
  id              text primary key, -- slug e.g. 'c-cpp-systems-mastery'
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

-- 3. Course Modules
create table if not exists public.hub_modules (
  id          text primary key,
  course_id   text not null references public.hub_courses(id) on delete cascade,
  title       text not null,
  description text,
  order_index integer not null default 1,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 4. Hub Lessons (Structured lesson format with YouTube & PDF notes)
create table if not exists public.hub_lessons (
  id                  text primary key, -- slug e.g. 'c-pointers-and-memory-virtualization'
  module_id           text not null references public.hub_modules(id) on delete cascade,
  title               text not null,
  order_index         integer not null default 1,
  duration            text not null default '45 min interactive sprint',
  difficulty          text not null check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  learning_objectives text[] not null default '{}',
  youtube_url         text, -- Full-class educational video link
  youtube_embed_id    text,
  pdf_notes_url       text, -- Downloadable complete PDF notes
  overview            text not null, -- 2-3 deep conceptual paragraphs
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

-- 5. Student Personalized Engineering Journey Roadmaps
create table if not exists public.student_roadmaps (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references public.profiles(id) on delete cascade unique,
  academic_year    text not null,     -- '1st Year', '2nd Year', '3rd Year', '4th Year'
  branch           text not null,     -- e.g. 'CSE', 'IT', 'CAI', 'AID', 'CSM', 'CSD', etc.
  skill_level      text not null,     -- 'Beginner', 'Intermediate', 'Advanced'
  interests        text[] not null default '{}',
  career_goal      text not null,     -- 'Full-Stack SDE', 'Systems & Kernel', 'AI/ML Specialist', etc.
  completed_techs  text[] not null default '{}',
  roadmap_data     jsonb not null default '{}'::jsonb,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- 6. Comprehensive Lesson Progress & Verifications (Prevents marking complete by merely opening)
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

-- Indexes for lightning fast querying
create index if not exists idx_hub_courses_domain on public.hub_courses(domain_id);
create index if not exists idx_hub_modules_course on public.hub_modules(course_id);
create index if not exists idx_hub_lessons_module on public.hub_lessons(module_id);
create index if not exists idx_student_roadmaps_user on public.student_roadmaps(user_id);
create index if not exists idx_hub_completions_user_lesson on public.hub_lesson_completions(user_id, lesson_id);

-- Storage bucket setup for PDF notes and assignments
insert into storage.buckets (id, name, public)
values ('pdf_notes', 'pdf_notes', true),
       ('assignments', 'assignments', false)
on conflict (id) do nothing;
