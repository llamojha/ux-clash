"use client"

import { useState, useEffect, useCallback } from "react"

function formatRemaining(ms: number) {
  if (ms <= 0) return ""
  const s = Math.floor(ms / 1000)
  const d = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (d > 0) {
    return `${d}d ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
  }
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
}

export function CountdownTimer({ endsAt }: { endsAt: string }) {
  const calc = useCallback(
    () => formatRemaining(new Date(endsAt).getTime() - Date.now()),
    [endsAt],
  )

  const [remaining, setRemaining] = useState<string | null>(null)

  useEffect(() => {
    setRemaining(calc())
    const id = setInterval(() => setRemaining(calc()), 1000)
    return () => clearInterval(id)
  }, [calc])

  if (remaining === null) {
    return (
      <span className="text-accent font-mono text-sm font-semibold">
        ⏱ --:--:--
      </span>
    )
  }

  if (!remaining) {
    return (
      <span className="text-destructive text-sm font-medium">Finalizado</span>
    )
  }

  return (
    <span className="text-accent font-mono text-sm font-semibold">
      ⏱ {remaining}
    </span>
  )
}

export function isChallengeEnded(endsAt: string | null) {
  return endsAt ? new Date(endsAt).getTime() < Date.now() : false
}
