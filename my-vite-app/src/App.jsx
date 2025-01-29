import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'; // Assuming you have a store configured
import LoginUsers from './componet/LoginUsers';
import SingUpUser from "./componet/singUpUser"
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginUsers />} />
          {/* {/* <Route path="/signup-user" element={<SingUpUser />} /> */}
          <Route path="/register" element={<SingUpUser />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </Provider>
  );
}

// A simple Home component for the root path
function Home() {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <p>Navigate to different sections using the links above.</p>
    </div>
  );
}

export default App;