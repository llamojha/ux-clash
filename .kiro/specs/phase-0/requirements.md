# Phase 0 — Foundation + Design System

## User Stories

### US-1: Project Foundation
As a developer, I need a scaffolded Next.js 16 project with Bun, TypeScript, Tailwind v4, and shadcn/ui so I can start building features immediately.

**Acceptance Criteria:**
- [ ] `bun run dev` starts the app at localhost:3000
- [ ] TypeScript strict mode enabled
- [ ] shadcn/ui initialized with dark mode and CSS variables
- [ ] `.env.example` with Supabase placeholder keys
- [ ] Dockerfile + docker-compose.yml for future CubePath deploy

### US-2: Authentication
As a user, I can log in with GitHub so I can submit entries and interact socially.

**Acceptance Criteria:**
- [ ] GitHub OAuth login via Supabase Auth
- [ ] Session persists across page navigations
- [ ] Logout clears session
- [ ] Unauthenticated users can browse freely
- [ ] Auth callback route handles OAuth redirect

### US-3: Database Schema
As a developer, I need the core data model so the app can store challenges, submissions, likes, and AI scores.

**Acceptance Criteria:**
- [ ] SQL migrations for: challenges, submissions, likes, ai_scores
- [ ] RLS policies: challenges/submissions/ai_scores readable by all; writes require auth
- [ ] 3 seed challenges with realistic content
- [ ] TypeScript types generated from schema
- [ ] Typed Supabase client with autocomplete

### US-4: Design System
As a user, I experience a cohesive "Modern Editorial" visual identity — clean, dark-mode-first, confident.

**Acceptance Criteria:**
- [ ] CSS variable palette (dark default, light mode available)
- [ ] Geist Sans for UI, JetBrains Mono for code
- [ ] shadcn/ui components styled with custom theme
- [ ] `/dev/theme` preview page showing tokens and components

### US-5: Layout Shell
As a user, I see consistent navigation and layout across all pages.

**Acceptance Criteria:**
- [ ] SiteHeader with logo, nav links, auth button/user menu
- [ ] SiteFooter with tagline
- [ ] PageShell container with consistent spacing
- [ ] ChallengeCard and ScoreBadge components

### US-6: Skeleton Pages
As a user, I can browse the home page, see challenges, and view challenge details.

**Acceptance Criteria:**
- [ ] Home page with hero, featured challenge from DB, placeholder areas
- [ ] `/challenges` page listing all active challenges
- [ ] `/challenge/[slug]` page with full brief from DB
- [ ] Navigation links work between all pages
- [ ] Loading states and not-found handling
