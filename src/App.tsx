import { Routes, Route } from 'react-router-dom'

import HomePage from 'components/pages/HomePage'
import LoginPage from 'components/pages/LoginPage'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/" element={<HomePage/>} />
    </Routes>
  )
}

export default App
