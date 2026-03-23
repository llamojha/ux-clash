import { ImageResponse } from "next/og"
import { createClient } from "@/lib/supabase/server"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  try {
    const supabase = await createClient()
    const { data: challenge } = await supabase
      .from("uxclash_challenges")
      .select("title, type, viewport")
      .eq("slug", slug)
      .single()

    if (!challenge) {
      return new Response("", { status: 302, headers: { Location: "/og.png" } })
    }

    const typeBadge = challenge.type === "daily" ? "Diario" : "Semanal"
    const viewportBadge =
      challenge.viewport === "mobile"
        ? "Móvil"
        : challenge.viewport === "desktop"
          ? "Escritorio"
          : "Ambos"

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
            {challenge.title}
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
            <span>{typeBadge}</span>
            <span>{viewportBadge}</span>
          </div>
        </div>
      ),
      { ...size },
    )
  } catch {
    return new Response("", { status: 302, headers: { Location: "/og.png" } })
  }
}
