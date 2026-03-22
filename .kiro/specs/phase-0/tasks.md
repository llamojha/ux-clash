# Phase 0 — Implementation Tasks

## Task 1: Spec Files ✅
- [x] Create `.kiro/specs/phase-0/requirements.md`
- [x] Create `.kiro/specs/phase-0/design.md`
- [x] Create `.kiro/specs/phase-0/tasks.md`

## Task 2: Scaffold Next.js 16 + Bun ✅
- [x] `bunx create-next-app@latest` (TypeScript, Tailwind, App Router, src/)
- [x] `bunx shadcn@latest init` (dark mode, CSS variables)
- [x] Configure TypeScript strict, ESLint, Prettier + tailwindcss plugin
- [x] Add `.env.example` with Supabase placeholders
- [x] Create `Dockerfile` (oven/bun base)
- [x] Create `docker-compose.yml`
- [x] Verify `bun run dev` works

## Task 3: Supabase + GitHub OAuth ✅
- [x] `bun add @supabase/supabase-js @supabase/ssr`
- [x] Create `src/lib/supabase/client.ts` (browser client)
- [x] Create `src/lib/supabase/server.ts` (server client)
- [x] Create `src/lib/supabase/middleware.ts` (middleware client)
- [x] Create `src/middleware.ts` (session refresh)
- [x] Create `src/app/auth/callback/route.ts` (OAuth callback)
- [x] Create `LoginButton` component
- [x] Create `UserMenu` component

## Task 4: DB Schema + Seed ✅
- [x] Write `supabase/migrations/001_schema.sql` (tables + RLS)
- [x] Write `supabase/seed.sql` (3 challenges)
- [x] Create placeholder TypeScript types
- [x] Create typed Supabase client helpers
- [x] Add `db:types` script to package.json

## Task 5: Design Tokens + Theme ✅
- [x] Define CSS variable palette in `globals.css` (dark default + light)
- [x] Configure Tailwind v4 `@theme` mapping
- [x] Load JetBrains Mono via next/font
- [x] Create `/dev/theme` preview page
- [x] shadcn components render with custom theme

## Task 6: Layout Components ✅
- [x] Create `PageShell` component
- [x] Create `SiteHeader` component (logo, nav, auth)
- [x] Create `SiteFooter` component
- [x] Create `ChallengeCard` component
- [x] Create `ScoreBadge` component
- [x] Wire header + footer into root layout

## Task 7: Skeleton Pages ✅
- [x] Home page: hero + featured challenge + placeholders
- [x] `/challenges` page: challenge grid from DB
- [x] `/challenge/[slug]` page: full brief from DB
- [x] Wire nav links to real routes
- [x] Add loading states and not-found handling
