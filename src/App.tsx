import { useState, useRef, ChangeEvent } from 'react'
import speechToText from './utils/speechToText'

function App() {
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>React.js + Tailwind CSS</h1>

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
    </main>
  )
}

export default App
