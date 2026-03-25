"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

export function LikeButton({
  submissionId,
  initialCount,
  initialLiked,
}: {
  submissionId: string
  initialCount: number
  initialLiked: boolean
}) {
  const [liked, setLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)
  const [pending, setPending] = useState(false)

  const toggle = async () => {
    if (pending) return

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

    // Optimistic update
    const prevLiked = liked
    const prevCount = count
    setLiked(!liked)
    setCount(liked ? count - 1 : count + 1)
    setPending(true)

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submission_id: submissionId }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setLiked(data.liked)
      setCount(data.count)
    } catch {
      setLiked(prevLiked)
      setCount(prevCount)
    } finally {
      setPending(false)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={pending}
      className="text-muted-foreground hover:text-accent flex items-center gap-1 text-sm transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={liked ? "Quitar like" : "Dar like"}
    >
      <Heart
        className={cn("size-4", liked && "fill-accent text-accent")}
      />
      <span className="font-mono text-xs">{count}</span>
    </button>
  )
}
