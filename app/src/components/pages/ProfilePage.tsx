import React, { useEffect, useState } from 'react'
import { AiFillPlusCircle, AiFillMinusCircle, AiOutlineDownload } from 'react-icons/ai'
import { saveAs } from 'file-saver'
import useSession from 'hooks/useSession'
import supabase from 'lib/api'

type UserMetada = {
  avatar_url: string
  name: string
  email: string
}

type Transcription = {
  id: number
  created_at: string
  type: string
  credits: string
  text_transcript: string | null
}

function ProfilePage() {
  const [trasncriptions, setTranscriptions] = useState([] as Transcription[])
  const [credits, setCredits] = useState(0)
  const [usedCredits, setUsedCredits] = useState(0)
  const { session } = useSession()
  const userData = session?.user?.user_metadata as UserMetada

  function saveTranscription(transcription: Transcription) {
    const text = transcription.text_transcript as string
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, `${transcription.created_at}.txt`)
  }

  useEffect(() => {
    async function getTranscriptions(user: any) {
      const { data: customer } = await supabase.from('Customer').select('id').eq('user_id', user.id)
      const { data, error } = await supabase
        .from('Transactions')
        .select('id, created_at, type, Customer (id, credits), Transcriptions (id, text_transcript)')
        .eq('user_id', (customer as any)[0].id)

      if (error) {
        throw error
      }
      
      const transcriptions = (data as any).map((transaction: any) => {
        return {
          id: transaction.id,
          created_at: new Date(transaction.created_at).toLocaleString('pt-BR', { timeZone: 'UTC' }),
          type: transaction.type,
          credits: transaction.Customer.credits,
          text_transcript: transaction.Transcriptions ? transaction.Transcriptions.text_transcript : null
        }
      })

      setTranscriptions(transcriptions)
      setCredits((data as any)[0].Customer.credits)
      setUsedCredits(transcriptions.filter((t: Transcription) => t.type === 'transcription').length)
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
    <div className="mt-20 w-full">
      <div className="flex my-10 sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
        <img src={userData.avatar_url} alt="Profile picture"/>
        <div className="flex-grow sm:pl-8">
          <h2 className="title-font font-medium text-lg">{userData.name}</h2>
          <span className="mb-4 text-gray-500">{userData.email}</span>
          <span className="inline-text">
            <p className="text-gray-500 flex items-center gap-2"> <AiFillPlusCircle/> {credits} creditos</p>
            <p className="text-gray-500 flex items-center gap-2"> <AiFillMinusCircle/> {usedCredits} creditos utilizados</p>
          </span>
        </div>
      </div>

      <h1 className="font-medium text-xl mb-8 px-4">Historico de transcrições</h1>

      <div className="lg:w-2/3 w-full mx-auto overflow-auto px-4">
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">Transação</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Data</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Créditos</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Preço</th>
              <th className="w-10 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tr rounded-br"></th>
            </tr>
          </thead>
          <tbody>
            {trasncriptions.map((t) => (
              <tr>
                <td className="border-t-2 border-gray-800 px-4 py-3">{t.type === 'payment' ? 'Pagamento' : 'Transcrição'}</td>
                <td className="border-t-2 border-gray-800 px-4 py-3">{t.created_at}</td>
                <td className="border-t-2 border-gray-800 px-4 py-3">{t.type === 'payment' ? '+ 10' : '- 1'}</td>
                <td className="border-t-2 border-gray-800 px-4 py-3 text-lg text-white">{t.type === 'payment' ? 'R$1,00' : '-'}</td>
                <td className="border-t-2 border-gray-800 w-10 text-center">
                  {t.text_transcript && (
                    <span className="inline-flex items-center rounded-md bg-gray-50 mr-4 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      <button onClick={() => saveTranscription(t)}><AiOutlineDownload/></button>
                    </span>
                  )}
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProfilePage
