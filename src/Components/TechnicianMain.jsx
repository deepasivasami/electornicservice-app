



import React from "react";
import { Routes, Route } from "react-router-dom";
import Logout from "../pages/Logout";
import Dashboard from "../pages/Dashboard";
import Techinicianservice from "../pages/Techinicianservice";

const TechnicianMain = () => {
  return (
    <Routes>

      <Route index element={<Dashboard />} />


      <Route path="techinicianservice" element={<Techinicianservice />} />


      <Route path="logout" element={<Logout />} />
    </Routes>
  );
};

export default TechnicianMain;