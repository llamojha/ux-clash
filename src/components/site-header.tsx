import Link from "next/link"
import Image from "next/image"
import { UserMenu } from "@/components/user-menu"

export function SiteHeader() {
  return (
    <header className="border-border/50 border-b">
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:z-50 focus-visible:bg-background focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg">
            <Image src="/logo.svg" alt="" width={24} height={24} className="text-foreground" />
            <span className="hidden sm:inline">UX Clash</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/challenges"
              className="text-muted-foreground hover:text-accent rounded text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Retos
            </Link>
            <Link
              href="/leaderboard"
              className="text-muted-foreground hover:text-accent rounded text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Leaderboard
            </Link>
          </nav>
        </div>
        <UserMenu />
      </div>
    </header>
  )
}
