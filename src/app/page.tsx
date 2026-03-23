import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { ChallengeCard } from "@/components/challenge-card"
import { LikeButton } from "@/components/like-button"
import { SubmissionPreview } from "@/components/submission-preview"
import { Zap, Calendar, Trophy, Globe } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

type Challenge = Database["public"]["Tables"]["uxclash_challenges"]["Row"]
type Submission = Database["public"]["Tables"]["uxclash_submissions"]["Row"]

export const dynamic = "force-dynamic"

async function getColumnData(
  supabase: Awaited<ReturnType<typeof createClient>>,
  challenge: Challenge | null,
  userId: string | null,
) {
  if (!challenge) return { entries: [] as Submission[], likedIds: new Set<string>() }

  const { data: subs } = await supabase
    .from("uxclash_submissions")
    .select("*")
    .eq("challenge_id", challenge.id)
    .order("social_score", { ascending: false, nullsFirst: false })
    .limit(5)

  const entries = (subs ?? []) as Submission[]

  let likedIds = new Set<string>()
  if (userId && entries.length > 0) {
    const { data: likes } = await supabase
      .from("uxclash_likes")
      .select("submission_id")
      .eq("user_id", userId)
      .in("submission_id", entries.map((s) => s.id))
    likedIds = new Set((likes ?? []).map((l) => l.submission_id))
  }

  return { entries, likedIds }
}

export default async function HomePage() {
  const supabase = await createClient()
  const now = new Date().toISOString()

  const { data: challengeData } = await supabase
    .from("uxclash_challenges")
    .select("*")
    .eq("active", true)
    .or(`starts_at.is.null,and(starts_at.lte.${now},ends_at.gte.${now})`)
    .order("created_at", { ascending: false })

  const challenges = (challengeData ?? []) as Challenge[]
  const daily = challenges.find((c) => c.type === "daily") ?? null
  const weekly = challenges.find((c) => c.type === "weekly") ?? null

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const userId = user?.id ?? null

  const [dailyData, weeklyData] = await Promise.all([
    getColumnData(supabase, daily, userId),
    getColumnData(supabase, weekly, userId),
  ])

  return (
    <PageShell className="space-y-12">
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

      {/* Two-column on desktop, stacked on mobile */}
      <section className="grid gap-8 md:grid-cols-2">
        {/* Daily column */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Zap className="text-accent size-5" />
            Reto diario
          </h2>
          {daily ? (
            <ChallengeCard challenge={daily} />
          ) : (
            <div className="border-border rounded-lg border border-dashed p-8 text-center">
              <p className="text-muted-foreground text-sm">No hay reto activo.</p>
            </div>
          )}
          <h2 className="mt-4 flex items-center gap-2 text-lg font-semibold">
            <Trophy className="text-accent size-5" />
            Ranking diario
          </h2>
          <RankingCard
            entries={dailyData.entries}
            likedIds={dailyData.likedIds}
            hasChallenge={!!daily}
            viewport={daily?.viewport}
          />
        </div>

        {/* Weekly column */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Calendar className="text-accent size-5" />
            Reto semanal
          </h2>
          {weekly ? (
            <ChallengeCard challenge={weekly} />
          ) : (
            <div className="border-border rounded-lg border border-dashed p-8 text-center">
              <p className="text-muted-foreground text-sm">No hay reto activo.</p>
            </div>
          )}
          <h2 className="mt-4 flex items-center gap-2 text-lg font-semibold">
            <Trophy className="text-accent size-5" />
            Ranking semanal
          </h2>
          <RankingCard
            entries={weeklyData.entries}
            likedIds={weeklyData.likedIds}
            hasChallenge={!!weekly}
            viewport={weekly?.viewport}
          />
        </div>
      </section>

      {/* Global ranking — full width */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          <span className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Globe className="text-accent size-5" />
              Ranking global
            </span>
            <Link
              href="/leaderboard"
              className="text-accent text-sm font-normal hover:underline"
            >
              Ver todo →
            </Link>
          </span>
        </h2>

        <GlobalLeaderboard supabase={supabase} />
      </section>
    </PageShell>
  )
}

function RankingCard({
  entries,
  likedIds,
  hasChallenge,
  viewport,
}: {
  entries: Submission[]
  likedIds: Set<string>
  hasChallenge: boolean
  viewport?: string
}) {
  if (entries.length === 0) {
    return (
      <div className="border-border rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground text-sm">
          {hasChallenge ? "Aún no hay entries. ¡Sé el primero!" : "No hay reto activo."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {entries.map((submission, i) => (
        <div
          key={submission.id}
          className="border-border flex overflow-hidden rounded-lg border"
        >
          <div className="flex w-1/2 flex-col justify-center gap-1 p-3">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-mono text-xs font-bold">
                #{i + 1}
              </span>
              {submission.avatar_url && (
                <img src={submission.avatar_url} alt="" className="size-5 rounded-full" />
              )}
              <span className="truncate text-sm font-medium">
                {submission.username ?? "Anónimo"}
              </span>
            </div>
            <div>
              <LikeButton
                submissionId={submission.id}
                initialCount={submission.social_score ?? 0}
                initialLiked={likedIds.has(submission.id)}
              />
            </div>
          </div>
          <div className="w-1/2">
            <SubmissionPreview html={submission.html} css={submission.css ?? ""} viewport={viewport} />
          </div>
        </div>
      ))}
    </div>
  )
}

async function GlobalLeaderboard({
  supabase,
}: {
  supabase: Awaited<ReturnType<typeof createClient>>
}) {
  const { data } = await supabase
    .from("uxclash_submissions")
    .select("user_id, username, avatar_url, social_score")

  const userMap = new Map<
    string,
    { username: string | null; avatar_url: string | null; total: number }
  >()
  for (const row of data ?? []) {
    const existing = userMap.get(row.user_id)
    const score = row.social_score ?? 0
    if (existing) {
      existing.total += score
    } else {
      userMap.set(row.user_id, {
        username: row.username,
        avatar_url: row.avatar_url,
        total: score,
      })
    }
  }
  const topUsers = [...userMap.values()]
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)

  if (topUsers.length === 0) {
    return (
      <div className="border-border rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground text-sm">
          El ranking se mostrará aquí.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {topUsers.map((u, i) => (
        <div
          key={i}
          className="border-border flex items-center gap-4 rounded-lg border p-3"
        >
          <span className="text-muted-foreground w-6 text-center font-mono text-sm font-bold">
            {i + 1}
          </span>
          {u.avatar_url && (
            <img src={u.avatar_url} alt="" className="size-6 rounded-full" />
          )}
          <span className="flex-1 truncate text-sm font-medium">
            {u.username ?? "Anónimo"}
          </span>
          <span className="text-accent font-mono text-sm font-semibold">
            {u.total}
          </span>
        </div>
      ))}
    </div>
  )
}
