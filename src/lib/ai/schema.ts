import type { Json } from "@/lib/database.types"
import { RUBRIC_FIELDS, type ScoreDraft, type ScoreResult } from "./types"

const SHORT_ITEM_MAX = 120
const SUGGESTION_MAX = 240

export const scoreResponseJsonSchema = {
  type: "object",
  properties: {
    clarity: {
      type: "number",
      minimum: 0,
      maximum: 10,
      description: "Nota de claridad visual y legibilidad.",
    },
    visual_hierarchy: {
      type: "number",
      minimum: 0,
      maximum: 10,
      description: "Nota de jerarquia visual, enfasis y escaneabilidad.",
    },
    challenge_compliance: {
      type: "number",
      minimum: 0,
      maximum: 10,
      description: "Nota de ajuste al brief y a las restricciones.",
    },
    usability: {
      type: "number",
      minimum: 0,
      maximum: 10,
      description: "Nota de claridad de uso y del flujo.",
    },
    accessibility: {
      type: "number",
      minimum: 0,
      maximum: 10,
      description: "Nota de accesibilidad basica.",
    },
    visual_quality: {
      type: "number",
      minimum: 0,
      maximum: 10,
      description: "Nota de pulido visual, consistencia y espaciado.",
    },
    strengths: {
      type: "array",
      minItems: 2,
      maxItems: 2,
      items: {
        type: "string",
        maxLength: SHORT_ITEM_MAX,
      },
      description: "Exactamente dos fortalezas cortas en espanol.",
    },
    weaknesses: {
      type: "array",
      minItems: 2,
      maxItems: 2,
      items: {
        type: "string",
        maxLength: SHORT_ITEM_MAX,
      },
      description: "Exactamente dos debilidades cortas en espanol.",
    },
    suggestion: {
      type: "string",
      maxLength: SUGGESTION_MAX,
      description: "Una sugerencia concreta y accionable en espanol.",
    },
  },
  required: [
    "clarity",
    "visual_hierarchy",
    "challenge_compliance",
    "usability",
    "accessibility",
    "visual_quality",
    "strengths",
    "weaknesses",
    "suggestion",
  ],
  propertyOrdering: [
    "clarity",
    "visual_hierarchy",
    "challenge_compliance",
    "usability",
    "accessibility",
    "visual_quality",
    "strengths",
    "weaknesses",
    "suggestion",
  ],
} as const

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function normalizeNumber(value: unknown, label: string) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`Campo invalido: ${label}`)
  }

  const rounded = Number(value.toFixed(1))
  if (rounded < 0 || rounded > 10) {
    throw new Error(`Fuera de rango: ${label}`)
  }

  return rounded
}

function normalizeShortString(value: unknown, label: string, maxLength: number) {
  if (typeof value !== "string") {
    throw new Error(`Campo invalido: ${label}`)
  }

  const normalized = value.trim()
  if (!normalized) {
    throw new Error(`Campo vacio: ${label}`)
  }

  if (normalized.length > maxLength) {
    throw new Error(`Campo demasiado largo: ${label}`)
  }

  return normalized
}

function normalizeShortList(value: unknown, label: string) {
  if (!Array.isArray(value) || value.length !== 2) {
    throw new Error(`Lista invalida: ${label}`)
  }

  return value.map((entry, index) =>
    normalizeShortString(entry, `${label}[${index}]`, SHORT_ITEM_MAX)
  )
}

export function parseScoreDraft(value: unknown): ScoreDraft {
  if (!isRecord(value)) {
    throw new Error("Respuesta AI invalida")
  }

  return {
    clarity: normalizeNumber(value.clarity, "clarity"),
    visual_hierarchy: normalizeNumber(
      value.visual_hierarchy,
      "visual_hierarchy"
    ),
    challenge_compliance: normalizeNumber(
      value.challenge_compliance,
      "challenge_compliance"
    ),
    usability: normalizeNumber(value.usability, "usability"),
    accessibility: normalizeNumber(value.accessibility, "accessibility"),
    visual_quality: normalizeNumber(value.visual_quality, "visual_quality"),
    strengths: normalizeShortList(value.strengths, "strengths"),
    weaknesses: normalizeShortList(value.weaknesses, "weaknesses"),
    suggestion: normalizeShortString(
      value.suggestion,
      "suggestion",
      SUGGESTION_MAX
    ),
  }
}

export function computeTotalScore(score: ScoreDraft | ScoreResult) {
  const total =
    RUBRIC_FIELDS.reduce((sum, field) => sum + score[field], 0) /
    RUBRIC_FIELDS.length

  return Number((total * 10).toFixed(1))
}

export function withComputedTotal(score: ScoreDraft): ScoreResult {
  return {
    ...score,
    total: computeTotalScore(score),
  }
}

export function jsonToStringArray(value: Json): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((entry): entry is string => typeof entry === "string")
}
