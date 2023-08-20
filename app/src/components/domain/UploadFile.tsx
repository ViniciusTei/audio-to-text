import React, { useRef, ChangeEvent, useEffect } from 'react'

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
        <button onClick={handleUploadClick} className="w-full flex items-center rounded-md border-0 py-1.5 pl-7 pr-8 text-gray-200 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm md:text-base sm:leading-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-4" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
            <path d="M17 19H21M19 17V21M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V12M9 17H12M9 13H15M9 9H10" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
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
