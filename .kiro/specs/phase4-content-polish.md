# Phase 4 — Content + Polish

## Problem Statement
UX Clash is functionally complete through Phases 2–3. Phase 4 is the final polish pass before hackathon submission: fix interrupted edits, add loading/error states, improve mobile responsiveness, add accessibility basics, and write the hackathon README.

## Requirements
- Fix broken `RankingCard` edit + wrap `GlobalLeaderboard` in Card
- Loading skeletons for all major routes
- Error boundaries (`error.tsx`) + global `not-found.tsx`
- Mobile responsiveness pass (browsing pages — editor stays desktop-focused)
- Accessibility: focus-visible rings, skip-to-content, semantic markup
- Hackathon-ready README.md
- All user-facing UI text in Spanish (es_ES)
- Final TypeScript compilation check

## Tasks

- [x] Task 0: Write this spec file
- [x] Task 1: Fix `RankingCard` + wrap `GlobalLeaderboard` in Card (`src/app/page.tsx`)
- [x] Task 2: Loading skeletons (home, leaderboard, challenge detail, submission)
- [x] Task 3: Error boundaries (`error.tsx`, `global-error.tsx`) + global `not-found.tsx`
- [x] Task 4: Mobile responsiveness pass (header, ranking cards, editor mobile notice)
- [x] Task 5: Accessibility (skip-to-content, focus-visible rings, `id="main-content"`)
- [x] Task 6: Hackathon README.md
- [x] Task 7: Final verification (`tsc --noEmit` + `bun run build`)
