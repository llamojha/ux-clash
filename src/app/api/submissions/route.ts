import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { sanitizeHtml, sanitizeCss } from "@/lib/sanitize"

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 })
  }

  const cookieStore = await cookies()
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options),
        )
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { challenge_id?: string; html?: string; css?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const { challenge_id, html = "", css = "" } = body

  if (!challenge_id || !UUID_RE.test(challenge_id)) {
    return NextResponse.json({ error: "Invalid challenge_id" }, { status: 400 })
  }

  // Check if challenge has ended
  const { data: challenge } = await supabase
    .from("uxclash_challenges")
    .select("ends_at")
    .eq("id", challenge_id)
    .single()

  if (challenge?.ends_at && new Date(challenge.ends_at) < new Date()) {
    return NextResponse.json({ error: "Challenge ended" }, { status: 403 })
  }

  const username =
    user.user_metadata?.user_name || user.user_metadata?.name || null
  const avatar_url = user.user_metadata?.avatar_url || null

  const { data, error } = await supabase
    .from("uxclash_submissions")
    .insert({
      user_id: user.id,
      challenge_id,
      html: sanitizeHtml(html),
      css: sanitizeCss(css),
      username,
      avatar_url,
    })
    .select("id")
    .single()

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Already submitted" }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ id: data.id }, { status: 201 })
}
