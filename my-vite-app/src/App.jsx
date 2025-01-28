import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginUsers from './componet/LoginUsers'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      
        
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <LoginUsers/>
    </div>
  )
}

export default App
