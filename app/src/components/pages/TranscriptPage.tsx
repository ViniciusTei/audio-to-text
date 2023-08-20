import React, { useEffect, useReducer, useState } from 'react'

import { UploadFile } from 'components/domain'
import { Card, Loading } from 'components/ui'
import openai from 'lib/openai'
import supabase from 'lib/api'
import useSession from 'hooks/useSession'

const { speechToText } = openai

function TranscriptPage() {
  const [text, setText] = useState<string | null>(null)
  const [loading, toggleLoading] = useReducer(prev => !prev, false)
  const { session, logIn } = useSession()

  async function uploadTextToDatabase(value: string) {
    const { data, error } = await supabase.from('Transcriptions').insert([
      { text_transcript: value }
    ])

    if (error) {
      throw error
    }

    console.log('Data from database', data)

  }

  async function transcriptAudioFile() {
    try {
      toggleLoading()
      const audioFileName = localStorage.getItem('audioFileName')

      if (!audioFileName) {
        throw new Error('Audio file name not found')
      }

      const { data: file, error } = await supabase.storage.from('audio').download(audioFileName as string)

      if (error) {
        throw error
      }

      const transcriptedText = await speechToText(blobToFile(file, audioFileName))
      console.log(transcriptedText)
      setText(transcriptedText)
      await uploadTextToDatabase(transcriptedText)
      await supabase.storage.from('audio').remove([audioFileName])
    } catch (error) {
      console.log('Error with transcripted text', error)  
    } finally {
      toggleLoading()
    }
  }

  async function handleTranscriptFile(file: File) {
    try {
      toggleLoading()

      if (!session) {
        logIn()
        return
      }

      const audioFileName =`audio-files/${session.user.id}-${file.name}`

      const { error: errorUpload } = await supabase.storage
        .from('audio')
        .upload(audioFileName, file)


      if (errorUpload) {
        throw errorUpload
      }

      localStorage.setItem('audioFileName', audioFileName)

      //call stripe checkout
      const { data, error } = await supabase.functions.invoke('checkout', {
        body: {
          price_id: 'price_1Ngn1wHQe8oRrALNqHgwz4ZG'
        }
      })

      if (error) {
        throw error
      }

      if ((data as any)?.session.url) {
        window.location.replace((data as any)?.session.url)
      }
    } catch (error) {
      console.log('Error with file', error)  
    } finally {
      toggleLoading()
    }
  }
  
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      transcriptAudioFile()
    }

    if (query.get("canceled")) {
      alert(
        "Algo deu errado com sua compra!"
      );
    }
  }, []);

  return (
    <div className="mt-20 w-full px-10 text-center">
      <h1 className="font-bold text-2xl my-4">Transcrever áudio</h1>

      {!loading && !text && <UploadFile onUpload={handleTranscriptFile} />}

      {loading && (
        <div className="flex flex-col items-center justify-center gap-4 text-lg">
          <Loading/>
        
          Transcrevendo arquivo...

          <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              <span className="sr-only">Transcrevendo arquivo...</span>
          </div>
        </div>
      )}

      {text && (
        <Card 
          title="Texto transcrito"
          text={text}
          button
          buttonText="Transcrever outro áudio"
          buttonClick={() => setText(null)}
        />
      )}

      <div className="flex mt-8 flex-col-reverse items-center gap-2 md:flex-row md:justify-around">
        <p className="max-w-lg">Transcreva seu áudio em texto. Use a tecnologia para transformar seus áudios em texto de forma rápida e prática. Não importa qual seja a língua ou o sotaque, nós entendemos e transformamos em texto.</p>

        <ul className="flex flex-col items-start list-disc">
          <li>Transcreva áudios de até 25Mb</li>
          <li>Transcreva áudios de qualquer língua</li>
          <li>Transcreva áudios de qualquer sotaque</li> 
        </ul>
      </div>
    </div>
  )
}

function blobToFile(theBlob: Blob, fileName: string) {
  return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
}




export default TranscriptPage
