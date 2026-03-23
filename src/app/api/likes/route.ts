import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

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

  let body: { submission_id?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const { submission_id } = body
  if (!submission_id || !UUID_RE.test(submission_id)) {
    return NextResponse.json({ error: "Invalid submission_id" }, { status: 400 })
  }

  // Check if already liked
  const { data: existing } = await supabase
    .from("uxclash_likes")
    .select("id")
    .eq("user_id", user.id)
    .eq("submission_id", submission_id)
    .single()

  let liked: boolean
  if (existing) {
    await supabase.from("uxclash_likes").delete().eq("id", existing.id)
    liked = false
  } else {
    await supabase
      .from("uxclash_likes")
      .insert({ user_id: user.id, submission_id })
    liked = true
  }

  // Get updated count and sync social_score
  const { count } = await supabase
    .from("uxclash_likes")
    .select("*", { count: "exact", head: true })
    .eq("submission_id", submission_id)

  const newCount = count ?? 0
  await supabase
    .from("uxclash_submissions")
    .update({ social_score: newCount })
    .eq("id", submission_id)

  return NextResponse.json({ liked, count: newCount })
}
