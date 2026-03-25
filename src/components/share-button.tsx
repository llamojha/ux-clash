"use client"

import { Share2 } from "lucide-react"
import { toast } from "sonner"

export function ShareButton({ url, title }: { url: string; title: string }) {
  const share = async () => {
    const fullUrl = new URL(url, window.location.origin).href
    if (navigator.share) {
      try {
        await navigator.share({ title, url: fullUrl })
        return
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(fullUrl)
      toast("Enlace copiado")
    } catch {
      toast.error("No se pudo copiar el enlace")
    }
  }

  return (
    <button
      onClick={share}
      className="text-muted-foreground hover:text-accent flex items-center gap-1.5 text-sm transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label="Compartir"
    >
      <Share2 className="size-4" />
      <span>Compartir</span>
    </button>
  )
}
