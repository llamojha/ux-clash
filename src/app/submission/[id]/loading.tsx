import { PageShell } from "@/components/page-shell"

export default function SubmissionLoading() {
  return (
    <PageShell className="max-w-7xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <div className="bg-muted min-h-[60vh] flex-1 animate-pulse rounded-lg" />
        <div className="w-full space-y-6 lg:w-72 lg:shrink-0">
          <div className="bg-muted h-4 w-16 animate-pulse rounded" />
          <div className="bg-muted h-5 w-40 animate-pulse rounded" />
          <div className="flex items-center gap-2">
            <div className="bg-muted size-8 animate-pulse rounded-full" />
            <div className="bg-muted h-5 w-24 animate-pulse rounded" />
          </div>
          <div className="flex gap-4">
            <div className="bg-muted h-5 w-12 animate-pulse rounded" />
            <div className="bg-muted h-5 w-20 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </PageShell>
  )
}
