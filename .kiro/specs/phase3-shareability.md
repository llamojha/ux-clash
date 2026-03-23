# Phase 3 — Shareability + Public Pages

## Problem Statement
UX Clash submissions and challenges can't be shared on social media or messaging apps in a meaningful way. There's no way to view a single submission in detail, and links don't generate rich previews. Phase 3 adds a public submission detail page, share buttons, and dynamic OG images.

## Requirements
- Public submission page at `/submission/[id]` with split layout: interactive preview + metadata sidebar
- Share button using `navigator.share()` with clipboard fallback on submission detail + challenge detail pages
- Dynamic OG images via Next.js `ImageResponse` (Satori) for submission and challenge pages
- Submission cards on challenge detail page link to `/submission/[id]`
- Navigation on submission detail page: "Volver al reto" + "Inicio" links
- All UI text in Spanish (es_ES), product terms in English

## Tasks

- [x] Task 0: Write this spec file
- [x] Task 1: Create `ShareButton` client component
- [x] Task 2: Create public submission detail page `/submission/[id]`
- [x] Task 3: Add `generateMetadata` to submission page and challenge page
- [x] Task 4: Create dynamic OG image routes for submission and challenge pages
- [x] Task 5: Make submission cards clickable + add share buttons to pages
- [x] Task 6: Verify TypeScript compiles and final review
