"use client"

import { useState } from "react"
import { buildSrcdoc } from "@/lib/srcdoc"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { XIcon, Monitor, Smartphone } from "lucide-react"

const IFRAME_SIZE = {
  mobile: "h-[812px] w-[375px] scale-[0.25]",
  desktop: "h-[800px] w-[1280px] scale-[0.2]",
}

export function SubmissionPreview({ html, css, viewport = "desktop" }: { html: string; css: string; viewport?: string }) {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<"mobile" | "desktop">(viewport === "mobile" ? "mobile" : "desktop")
  const size = viewport === "mobile" ? IFRAME_SIZE.mobile : IFRAME_SIZE.desktop
  const doc = buildSrcdoc(html, css)

  return (
    <>
      <div
        className="bg-muted relative h-32 w-full cursor-zoom-in overflow-hidden rounded-md"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true) }}
      >
        <iframe
          srcDoc={doc}
          sandbox="allow-scripts"
          className={`pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 origin-top ${size}`}
          title="Vista previa"
          loading="lazy"
        />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="border-border bg-background flex flex-col gap-0 overflow-hidden p-0 sm:max-w-5xl h-[85vh]">
          <div className="flex items-center justify-between border-b border-border/50 px-3 py-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setView("mobile")}
                className={`rounded p-1 ${view === "mobile" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
                aria-label="Vista móvil"
              >
                <Smartphone className="size-3.5" />
              </button>
              <button
                onClick={() => setView("desktop")}
                className={`rounded p-1 ${view === "desktop" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
                aria-label="Vista escritorio"
              >
                <Monitor className="size-3.5" />
              </button>
            </div>
            <DialogClose className="text-muted-foreground hover:text-foreground rounded p-1 transition-colors">
              <XIcon className="size-4" />
              <span className="sr-only">Cerrar</span>
            </DialogClose>
          </div>
          <div className="flex-1 overflow-auto p-2">
            <iframe
              srcDoc={doc}
              sandbox="allow-scripts"
              className={view === "mobile" ? "mx-auto h-[812px] w-[375px] border border-border rounded-md" : "h-[800px] w-full"}
              title="Vista previa interactiva"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
