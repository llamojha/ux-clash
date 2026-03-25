import { redirect } from "next/navigation"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { Heart } from "lucide-react"
import { LikeButton } from "@/components/like-button"
import { ShareButton } from "@/components/share-button"
import { SubmissionPreview } from "@/components/submission-preview"
import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

type Submission = Database["public"]["Tables"]["uxclash_submissions"]["Row"]

export const dynamic = "force-dynamic"

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/")

  const username =
    user.user_metadata?.user_name || user.user_metadata?.name || "Anónimo"
  const avatar = user.user_metadata?.avatar_url

  const { data } = await supabase
    .from("uxclash_submissions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const submissions = (data ?? []) as Submission[]
  const totalLikes = submissions.reduce((sum, s) => sum + (s.social_score ?? 0), 0)

  // Get challenge titles for each submission
  const challengeIds = [...new Set(submissions.map((s) => s.challenge_id))]
  let challengeMap = new Map<string, { title: string; slug: string; viewport: string }>()
  if (challengeIds.length > 0) {
    const { data: challenges } = await supabase
      .from("uxclash_challenges")
      .select("id, title, slug, viewport")
      .in("id", challengeIds)
    for (const c of challenges ?? []) {
      challengeMap.set(c.id, { title: c.title, slug: c.slug, viewport: c.viewport })
    }
  }

  return (
    <PageShell className="max-w-3xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {avatar && (
              <img src={avatar} alt="" className="size-14 rounded-full" />
            )}
            <div>
              <h1 className="text-xl font-bold">{username}</h1>
              <p className="text-muted-foreground text-sm">
                {submissions.length} {submissions.length === 1 ? "entry" : "entries"} · <Heart className="text-accent inline size-3.5 fill-current" /> {totalLikes}
              </p>
            </div>
          </div>
          <ShareButton url={`/user/${encodeURIComponent(username)}`} title={`${username} en UX Clash`} />
        </div>

        {/* Submissions */}
        {submissions.length > 0 ? (
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
                    <p className="truncate text-sm font-medium">
                      {challenge?.title ?? "Reto"}
                    </p>
                    <div className="text-muted-foreground mt-1 flex items-center justify-between text-xs">
                      <span>{new Date(s.created_at).toLocaleDateString("es-ES")}</span>
                      <span className="flex items-center gap-1"><Heart className="text-accent size-3 fill-current" /> {s.social_score ?? 0}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="border-border rounded-lg border border-dashed p-12 text-center">
            <p className="text-muted-foreground text-sm">
              Aún no tienes entries. ¡Participa en un reto!
            </p>
            <Link href="/challenges" className="text-accent mt-2 inline-block text-sm hover:underline">
              Ver retos →
            </Link>
          </div>
        )}
      </div>
    </PageShell>
  )
}
