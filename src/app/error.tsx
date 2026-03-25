"use client"

import { useEffect } from "react"
import { PageShell } from "@/components/page-shell"
import { Button } from "@/components/ui/button"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <PageShell className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-2xl font-bold">Algo salió mal</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Ocurrió un error inesperado. Intenta de nuevo.
      </p>
      <Button onClick={reset} className="mt-6" size="sm">
        Intentar de nuevo
      </Button>
    </PageShell>
  )
}
