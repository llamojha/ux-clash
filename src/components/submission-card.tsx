import Link from "next/link"
import { SubmissionPreview } from "@/components/submission-preview"
import { LikeButton } from "@/components/like-button"
import type { Database } from "@/lib/database.types"

type Submission = Database["public"]["Tables"]["uxclash_submissions"]["Row"]

export function SubmissionCard({
  submission,
  rank,
  liked,
  viewport,
}: {
  submission: Submission
  rank: number
  liked: boolean
  viewport?: string
}) {
  return (
    <div className="border-border relative overflow-hidden rounded-lg border transition-all hover:border-accent/50 hover:shadow-[0_0_16px_rgba(74,222,128,0.15)] hover:-translate-y-0.5">
      <Link href={`/submission/${submission.id}`} className="absolute inset-0 z-0" aria-label={`Ver entry de ${submission.username ?? "Anónimo"}`} />
      <SubmissionPreview html={submission.html} css={submission.css} viewport={viewport} />
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground font-mono text-sm font-bold">#{rank}</span>
          {submission.avatar_url && (
            <img src={submission.avatar_url} alt="" className="size-5 rounded-full" />
          )}
          <span className="truncate text-sm font-medium">
            {submission.username ?? "Anónimo"}
          </span>
        </div>
        <div className="relative z-10">
          <LikeButton
            submissionId={submission.id}
            initialCount={submission.social_score ?? 0}
            initialLiked={liked}
          />
        </div>
      </div>
    </div>
  )
}
