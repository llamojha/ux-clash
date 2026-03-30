import type { Database } from "@/lib/database.types"
import { createAdminClient } from "@/lib/supabase/admin"
import { buildScorePrompt } from "./prompt"
import { jsonToStringArray } from "./schema"
import { getGeminiModel, scoreWithGemini } from "./providers/gemini"
import {
  AI_STATUSES,
  type AiStatus,
  type FeedbackStateResponse,
  type ScoreResult,
} from "./types"

type SubmissionRow = Database["public"]["Tables"]["uxclash_submissions"]["Row"]
type ChallengeRow = Database["public"]["Tables"]["uxclash_challenges"]["Row"]
type AiScoreRow = Database["public"]["Tables"]["uxclash_ai_scores"]["Row"]

const PROCESSING_STALE_MS = 90_000

function isAiStatus(value: string): value is AiStatus {
  return AI_STATUSES.includes(value as AiStatus)
}

function normalizeAiStatus(value: string) {
  return isAiStatus(value) ? value : "pending"
}

function isRecentProcessing(startedAt: string | null) {
  if (!startedAt) return false

  return Date.now() - new Date(startedAt).getTime() < PROCESSING_STALE_MS
}

function normalizeScoreRecord(score: AiScoreRow | null): ScoreResult | null {
  if (!score) return null

  return {
    clarity: Number(score.clarity),
    visual_hierarchy: Number(score.visual_hierarchy),
    challenge_compliance: Number(score.challenge_compliance),
    usability: Number(score.usability),
    accessibility: Number(score.accessibility),
    visual_quality: Number(score.visual_quality),
    total: Number(score.total),
    strengths: jsonToStringArray(score.strengths),
    weaknesses: jsonToStringArray(score.weaknesses),
    suggestion: score.suggestion ?? "",
  }
}

function toUserFacingError(error: unknown) {
  if (error instanceof Error) {
    if (error.name === "TimeoutError") return "La IA ha tardado demasiado."
    if (error.message.includes("configured")) return "La IA no esta configurada."
    if (error.message.includes("malformed JSON")) {
      return "La IA devolvio un formato invalido."
    }
    if (error.message.includes("invalid JSON")) {
      return "La IA respondio con datos no validos."
    }
  }

  return "No se pudo generar feedback ahora."
}

async function loadSubmissionState(submissionId: string) {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from("uxclash_submissions")
    .select(
      "id, challenge_id, html, css, ai_status, ai_score, ai_error, ai_started_at, ai_provider, ai_model"
    )
    .eq("id", submissionId)
    .maybeSingle()

  if (error) throw error
  return (data ?? null) as Pick<
    SubmissionRow,
    | "id"
    | "challenge_id"
    | "html"
    | "css"
    | "ai_status"
    | "ai_score"
    | "ai_error"
    | "ai_started_at"
    | "ai_provider"
    | "ai_model"
  > | null
}

export async function getSubmissionAiFeedback(
  submissionId: string
): Promise<FeedbackStateResponse | null> {
  const admin = createAdminClient()

  const submission = await loadSubmissionState(submissionId)
  if (!submission) return null

  const { data: score, error } = await admin
    .from("uxclash_ai_scores")
    .select("*")
    .eq("submission_id", submissionId)
    .maybeSingle()

  if (error) throw error

  const normalizedScore = normalizeScoreRecord((score ?? null) as AiScoreRow | null)

  return {
    status: normalizeAiStatus(submission.ai_status),
    summary: {
      ai_score: submission.ai_score ?? normalizedScore?.total ?? null,
      provider: submission.ai_provider,
      model: submission.ai_model,
    },
    score: normalizedScore,
    error: submission.ai_error,
  }
}

export async function requestSubmissionScoring(submissionId: string) {
  const admin = createAdminClient()
  const submission = await loadSubmissionState(submissionId)

  if (!submission) return null

  const status = normalizeAiStatus(submission.ai_status)

  if (status === "completed") {
    return { status: "completed" as const, shouldStart: false }
  }

  if (status === "processing" && isRecentProcessing(submission.ai_started_at)) {
    return { status: "processing" as const, shouldStart: false }
  }

  let updateQuery = admin
    .from("uxclash_submissions")
    .update({
      ai_status: "processing",
      ai_error: null,
      ai_started_at: new Date().toISOString(),
      ai_completed_at: null,
      ai_provider: null,
      ai_model: null,
      ai_score: null,
    })
    .eq("id", submissionId)

  if (status === "processing") {
    updateQuery = updateQuery.eq("ai_status", "processing")
    updateQuery = submission.ai_started_at
      ? updateQuery.eq("ai_started_at", submission.ai_started_at)
      : updateQuery.is("ai_started_at", null)
  } else {
    updateQuery = updateQuery.eq("ai_status", status)
  }

  const { data: claimed, error: claimError } = await updateQuery
    .select("id")
    .maybeSingle()

  if (claimError) throw claimError

  if (claimed) {
    return { status: "processing" as const, shouldStart: true }
  }

  const latest = await loadSubmissionState(submissionId)
  if (latest?.ai_status === "completed") {
    return { status: "completed" as const, shouldStart: false }
  }

  return { status: "processing" as const, shouldStart: false }
}

async function loadSubmissionForScoring(submissionId: string) {
  const admin = createAdminClient()
  const { data: submission, error: submissionError } = await admin
    .from("uxclash_submissions")
    .select("*")
    .eq("id", submissionId)
    .maybeSingle()

  if (submissionError) throw submissionError
  if (!submission) return null

  const { data: challenge, error: challengeError } = await admin
    .from("uxclash_challenges")
    .select("*")
    .eq("id", (submission as SubmissionRow).challenge_id)
    .maybeSingle()

  if (challengeError) throw challengeError

  return {
    submission: submission as SubmissionRow,
    challenge: (challenge ?? null) as ChallengeRow | null,
  }
}

async function markSubmissionFailed(submissionId: string, errorMessage: string) {
  const admin = createAdminClient()
  await admin
    .from("uxclash_submissions")
    .update({
      ai_status: "failed",
      ai_error: errorMessage.slice(0, 160),
      ai_completed_at: null,
      ai_provider: null,
      ai_model: null,
      ai_score: null,
    })
    .eq("id", submissionId)
}

export async function runSubmissionScoring(submissionId: string) {
  const admin = createAdminClient()

  try {
    const loaded = await loadSubmissionForScoring(submissionId)
    if (!loaded) return "missing"

    const { submission, challenge } = loaded
    const status = normalizeAiStatus(submission.ai_status)

    if (status === "completed") return "completed"
    if (status !== "processing") return "skipped"
    if (!challenge) throw new Error("Challenge not found")

    const score = await scoreWithGemini(
      buildScorePrompt({
        title: challenge.title,
        scenario: challenge.scenario,
        objective: challenge.objective,
        constraints: challenge.constraints,
        viewport: challenge.viewport,
        html: submission.html,
        css: submission.css,
      })
    )

    const { error: upsertError } = await admin
      .from("uxclash_ai_scores")
      .upsert(
        {
          submission_id: submissionId,
          clarity: score.clarity,
          visual_hierarchy: score.visual_hierarchy,
          challenge_compliance: score.challenge_compliance,
          usability: score.usability,
          accessibility: score.accessibility,
          visual_quality: score.visual_quality,
          total: score.total,
          strengths: score.strengths,
          weaknesses: score.weaknesses,
          suggestion: score.suggestion,
        },
        { onConflict: "submission_id" }
      )

    if (upsertError) throw upsertError

    const { error: updateError } = await admin
      .from("uxclash_submissions")
      .update({
        ai_status: "completed",
        ai_completed_at: new Date().toISOString(),
        ai_error: null,
        ai_provider: "google",
        ai_model: getGeminiModel(),
        ai_score: score.total,
      })
      .eq("id", submissionId)
      .eq("ai_status", "processing")

    if (updateError) throw updateError

    return "completed"
  } catch (error) {
    await markSubmissionFailed(submissionId, toUserFacingError(error))
    return "failed"
  }
}
