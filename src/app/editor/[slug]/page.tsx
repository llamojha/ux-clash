import { notFound } from "next/navigation"
import { EditorArena } from "@/components/editor-arena"
import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

type Challenge = Database["public"]["Tables"]["uxclash_challenges"]["Row"]

export const dynamic = "force-dynamic"

export default async function EditorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from("uxclash_challenges")
    .select("*")
    .eq("slug", slug)
    .single()

  const challenge = data as Challenge | null
  if (!challenge) notFound()

  return <EditorArena challenge={challenge} />
}
