# Phase 1 — Core Loop

## User Stories

### US-1: Editor Arena
As a user, I can open a code editor for any challenge so I can write HTML + CSS/Tailwind to solve it.

**Acceptance Criteria:**
- [ ] `/editor/[slug]` page loads with Monaco editor (HTML tab + CSS tab)
- [ ] Challenge brief (title, objective, viewport) visible above editor
- [ ] Templates pre-loaded for challenges that have `template_html`/`template_css`
- [ ] Tab switching preserves content (Monaco multi-model)
- [ ] Editor uses vs-dark theme, no minimap, word wrap on

### US-2: Live Preview
As a user, I can see a live preview of my HTML + CSS with Tailwind support so I get instant visual feedback.

**Acceptance Criteria:**
- [ ] Sandboxed iframe renders user HTML + CSS with Tailwind v4 CDN
- [ ] Preview updates live as I type (debounced ~300ms)
- [ ] Viewport toggle: mobile (375px) / desktop (1280px)
- [ ] `<script>` tags and `on*` event handlers stripped from user HTML
- [ ] iframe uses `sandbox="allow-scripts"` without `allow-same-origin`

### US-3: Submit Flow
As an authenticated user, I can submit my code so it's saved and scored.

**Acceptance Criteria:**
- [ ] Submit button in editor toolbar, requires authentication
- [ ] One submission per user per challenge (final, no edits)
- [ ] HTML sanitized server-side before storage
- [ ] On success: stay on editor, show toast with submission link
- [ ] On 401: trigger GitHub login flow
- [ ] On 409 (duplicate): show "already submitted" message

### US-4: Sandbox Security
As a platform, user submissions cannot execute JavaScript or load external resources.

**Acceptance Criteria:**
- [ ] `<script>` tags stripped from user HTML (client + server)
- [ ] `on*` event handler attributes stripped
- [ ] iframe sandboxed without `allow-same-origin`
- [ ] Unique constraint on `(user_id, challenge_id)` in DB

## Non-Functional Requirements

- Monaco editor dynamically imported (`ssr: false`) to avoid SSR issues
- Preview debounced to avoid iframe thrashing
- Editor page works within standard page shell (header/footer)
- Sanitization logic shared between client preview and server API
