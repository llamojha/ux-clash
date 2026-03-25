import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CountdownTimer } from "@/components/countdown-timer"
import type { Database } from "@/lib/database.types"

type Challenge = Database["public"]["Tables"]["uxclash_challenges"]["Row"]

const TYPE_LABEL: Record<string, string> = {
  daily: "Diario",
  weekly: "Semanal",
}

const VIEWPORT_LABEL: Record<string, string> = {
  mobile: "Móvil",
  desktop: "Escritorio",
  both: "Ambos",
}

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <Link href={`/challenge/${challenge.slug}`} className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
      <Card className="hover:border-accent/50 min-h-52 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {TYPE_LABEL[challenge.type] ?? challenge.type}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {VIEWPORT_LABEL[challenge.viewport] ?? challenge.viewport}
            </Badge>
            {challenge.ends_at && (
              <CountdownTimer endsAt={challenge.ends_at} />
            )}
          </div>
          <CardTitle className="text-lg">{challenge.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            {challenge.scenario}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
