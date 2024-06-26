import React, { useEffect, useReducer, useState } from 'react'

import { AboutSection, PricingSection, UploadFile } from 'components/domain'
import { Card, Loading } from 'components/ui'
import openai from 'lib/openai'
import supabase from 'lib/api'
import useSession from 'hooks/useSession'
import { AiFillCheckCircle, AiFillLike } from 'react-icons/ai'

const { speechToText } = openai

function TranscriptPage() {
  const [text, setText] = useState<string | null>(null)
  const [loading, toggleLoading] = useReducer(prev => !prev, false)
  const { session, logIn } = useSession()

  async function uploadTextToDatabase(value: string) {
    const { data: text, error } = await supabase.from('Transcriptions').insert([
      { text_transcript: value }
    ])

    if (error) {
      throw error
    }

    const { data, error: customerErro } = await supabase.from('Customer').select('id, credits').eq('user_id', session?.user.id)

    if (customerErro) {
      throw customerErro
    }

    await supabase.from('Customer').update({ credits: (data as any)[0].credits - 1 }).eq('id', (data as any)[0].id)
    await supabase.from('Transactions')
      .insert({ type: 'transcription', user_id: (data as any)[0].id, text_id: (text as any).id })
  }

  async function transcriptAudioFile(addCredits = false) {
    try {
      toggleLoading()

      if (addCredits) {
        const { data } = await supabase.from('Customer').select('id, credits').eq('user_id', session?.user.id)

        await supabase.from('Customer').update({ credits: (data as any)[0].credits + 10 }).eq('id', (data as any)[0].id)
        await supabase.from('Transactions')
          .insert({ type: 'payment', user_id: (data as any)[0].id })
      }

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

      const { data: credits } = await supabase.from('Customer').select('credits').eq('user_id', session.user.id)

      const userCredit = credits ? credits[0].credits : 0

      if (userCredit) {
        //transcript file
        transcriptAudioFile()
      } else {
        //call stripe checkout
        const { data, error } = await supabase.functions.invoke('checkout', {
          body: {
            price_id: import.meta.env.VITE_STRIPE_PRICE_ID,
          }
        })

        if (error) {
          throw error
        }

        if ((data as any)?.session.url) {
          window.location.replace((data as any)?.session.url)
        }
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
      transcriptAudioFile(true)
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

      <div className="flex flex-col md:flex-row justify-between w-full sm:mx-auto sm:mb-2 -mx-2">
        <div className="p-2 w-full md:w-1/2">
          <div className="bg-gray-100 dark:bg-gray-800 rounded flex gap-2 p-4 h-full items-center">
            <AiFillLike className="text-indigo-500 dark:text-white" size="4rem"/>
            <span className="title-font font-medium dark:text-white">Transcreva seu áudio em texto. Use a tecnologia para transformar seus áudios em texto de forma rápida e prática. Não importa qual seja a língua ou o sotaque, nós entendemos e transformamos em texto.</span>
          </div>
        </div>

        <ul className="flex flex-col items-start w-fit-content">
          <li className="w-full">
            <div className="p-2 w-full">
              <div className="bg-gray-100 dark:bg-gray-800 rounded flex gap-2 p-4 h-full md:w-96 items-center">
                <AiFillCheckCircle className="text-indigo-500 dark:text-white" />
                <span className="title-font font-medium dark:text-white">Transcreva áudios de até 25Mb</span>
              </div>
            </div>
          </li>
          <li className="w-full">
            <div className="p-2 w-full">
              <div className="bg-gray-100 dark:bg-gray-800 rounded flex gap-2 p-4 h-full md:w-96 items-center">
                <AiFillCheckCircle className="text-indigo-500 dark:text-white" />
                <span className="title-font font-medium dark:text-white">
                  Entendemos até 30 línguas diferentes
                </span>
              </div>
            </div>
          </li>
          <li className="w-full">
            <div className="p-2 w-full">
              <div className="bg-gray-100 dark:bg-gray-800 rounded flex gap-2 p-4 h-full md:w-96 items-center">
                <AiFillCheckCircle className="text-indigo-500 dark:text-white" />
                <span className="title-font font-medium dark:text-white">
                  Transcrição com inteligência artificial
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <AboutSection />
      <PricingSection />
    </div>
  )
}

function blobToFile(theBlob: Blob, fileName: string) {
  return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
}

export default TranscriptPage
