import { Session } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import supabase from "lib/api"

const SUPABASE_TOKEN = 'sb-nnfvmpgnudspenaftses-auth-token'

function useSession() {
  const [currSession, setSession] = useState<Session | null>(
    localStorage.getItem(SUPABASE_TOKEN) 
      ? JSON.parse(localStorage.getItem(SUPABASE_TOKEN) as string) 
      : null
  )

  function handleLogout() {
    supabase.auth.signOut()
      .then(() => setSession(null))
  }


  async function handleUserLoged(user: Session) {
    const { data, error } = await supabase.functions('new-user', {
      body: { user_id: user.user.id, user_email: user.user.email }
    })

    if (error) {
      throw new Error(error.message)
    }

    console.log('stripe', data)
  }

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session }}) => {
        setSession(session)
      })
  }, [])

  useEffect(() => {
    if (currSession) {
      console.log('session', currSession)
      handleUserLoged(currSession) 
    }
  }, [currSession])
  
  return { session: currSession, logOut: handleLogout }
}

export default useSession
