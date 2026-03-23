# UX Clash — MVP Roadmap

**Deadline:** 31 March 2026, 23:59:59 CET
**Hackathon:** CubePath 2026 (midudev)
**Evaluation:** UX > Creativity > Utility > Technical Implementation

---

## Stack Decision

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Runtime | Bun | 25x faster installs, native TS, compatible with full stack |
| Framework | Next.js 16 (App Router) | SSR for public pages, API routes, single deployable, React 19 |
| UI | React 19 + shadcn/ui + Tailwind v4 | Modern Editorial aesthetic, accessible components, fast to build |
| Editor | Monaco Editor | VS Code engine, syntax highlighting, multi-tab (HTML + CSS) |
| Auth + DB | Supabase Cloud | GitHub OAuth, PostgreSQL, free tier, no self-hosted DB needed |
| Data layer | Supabase JS client (no ORM) | Simple CRUD, generated TypeScript types, minimal dependencies |
| AI Scoring | OpenRouter (Claude/GPT) | Flexible model choice, single API, structured rubric output |
| Preview | Sandboxed iframe | srcdoc with Tailwind CDN play, CSP to block JS/external |
| Screenshot | html2canvas or Puppeteer | For share card generation |
| Deploy | CubePath VPS + Dokploy (Railpack) | Git-based auto-deploy from GitHub |

**Why Next.js over Vite+React:** Public entry pages need SSR for social share cards (OG tags). The hackathon judges will click links — those pages must render with proper meta. API routes eliminate the need for a separate backend server. Single Docker image to deploy.

**Why PostgreSQL over MySQL:** Better JSON support (for AI score breakdowns), better TypeScript ecosystem (Drizzle), more common in the Next.js world. Both work fine self-hosted; Postgres is the stronger choice here.

---

## Phase 0 — Foundation + Design System ✅

**Goal:** Deployable skeleton with DB, auth, design system, and basic pages.

### Infra & Setup
- [x] Next.js 16 project with App Router, TypeScript, Tailwind v4, shadcn/ui, Bun
- [x] Supabase Cloud (PostgreSQL + Auth) — schema for challenges, submissions, likes, ai_scores
- [x] GitHub OAuth via Supabase Auth
- [x] Docker Compose + Dockerfile (oven/bun base, standalone output)
- [x] Seed 3 challenges for development

### Design System
- [x] Modern Editorial theme: oklch color palette (CSS variables), dark-mode first
- [x] Typography: Geist Sans (UI) + Geist Mono (code)
- [x] shadcn/ui theme customization with custom palette
- [x] Core layout components: PageShell, SiteHeader, SiteFooter, ChallengeCard, ScoreBadge
- [x] Responsive structure (desktop-first, browsable on mobile)

### Pages
- [x] Home page: hero, featured challenge card, top entries placeholder, leaderboard placeholder
- [x] Challenge page: full brief (title, scenario, objective, viewport, constraints, CTA)
- [x] Challenges list page: grid of active challenges
- [x] Basic nav: logo, challenge links, auth button/user menu
- [x] Theme preview page (/dev/theme)

**Deliverable:** App running locally with login, DB schema, and Modern Editorial design system. Deploy-ready via Dokploy/Railpack on CubePath.

---

## Phase 1 — Core Loop ✅

**Goal:** A user can see a challenge, open the editor, write code, preview it, and submit.

- [x] Challenge list page (home) — daily/weekly cards, active challenge highlighted
- [x] Challenge detail page — real data from DB, styled with design system
- [x] Editor Arena page:
  - [x] Monaco editor with HTML tab + CSS tab
  - [x] Live preview panel (sandboxed iframe with Tailwind CDN)
  - [x] Challenge brief visible above editor
  - [x] Viewport toggle (mobile/desktop) in preview
  - [x] Template pre-loaded for challenges that have one
- [x] Submit flow — save HTML + CSS to DB, require auth
- [x] Submission sandbox security: CSP headers, strip `<script>`, block external resources
- [x] DOMPurify sanitization (isomorphic-dompurify), CSS sanitization
- [x] Race-safe duplicate check via unique index
- [x] `uxclash_` table prefix on all tables
- [x] Full es_ES localization (UI + DB seed data)
- [x] Logo SVG, dynamic OG image, social metadata

**Deliverable:** Full editor-to-submit flow working. This is the heart of the product.

---

## Phase 2 — Social + Leaderboard

**Goal:** Likes, leaderboard, the competitive layer, and timed challenges.

- [ ] Challenge timing:
  - [ ] Add `starts_at` and `ends_at` columns to `uxclash_challenges`
  - [ ] Filter active challenges by `now() BETWEEN starts_at AND ends_at`
  - [ ] Countdown timer component on challenge/editor pages
  - [ ] Block submissions after `ends_at`
  - [ ] Daily = 24h window (00:00–23:59 UTC), Weekly = Mon 00:00–Sun 23:59 UTC
- [ ] Like system — authenticated users can like submissions (one per user per submission)
- [ ] Social score calculation: normalized likes
- [ ] Leaderboard per challenge:
  - [ ] Ranked list of submissions by social score
  - [ ] Show preview thumbnail, author, score
  - [ ] Filter: daily / weekly
- [ ] User profile page (minimal):
  - [ ] Username, avatar (from GitHub)
  - [ ] List of submissions with scores
  - [ ] Aggregate stats

**Deliverable:** Full competitive loop — submit, like, rank, compare.

---

## Phase 3 — Shareability + Public Pages

**Goal:** Every submission is a shareable, beautiful public page with proper OG tags.

- [ ] Public entry page (`/entry/[id]`):
  - [ ] Large preview render
  - [ ] Author info, challenge name
  - [ ] Social score + likes
  - [ ] Share button (copy link, Twitter/X)
  - [ ] CTA: "Try this challenge"
- [ ] OG meta tags (SSR) — title, description, preview image
- [ ] Screenshot generation for share cards (submission preview as image)
- [ ] Home page polish:
  - [ ] Hero section explaining the product in 5 seconds
  - [ ] Featured challenge (daily/weekly)
  - [ ] Top entries preview
  - [ ] Leaderboard preview

**Deliverable:** Shareable entries that look great when pasted in Twitter/Discord/Slack.

---

## Phase 4 — Content + Polish

**Goal:** Full challenge set, UX polish, hackathon submission readiness.

- [ ] Seed all 10 challenges (mix of daily/weekly, mobile/desktop/both, with/without templates)
- [ ] UX polish pass:
  - [ ] Loading states, transitions, empty states
  - [ ] Error handling (auth failures, network errors)
  - [ ] Mobile responsiveness (browsing — editor is desktop-focused)
  - [ ] Accessibility basics (keyboard nav, contrast, focus states)
- [ ] README.md for hackathon:
  - [ ] Description
  - [ ] Demo link
  - [ ] Screenshots/GIFs
  - [ ] How CubePath was used
- [ ] Final deploy + smoke test on CubePath
- [ ] Register project via GitHub issue

**Deliverable:** Hackathon-ready submission.

---

## Future: Cron-based Challenge Rotation

**Current state:** Challenges are pre-scheduled with `starts_at`/`ends_at` dates set manually in the DB. The initial 10 challenges cover Mar 23 – Jun 21, 2026 (3 months).

**Future improvement:** Replace manual scheduling with a cron-based rotation system:
- A scheduled function (Supabase cron / Edge Function) runs daily at 00:00 UTC
- Deactivates expired challenges, activates the next one in queue
- Supports a `schedule` table or `sort_order` column for rotation order
- Enables infinite rotation without manual DB updates

**Priority:** Post-MVP. Only needed when the initial 10 challenges expire.

---

## Phase 5 — AI Scoring (stretch)

**Goal:** Every submission gets an AI score with rubric breakdown and feedback.

- [ ] AI scoring service (server-side):
  - [ ] Send rendered HTML+CSS to LLM via OpenRouter
  - [ ] Structured prompt with 6-criteria rubric
  - [ ] Parse response: total score, per-criterion scores, 2 strengths, 2 weaknesses, 1 suggestion
  - [ ] Store in uxclash_ai_scores table
- [ ] Submission result page:
  - [ ] AI score total + breakdown radar/bar chart
  - [ ] Strengths, weaknesses, suggestion displayed
  - [ ] Score triggers on submit (async, show loading state)
- [ ] Total score update: 50% AI + 50% social
- [ ] Handle AI failures gracefully (retry, fallback message)

**Deliverable:** Submit → get AI feedback with professional rubric breakdown.

---

## Risk Mitigations

| Risk | Mitigation |
|------|-----------|
| AI scoring inconsistent | Detailed rubric prompt with examples, structured JSON output, temperature=0 |
| Sandbox security | CSP headers, srcdoc iframe, DOMPurify sanitization, no JS execution |
| CubePath deploy issues | Docker Compose tested locally first, Coolify as fallback |
| Scope pressure | Phases 0-2 are non-negotiable core. Phase 3-4 can be simplified. Phase 5 (AI) is a stretch goal |
| Monaco bundle size | Dynamic import, code-split editor page |

---

## Phase Dependencies

```
Phase 0 (Foundation + Design)
  └─→ Phase 1 (Core Loop)
        └─→ Phase 2 (Social + Leaderboard)
              └─→ Phase 3 (Shareability)
                    └─→ Phase 4 (Content + Polish)
                          └─→ Phase 5 (AI Scoring — stretch)
```

Each phase builds on the previous. No phase can be skipped, but Phase 5 (AI) is a stretch goal that can be dropped if time is tight.

---

## What "Done" Looks Like

The hackathon judges should experience:
1. Land on home → understand the product in 5 seconds
2. Click a challenge → read the brief, feel motivated
3. Open editor → write HTML+CSS, see live preview
4. Submit → get AI feedback that feels professional and useful
5. See leaderboard → feel the competitive pull
6. Share an entry → link looks great in social media
7. Come back → try another challenge

That's the full loop. UX is criterion #1 — every interaction should feel fast, clean, and satisfying.
