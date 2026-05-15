import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Complaintdetail from "../pages/Complaintdetail";
import Technician from "../pages/Technician";
import Logout from "../pages/Logout";

const CustomerMain = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="complaint" element={<Complaintdetail />} />
      <Route path="/technician" element={<Technician />} />
      <Route path="logout" element={<Logout />} />
    </Routes>
  );
};

export default CustomerMain;