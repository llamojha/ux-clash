import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { PageShell } from "@/components/page-shell"
import { CountdownTimer } from "@/components/countdown-timer"
import { ShareButton } from "@/components/share-button"
import { ChallengeSubmissions } from "@/components/challenge-submissions"
import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

type Challenge = Database["public"]["Tables"]["uxclash_challenges"]["Row"]

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from("uxclash_challenges")
    .select("title, scenario")
    .eq("slug", slug)
    .single()
  if (!data) return {}

  const title = data.title
  const description = data.scenario?.slice(0, 160) ?? ""
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary_large_image", title, description },
  }
}

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

  const ended = challenge.ends_at
    ? new Date(challenge.ends_at).getTime() < Date.now()
    : false

  return (
    <PageShell className="max-w-3xl">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {challenge.type === "daily" ? "Diario" : "Semanal"}
          </Badge>
          <Badge variant="secondary">
            {challenge.viewport === "mobile" ? "Móvil" : challenge.viewport === "desktop" ? "Escritorio" : "Ambos"}
          </Badge>
          {challenge.ends_at && <CountdownTimer endsAt={challenge.ends_at} />}
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

        {ended ? (
          <Badge variant="destructive">Reto finalizado</Badge>
        ) : (
          <Link
            href={`/editor/${challenge.slug}`}
            className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_0_16px_rgba(74,222,128,0.2)] inline-flex h-10 items-center justify-center rounded-xl px-6 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Abrir editor
          </Link>
        )}

        <ShareButton
          url={`/challenge/${challenge.slug}`}
          title={challenge.title}
        />
      </div>

      {/* Per-challenge leaderboard */}
      <div className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">Participaciones</h2>
        <ChallengeSubmissions challengeId={challenge.id} />
      </div>
    </PageShell>
  )
}
