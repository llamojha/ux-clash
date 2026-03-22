# Phase 1 — Technical Design

## New Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@monaco-editor/react` | `@next` (v4.7.0-rc.0) | React 19 compatible Monaco wrapper |
| `monaco-editor` | latest | Peer dep for TypeScript types |

## Architecture

### Editor Page (`/editor/[slug]`)

```
Server Component (page.tsx)
  └─ Fetches challenge by slug from Supabase
  └─ Passes challenge data to:
      └─ Client Component (EditorArena)
           ├─ Challenge brief bar (title, objective, viewport badge, submit button)
           └─ Split panel (CSS grid)
                ├─ Left: CodeEditor (Monaco with HTML/CSS tabs)
                └─ Right: PreviewPanel (sandboxed iframe)
```

### Monaco Editor Integration

- Import via `next/dynamic` with `ssr: false` — Monaco requires browser APIs
- Multi-model via `path` prop: `file:///index.html` (HTML), `file:///style.css` (CSS)
- Tab UI switches active model; content persists across switches
- Options: `minimap: false`, `fontSize: 14`, `wordWrap: "on"`, `scrollBeyondLastLine: false`
- Theme: `vs-dark`

### Iframe Sandbox

- `srcdoc` attribute with full HTML document:
  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
    <style>{userCSS}</style>
  </head>
  <body>{sanitizedUserHTML}</body>
  </html>
  ```
- `sandbox="allow-scripts"` — needed for Tailwind CDN to process classes
- No `allow-same-origin` — isolates iframe from parent document
- User HTML sanitized: `<script>` tags removed, `on*` attributes removed

### Viewport Toggle

| Mode | Width |
|------|-------|
| Mobile | 375px |
| Desktop | 1280px |

Wrapper div constrains iframe width. Default set from `challenge.viewport`.

### Submit API Route (`POST /api/submissions`)

```
Request: { challenge_id, html, css }
  → Validate auth (401 if not authenticated)
  → Sanitize HTML server-side
  → Check existing submission (409 if duplicate)
  → Insert into submissions table
  → Return 201 { id }
```

### Sanitization (`src/lib/sanitize.ts`)

Shared utility used by both PreviewPanel (client) and API route (server):
- Strip `<script>...</script>` tags (regex)
- Strip `on*` event handler attributes (regex)

### DB Migration

```sql
-- 002_unique_submission.sql
CREATE UNIQUE INDEX idx_submissions_user_challenge
  ON public.submissions (user_id, challenge_id);
```

## Component Tree

```
src/
├── app/
│   ├── editor/[slug]/
│   │   ├── page.tsx          # Server component, fetches challenge
│   │   └── not-found.tsx     # 404 for invalid slugs
│   └── api/submissions/
│       └── route.ts          # POST handler
├── components/
│   ├── editor-arena.tsx      # Client component, orchestrates editor + preview
│   ├── code-editor.tsx       # Monaco wrapper with tabs
│   └── preview-panel.tsx     # Sandboxed iframe with viewport toggle
└── lib/
    └── sanitize.ts           # HTML sanitization utility
```
