# Phase 5 AI Feedback Spike

## Goal

Ship a branch-scoped AI feedback experiment using Gemini 2.5 Flash-Lite that evaluates a submission after it is created and shows feedback on the submission page.

This spike must not destabilize the current working product at `ux-clash.amllamojha.com`.

## Scope

### In Scope

- Async AI feedback on `/submission/[id]`
- Six-criterion rubric scoring
- `pending`, `processing`, `completed`, and `failed` states
- Manual retry from the submission page
- Provider abstraction with Gemini as the first adapter

### Out of Scope

- Leaderboard ordering changes
- `total_score` ranking logic
- Screenshot or vision-based scoring
- OpenRouter integration
- Background job infrastructure beyond a simple app-level async trigger

## Success Criteria

- Existing submit flow remains fast and unchanged
- Submission page can trigger AI scoring separately after redirect
- AI feedback is persisted in the database and survives refresh
- Failures are contained and recoverable
- No homepage or leaderboard logic depends on AI

## Data Model

Use one migration to make scoring state explicit on submissions.

### Add to `uxclash_submissions`

- `ai_status text not null default 'pending' check (ai_status in ('pending','processing','completed','failed'))`
- `ai_error text null`
- `ai_started_at timestamptz null`
- `ai_completed_at timestamptz null`
- `ai_provider text null`
- `ai_model text null`

### Keep Using `uxclash_ai_scores`

Store the detailed rubric result there:

- `clarity`
- `visual_hierarchy`
- `challenge_compliance`
- `usability`
- `accessibility`
- `visual_quality`
- `total`
- `strengths`
- `weaknesses`
- `suggestion`

### Suggested Constraints

- Unique index on `uxclash_ai_scores(submission_id)`
- Check constraints for each rubric field between `0` and `10`
- Check constraint for `total` between `0` and `100`

### Migration Checklist

1. Add the six submission columns.
2. Add `unique (submission_id)` on `uxclash_ai_scores` if it does not already exist.
3. Backfill existing submissions to `ai_status = 'pending'`.
4. Regenerate `src/lib/database.types.ts`.

## Architecture

Keep the existing submit flow unchanged:

- Submit still happens through the current submission API.
- User is redirected to `/submission/[id]`.
- AI scoring starts only after arriving on the submission page.

Treat AI as advisory feedback first, not as product-critical ranking logic.

## Backend Plan

Create a small AI module plus one scoring route.

### Files

- `src/lib/ai/types.ts`
- `src/lib/ai/prompt.ts`
- `src/lib/ai/schema.ts`
- `src/lib/ai/providers/gemini.ts`
- `src/lib/ai/score-submission.ts`
- `src/app/api/submissions/[id]/score/route.ts`
- `src/app/api/submissions/[id]/ai/route.ts`

### `src/lib/ai/types.ts`

Define:

- `AiStatus = "pending" | "processing" | "completed" | "failed"`
- `ScoreResult`

`ScoreResult` should contain:

- `clarity`
- `visual_hierarchy`
- `challenge_compliance`
- `usability`
- `accessibility`
- `visual_quality`
- `total`
- `strengths: string[]`
- `weaknesses: string[]`
- `suggestion: string`

### `src/lib/ai/prompt.ts`

Build one deterministic prompt from:

- challenge title
- scenario
- objective
- constraints
- viewport
- submission HTML
- submission CSS

Prompt rules:

- Judge only what exists in the submitted code.
- Do not invent missing behaviors or interactions.
- Output feedback in Spanish.
- Keep feedback short and concrete.

### `src/lib/ai/schema.ts`

Define the exact structured output schema Gemini must return.

Validation rules:

- Six numeric rubric fields from `0` to `10`
- `strengths` contains exactly 2 short strings
- `weaknesses` contains exactly 2 short strings
- `suggestion` contains 1 actionable string

Compute `total` server-side rather than trusting model arithmetic.

### `src/lib/ai/providers/gemini.ts`

Read environment variables:

- `GEMINI_API_KEY`
- `GEMINI_MODEL=gemini-2.5-flash-lite`

Expose one function:

- `scoreWithGemini(input): Promise<ScoreResult>`

Requirements:

- Low temperature
- Structured JSON output
- Request timeout
- Parse failure handling

### `src/lib/ai/score-submission.ts`

Responsibilities:

1. Load submission and related challenge from Supabase.
2. Refuse to run if `ai_status` is already `completed`.
3. Short-circuit if a recent `processing` attempt is already active.
4. Mark submission as `processing` and set `ai_started_at`.
5. Call the Gemini adapter.
6. Validate and normalize the result.
7. Compute `total`.
8. Upsert into `uxclash_ai_scores`.
9. Update `uxclash_submissions` with:
   - `ai_status = 'completed'`
   - `ai_completed_at = now()`
   - `ai_error = null`
   - `ai_provider = 'google'`
   - `ai_model = 'gemini-2.5-flash-lite'`
   - `ai_score = total`
10. On failure, set:
   - `ai_status = 'failed'`
   - `ai_error = safe short message`

## API Contract

### `POST /api/submissions/:id/score`

Purpose:

- Start scoring if needed
- Be idempotent

Responses:

- `202` when scoring starts:

```json
{ "status": "processing" }
```

- `200` when a completed score already exists:

```json
{ "status": "completed" }
```

- `409` when another run is already processing:

```json
{ "status": "processing" }
```

- `500` on terminal failure:

```json
{ "status": "failed", "error": "..." }
```

### `GET /api/submissions/:id/ai`

Purpose:

- Return current AI status and score payload for polling

Response shape:

```json
{
  "status": "pending | processing | completed | failed",
  "summary": {
    "ai_score": 82.3,
    "provider": "google",
    "model": "gemini-2.5-flash-lite"
  },
  "score": {
    "clarity": 8,
    "visual_hierarchy": 9,
    "challenge_compliance": 8,
    "usability": 7,
    "accessibility": 8,
    "visual_quality": 9,
    "total": 81.7,
    "strengths": ["...", "..."],
    "weaknesses": ["...", "..."],
    "suggestion": "..."
  },
  "error": null
}
```

## Frontend Plan

Keep the existing submit flow unchanged. Trigger AI only on the submission page.

### Add Component

- `src/components/ai-feedback-panel.tsx`

### Component Behavior

1. Receive `submissionId` and initial `ai_status` from the server page.
2. If status is `pending`, call `POST /api/submissions/:id/score` once on mount.
3. Poll `GET /api/submissions/:id/ai` every 2 to 3 seconds until terminal state.
4. Render one of four states:
   - `pending`
   - `processing`
   - `completed`
   - `failed`

### UI States

- `pending`: "Preparando análisis..."
- `processing`: loading state with "Analizando tu entry..."
- `completed`: total badge, six rubric rows, strengths, weaknesses, suggestion
- `failed`: compact error message plus retry button

### Submission Page Changes

Update `src/app/submission/[id]/page.tsx`:

- Fetch `ai_status`, `ai_score`, and `ai_error`
- Mount `AiFeedbackPanel`
- Keep likes and share actions unchanged

### Rendering Notes

- Reuse `src/components/score-badge.tsx` for the total
- Label the section `Feedback IA (beta)`
- Keep the panel clearly secondary to the core preview/share flow

## Rubric

Use these six criteria:

- `clarity`: visual communication and legibility
- `visual_hierarchy`: emphasis, grouping, scanability
- `challenge_compliance`: adherence to brief and constraints
- `usability`: interaction clarity and task flow
- `accessibility`: contrast, semantics, target sizing, readability
- `visual_quality`: polish, spacing, consistency

## Prompt Rules

- Evaluate only what is present in HTML and CSS.
- Do not reward imaginary interactions or missing responsive states.
- Be strict but fair.
- Return Spanish feedback.
- Each strength or weakness should be short.
- Suggestion should be specific and actionable.

## Safeguards

- Request timeout of roughly 15 to 20 seconds
- Duplicate-run prevention through status checks
- Strict schema validation before writing to DB
- Safe, short error messages for users
- No leaderboard or homepage changes in this branch

## Test Checklist

1. Submit a new entry and confirm redirect still works.
2. Open the submission page and verify AI starts automatically.
3. Refresh during processing and confirm duplicate rows are not created.
4. Simulate provider failure and verify `failed` state plus retry works.
5. Confirm completed results persist across refresh.
6. Review 10 to 20 real submissions for scoring consistency.
7. Verify homepage and leaderboard ordering remain unchanged.

## Rollout Sequence

1. Add DB migration and regenerate types.
2. Implement AI types, schema, prompt, and Gemini adapter.
3. Add `score-submission` service.
4. Add scoring and status API routes.
5. Build `AiFeedbackPanel`.
6. Integrate the panel into the submission page.
7. Test with real submissions.
8. Decide whether to merge, park, or drop the spike.

## Definition of Done

- Submit flow stays fast.
- Submission page supports stable AI feedback states.
- Gemini feedback is persisted correctly.
- Failures are contained and retryable.
- No ranking logic depends on AI.
- The branch remains easy to abandon if quality is not good enough.
