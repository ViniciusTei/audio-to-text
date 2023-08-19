import { Routes, Route } from 'react-router-dom'
import { HomePage, LoginPage, ProfilePage, TranscriptPage } from 'components/pages'
import { AppHeader } from 'components/domain'
import { Analytics } from '@vercel/analytics/react'

function App() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
    <AppHeader />

    <Routes>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/audio" element={<TranscriptPage/>} />
      <Route path="/" element={<HomePage/>} />
    </Routes>

    <Analytics />
  </main>
  )
}

export default App
