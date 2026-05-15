import React from "react";
import { Routes, Route } from "react-router-dom";
import Logout from "../pages/Logout";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Complaint from "../pages/Complaint";
import Techni from "../pages/Techni";
import AllComplaint from "../pages/AllComplaint";

const AdminMain = () => {
  return (


    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="complaint" element={<Complaint />} />
      <Route path="AllComplaint" element={<AllComplaint />} />
      <Route path="technician" element={<Techni />} />
      <Route path="users" element={<Users />} />
      <Route path="logout" element={<Logout />} />
    </Routes>
  );
};

export default AdminMain;




