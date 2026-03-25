import { PageShell } from "@/components/page-shell"

export default function HomeLoading() {
  return (
    <PageShell className="space-y-12">
      <section className="py-16 text-center sm:py-24">
        <div className="bg-muted mx-auto h-12 w-72 animate-pulse rounded" />
        <div className="bg-muted mx-auto mt-4 h-5 w-full max-w-96 animate-pulse rounded" />
        <div className="bg-muted mx-auto mt-8 h-9 w-28 animate-pulse rounded-lg" />
      </section>
      <section className="grid gap-8 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-4">
            <div className="bg-muted h-6 w-32 animate-pulse rounded" />
            <div className="bg-muted h-52 animate-pulse rounded-lg" />
            <div className="bg-muted h-6 w-36 animate-pulse rounded" />
            <div className="bg-muted h-40 animate-pulse rounded-lg" />
          </div>
        ))}
      </section>
      <div className="bg-muted h-6 w-40 animate-pulse rounded" />
      <div className="bg-muted h-48 animate-pulse rounded-lg" />
    </PageShell>
  )
}
