import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SignUpAdmin from './componet/singUpAdmin'
import React ,{ useState } from 'react'
import SingUpUser from './componet/singUpUser'
import './App.css'


const App =()=> {


  return (
    <div>
      
        <SignUpAdmin/>
      
  
        
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <LoginUsers/>
    </div>

  )
}

export default App
