import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LoginButton } from 'components/domain'

function AppHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])
  
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only text-gray-600 dark:text-gray-100">TranscreveAI</span>
            <img className="h-8 w-auto" src="https://nnfvmpgnudspenaftses.supabase.co/storage/v1/object/public/audio/logo/ic_audio_xl.png" alt="App Logo" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button 
            type="button" 
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 text-gray-600 dark:text-gray-100">
          <Link to="/audio" className="text-sm font-semibold leading-6">Transcrever</Link>
          <Link to="/#pricing" className="text-sm font-semibold leading-6">Preços</Link>
          <Link to={{ pathname: '/', hash: '#about' }} className="text-sm font-semibold leading-6">Sobre</Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <LoginButton />
        </div>
      </nav>
      {mobileMenuOpen && (<div className="lg:hidden" role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-50"></div>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-slate-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only text-gray-100">TranscreveAI</span>
              <img className="h-8 w-auto" src="https://nnfvmpgnudspenaftses.supabase.co/storage/v1/object/public/audio/logo/ic_audio_xl.png" alt="App Logo" />
            </Link>
            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span className="sr-only">Fechar menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link to="/audio" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-slate-500">Transcrever</Link>
                <Link to="/#pricing" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-slate-500">Preços</Link>
                <Link to="/#about" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-slate-500">Sobre</Link>
              </div>
              <div className="py-6">
                <LoginButton />
              </div>
            </div>
          </div>
        </div>
      </div>)}
    </header>
  )
}

export default AppHeader
