import { PageShell } from "@/components/page-shell"
import { ChallengeCard } from "@/components/challenge-card"
import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

type Challenge = Database["public"]["Tables"]["uxclash_challenges"]["Row"]

export const dynamic = "force-dynamic"

export default async function ChallengesPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("uxclash_challenges")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false })

  const challenges = (data ?? []) as Challenge[]

  return (
    <PageShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Retos</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Elige un reto y demuestra tu criterio de UX/UI.
          </p>
        </div>

        {challenges.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => (
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
      </div>
    </PageShell>
  )
}
