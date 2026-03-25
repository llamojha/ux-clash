import { ImageResponse } from "next/og"
import { createClient } from "@/lib/supabase/server"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const decoded = decodeURIComponent(username)

  try {
    const supabase = await createClient()
    const { data, count } = await supabase
      .from("uxclash_submissions")
      .select("social_score", { count: "exact" })
      .eq("username", decoded)

    const entries = count ?? 0
    const totalLikes = (data ?? []).reduce((sum, s) => sum + (s.social_score ?? 0), 0)

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
            {decoded}
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
            <span>{entries} {entries === 1 ? "entry" : "entries"}</span>
            <span>❤️ {totalLikes}</span>
          </div>
        </div>
      ),
      { ...size },
    )
  } catch {
    return new Response("", { status: 302, headers: { Location: "/og.png" } })
  }
}
