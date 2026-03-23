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
    <div className="border-border flex gap-4 rounded-lg border p-3">
      <div className="text-muted-foreground flex w-6 shrink-0 items-start justify-center pt-1 font-mono text-sm font-bold">
        {rank}
      </div>
      <div className="w-32 shrink-0">
        <SubmissionPreview html={submission.html} css={submission.css} viewport={viewport} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-center gap-2">
          {submission.avatar_url && (
            <img
              src={submission.avatar_url}
              alt=""
              className="size-5 rounded-full"
            />
          )}
          <span className="truncate text-sm font-medium">
            {submission.username ?? "Anónimo"}
          </span>
        </div>
        <div className="flex items-center gap-3">
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
