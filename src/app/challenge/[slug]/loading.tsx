import { PageShell } from "@/components/page-shell"

export default function ChallengeLoading() {
  return (
    <PageShell className="max-w-3xl">
      <div className="space-y-6">
        <div className="flex gap-2">
          <div className="bg-muted h-5 w-16 animate-pulse rounded-full" />
          <div className="bg-muted h-5 w-20 animate-pulse rounded-full" />
        </div>
        <div className="bg-muted h-9 w-full max-w-80 animate-pulse rounded" />
        <div className="space-y-4">
          <div className="bg-muted h-4 w-20 animate-pulse rounded" />
          <div className="bg-muted h-16 w-full animate-pulse rounded" />
          <div className="bg-muted h-4 w-20 animate-pulse rounded" />
          <div className="bg-muted h-12 w-full animate-pulse rounded" />
        </div>
        <div className="bg-muted h-9 w-32 animate-pulse rounded-lg" />
      </div>
    </PageShell>
  )
}
