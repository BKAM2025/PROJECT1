import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './componet/navBar.jsx'

function App() {
  const [count, setCount] = useState(0)


  return (
    <div>
      
        <Navbar/>
      
  
        
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      
    </div>
   

  )
}

export default App
