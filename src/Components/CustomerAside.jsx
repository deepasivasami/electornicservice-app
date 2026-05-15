


import React from "react";
import { Link, useLocation } from "react-router-dom";

const CustomerAside = () => {
  const location = useLocation();

  return (
    <aside className="aside">

      <div className="logo">
        <img src="/images/mobile.jpg" alt="logo" />
      </div>

      <ul className="sidebar">

        <li>
          <Link
            to="/Customers"
            className={location.pathname === "/Customers" ? "active" : ""}
          >
            <i className="ti ti-layout-dashboard"></i>
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/Customers/complaint"
            className={location.pathname === "/Customers/complaint" ? "active" : ""}
          >
            <i className="ti ti-clipboard-list"></i>
            Complaint Details
          </Link>
        </li>

        <li>
          <Link
            to="/Customers/technician"
            className={location.pathname === "/Customers/technician" ? "active" : ""}
          >
            <i className="ti ti-tool"></i>
            Technician
          </Link>
        </li>

      </ul>

      <div className="aside-footer">
        <Link to="/Customers/logout" className="logout-btn">
          <i className="ti ti-logout"></i>
          Logout
        </Link>
      </div>

    </aside>
  );
};

export default CustomerAside;