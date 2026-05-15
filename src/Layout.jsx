import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";


const Layout = ({ Aside, Main }) => {
  return (
    <div className="containers">
      <Header />
      <Aside />
  
      <Main />
      <Footer />
    </div>
  );
};

export default Layout;