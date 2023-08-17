import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import supabse from 'lib/api'

function LoginPage() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="max-w-lg mx-auto">
        <Auth 
          supabaseClient={supabse} 
          appearance={{ theme: ThemeSupa }}
          providers={['google']}
        />
      </div>
    </div>
  )
}

export default LoginPage
