"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { LoginButton } from "@/components/login-button"
import { Button } from "@/components/ui/button"
import type { User } from "@supabase/supabase-js"

export function UserMenu() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div className="h-7 w-20" />
  if (!user) return <LoginButton />

  const avatar = user.user_metadata?.avatar_url
  const name =
    user.user_metadata?.user_name || user.user_metadata?.name || "Usuario"

  const handleSignOut = () => {
    const supabase = createClient()
    supabase.auth.signOut().then(() => setUser(null))
  }

  return (
    <div className="flex items-center gap-2">
      <a href="/profile" className="flex items-center gap-2 rounded hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        {avatar && (
          <img src={avatar} alt={name} className="size-7 rounded-full" />
        )}
        <span className="text-sm">{name}</span>
      </a>
      <Button variant="ghost" size="sm" onClick={handleSignOut}>
        Cerrar sesión
      </Button>
    </div>
  )
}
