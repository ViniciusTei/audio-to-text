import React from 'react'

import { Loading } from 'components/ui'
import useSession from 'hooks/useSession'

function LoginPage() {
  const { logIn, loading } = useSession()

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="max-w-lg mx-auto">
        <button 
          type="button" 
          onClick={() => logIn()} 
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline"
        >
          {loading ? <Loading/> : 'Sign in with Google'}
        </button>
      </div>
    </div>
  )
}

export default LoginPage
