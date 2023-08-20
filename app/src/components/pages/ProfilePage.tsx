import React, { useEffect, useState } from 'react'
import { AiFillPlusCircle, AiFillMinusCircle, AiOutlineDownload } from 'react-icons/ai'
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
    <div className="mt-20 w-full">
      <div className="flex my-10 sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
        <img src={userData.avatar_url} alt="Profile picture"/>
        <div className="flex-grow sm:pl-8">
          <h2 className="title-font font-medium text-lg">{userData.name}</h2>
          <span className="mb-4 text-gray-500">{userData.email}</span>
          <span className="inline-text">
            <p className="text-gray-500 flex items-center gap-2"> <AiFillPlusCircle/> 0 creditos</p>
            <p className="text-gray-500 flex items-center gap-2"> <AiFillMinusCircle/> 0 creditos utilizados</p>
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
            <tr>
              <td className="px-4 py-3">Transcrição</td>
              <td className="px-4 py-3">25/12/1997 14:25</td>
              <td className="px-4 py-3 text-red-500">- 1</td>
              <td className="px-4 py-3 text-lg text-white">-</td>
              <td className="w-10 text-center">
                <span className="inline-flex items-center rounded-md bg-gray-50 mr-4 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  <button><AiOutlineDownload/></button>
                </span>
              </td>
            </tr>
            <tr>
              <td className="border-t-2 border-gray-800 px-4 py-3">Pagamento</td>
              <td className="border-t-2 border-gray-800 px-4 py-3">25/12/1997 14:20</td>
              <td className="border-t-2 border-gray-800 px-4 py-3 text-green-500">+ 10</td>
              <td className="border-t-2 border-gray-800 px-4 py-3 text-lg text-white">R$1,00</td>
              <td className="border-t-2 border-gray-800 w-10 text-center">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProfilePage
