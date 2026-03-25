import Link from "next/link"
import { PageShell } from "@/components/page-shell"

export default function NotFound() {
  return (
    <PageShell className="py-24 text-center">
      <h1 className="text-2xl font-bold">Página no encontrada</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="text-accent mt-6 inline-block text-sm hover:underline"
      >
        ← Volver al inicio
      </Link>
    </PageShell>
  )
}
