"use client"

import { useState } from "react"
import { buildSrcdoc } from "@/lib/srcdoc"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const IFRAME_SIZE = {
  mobile: "h-[812px] w-[375px] scale-[0.25]",
  desktop: "h-[800px] w-[1280px] scale-[0.2]",
}

export function SubmissionPreview({ html, css, viewport = "desktop" }: { html: string; css: string; viewport?: string }) {
  const [open, setOpen] = useState(false)
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
        <DialogContent className="border-border bg-background p-2 sm:max-w-3xl">
          <div className="h-[600px] w-full overflow-auto rounded-md">
            <iframe
              srcDoc={doc}
              sandbox=""
              className={viewport === "mobile" ? "mx-auto h-[812px] w-[375px] border border-border rounded-md" : "h-[800px] w-full"}
              title="Vista previa interactiva"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
