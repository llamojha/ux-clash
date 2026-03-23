import Link from "next/link"
import Image from "next/image"
import { UserMenu } from "@/components/user-menu"

export function SiteHeader() {
  return (
    <header className="border-border/50 border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <Image src="/logo.svg" alt="" width={24} height={24} className="text-foreground" />
            UX Clash
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/challenges"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Retos
            </Link>
            <Link
              href="/leaderboard"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
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
