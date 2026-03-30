import { NextResponse } from "next/server"
import { getSubmissionAiFeedback } from "@/lib/ai/score-submission"

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (!UUID_RE.test(id)) {
    return NextResponse.json({ error: "Invalid submission id" }, { status: 400 })
  }

  try {
    const feedback = await getSubmissionAiFeedback(id)

    if (!feedback) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    return NextResponse.json(feedback)
  } catch {
    return NextResponse.json(
      { error: "No se pudo cargar el feedback AI." },
      { status: 500 }
    )
  }
}
