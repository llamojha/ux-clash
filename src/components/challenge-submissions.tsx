import { createClient } from "@/lib/supabase/server"
import { SubmissionCard } from "@/components/submission-card"
import type { Database } from "@/lib/database.types"

type Submission = Database["public"]["Tables"]["uxclash_submissions"]["Row"]

export async function ChallengeSubmissions({
  challengeId,
}: {
  challengeId: string
}) {
  const supabase = await createClient()

  const { data: submissions } = await supabase
    .from("uxclash_submissions")
    .select("*")
    .eq("challenge_id", challengeId)
    .order("social_score", { ascending: false, nullsFirst: false })

  const entries = (submissions ?? []) as Submission[]

  if (entries.length === 0) {
    return (
      <div className="border-border rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground text-sm">
          Aún no hay submissions para este reto.
        </p>
      </div>
    )
  }

  // Get current user's likes
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let likedIds = new Set<string>()
  if (user) {
    const { data: likes } = await supabase
      .from("uxclash_likes")
      .select("submission_id")
      .eq("user_id", user.id)
      .in(
        "submission_id",
        entries.map((s) => s.id),
      )
    likedIds = new Set((likes ?? []).map((l) => l.submission_id))
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {entries.map((submission, i) => (
        <SubmissionCard
          key={submission.id}
          submission={submission}
          rank={i + 1}
          liked={likedIds.has(submission.id)}
        />
      ))}
    </div>
  )
}
