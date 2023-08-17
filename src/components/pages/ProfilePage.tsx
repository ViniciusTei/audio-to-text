import React from 'react'
import useSession from 'hooks/useSession'

type UserMetada = {
  avatar_url: string
  name: string
  email: string
}
// todo
// - [ ] Add history of transcriptions
// - [ ] Add total of transcriptions
// - [ ] Add total of transcriptions by language
// - [ ] Add money spent
function ProfilePage() {
  const { session } = useSession()
  console.log(session)
  const userData = session?.user?.user_metadata as UserMetada

  if (!session) {
    return (
      <div>Not authenticated</div>
    )
  }

  return (
    <div>
      <div>
        <img src={userData.avatar_url} alt="Profile picture"/>
        <div>
          <p>{userData.name}</p>
          <span>{userData.email}</span>
        </div>
        <div>0 total de audios transcritos</div>
      </div>

    </div>
  )
}

export default ProfilePage
