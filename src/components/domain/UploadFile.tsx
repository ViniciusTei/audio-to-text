import React, { useState, useRef, ChangeEvent } from 'react'
import openai from 'lib/openai'

const { speechToText } = openai

function UploadFile() {
  const [file, setFile] = useState<File>()
  const [text, setText] = useState()
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleUploadClick() {
    inputRef.current?.click();
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);

    // 🚩 do the file upload here normally...

    const response = await speechToText(e.target.files[0])
    setText(response.text)
  }

  return (
    <div>
      <div> Carregando ... {file && (file.name)} </div>

      {text && (
        text
      )}

      <input 
        type="file" 
        name="file" 
        ref={inputRef} 
        className="hidden"
        onChange={handleFileChange}
      />
      <button onClick={handleUploadClick}>Escolher um arquivo para transcrever</button>
    </div>
  )
}

export default UploadFile
