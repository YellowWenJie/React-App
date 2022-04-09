import { useState } from 'react'
import './app.scss'
import Router from './router'

function App() {
  const [count, setCount] = useState(0)

  return <Router></Router>
}

export default App
