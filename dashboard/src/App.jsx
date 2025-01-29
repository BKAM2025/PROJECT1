import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLogins from "./component/AdminLogin.jsx";
import AdminDashboard from "./component/AdminDashboard.jsx";

const App = () => {
  // Access auth state from Redux

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogins />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

