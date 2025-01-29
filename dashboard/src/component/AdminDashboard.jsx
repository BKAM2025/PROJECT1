import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ListUser from './listUser';
import ListSaler from './listUser'



function AdminDashboard() {
  return (
    <div>
       <Router>
      <Routes>
        {/* Public route for the login page */}
        
        <Route path="/" element={<ListUser />} />
        <Route path="/ListSale" element={<ListSaler/>} />
      </Routes>
    </Router>
    </div>
  )
}

export default AdminDashboard
