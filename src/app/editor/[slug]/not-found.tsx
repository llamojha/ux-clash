import Link from "next/link"
import { PageShell } from "@/components/page-shell"

export default function NotFound() {
  return (
    <PageShell className="max-w-lg text-center">
      <h1 className="text-2xl font-bold">Reto no encontrado</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Este reto no existe o ya no está activo.
      </p>
      <Link
        href="/challenges"
        className="text-accent mt-4 inline-block text-sm hover:underline"
      >
        ← Volver a los retos
      </Link>
    </PageShell>
  )
}
