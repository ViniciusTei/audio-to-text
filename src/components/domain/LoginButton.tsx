import React from 'react'
import { Link } from 'react-router-dom'

import useSession from 'hooks/useSession'

function LoginButton() {
  const { session: currSession, logOut } = useSession()
  
  if (currSession) {
    return (
      <div>
        <div className="flex items-center gap-4">
          <img 
            className="inline-block h-10 w-10 rounded-full ring-2 ring-gray-600" 
            src={currSession.user.user_metadata.avatar_url} 
            alt={`Profile image from ${currSession.user.id}`}
          />

          {currSession.user.user_metadata.name}
          <span role="button" className="text-4xl ml-4 cursor-pointer" title="Sair" onClick={logOut}>&#10162;</span>
        </div>

      </div>
    )
  }

  return (
    <Link to="login" className="text-sm font-semibold leading-6 text-gray-100">Log in <span aria-hidden="true">&rarr;</span></Link>
  )
}

export default LoginButton
