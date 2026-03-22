# UX Clash — MVP Roadmap

**Deadline:** 31 March 2026, 23:59:59 CET
**Hackathon:** CubePath 2026 (midudev)
**Evaluation:** UX > Creativity > Utility > Technical Implementation

---

## Stack Decision

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | SSR for public pages (SEO, share cards), API routes for backend, single deployable |
| UI | React + shadcn/ui + Tailwind | Dark arena aesthetic, accessible components, fast to build |
| Editor | Monaco Editor | VS Code engine, syntax highlighting, multi-tab (HTML + CSS) |
| DB | PostgreSQL | Robust, self-hosted on CubePath VPS via Docker |
| ORM | Drizzle | Lightweight, type-safe, great DX with PostgreSQL |
| Auth | NextAuth.js (Auth.js v5) | GitHub OAuth — fits target audience (devs/designers) |
| AI Scoring | OpenRouter (Claude/GPT) | Flexible model choice, single API, structured rubric output |
| Preview | Sandboxed iframe | srcdoc with Tailwind CDN play, CSP to block JS/external |
| Screenshot | html2canvas or Puppeteer | For share card generation |
| Deploy | CubePath VPS + Coolify | Docker Compose, auto-deploy from GitHub |

**Why Next.js over Vite+React:** Public entry pages need SSR for social share cards (OG tags). The hackathon judges will click links — those pages must render with proper meta. API routes eliminate the need for a separate backend server. Single Docker image to deploy.

**Why PostgreSQL over MySQL:** Better JSON support (for AI score breakdowns), better TypeScript ecosystem (Drizzle), more common in the Next.js world. Both work fine self-hosted; Postgres is the stronger choice here.

---

## Phase 0 — Foundation + Design System

**Goal:** Deployable skeleton on CubePath with DB, auth, design system, and basic pages.

### Infra & Setup
- [ ] Next.js 15 project with App Router, TypeScript, Tailwind, shadcn/ui
- [ ] PostgreSQL schema with Drizzle (users, challenges, submissions, likes, ai_scores)
- [ ] NextAuth.js with GitHub OAuth
- [ ] Docker Compose (Next.js + PostgreSQL)
- [ ] Deploy to CubePath via Coolify
- [ ] Seed 3 challenges for development

### Design System
- [ ] Dark arena theme: color palette (CSS variables), shadows, borders
- [ ] Typography scale: headings, body, mono (for code/editor)
- [ ] shadcn/ui theme customization to match arena aesthetic
- [ ] Core layout components: page shell, section container, card, badge, score display
- [ ] Responsive structure (desktop-first, browsable on mobile)

### Pages (skeleton with real layout, placeholder content)
- [ ] Home page: hero, featured challenge card, top entries area, leaderboard preview
- [ ] Challenge page: brief layout (title, scenario, objective, viewport, constraints, CTA)
- [ ] Basic nav: logo, challenge links, auth button

**Deliverable:** App running on CubePath with login, DB, and a visually intentional dark arena UI that sets the tone for everything built on top.

---

## Phase 1 — Core Loop

**Goal:** A user can see a challenge, open the editor, write code, preview it, and submit.

- [ ] Challenge list page (home) — daily/weekly cards, active challenge highlighted
- [ ] Challenge detail page — real data from DB, styled with design system
- [ ] Editor Arena page:
  - [ ] Monaco editor with HTML tab + CSS tab
  - [ ] Live preview panel (sandboxed iframe with Tailwind CDN)
  - [ ] Challenge brief visible above editor
  - [ ] Viewport toggle (mobile/desktop) in preview
  - [ ] Template pre-loaded for challenges that have one
- [ ] Submit flow — save HTML + CSS to DB, require auth
- [ ] Submission sandbox security: CSP headers, strip `<script>`, block external resources

**Deliverable:** Full editor-to-submit flow working. This is the heart of the product.

---

## Phase 2 — AI Scoring

**Goal:** Every submission gets an AI score with rubric breakdown and feedback.

- [ ] AI scoring service (server-side):
  - [ ] Send rendered HTML+CSS to LLM via OpenRouter
  - [ ] Structured prompt with 6-criteria rubric
  - [ ] Parse response: total score, per-criterion scores, 2 strengths, 2 weaknesses, 1 suggestion
  - [ ] Store in ai_scores table
- [ ] Submission result page:
  - [ ] Preview of the submission
  - [ ] AI score total + breakdown radar/bar chart
  - [ ] Strengths, weaknesses, suggestion displayed
  - [ ] Score triggers on submit (async, show loading state)
- [ ] Handle AI failures gracefully (retry, fallback message)

**Deliverable:** Submit → get AI feedback with professional rubric breakdown.

---

## Phase 3 — Social + Leaderboard

**Goal:** Likes, leaderboard, and the competitive layer.

- [ ] Like system — authenticated users can like submissions (one per user per submission)
- [ ] Social score calculation: normalized likes → 50% weight
- [ ] Total score: 50% AI + 50% social
- [ ] Leaderboard per challenge:
  - [ ] Ranked list of submissions by total score
  - [ ] Show preview thumbnail, author, score breakdown
  - [ ] Filter: daily / weekly
- [ ] User profile page (minimal):
  - [ ] Username, avatar (from GitHub)
  - [ ] List of submissions with scores
  - [ ] Aggregate stats

**Deliverable:** Full competitive loop — submit, score, rank, compare.

---

## Phase 4 — Shareability + Public Pages

**Goal:** Every submission is a shareable, beautiful public page with proper OG tags.

- [ ] Public entry page (`/entry/[id]`):
  - [ ] Large preview render
  - [ ] Author info, challenge name
  - [ ] AI score + social score
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

## Phase 5 — Content + Polish

**Goal:** Full challenge set, UX polish, hackathon submission readiness.

- [ ] Seed all 10 challenges (mix of daily/weekly, mobile/desktop/both, with/without templates)
- [ ] Challenge rotation logic (which challenge is active today/this week)
- [ ] UX polish pass:
  - [ ] Loading states, transitions, empty states
  - [ ] Error handling (auth failures, AI timeouts, network errors)
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

## Risk Mitigations

| Risk | Mitigation |
|------|-----------|
| AI scoring inconsistent | Detailed rubric prompt with examples, structured JSON output, temperature=0 |
| Sandbox security | CSP headers, srcdoc iframe, DOMPurify sanitization, no JS execution |
| CubePath deploy issues | Docker Compose tested locally first, Coolify as fallback |
| Scope pressure | Phases 0-2 are non-negotiable core. Phase 3-4 can be simplified. Phase 5 content can be reduced to 5 challenges |
| Monaco bundle size | Dynamic import, code-split editor page |

---

## Phase Dependencies

```
Phase 0 (Foundation + Design)
  └─→ Phase 1 (Core Loop)
        └─→ Phase 2 (AI Scoring)
              └─→ Phase 3 (Social + Leaderboard)
                    └─→ Phase 4 (Shareability)
                          └─→ Phase 5 (Content + Polish)
```

Each phase builds on the previous. No phase can be skipped, but later phases can be simplified if needed.

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
