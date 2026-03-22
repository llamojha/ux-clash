---
inclusion: always
---

# Technical Architecture

## Technology Stack
- **Framework:** Next.js 15 (App Router) — SSR for public pages, API routes for backend
- **Language:** TypeScript (strict)
- **UI:** React + shadcn/ui + Tailwind CSS
- **Editor:** Monaco Editor (dynamic import)
- **DB:** PostgreSQL (self-hosted, Docker)
- **ORM:** Drizzle ORM
- **Auth:** NextAuth.js v5 (Auth.js) with GitHub OAuth
- **AI Scoring:** OpenRouter API (Claude/GPT, structured rubric output)
- **Preview:** Sandboxed iframe (srcdoc + Tailwind CDN play + CSP)
- **Screenshots:** html2canvas or Puppeteer for share cards
- **Deploy:** CubePath VPS + Coolify (Docker Compose, auto-deploy from GitHub)

## Hosting & Infrastructure
- CubePath VPS (gp.nano or gp.micro — 2-4GB RAM)
- Docker Compose: Next.js container + PostgreSQL container
- Coolify for Git-based auto-deploy
- Single server, single deployable

## Submission Sandbox
- Render HTML + CSS via iframe srcdoc
- Tailwind loaded via CDN play script (system-controlled)
- CSP headers block: scripts, external resources, iframes
- DOMPurify sanitization on submit
- No JavaScript execution in user code

## Code Standards
- TypeScript strict mode
- ESLint + Prettier
- shadcn/ui component conventions
- Drizzle schema-first DB design
- Server Components by default, Client Components only when needed
- API routes for mutations, Server Actions where appropriate

## Testing Strategy
TODO — Will be defined as implementation progresses.
