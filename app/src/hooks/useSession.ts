import { Session } from "@supabase/supabase-js"
import { useEffect, useReducer, useState } from "react"
import supabase from "lib/api"

const SUPABASE_TOKEN = 'sb-nnfvmpgnudspenaftses-auth-token'
const CUSTOMER_TOKEN = 'sb-nnfvmpgnudspenaftses-customer-token'

function useSession() {
  const [loading, toggleLoading] = useReducer(prev => !prev, false)
  const [currSession, setSession] = useState<Session | null>(
    localStorage.getItem(SUPABASE_TOKEN) 
      ? JSON.parse(localStorage.getItem(SUPABASE_TOKEN) as string) 
      : null
  )

  function handleLogout() {
    supabase.auth.signOut()
      .then(() => setSession(null))
  }
  
  async function handleLogin(redirect?: string) {
    try {
      toggleLoading()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirect ?? import.meta.env.VITE_PUBLIC_URL ?? window.location.origin
        }
      })

      if (error) {
        throw error
      }

    } catch (error) {
      console.error(error)
    } finally {
      toggleLoading()
    }

  }

  async function handleUserLoged() {
    const { data: user, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      throw new Error(userError.message)
    }

    const { data, error } = await supabase.functions.invoke('new-user', {
      body: { user_id: user.user.id , user_email: user.user.email }
    })

    if (error) {
      throw new Error(error.message)
    }

    localStorage.setItem(CUSTOMER_TOKEN, JSON.stringify(data))
  }

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session }}) => {
        setSession(session)

        if (session) {
          handleUserLoged()
        }
      })
  }, [])

  return { 
    session: currSession, 
    logOut: handleLogout, 
    logIn: handleLogin, 
    loading 
  }
}

export default useSession
