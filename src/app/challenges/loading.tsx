import { PageShell } from "@/components/page-shell"

export default function ChallengesLoading() {
  return (
    <PageShell>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="bg-muted h-8 w-48 animate-pulse rounded" />
          <div className="bg-muted h-4 w-72 animate-pulse rounded" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-muted h-40 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    </PageShell>
  )
}
