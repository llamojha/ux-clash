import { cn } from "@/lib/utils"

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <main className={cn("mx-auto w-full max-w-6xl px-4 py-8 sm:px-6", className)}>
      {children}
    </main>
  )
}
