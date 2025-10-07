import { useState, useEffect } from 'react'
import { createClient, Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export interface AuthUIProps {
  supabaseUrl: string
  supabaseAnonKey: string
  onSessionChange?: (session: Session | null) => void
}

export function AuthUI({ supabaseUrl, supabaseAnonKey, onSessionChange }: AuthUIProps) {
  const [session, setSession] = useState<Session | null>(null)
  
  // Create Supabase client with provided credentials
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      onSessionChange?.(session)
      console.log("session", session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      onSessionChange?.(session)
    })

    return () => subscription.unsubscribe()
  }, [supabase, onSessionChange])

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
      />
    )
  }

  // Return null when logged in (parent component can handle logged-in state)
  return null
}