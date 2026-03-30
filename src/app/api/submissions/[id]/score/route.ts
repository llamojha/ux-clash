import { after, NextResponse } from "next/server"
import {
  requestSubmissionScoring,
  runSubmissionScoring,
} from "@/lib/ai/score-submission"

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (!UUID_RE.test(id)) {
    return NextResponse.json({ error: "Invalid submission id" }, { status: 400 })
  }

  try {
    const result = await requestSubmissionScoring(id)

    if (!result) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    if (result.status === "completed") {
      return NextResponse.json({ status: "completed" }, { status: 200 })
    }

    if (!result.shouldStart) {
      return NextResponse.json({ status: "processing" }, { status: 409 })
    }

    after(async () => {
      await runSubmissionScoring(id)
    })

    return NextResponse.json({ status: "processing" }, { status: 202 })
  } catch {
    return NextResponse.json(
      { status: "failed", error: "No se pudo iniciar el analisis." },
      { status: 500 }
    )
  }
}
