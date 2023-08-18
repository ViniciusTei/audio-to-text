import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { LoginButton } from 'components/domain'
import { HomePage, LoginPage, ProfilePage } from 'components/pages'
import TranscriptPage from 'components/pages/TranscriptPage'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only text-gray-100">Audio Para Texto</span>
              <img className="h-8 w-auto" src="https://nnfvmpgnudspenaftses.supabase.co/storage/v1/object/public/audio/logo/ic_audio_xl.png" alt="App Logo" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button 
              type="button" 
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link to="/" className="text-sm font-semibold leading-6 text-gray-100">Produto</Link>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-100">Como usar?</a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-100">Preços</a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-100">Sobre</a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <LoginButton />
          </div>
        </nav>
        {mobileMenuOpen && (<div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-slate-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only text-gray-100">Audio para texto</span>
                <img className="h-8 w-auto" src="https://nnfvmpgnudspenaftses.supabase.co/storage/v1/object/public/audio/logo/ic_audio_xl.png" alt="App Logo" />
              </a>
              <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <span className="sr-only">Fechar menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-slate-500">Produto</a>
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-slate-500">Como usar?</a>
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-slate-500">Preços</a>
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-slate-500">Sobre</a>
                </div>
                <div className="py-6">
                  <LoginButton />
                </div>
              </div>
            </div>
          </div>
        </div>)}
      </header>
    <Routes>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/audio" element={<TranscriptPage/>} />
      <Route path="/" element={<HomePage/>} />
    </Routes>
  </main>
  )
}

export default App
