import React, { useReducer, useState } from 'react'

import { UploadFile } from 'components/domain'
import { Loading } from 'components/ui'
import openai from 'lib/openai'
import supabse from 'lib/api'

const { speechToText } = openai

function TranscriptPage() {
  const [text, setText] = useState<string | null>(null)
  const [loading, toggleLoading] = useReducer(prev => !prev, false)

  async function uploadTextToDatabase(value: string) {
    const { data, error } = await supabse.from('Transcriptions').insert([
      { text_transcript: value }
    ])

    if (error) {
      throw error
    }

    console.log('Data from database', data)
  }

  async function handleTranscriptFile(file: File) {
    try {
      toggleLoading()
      const transcriptedText = await speechToText(file)
      console.log(transcriptedText)
      setText(transcriptedText)
      await uploadTextToDatabase(transcriptedText)
    } catch (error) {
      console.log('Error with transcripted text', error)  
    } finally {
      toggleLoading()
    }
  }

  return (
    <div className="w-full px-10 text-center">
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

      {text && text}

      <div className="flex justify-around mt-8">
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

export default TranscriptPage
