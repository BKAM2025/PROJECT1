import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLogins from "./component/AdminLogin.jsx";
import AdminDashboard from "./component/AdminDashboard.jsx";
import ListSeller from './component/listSeller';
import ListUser from './component/listUser';
import SellerProduct from './component/SellerProduct';
const App = () => {
  // Access auth state from Redux

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogins />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/sellers" element={< ListSeller />} />
        <Route path="/users" element={<ListUser />} />
        <Route path="/seller-products/:sellerId" element={<SellerProduct />} />
      </Routes>
    </Router>
  );
};

export default App;

