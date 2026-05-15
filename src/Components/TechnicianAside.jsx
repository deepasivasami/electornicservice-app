
import React from "react";
import { Link, useLocation } from "react-router-dom";

const TechnicianAside = () => {
  const location = useLocation();

  return (
    <aside className="aside">

      <div className="logo">
        <img src="/images/mobile.jpg" alt="logo" />
      </div>

      <ul className="sidebar">

        <li>
          <Link
            to="/technician"
            className={location.pathname === "/technician" ? "active" : ""}
          >
            <i className="ti ti-layout-dashboard"></i>
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/technician/techinicianservice"
            className={location.pathname === "/technician/techinicianservice" ? "active" : ""}
          >
            <i className="ti ti-clipboard-list"></i>
            ServiceList
          </Link>
        </li>

      </ul>

      <div className="aside-footer">
        <Link to="/technician/logout" className="logout-btn">
          <i className="ti ti-logout"></i>
          Logout
        </Link>
      </div>

    </aside>
  );
};

export default TechnicianAside;