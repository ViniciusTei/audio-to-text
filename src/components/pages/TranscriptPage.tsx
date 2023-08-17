import React, { useEffect, useRef } from 'react'

function TranscriptPage() {
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
      console.log(file)
    }
  }

  return (
    <div className="w-full px-10 text-center">
      <h1 className="font-bold text-2xl my-4">Transcrever áudio</h1>

      <div ref={dropRef} className="h-56 p-10 flex mt-4 items-center justify-center flex-col text-xl text-white border-2 border-dashed border-gray-500 rounded-xl">
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-200">
            Buscar no computador
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="file"
              name="file"
              id="file"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-200 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
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
