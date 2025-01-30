import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import LoginUsers from './componet/LoginUsers.jsx';
import SingUpUser from "./componet/singUpUser.jsx"
import Navbar from './componet/navBar.jsx';
import AddProduct from './componet/addProduct.jsx';
// import Home from "./componet/home.jsx"
import './App.css';

function App() {
  return (
    <div>
      {/* <Navbar/> */}
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginUsers />} />
            <Route path="/register" element={<SingUpUser />} />
            <Route path="/home" element={< Navbar />} />
            <Route path="/addProduct" element={< AddProduct />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );

}



export default App;