import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { LikeButton } from "@/components/like-button"
import { ShareButton } from "@/components/share-button"
import { buildSrcdoc } from "@/lib/srcdoc"
import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

type Submission = Database["public"]["Tables"]["uxclash_submissions"]["Row"]
type Challenge = Database["public"]["Tables"]["uxclash_challenges"]["Row"]

export const dynamic = "force-dynamic"

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

async function getSubmissionWithChallenge(id: string) {
  if (!UUID_RE.test(id)) return null
  const supabase = await createClient()
  const { data: submission } = await supabase
    .from("uxclash_submissions")
    .select("*")
    .eq("id", id)
    .single()
  if (!submission) return null

  const { data: challenge } = await supabase
    .from("uxclash_challenges")
    .select("*")
    .eq("id", (submission as Submission).challenge_id)
    .single()

  return {
    submission: submission as Submission,
    challenge: challenge as Challenge | null,
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const result = await getSubmissionWithChallenge(id)
  if (!result) return {}

  const { submission, challenge } = result
  const author = submission.username ?? "Anónimo"
  const title = challenge
    ? `"${challenge.title}" por ${author}`
    : `Entry por ${author}`
  const description = challenge?.scenario?.slice(0, 160) ?? "Una submission en UX Clash"

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary_large_image", title, description },
  }
}

export default async function SubmissionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const result = await getSubmissionWithChallenge(id)
  if (!result) notFound()

  const { submission, challenge } = result

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let liked = false
  if (user) {
    const { data } = await supabase
      .from("uxclash_likes")
      .select("id")
      .eq("user_id", user.id)
      .eq("submission_id", submission.id)
      .maybeSingle()
    liked = !!data
  }

  const viewport = challenge?.viewport ?? "desktop"
  const iframeClass =
    viewport === "mobile"
      ? "h-full w-[375px] mx-auto"
      : "h-full w-full"

  return (
    <PageShell className="max-w-7xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Preview */}
        <div className="bg-muted flex-1 overflow-hidden rounded-lg border">
          <iframe
            srcDoc={buildSrcdoc(submission.html, submission.css)}
            sandbox="allow-scripts"
            className={`min-h-[60vh] ${iframeClass}`}
            title="Vista previa de la submission"
          />
        </div>

        {/* Sidebar */}
        <div className="w-full space-y-6 lg:w-72 lg:shrink-0">
          {/* Challenge info */}
          {challenge && (
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">
                Reto
              </p>
              <Link
                href={`/challenge/${challenge.slug}`}
                className="text-accent hover:underline font-medium"
              >
                {challenge.title}
              </Link>
            </div>
          )}

          {/* Author */}
          <div className="flex items-center gap-2">
            {submission.avatar_url && (
              <img
                src={submission.avatar_url}
                alt=""
                className="size-8 rounded-full"
              />
            )}
            <span className="font-medium">
              {submission.username ?? "Anónimo"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <LikeButton
              submissionId={submission.id}
              initialCount={submission.social_score ?? 0}
              initialLiked={liked}
            />
            <ShareButton
              url={`/submission/${submission.id}`}
              title={
                challenge
                  ? `"${challenge.title}" por ${submission.username ?? "Anónimo"}`
                  : "Entry en UX Clash"
              }
            />
          </div>

          {/* Nav links */}
          <nav className="text-muted-foreground space-y-2 text-sm">
            {challenge && (
              <Link
                href={`/challenge/${challenge.slug}`}
                className="hover:text-foreground block transition-colors"
              >
                ← Volver al reto
              </Link>
            )}
            <Link
              href="/"
              className="hover:text-foreground block transition-colors"
            >
              ← Inicio
            </Link>
          </nav>
        </div>
      </div>
    </PageShell>
  )
}
