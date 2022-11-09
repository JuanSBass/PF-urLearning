import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Home } from './components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Home />
    </div>
  )
}

export default App
