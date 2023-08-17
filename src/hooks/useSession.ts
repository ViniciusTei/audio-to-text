import { Session } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import supabase from "lib/api"

function useSession() {
  const [currSession, setSession] = useState<Session | null>(null)

  function handleLogout() {
    supabase.auth.signOut()
      .then(() => setSession(null))
  }

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session }}) => {
        setSession(session)
      })
  }, [])
  
  return { session: currSession, logOut: handleLogout }
}

export default useSession
