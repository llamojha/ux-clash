export const AI_STATUSES = [
  "pending",
  "processing",
  "completed",
  "failed",
] as const

export type AiStatus = (typeof AI_STATUSES)[number]

export const RUBRIC_FIELDS = [
  "clarity",
  "visual_hierarchy",
  "challenge_compliance",
  "usability",
  "accessibility",
  "visual_quality",
] as const

export type RubricField = (typeof RUBRIC_FIELDS)[number]

export const RUBRIC_LABELS: Record<RubricField, string> = {
  clarity: "Claridad",
  visual_hierarchy: "Jerarquía visual",
  challenge_compliance: "Ajuste al reto",
  usability: "Usabilidad",
  accessibility: "Accesibilidad",
  visual_quality: "Calidad visual",
}

export interface ScoreDraft {
  clarity: number
  visual_hierarchy: number
  challenge_compliance: number
  usability: number
  accessibility: number
  visual_quality: number
  strengths: string[]
  weaknesses: string[]
  suggestion: string
}

export interface ScoreResult extends ScoreDraft {
  total: number
}

export interface FeedbackStateResponse {
  status: AiStatus
  summary: {
    ai_score: number | null
    provider: string | null
    model: string | null
  }
  score: ScoreResult | null
  error: string | null
}
