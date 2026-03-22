"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export function LoginButton() {
  const handleLogin = () => {
    const supabase = createClient()
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLogin}>
      Sign in with GitHub
    </Button>
  )
}
