import { ImageResponse } from "next/og"
import { createClient } from "@/lib/supabase/server"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!UUID_RE.test(id)) {
    return new Response("", { status: 302, headers: { Location: "/og.png" } })
  }

  try {
    const supabase = await createClient()
    const { data: submission } = await supabase
      .from("uxclash_submissions")
      .select("username, social_score, challenge_id")
      .eq("id", id)
      .single()

    let challengeTitle = "UX Clash Entry"
    if (submission) {
      const { data: challenge } = await supabase
        .from("uxclash_challenges")
        .select("title")
        .eq("id", submission.challenge_id)
        .single()
      if (challenge) challengeTitle = challenge.title
    }

    const author = submission?.username ?? "Anónimo"
    const likes = submission?.social_score ?? 0

    return new ImageResponse(
      (
        <div
          style={{
            background: "#09090b",
            color: "#fafafa",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 80px",
          }}
        >
          <div style={{ fontSize: 28, color: "#a1a1aa", display: "flex" }}>
            ⚡ UX Clash
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              marginTop: 24,
              display: "flex",
            }}
          >
            {challengeTitle.length > 60 ? challengeTitle.slice(0, 57) + "…" : challengeTitle}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#a1a1aa",
              marginTop: 24,
              display: "flex",
              gap: 32,
            }}
          >
            <span>por {author}</span>
            <span>❤️ {likes}</span>
          </div>
        </div>
      ),
      { ...size },
    )
  } catch {
    return new Response("", { status: 302, headers: { Location: "/og.png" } })
  }
}
