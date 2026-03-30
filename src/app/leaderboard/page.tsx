import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { ChallengeCard } from "@/components/challenge-card"
import { SubmissionCard } from "@/components/submission-card"
import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

type Challenge = Database["public"]["Tables"]["uxclash_challenges"]["Row"]
type Submission = Database["public"]["Tables"]["uxclash_submissions"]["Row"]

export const dynamic = "force-dynamic"

export default async function LeaderboardPage() {
  const supabase = await createClient()
  const now = new Date().toISOString()

  // Active challenges
  const { data: challengeData } = await supabase
    .from("uxclash_challenges")
    .select("*")
    .eq("active", true)
    .or(`starts_at.is.null,and(starts_at.lte.${now},ends_at.gte.${now})`)

  const challenges = (challengeData ?? []) as Challenge[]
  const daily = challenges.find((c) => c.type === "daily") ?? null
  const weekly = challenges.find((c) => c.type === "weekly") ?? null

  // Submissions for active challenges
  const challengeIds = [daily?.id, weekly?.id].filter(Boolean) as string[]
  let submissions: Submission[] = []
  if (challengeIds.length > 0) {
    const { data } = await supabase
      .from("uxclash_submissions")
      .select("*")
      .in("challenge_id", challengeIds)
      .order("social_score", { ascending: false, nullsFirst: false })
    submissions = (data ?? []) as Submission[]
  }

  const dailySubs = daily
    ? submissions.filter((s) => s.challenge_id === daily.id)
    : []
  const weeklySubs = weekly
    ? submissions.filter((s) => s.challenge_id === weekly.id)
    : []

  // Current user's likes
  const {
    data: { user },
  } = await supabase.auth.getUser()
  let likedIds = new Set<string>()
  if (user && submissions.length > 0) {
    const { data: likes } = await supabase
      .from("uxclash_likes")
      .select("submission_id")
      .eq("user_id", user.id)
      .in("submission_id", submissions.map((s) => s.id))
    likedIds = new Set((likes ?? []).map((l) => l.submission_id))
  }

  // Global ranking
  const { data: allSubs } = await supabase
    .from("uxclash_submissions")
    .select("user_id, username, avatar_url, social_score")

  const userMap = new Map<
    string,
    { username: string | null; avatar_url: string | null; total: number; count: number }
  >()
  for (const row of allSubs ?? []) {
    const existing = userMap.get(row.user_id)
    const score = row.social_score ?? 0
    if (existing) {
      existing.total += score
      existing.count += 1
    } else {
      userMap.set(row.user_id, {
        username: row.username,
        avatar_url: row.avatar_url,
        total: score,
        count: 1,
      })
    }
  }
  const ranked = [...userMap.values()]
    .sort((a, b) => b.total - a.total)
    .slice(0, 50)

  return (
    <PageShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leaderboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Rankings por reto activo y ranking global acumulado.
          </p>
        </div>

        {/* Daily + Weekly columns */}
        <div className="grid gap-8 lg:grid-cols-2">
          <ChallengeLeaderboard
            label="Daily"
            challenge={daily}
            submissions={dailySubs}
            likedIds={likedIds}
          />
          <ChallengeLeaderboard
            label="Weekly"
            challenge={weekly}
            submissions={weeklySubs}
            likedIds={likedIds}
          />
        </div>

        {/* Global ranking */}
        <div className="pt-6">
          <h2 className="mb-4 text-lg font-semibold">Ranking global</h2>
          {ranked.length > 0 ? (
            <div className="space-y-2">
              {ranked.map((u, i) => (
                <div
                  key={i}
                  className="border-border flex items-center gap-4 rounded-lg border p-3"
                >
                  <span className="text-muted-foreground w-6 text-center font-mono text-sm font-bold">
                    {i + 1}
                  </span>
                  {u.avatar_url && (
                    <img src={u.avatar_url} alt="" className="size-7 rounded-full" />
                  )}
                  <span className="flex-1 truncate text-sm font-medium">
                    {u.username ?? "Anónimo"}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {u.count} {u.count === 1 ? "entry" : "entries"}
                  </span>
                  <span className="text-accent font-mono text-sm font-semibold">
                    {u.total}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-border rounded-lg border border-dashed p-12 text-center">
              <p className="text-muted-foreground text-sm">
                Aún no hay datos en el ranking.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  )
}

function ChallengeLeaderboard({
  label,
  challenge,
  submissions,
  likedIds,
}: {
  label: string
  challenge: Challenge | null
  submissions: Submission[]
  likedIds: Set<string>
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">{label}</h2>

      {challenge ? (
        <>
          <ChallengeCard challenge={challenge} />
          {submissions.length > 0 ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {submissions.map((s, i) => (
                <SubmissionCard
                  key={s.id}
                  submission={s}
                  rank={i + 1}
                  liked={likedIds.has(s.id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Aún no hay entries. ¡Sé el primero!
            </p>
          )}
        </>
      ) : (
        <div className="border-border rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground text-sm">
            No hay reto {label.toLowerCase()} activo.
          </p>
        </div>
      )}
    </div>
  )
}
