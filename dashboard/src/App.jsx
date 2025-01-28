import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./component/AdminLogin.jsx";

import { useSelector } from "react-redux";

const App = () => {
  const { token } = useSelector((state) => state.auth); // Access auth state from Redux

  return (
    <Router>
      <Routes>
        {/* Public route for the login page */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Protected admin route */}
       

        {/* Redirect all unmatched routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

