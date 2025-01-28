import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
<<<<<<< HEAD
import LoginUsers from './componet/LoginUsers'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
=======
import SignUpAdmin from './componet/singUpAdmin'
import React ,{ useState } from 'react'
import SingUpUser from './componet/singUpUser'
import './App.css'


const App =()=> {
  
>>>>>>> 8119fba61cf76a0828cc3988df56bd3fc2d8f6a0

  return (
    <div>
      
        <SignUpAdmin/>
      
  
        
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
<<<<<<< HEAD
      <LoginUsers/>
    </div>
=======

      <SingUpUser/>
    </div>
   
>>>>>>> 8119fba61cf76a0828cc3988df56bd3fc2d8f6a0
  )
}

export default App
