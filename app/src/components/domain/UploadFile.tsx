import React, { useState, useRef, ChangeEvent, useEffect } from 'react'
import openai from 'lib/openai'

const { speechToText } = openai

interface Props {
  onUpload: (file: File) => void
}

function UploadFile({ onUpload }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleUploadClick() {
    inputRef.current?.click();
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    onUpload(e.target.files[0])
  }

  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dropRef.current?.addEventListener('dragover', handleDragOver)
    dropRef.current?.addEventListener('drop', handleDrop)

    return () => {
      dropRef.current?.removeEventListener('dragover', handleDragOver)
      dropRef.current?.removeEventListener('drop', handleDrop)
    }
  }, [])

  function handleDragOver(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (!e.dataTransfer) {
      return null
    }

    const { files } = e.dataTransfer

    if (files && files.length > 0) {
      const file = files[0]
      onUpload(file)
    }
  }

  return (
    <div ref={dropRef} className="h-56 p-10 flex mt-4 items-center justify-center flex-col text-xl text-white border-2 border-dashed border-gray-500 rounded-xl">
      
      <div>
        <button onClick={handleUploadClick} className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-200 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          Buscar no computador
        </button>
        <input
          type="file"
          name="file"
          id="file"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
        />
      </div>
      
      <br/>
       Ou arraste e solte o arquivo aqui
       <span
        role='img'
        aria-label='emoji'
      >
        &#128526;
      </span>
    </div>
  )
}

export default UploadFile
