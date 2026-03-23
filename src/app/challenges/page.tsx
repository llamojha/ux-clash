import { PageShell } from "@/components/page-shell"
import { ChallengeCard } from "@/components/challenge-card"
import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

type Challenge = Database["public"]["Tables"]["uxclash_challenges"]["Row"]

export const dynamic = "force-dynamic"

export default async function ChallengesPage() {
  const supabase = await createClient()
  const now = new Date().toISOString()

  const { data } = await supabase
    .from("uxclash_challenges")
    .select("*")
    .eq("active", true)
    .order("starts_at", { ascending: false, nullsFirst: false })

  const all = (data ?? []) as Challenge[]

  const active = all.filter(
    (c) =>
      !c.starts_at ||
      (c.starts_at <= now && c.ends_at! >= now),
  )
  const past = all.filter(
    (c) => c.ends_at && c.ends_at < now,
  )

  return (
    <PageShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Retos</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Elige un reto y demuestra tu criterio de UX/UI.
          </p>
        </div>

        {active.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {active.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        ) : (
          <div className="border-border rounded-lg border border-dashed p-12 text-center">
            <p className="text-muted-foreground text-sm">
              No hay retos activos todavía.
            </p>
          </div>
        )}

        {past.length > 0 && (
          <>
            <h2 className="text-lg font-semibold pt-6">Retos anteriores</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </>
        )}
      </div>
    </PageShell>
  )
}
