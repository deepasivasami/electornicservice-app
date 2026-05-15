
import React from "react";

const Header = () => {
  return (


    <header className="header">
      <div className="header-left">
        <div className="header-logo"><img src="/images/mobile.jpg" alt="logo" /></div>
        <span className="header-title">service app</span>
      </div>
      <div className="header-right">
        <a className="header-icon"><i className="ti ti-search"></i></a>
        <a className="header-icon"><i className="ti ti-bell"></i><div className="badge-dot"></div></a>
        <a className="header-icon"><i className="ti ti-mail"></i></a>
        <a className="header-icon"><i className="ti ti-settings"></i></a>
        <div className="header-admin">
          <div className="header-avatar">AD</div>
          <span className="header-admin-name">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;