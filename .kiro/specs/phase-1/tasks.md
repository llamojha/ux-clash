# Phase 1 — Implementation Tasks

## Task 1: Spec Files ✅
- [x] Create `.kiro/specs/phase-1/requirements.md`
- [x] Create `.kiro/specs/phase-1/design.md`
- [x] Create `.kiro/specs/phase-1/tasks.md`

## Task 2: Dependencies + DB Migration ✅
- [x] `bun add @monaco-editor/react@next monaco-editor`
- [x] Create `supabase/migrations/002_unique_submission.sql`

## Task 3: Preview Panel ✅
- [x] Create `src/lib/sanitize.ts` (strip `<script>`, `on*` attributes)
- [x] Create `src/components/preview-panel.tsx` (sandboxed iframe, Tailwind CDN, viewport toggle, debounced updates)

## Task 4: Code Editor ✅
- [x] Create `src/components/code-editor.tsx` (Monaco wrapper, HTML/CSS tabs, dynamic import ssr:false)

## Task 5: Editor Arena Page ✅
- [x] Create `src/app/editor/[slug]/page.tsx` (server component, fetch challenge)
- [x] Create `src/app/editor/[slug]/not-found.tsx`
- [x] Create `src/components/editor-arena.tsx` (client component, brief + editor + preview layout)

## Task 6: Submit Flow ✅
- [x] Create `src/app/api/submissions/route.ts` (POST, auth, sanitize, unique check, insert)
- [x] Install shadcn sonner, add `<Toaster />` to root layout
- [x] Wire submit button in EditorArena (toast on success/error, login prompt on 401)

## Task 7: Polish ✅
- [x] Loading skeleton for Monaco (via dynamic import `loading` prop)
- [x] Auto-set viewport from challenge data (defaultViewport prop)
- [x] Disable submit if empty (checked in handleSubmit)
- [x] `Cmd/Ctrl+S` keyboard shortcut for submit
- [x] Login redirect back to editor after auth (via `?next=` param in OAuth redirect)
