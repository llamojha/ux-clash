# Phase 2 — Social + Leaderboard

## Problem Statement
UX Clash has a working editor-to-submit flow (Phase 1) but no competitive layer. Phase 2 adds: timed challenges, likes, per-challenge leaderboards, and a global user ranking.

## Requirements
- `starts_at` / `ends_at` on challenges; filter by time window; countdown on challenge detail; block submissions after `ends_at`
- Like system: one per user per submission, toggle from submission cards
- Social score = simple like count on `uxclash_submissions.social_score`
- Per-challenge leaderboard inline on challenge detail page
- Global leaderboard at `/leaderboard`: users ranked by aggregated scores
- No user profile page

## Tasks

- [x] Task 0: Write this spec file
- [x] Task 1: DB migration — `starts_at`/`ends_at` on challenges + types
- [x] Task 2: Challenge timing logic — filter + countdown component
- [x] Task 3: Block submissions after `ends_at` (API + editor UI)
- [x] Task 4: Like API route (toggle + update social_score)
- [x] Task 5: Like button component (optimistic UI)
- [x] Task 6: Per-challenge leaderboard — submission cards, author columns migration, preview thumbnails
- [x] Task 7: Global leaderboard page + nav link
- [x] Task 8: Wire home page placeholders with real data
