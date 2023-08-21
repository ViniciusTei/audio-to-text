import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './globals.css'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement!)

const AppElement = () => ( 
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

if (rootElement?.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <AppElement />
  )
} else {
  root.render(<AppElement />)
}
