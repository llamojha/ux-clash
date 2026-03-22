-- UX Clash schema

-- Challenges
create table public.challenges (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  scenario text not null,
  objective text not null,
  constraints text,
  viewport text not null check (viewport in ('mobile', 'desktop', 'both')),
  type text not null check (type in ('daily', 'weekly')),
  template_html text,
  template_css text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Submissions
create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  challenge_id uuid not null references public.challenges on delete cascade,
  html text not null default '',
  css text not null default '',
  ai_score numeric,
  social_score numeric,
  total_score numeric,
  created_at timestamptz not null default now()
);

-- Likes
create table public.likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  submission_id uuid not null references public.submissions on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, submission_id)
);

-- AI Scores
create table public.ai_scores (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions on delete cascade,
  clarity numeric not null,
  visual_hierarchy numeric not null,
  challenge_compliance numeric not null,
  usability numeric not null,
  accessibility numeric not null,
  visual_quality numeric not null,
  total numeric not null,
  strengths jsonb not null default '[]',
  weaknesses jsonb not null default '[]',
  suggestion text,
  created_at timestamptz not null default now()
);

-- Indexes
create index idx_submissions_challenge on public.submissions (challenge_id);
create index idx_submissions_user on public.submissions (user_id);
create index idx_likes_submission on public.likes (submission_id);
create index idx_ai_scores_submission on public.ai_scores (submission_id);

-- RLS
alter table public.challenges enable row level security;
alter table public.submissions enable row level security;
alter table public.likes enable row level security;
alter table public.ai_scores enable row level security;

-- Challenges: readable by all
create policy "challenges_select" on public.challenges for select using (true);

-- Submissions: readable by all, insertable by authenticated
create policy "submissions_select" on public.submissions for select using (true);
create policy "submissions_insert" on public.submissions for insert
  with check (auth.uid() = user_id);

-- Likes: readable by all, insertable/deletable by owner
create policy "likes_select" on public.likes for select using (true);
create policy "likes_insert" on public.likes for insert
  with check (auth.uid() = user_id);
create policy "likes_delete" on public.likes for delete
  using (auth.uid() = user_id);

-- AI Scores: readable by all
create policy "ai_scores_select" on public.ai_scores for select using (true);
