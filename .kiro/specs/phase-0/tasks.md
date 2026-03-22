# Phase 0 — Implementation Tasks

## Task 1: Spec Files ✅
- [x] Create `.kiro/specs/phase-0/requirements.md`
- [x] Create `.kiro/specs/phase-0/design.md`
- [x] Create `.kiro/specs/phase-0/tasks.md`

## Task 2: Scaffold Next.js 16 + Bun
- [ ] `bunx create-next-app@latest` (TypeScript, Tailwind, App Router, src/)
- [ ] `bunx shadcn@latest init` (dark mode, CSS variables)
- [ ] Configure TypeScript strict, ESLint, Prettier + tailwindcss plugin
- [ ] Add `.env.example` with Supabase placeholders
- [ ] Create `Dockerfile` (oven/bun base)
- [ ] Create `docker-compose.yml`
- [ ] Verify `bun run dev` works

## Task 3: Supabase + GitHub OAuth
- [ ] `bun add @supabase/supabase-js @supabase/ssr`
- [ ] Create `src/lib/supabase/client.ts` (browser client)
- [ ] Create `src/lib/supabase/server.ts` (server client)
- [ ] Create `src/lib/supabase/middleware.ts` (middleware client)
- [ ] Create `src/middleware.ts` (session refresh)
- [ ] Create `src/app/auth/callback/route.ts` (OAuth callback)
- [ ] Create `LoginButton` component
- [ ] Create `UserMenu` component
- [ ] Test full GitHub OAuth flow

## Task 4: DB Schema + Seed
- [ ] Write `supabase/migrations/001_schema.sql` (tables + RLS)
- [ ] Write `supabase/seed.sql` (3 challenges)
- [ ] Generate TypeScript types (or write placeholder types)
- [ ] Create typed Supabase client helper
- [ ] Add `db:types` script to package.json
- [ ] Test: query challenges from server component

## Task 5: Design Tokens + Theme
- [ ] Define CSS variable palette in `globals.css` (dark default)
- [ ] Configure Tailwind v4 `@theme` mapping
- [ ] Load JetBrains Mono via next/font
- [ ] Create `/dev/theme` preview page
- [ ] Verify shadcn components render with custom theme

## Task 6: Layout Components
- [ ] Create `PageShell` component
- [ ] Create `SiteHeader` component (logo, nav, auth)
- [ ] Create `SiteFooter` component
- [ ] Create `ChallengeCard` component
- [ ] Create `ScoreBadge` component
- [ ] Wire header + footer into root layout

## Task 7: Skeleton Pages
- [ ] Home page: hero + featured challenge + placeholders
- [ ] `/challenges` page: challenge grid from DB
- [ ] `/challenge/[slug]` page: full brief from DB
- [ ] Wire nav links to real routes
- [ ] Add loading states and not-found handling
