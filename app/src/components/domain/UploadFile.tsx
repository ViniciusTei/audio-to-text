import React, { useRef, ChangeEvent, useEffect } from 'react'
import { AiFillFileAdd } from 'react-icons/ai';

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
    <div ref={dropRef} className="h-56 p-10 flex mt-4 items-center justify-center flex-col text-xl text-gray-900 dark:text-white border-2 border-dashed border-gray-500 rounded-xl">
      
      <div className="mb-4">
        <button onClick={handleUploadClick} className="w-full flex items-center rounded-md border-0 py-1.5 pl-7 pr-8 text-gray-600 dark:text-gray-200 ring-1 ring-inset ring-gray-500 dark:ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm md:text-base sm:leading-6">
          <AiFillFileAdd className="mr-2" size="1.2rem" />
            Buscar arquivo
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
