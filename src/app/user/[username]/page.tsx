import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { Heart } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { ShareButton } from "@/components/share-button"
import { SubmissionPreview } from "@/components/submission-preview"
import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

type Submission = Database["public"]["Tables"]["uxclash_submissions"]["Row"]

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>
}): Promise<Metadata> {
  const { username } = await params
  const decoded = decodeURIComponent(username)
  return {
    title: `${decoded} — Perfil`,
    description: `Submissions de ${decoded} en UX Clash`,
  }
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const decoded = decodeURIComponent(username)
  const supabase = await createClient()

  const { data } = await supabase
    .from("uxclash_submissions")
    .select("*")
    .eq("username", decoded)
    .order("created_at", { ascending: false })

  const submissions = (data ?? []) as Submission[]
  if (submissions.length === 0) notFound()

  const avatar = submissions[0].avatar_url
  const totalLikes = submissions.reduce((sum, s) => sum + (s.social_score ?? 0), 0)

  const challengeIds = [...new Set(submissions.map((s) => s.challenge_id))]
  const challengeMap = new Map<string, { title: string; viewport: string }>()
  if (challengeIds.length > 0) {
    const { data: challenges } = await supabase
      .from("uxclash_challenges")
      .select("id, title, viewport")
      .in("id", challengeIds)
    for (const c of challenges ?? []) {
      challengeMap.set(c.id, { title: c.title, viewport: c.viewport })
    }
  }

  return (
    <PageShell className="max-w-3xl">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {avatar && <img src={avatar} alt="" className="size-14 rounded-full" />}
            <div>
              <h1 className="text-xl font-bold">{decoded}</h1>
              <p className="text-muted-foreground text-sm">
                {submissions.length} {submissions.length === 1 ? "entry" : "entries"} · <Heart className="text-accent inline size-3.5 fill-current" /> {totalLikes}
              </p>
            </div>
          </div>
          <ShareButton url={`/user/${username}`} title={`${decoded} en UX Clash`} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {submissions.map((s) => {
            const challenge = challengeMap.get(s.challenge_id)
            return (
              <Link
                key={s.id}
                href={`/submission/${s.id}`}
                className="border-border overflow-hidden rounded-lg border transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <SubmissionPreview html={s.html} css={s.css ?? ""} viewport={challenge?.viewport} />
                <div className="p-3">
                  <p className="truncate text-sm font-medium">{challenge?.title ?? "Reto"}</p>
                  <div className="text-muted-foreground mt-1 flex items-center justify-between text-xs">
                    <span>{new Date(s.created_at).toLocaleDateString("es-ES")}</span>
                    <span className="flex items-center gap-1"><Heart className="text-accent size-3 fill-current" /> {s.social_score ?? 0}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </PageShell>
  )
}
