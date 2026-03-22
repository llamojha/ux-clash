---
inclusion: always
---

# Architecture

## Key Screens
1. **Home** — Headline, CTA, reto destacado, top entries, leaderboard preview
2. **Challenge Page** — Título, escenario, objetivo, viewport, restricciones, CTA "Abrir editor"
3. **Editor Arena** — HTML panel + CSS/Tailwind panel + preview right, challenge meta top, submit button
4. **Submission Result** — Preview/snapshot, score total, IA breakdown, social score, leaderboard position, share button
5. **Public Entry Page** — Preview grande, autor, reto, scores, share link, CTA para unirse
6. **Leaderboard** — Ranking por reto, top entries, score total, filtros daily/weekly

## Core Entities
- **User** — username, avatar, submissions, aggregate score
- **Challenge** — title, scenario, objective, constraints, viewport, template, type (daily/weekly)
- **Submission** — user, challenge, html, css, ai_score, social_score, total_score, snapshot, created_at
- **Like** — user, submission
- **AIScore** — submission, scores per criterion, strengths, weaknesses, suggestion

## Auth Flow
- Browse freely without login
- Open editor without login
- Login required for: submit, like, appear on leaderboard
- Minimal profile (username, optional avatar)

## Scoring Flow
1. User submits HTML + CSS
2. System captures snapshot
3. AI evaluates against rubric (6 criteria) → ai_score
4. Social score accumulates from likes → social_score
5. Total = 50% ai_score + 50% social_score
6. Leaderboard updates

## Security Constraints
- No JavaScript execution in submissions
- No external scripts/imports
- No iframes from user code
- No external requests from sandbox
- Tailwind loaded by system, not user

## Directory Layout
TODO — Will be defined once stack is chosen.
