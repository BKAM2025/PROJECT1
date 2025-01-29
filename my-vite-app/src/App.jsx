import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SingUpUser from './componet/singUpUser';
import LoginUsers from "./componet/LoginUsers.jsx"
function App() {
  return (
    <div>
      <SingUpUser />
      <LoginUsers />
    </div>
  )
}

export default App;