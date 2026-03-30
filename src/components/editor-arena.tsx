"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CodeEditor } from "@/components/code-editor"
import { PreviewPanel } from "@/components/preview-panel"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { CountdownTimer, isChallengeEnded } from "@/components/countdown-timer"
import type { Database } from "@/lib/database.types"

type Challenge = Database["public"]["Tables"]["uxclash_challenges"]["Row"]

export function EditorArena({ challenge }: { challenge: Challenge }) {
  const [code, setCode] = useState({
    html: challenge.template_html ?? "",
    css: challenge.template_css ?? "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [briefOpen, setBriefOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [splitPct, setSplitPct] = useState(50)
  const dragging = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const ended = isChallengeEnded(challenge.ends_at)
  const codeRef = useRef(code)

  const [isDragging, setIsDragging] = useState(false)

  const onDividerDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragging.current = true
    setIsDragging(true)
    document.body.style.cursor = "col-resize"
    document.body.style.userSelect = "none"
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const pct = ((e.clientX - rect.left) / rect.width) * 100
      setSplitPct(Math.min(80, Math.max(20, pct)))
    }
    const resetBody = () => {
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
    const onUp = () => {
      if (!dragging.current) return
      dragging.current = false
      setIsDragging(false)
      resetBody()
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      resetBody()
    }
  }, [])

  const handleChange = useCallback((c: { html: string; css: string }) => {
    setCode(c)
    codeRef.current = c
  }, [])

  const doSubmit = useCallback(async () => {
    setConfirmOpen(false)
    const { html, css } = codeRef.current

    setSubmitting(true)
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge_id: challenge.id, html, css }),
      })

      if (res.status === 401) {
        const supabase = createClient()
        supabase.auth.signInWithOAuth({
          provider: "github",
          options: {
            redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(window.location.pathname)}`,
          },
        })
        return
      }

      if (res.status === 403) {
        toast.error("Este reto ya ha finalizado")
        return
      }

      if (res.status === 409) {
        toast.error("Ya enviaste una solución para este reto")
        setSubmitted(true)
        return
      }

      if (!res.ok) {
        toast.error("Algo salió mal. Inténtalo de nuevo.")
        return
      }

      const { id } = await res.json()
      setSubmitted(true)
      window.location.href = `/submission/${id}`
    } finally {
      setSubmitting(false)
    }
  }, [challenge.id])

  const handleSubmit = useCallback(async () => {
    if (ended) return

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(window.location.pathname)}`,
        },
      })
      return
    }

    const { html, css } = codeRef.current
    if (!html.trim() && !css.trim()) {
      toast.error("Escribe algo antes de enviar")
      return
    }

    setConfirmOpen(true)
  }, [ended])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault()
        if (!submitted && !submitting && !ended) handleSubmit()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [handleSubmit, submitted, submitting, ended])

  const buttonLabel = ended
    ? "Reto finalizado"
    : submitted
      ? "Enviado"
      : submitting
        ? "Enviando…"
        : "Enviar"

  const Chevron = briefOpen ? ChevronUp : ChevronDown

  return (
    <>
      {/* Mobile notice */}
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center md:hidden">
        <p className="text-muted-foreground text-sm">
          El editor está optimizado para escritorio. Abre esta página en una pantalla más grande.
        </p>
        <a
          href={`/challenge/${challenge.slug}`}
          className="text-accent mt-4 text-sm hover:underline"
        >
          ← Volver al reto
        </a>
      </div>

      <div className="hidden h-[calc(100vh-3.5rem)] flex-col md:flex">
      {/* Brief bar */}
      <div className="border-border/50 border-b">
        <div className="flex items-center gap-3 px-4 py-2">
          <button
            onClick={() => setBriefOpen(!briefOpen)}
            className="text-muted-foreground hover:text-accent flex shrink-0 items-center gap-1.5 transition-colors"
            aria-expanded={briefOpen}
            aria-label="Ver detalles del reto"
          >
            <Chevron className="size-4" />
            <h1 className="text-foreground text-sm font-semibold">
              {challenge.title}
            </h1>
          </button>
          <Badge variant="outline" className="shrink-0 text-xs">
            {challenge.viewport === "mobile" ? "Móvil" : challenge.viewport === "desktop" ? "Escritorio" : "Ambos"}
          </Badge>
          <Badge variant="secondary" className="shrink-0 text-xs">
            {challenge.type === "daily" ? "Diario" : "Semanal"}
          </Badge>
          {challenge.ends_at && (
            <CountdownTimer endsAt={challenge.ends_at} />
          )}
          <Button
            size="sm"
            className="ml-auto shrink-0"
            onClick={handleSubmit}
            disabled={submitting || submitted || ended}
          >
            {buttonLabel}
          </Button>
        </div>

        {/* Expanded brief */}
        {briefOpen && (
          <div className="border-border/50 bg-muted/30 grid gap-4 border-t px-4 py-3 sm:grid-cols-3">
            <div>
              <h2 className="text-muted-foreground mb-1 text-xs font-semibold uppercase tracking-wide">
                Escenario
              </h2>
              <p className="text-sm leading-relaxed">{challenge.scenario}</p>
            </div>
            <div>
              <h2 className="text-muted-foreground mb-1 text-xs font-semibold uppercase tracking-wide">
                Objetivo
              </h2>
              <p className="text-sm leading-relaxed">{challenge.objective}</p>
            </div>
            {challenge.constraints && (
              <div>
                <h2 className="text-muted-foreground mb-1 text-xs font-semibold uppercase tracking-wide">
                  Restricciones
                </h2>
                <p className="text-sm leading-relaxed">
                  {challenge.constraints}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Editor + Preview */}
      <div ref={containerRef} className={`flex min-h-0 flex-1${isDragging ? " [&>*]:pointer-events-none" : ""}`}>
        <div className="min-w-0 overflow-hidden" style={{ width: `${splitPct}%` }}>
          <CodeEditor
            defaultHtml={challenge.template_html ?? ""}
            defaultCss={challenge.template_css ?? ""}
            onChange={handleChange}
          />
        </div>
        <div
          onMouseDown={onDividerDown}
          className="border-border/50 hover:bg-accent/50 group relative w-1.5 shrink-0 cursor-col-resize border-x transition-colors"
        >
          <div className="bg-muted-foreground/40 group-hover:bg-accent-foreground/60 absolute top-1/2 left-1/2 h-8 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        </div>
        <div className="min-w-0 flex-1">
          <PreviewPanel
            html={code.html}
            css={code.css}
            defaultViewport={challenge.viewport}
          />
        </div>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Enviar tu solución?</AlertDialogTitle>
            <AlertDialogDescription>
              Una vez enviada, no podrás editarla. Asegúrate de que estás
              conforme con tu diseño antes de continuar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={doSubmit}>Enviar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
    </>
  )
}
