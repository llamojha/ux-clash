import { parseScoreDraft, scoreResponseJsonSchema, withComputedTotal } from "../schema"
import type { ScoreResult } from "../types"

const GEMINI_API_BASE =
  "https://generativelanguage.googleapis.com/v1beta/models"
const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash-lite"
const REQUEST_TIMEOUT_MS = 20_000

type GeminiCandidate = {
  content?: {
    parts?: Array<{
      text?: string
    }>
  }
  finishReason?: string
}

type GeminiResponse = {
  candidates?: GeminiCandidate[]
  promptFeedback?: {
    blockReason?: string
  }
  error?: {
    message?: string
  }
}

export function getGeminiModel() {
  return process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL
}

function getGeminiApiKey() {
  const apiKey = process.env.GEMINI_API_KEY?.trim()
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured")
  }

  return apiKey
}

function extractGeminiText(payload: GeminiResponse) {
  const parts = payload.candidates?.[0]?.content?.parts ?? []
  const text = parts
    .map((part) => part.text?.trim())
    .filter((part): part is string => !!part)
    .join("")

  if (text) return text

  if (payload.promptFeedback?.blockReason) {
    throw new Error(`Gemini blocked the request: ${payload.promptFeedback.blockReason}`)
  }

  const finishReason = payload.candidates?.[0]?.finishReason
  if (finishReason) {
    throw new Error(`Gemini returned no usable output: ${finishReason}`)
  }

  throw new Error("Gemini returned an empty response")
}

function getFetchErrorMessage(payload: GeminiResponse, status: number) {
  const message = payload.error?.message?.trim()
  return message || `Gemini request failed with status ${status}`
}

export async function scoreWithGemini(prompt: string): Promise<ScoreResult> {
  const response = await fetch(
    `${GEMINI_API_BASE}/${getGeminiModel()}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": getGeminiApiKey(),
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
          responseJsonSchema: scoreResponseJsonSchema,
        },
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    }
  )

  let payload: GeminiResponse
  try {
    payload = (await response.json()) as GeminiResponse
  } catch {
    throw new Error("Gemini returned invalid JSON")
  }

  if (!response.ok) {
    throw new Error(getFetchErrorMessage(payload, response.status))
  }

  const rawText = extractGeminiText(payload)

  let parsed: unknown
  try {
    parsed = JSON.parse(rawText)
  } catch {
    throw new Error("Gemini returned malformed JSON content")
  }

  return withComputedTotal(parseScoreDraft(parsed))
}
