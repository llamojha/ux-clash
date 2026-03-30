"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  LoaderCircle,
  RefreshCw,
  Sparkles,
  TriangleAlert,
} from "lucide-react"
import { ScoreBadge } from "@/components/score-badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  RUBRIC_FIELDS,
  RUBRIC_LABELS,
  type FeedbackStateResponse,
} from "@/lib/ai/types"

const POLL_INTERVAL_MS = 2_500

export function AiFeedbackPanel({
  submissionId,
  initialState,
}: {
  submissionId: string
  initialState: FeedbackStateResponse
}) {
  const [state, setState] = useState(initialState)
  const [starting, setStarting] = useState(false)
  const autoStartedRef = useRef(false)

  const syncState = useCallback(async () => {
    const response = await fetch(`/api/submissions/${submissionId}/ai`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("sync_failed")
    }

    const nextState = (await response.json()) as FeedbackStateResponse
    setState(nextState)
  }, [submissionId])

  const requestScoring = useCallback(async () => {
    setStarting(true)

    try {
      const response = await fetch(`/api/submissions/${submissionId}/score`, {
        method: "POST",
      })

      const payload = (await response.json().catch(() => null)) as
        | { status?: string; error?: string }
        | null

      if (response.status === 202 || response.status === 409) {
        setState((current) => ({
          ...current,
          status: "processing",
          error: null,
        }))
        await syncState()
        return
      }

      if (response.status === 200) {
        await syncState()
        return
      }

      setState((current) => ({
        ...current,
        status: "failed",
        error: payload?.error ?? "No se pudo iniciar el analisis.",
      }))
    } catch {
      setState((current) => ({
        ...current,
        status: "failed",
        error: "No se pudo iniciar el analisis.",
      }))
    } finally {
      setStarting(false)
    }
  }, [submissionId, syncState])

  useEffect(() => {
    if (state.status !== "pending" || autoStartedRef.current) return

    autoStartedRef.current = true
    void requestScoring()
  }, [requestScoring, state.status])

  useEffect(() => {
    if (state.status !== "processing") return

    const interval = window.setInterval(() => {
      void syncState().catch(() => {
        setState((current) => ({
          ...current,
          status: "failed",
          error: "No se pudo actualizar el estado del analisis.",
        }))
      })
    }, POLL_INTERVAL_MS)

    void syncState().catch(() => {
      setState((current) => ({
        ...current,
        status: "failed",
        error: "No se pudo actualizar el estado del analisis.",
      }))
    })

    return () => window.clearInterval(interval)
  }, [syncState, state.status])

  const total = state.score?.total ?? state.summary.ai_score
  const completedScore = state.status === "completed" ? state.score : null

  return (
    <Card className="border-border/80 bg-card/80">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-accent size-4" />
            Feedback IA (beta)
          </CardTitle>
          <CardDescription>
            Rúbrica automática secundaria. No afecta al ranking en esta fase.
          </CardDescription>
        </div>
        {total !== null && (
          <CardAction>
            <ScoreBadge score={total} className="px-3 py-1 text-base" />
          </CardAction>
        )}
      </CardHeader>

      <CardContent className="space-y-5">
        {state.status === "pending" && (
          <div className="text-muted-foreground flex items-center gap-2">
            <LoaderCircle className="size-4 animate-spin" />
            <p>Preparando análisis...</p>
          </div>
        )}

        {state.status === "processing" && (
          <div className="flex items-center gap-2">
            <LoaderCircle className="text-accent size-4 animate-spin" />
            <div className="space-y-1">
              <p className="font-medium">Analizando tu entry...</p>
              <p className="text-muted-foreground text-sm">
                Estamos puntuando la submission con una rúbrica de 6 criterios.
              </p>
            </div>
          </div>
        )}

        {state.status === "failed" && (
          <div className="space-y-3">
            <div className="bg-destructive/10 text-destructive flex items-start gap-2 rounded-lg p-3">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              <div className="space-y-1">
                <p className="font-medium">No se pudo completar el análisis.</p>
                <p className="text-sm">
                  {state.error ?? "Inténtalo de nuevo en unos segundos."}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => void requestScoring()}
              disabled={starting}
            >
              <RefreshCw className={starting ? "animate-spin" : ""} />
              Reintentar
            </Button>
          </div>
        )}

        {completedScore && (
          <div className="space-y-5">
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {RUBRIC_FIELDS.map((field) => (
                <div
                  key={field}
                  className="bg-muted/40 flex items-center justify-between rounded-lg border px-3 py-2"
                >
                  <span className="text-muted-foreground text-sm">
                    {RUBRIC_LABELS[field]}
                  </span>
                  <span className="font-mono text-sm font-semibold">
                    {completedScore[field].toFixed(1)}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <section className="space-y-2">
                <h3 className="text-sm font-semibold">Fortalezas</h3>
                <ul className="space-y-2">
                  {completedScore.strengths.map((item) => (
                    <li key={item} className="bg-muted/40 rounded-lg border px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-semibold">Debilidades</h3>
                <ul className="space-y-2">
                  {completedScore.weaknesses.map((item) => (
                    <li key={item} className="bg-muted/40 rounded-lg border px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="bg-accent/10 rounded-lg border px-4 py-3">
              <p className="text-xs font-semibold tracking-wide uppercase">
                Sugerencia
              </p>
              <p className="mt-1">{completedScore.suggestion}</p>
            </section>

            {(state.summary.provider || state.summary.model) && (
              <p className="text-muted-foreground text-xs">
                {state.summary.provider ?? "Proveedor desconocido"}
                {state.summary.model ? ` · ${state.summary.model}` : ""}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
