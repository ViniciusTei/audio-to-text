import { Routes, Route } from 'react-router-dom'
import { HomePage, PrivacyPage, ProfilePage, TranscriptPage } from 'components/pages'
import { AppHeader } from 'components/domain'
import { Analytics } from '@vercel/analytics/react'

function App() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:px-24">
    
    <AppHeader />

    <Routes>
      <Route path="/privacidade" element={<PrivacyPage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/audio" element={<TranscriptPage/>} />
      <Route path="/" element={<HomePage/>} />
    </Routes>
    <footer className="text-gray-400 body-font w-full">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <img className="h-8 w-auto" src="https://nnfvmpgnudspenaftses.supabase.co/storage/v1/object/public/audio/logo/ic_audio_xl.png" alt="App Logo" />
          <span className="ml-3 text-xl">TranscreveAi</span>
        </a>
        <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2023 TranscreveAi —
          <a href="https://github.com/ViniciusTei" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@ViniciusTei</a>
        </p>
      </div>
    </footer>
    <Analytics />
  </main>
  )
}

export default App
