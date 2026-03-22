"use client"

import { useState, useRef, useCallback } from "react"
import dynamic from "next/dynamic"

const Editor = dynamic(() => import("@monaco-editor/react").then((m) => m.default), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <p className="text-muted-foreground text-sm">Cargando editor…</p>
    </div>
  ),
})

type Tab = "html" | "css"

const TAB_CONFIG: Record<Tab, { label: string; language: string; path: string }> = {
  html: { label: "HTML", language: "html", path: "file:///index.html" },
  css: { label: "CSS", language: "css", path: "file:///style.css" },
}

export function CodeEditor({
  defaultHtml = "",
  defaultCss = "",
  onChange,
}: {
  defaultHtml?: string
  defaultCss?: string
  onChange: (code: { html: string; css: string }) => void
}) {
  const [tab, setTab] = useState<Tab>("html")
  const htmlRef = useRef(defaultHtml)
  const cssRef = useRef(defaultCss)

  const handleChange = useCallback(
    (value: string | undefined) => {
      const v = value ?? ""
      if (tab === "html") htmlRef.current = v
      else cssRef.current = v
      onChange({ html: htmlRef.current, css: cssRef.current })
    },
    [tab, onChange],
  )

  const config = TAB_CONFIG[tab]

  return (
    <div className="flex h-full flex-col">
      <div className="border-border/50 flex items-center gap-1 border-b px-3 py-1.5">
        {(Object.keys(TAB_CONFIG) as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded px-2 py-0.5 text-xs font-medium ${
              tab === t
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {TAB_CONFIG[t].label}
          </button>
        ))}
      </div>
      <div className="flex-1">
        <Editor
          theme="vs-dark"
          path={config.path}
          defaultLanguage={config.language}
          defaultValue={tab === "html" ? defaultHtml : defaultCss}
          onChange={handleChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            scrollBeyondLastLine: false,
            padding: { top: 12 },
          }}
        />
      </div>
    </div>
  )
}
