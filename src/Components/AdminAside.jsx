import React from "react";
import { Link } from "react-router-dom";

const AdminAside = () => {
  return (
    <aside className="aside">
      <div className="logo">
        <img src="/images/mobile.jpg" alt="logo" />

      </div>


      <ul className="sidebar">

        <Link className="nav-item" to="/admin">
          <i className="ti ti-layout-dashboard"></i> Dashboard
        </Link>
        <Link className="nav-item" to="/admin/complaint">
          <i className="ti ti-alert-circle"></i> Complaint
        </Link>

        <Link
          to="/admin/AllComplaint"
          className={location.pathname === "/admin/AllComplaint" ? "active" : ""}
        >
          <i className="ti ti-list"></i> All Complaint List
        </Link>

        <Link className="nav-item" to="/admin/technician">
          <i className="ti ti-tool"></i> Technician
        </Link>
        <Link className="nav-item" to="/admin/users">
          <i className="ti ti-users"></i> Users
        </Link>
        <Link to="/admin/logout" className="logout-btn">
          <i className="ti ti-logout"></i> Logout
        </Link>
      </ul>


    </aside>
  );
};

export default AdminAside;