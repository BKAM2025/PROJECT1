import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'; // Assuming you have a store configured
import LoginUsers from './componet/LoginUsers';
import Navbar from './componet/navBar';

 
function App() {
  return (
    <div>
      <Navbar/>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginUsers />} />
          {/* <Route path="/signup-admin" element={<SignUpAdmin />} />
          <Route path="/signup-user" element={<SingUpUser />} />
          <Route path="/login" element={<LoginUsers />} /> */}
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </Provider>
    </div>
  );
}




export default App;