import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { PageShell } from "@/components/page-shell"
import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

type Challenge = Database["public"]["Tables"]["uxclash_challenges"]["Row"]

export const dynamic = "force-dynamic"

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from("uxclash_challenges")
    .select("*")
    .eq("slug", slug)
    .single()

  const challenge = data as Challenge | null
  if (!challenge) notFound()

  return (
    <PageShell className="max-w-3xl">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{challenge.type}</Badge>
          <Badge variant="secondary">{challenge.viewport}</Badge>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          {challenge.title}
        </h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-muted-foreground text-sm font-semibold uppercase tracking-wide">
              Escenario
            </h2>
            <p className="mt-1">{challenge.scenario}</p>
          </div>

          <div>
            <h2 className="text-muted-foreground text-sm font-semibold uppercase tracking-wide">
              Objetivo
            </h2>
            <p className="mt-1">{challenge.objective}</p>
          </div>

          {challenge.constraints && (
            <div>
              <h2 className="text-muted-foreground text-sm font-semibold uppercase tracking-wide">
                Restricciones
              </h2>
              <p className="mt-1">{challenge.constraints}</p>
            </div>
          )}
        </div>

        <Link
          href={`/editor/${challenge.slug}`}
          className="bg-primary text-primary-foreground hover:bg-primary/80 inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium transition-all"
        >
          Abrir editor
        </Link>
      </div>
    </PageShell>
  )
}
