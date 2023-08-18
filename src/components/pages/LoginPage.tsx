import React, { useReducer } from 'react'

import supabse from 'lib/api'
import { Loading } from 'components/ui'

function LoginPage() {
  const [loading, toggleLoading] = useReducer(prev => !prev, false)

  async function handleLogin() {
  
    try {
      toggleLoading()
      const { data, error } = await supabse.auth.signInWithOAuth({
        provider: 'google',
      })

      if (error) {
        throw error
      }

      console.log('session', data)
    } catch (error) {
      console.error(error)
    } finally {
      toggleLoading()
    }

  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="max-w-lg mx-auto">
        <button 
          type="button" 
          onClick={handleLogin} 
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline"
        >
          {loading ? <Loading/> : 'Sign in with Google'}
        </button>
      </div>
    </div>
  )
}

export default LoginPage
