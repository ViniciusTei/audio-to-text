import React, { useEffect, useState } from 'react'
import useSession from 'hooks/useSession'
import supabase from 'lib/api'

type UserMetada = {
  avatar_url: string
  name: string
  email: string
}
// todo
// - [x] Add history of transcriptions
// - [ ] Add total of transcriptions
// - [ ] Add total of transcriptions by language
// - [ ] Add money spent
function ProfilePage() {
  const [trasncriptions, setTranscriptions] = useState([] as any[])
  const { session } = useSession()
  const userData = session?.user?.user_metadata as UserMetada

  useEffect(() => {
    async function getTranscriptions(user: any) {
      const { data, error } = await supabase
        .from('Transcriptions')
        .select('id, created_at, text_transcript')
        .eq('user_id', user?.id)

      if (error) {
        throw error
      }
      
      setTranscriptions(data) 
    }

    if (session) {
      getTranscriptions(session.user)
    }
      
  }, [session])

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

      {trasncriptions.map((transcription) => (
        <div key={transcription.id}>
          <div>{transcription.text_transcript}</div>
        </div>
      ))}
    </div>
  )
}

export default ProfilePage
