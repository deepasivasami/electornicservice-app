
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


import Login from "./Login";
import Register from "./Register";
import Admin from "./Admin";
import Technician from "./Technician";
import Customers from "./Customers";
import Layout from "./Layout";


function App() {
  return (

    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin/*" element={<Admin />} />
      <Route path="/technician/*" element={<Technician />} />

      <Route path="/customers/*" element={<Customers />} />

    </Routes>
  );
}

export default App;