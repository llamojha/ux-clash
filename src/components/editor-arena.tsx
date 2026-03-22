"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CodeEditor } from "@/components/code-editor"
import { PreviewPanel } from "@/components/preview-panel"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { Database } from "@/lib/database.types"

type Challenge = Database["public"]["Tables"]["uxclash_challenges"]["Row"]

export function EditorArena({ challenge }: { challenge: Challenge }) {
  const [code, setCode] = useState({
    html: challenge.template_html ?? "",
    css: challenge.template_css ?? "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const codeRef = useRef(code)

  const handleChange = useCallback((c: { html: string; css: string }) => {
    setCode(c)
    codeRef.current = c
  }, [])

  const handleSubmit = useCallback(async () => {
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

    setSubmitting(true)
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge_id: challenge.id, html, css }),
      })

      if (res.status === 401) {
        supabase.auth.signInWithOAuth({
          provider: "github",
          options: {
            redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(window.location.pathname)}`,
          },
        })
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
      toast.success("¡Enviado!", {
        description: "Tu entry ha sido guardada.",
        action: {
          label: "Ver",
          onClick: () => (window.location.href = `/submission/${id}`),
        },
      })
    } finally {
      setSubmitting(false)
    }
  }, [challenge.id])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault()
        if (!submitted && !submitting) handleSubmit()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [handleSubmit, submitted, submitting])

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      {/* Brief bar */}
      <div className="border-border/50 flex items-center gap-3 border-b px-4 py-2">
        <h1 className="truncate text-sm font-semibold">{challenge.title}</h1>
        <Badge variant="outline" className="shrink-0 text-xs">
          {challenge.viewport}
        </Badge>
        <p className="text-muted-foreground hidden truncate text-xs sm:block">
          {challenge.objective}
        </p>
        <Button
          size="sm"
          className="ml-auto shrink-0"
          onClick={handleSubmit}
          disabled={submitting || submitted}
        >
          {submitted ? "Enviado" : submitting ? "Enviando…" : "Enviar"}
        </Button>
      </div>

      {/* Editor + Preview */}
      <div className="grid min-h-0 flex-1 grid-cols-2">
        <div className="border-border/50 border-r">
          <CodeEditor
            defaultHtml={challenge.template_html ?? ""}
            defaultCss={challenge.template_css ?? ""}
            onChange={handleChange}
          />
        </div>
        <PreviewPanel
          html={code.html}
          css={code.css}
          defaultViewport={challenge.viewport}
        />
      </div>
    </div>
  )
}
