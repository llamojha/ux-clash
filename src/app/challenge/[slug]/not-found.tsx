import Link from "next/link"
import { PageShell } from "@/components/page-shell"

export default function ChallengeNotFound() {
  return (
    <PageShell className="text-center">
      <h1 className="text-2xl font-bold">Reto no encontrado</h1>
      <p className="text-muted-foreground mt-2">
        Este reto no existe o ya no está activo.
      </p>
      <Link
        href="/challenges"
        className="border-border bg-background hover:bg-muted mt-6 inline-flex h-8 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-all"
      >
        Ver todos los retos
      </Link>
    </PageShell>
  )
}
