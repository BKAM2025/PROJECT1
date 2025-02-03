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
import Profile from './component/Profile.jsx';
import Category from './component/Category.jsx';
import Footer from './component/Footer.jsx';
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
        <Route path="/profile" element={<Profile />} />
        <Route path='/category' element={<Category />} />
        <Route path='/Footer' element={<Footer />} />
      </Routes>
    </Router>
  );
};

export default App;

