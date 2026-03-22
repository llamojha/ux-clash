import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Database } from "@/lib/database.types"

type Challenge = Database["public"]["Tables"]["uxclash_challenges"]["Row"]

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <Link href={`/challenge/${challenge.slug}`}>
      <Card className="hover:border-accent/50 h-full transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {challenge.type}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {challenge.viewport}
            </Badge>
          </div>
          <CardTitle className="text-lg">{challenge.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {challenge.scenario}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
