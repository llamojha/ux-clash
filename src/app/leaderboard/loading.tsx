import { PageShell } from "@/components/page-shell"

export default function LeaderboardLoading() {
  return (
    <PageShell>
      <div className="space-y-6">
        <div className="bg-muted h-8 w-40 animate-pulse rounded" />
        <div className="grid gap-8 lg:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-4">
              <div className="bg-muted h-6 w-24 animate-pulse rounded" />
              <div className="bg-muted h-52 animate-pulse rounded-lg" />
              {[1, 2, 3].map((j) => (
                <div key={j} className="bg-muted h-16 animate-pulse rounded-lg" />
              ))}
            </div>
          ))}
        </div>
        <div className="bg-muted h-6 w-36 animate-pulse rounded" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-muted h-12 animate-pulse rounded-lg" />
        ))}
      </div>
    </PageShell>
  )
}
