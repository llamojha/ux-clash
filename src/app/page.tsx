import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { ChallengeCard } from "@/components/challenge-card"
import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

type Challenge = Database["public"]["Tables"]["uxclash_challenges"]["Row"]

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("uxclash_challenges")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false })
    .limit(3)

  const challenges = (data ?? []) as Challenge[]
  const featured = challenges[0]

  return (
    <PageShell>
      {/* Hero */}
      <section className="py-16 text-center sm:py-24">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Diseña. Compite.
          <br />
          <span className="text-accent">Demuestra tu criterio.</span>
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-lg">
          Resuelve retos de interfaz con HTML + Tailwind, recibe scoring de IA y
          compite en el leaderboard.
        </p>
        <div className="mt-8">
          <Link
            href="/challenges"
            className="bg-primary text-primary-foreground hover:bg-primary/80 inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium transition-all"
          >
            Ver retos
          </Link>
        </div>
      </section>

      {/* Featured challenge */}
      {featured && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Reto destacado</h2>
          <ChallengeCard challenge={featured} />
        </section>
      )}

      {/* Placeholder sections */}
      <section className="mt-12 space-y-4">
        <h2 className="text-lg font-semibold">Top Entries</h2>
        <div className="border-border rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground text-sm">
            Las mejores submissions aparecerán aquí.
          </p>
        </div>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-lg font-semibold">Leaderboard</h2>
        <div className="border-border rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground text-sm">
            El ranking se mostrará aquí.
          </p>
        </div>
      </section>
    </PageShell>
  )
}
