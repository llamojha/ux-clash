# Phase 0 — Technical Design

## Stack

| Layer | Choice | Version |
|-------|--------|---------|
| Runtime | Bun | latest |
| Framework | Next.js (App Router) | 16.2 |
| UI Library | React | 19 |
| Language | TypeScript | strict |
| CSS | Tailwind CSS | v4 |
| Components | shadcn/ui | latest |
| Auth + DB | Supabase Cloud | JS client v2.57+ |
| SSR Auth | @supabase/ssr | latest |
| Deploy target | CubePath VPS + Coolify | Docker Compose |

## Architecture

### Data Layer
- Supabase JS client only — no ORM
- TypeScript types generated via `supabase gen types typescript`
- Server Components fetch data directly via Supabase server client
- RLS policies enforce access control at DB level

### Auth Flow
- Supabase Auth with GitHub OAuth provider
- `@supabase/ssr` for cookie-based session management
- Next.js middleware refreshes session on every request
- Three client variants: browser (client components), server (RSC/route handlers), middleware

### Supabase Client Architecture
```
src/lib/supabase/
├── client.ts      # createBrowserClient() — client components
├── server.ts      # createServerClient() — server components, route handlers
└── middleware.ts   # createServerClient() — middleware session refresh
```

### Database Schema
```
challenges ──< submissions ──< likes
                    │
                    └──< ai_scores
```
- `auth.users` managed by Supabase (not custom)
- App tables: challenges, submissions, likes, ai_scores
- All UUIDs with gen_random_uuid() defaults

## Design System — "Modern Editorial"

### Direction
Clean, minimal, dark-mode-first. Inspired by Linear/Vercel aesthetic. High contrast text, subtle borders, refined spacing. The "arena" feeling comes from content (scores, rankings) not visual chrome.

### Typography
- UI: Geist Sans (ships with Next.js 16)
- Code/editor: JetBrains Mono (loaded via next/font/google)

### Color Strategy
- CSS variables in `:root` (dark default)
- `.light` class for light mode
- Mapped to Tailwind v4 via `@theme` directive
- shadcn/ui consumes the same variables

### Component Plan
- `PageShell` — max-width container, padding
- `SiteHeader` — logo, nav, auth
- `SiteFooter` — minimal tagline
- `ChallengeCard` — challenge preview card
- `ScoreBadge` — numeric score display

## Deployment Strategy
- Local dev with Bun (`bun run dev`)
- Docker Compose with `oven/bun` base image
- Future: deploy to CubePath VPS via Coolify (git-based auto-deploy)
- Supabase Cloud handles DB + auth (no self-hosted DB needed)
