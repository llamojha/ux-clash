"use client"

import { useState, useRef, useEffect } from "react"
import { Monitor, Smartphone } from "lucide-react"
import { sanitizeHtml, sanitizeCss } from "@/lib/sanitize"

type Viewport = "mobile" | "desktop"

const VIEWPORT_WIDTH: Record<Viewport, string> = {
  mobile: "375px",
  desktop: "1280px",
}

function buildSrcdoc(html: string, css: string) {
  const safe = sanitizeHtml(html)
  const safeCss = sanitizeCss(css)
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<script src="https://unpkg.com/@tailwindcss/browser@4"><\/script>
<style>${safeCss}</style>
</head>
<body>${safe}</body>
</html>`
}

export function PreviewPanel({
  html,
  css,
  defaultViewport,
}: {
  html: string
  css: string
  defaultViewport: "mobile" | "desktop" | "both"
}) {
  const [viewport, setViewport] = useState<Viewport>(
    defaultViewport === "both" ? "desktop" : defaultViewport,
  )
  const [debouncedDoc, setDebouncedDoc] = useState(() => buildSrcdoc(html, css))
  const timer = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setDebouncedDoc(buildSrcdoc(html, css)), 300)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [html, css])

  return (
    <div className="flex h-full flex-col">
      <div className="border-border/50 flex items-center gap-1 border-b px-3 py-1.5">
        <span className="text-muted-foreground mr-auto text-xs font-medium">
          Preview
        </span>
        <button
          onClick={() => setViewport("mobile")}
          className={`rounded p-1 ${viewport === "mobile" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
          aria-label="Mobile preview"
        >
          <Smartphone className="size-3.5" />
        </button>
        <button
          onClick={() => setViewport("desktop")}
          className={`rounded p-1 ${viewport === "desktop" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
          aria-label="Desktop preview"
        >
          <Monitor className="size-3.5" />
        </button>
      </div>
      <div className="flex-1 overflow-auto bg-white p-2">
        <iframe
          srcDoc={debouncedDoc}
          sandbox="allow-scripts"
          className="mx-auto block h-full border-0"
          style={{ width: VIEWPORT_WIDTH[viewport] }}
          title="Vista previa"
        />
      </div>
    </div>
  )
}
