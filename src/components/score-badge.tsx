import { cn } from "@/lib/utils"

export function ScoreBadge({
  score,
  className,
}: {
  score: number | null
  className?: string
}) {
  if (score === null) return null

  return (
    <span
      className={cn(
        "bg-accent/15 text-accent inline-flex items-center rounded-md px-2 py-0.5 font-mono text-sm font-semibold",
        className
      )}
    >
      {score.toFixed(1)}
    </span>
  )
}
