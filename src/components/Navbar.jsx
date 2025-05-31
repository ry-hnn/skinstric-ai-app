import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  
  let pageLabel = "INTRO";
  if (location.pathname === "/testing") pageLabel = "TESTING";
  if (location.pathname === "/start-analysis") pageLabel = "START-ANALYSIS";
  if (location.pathname === "/analysis") pageLabel = "ANALYSIS";
  if (location.pathname === "/demographics") pageLabel = "DEMOGRAPHICS";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/" className="navbar-logo">
            Skinstric
          </Link>
          <span className="page-label">[ {pageLabel} ]</span>
        </div>
        <button className="navbar-button">Enter Code</button>
      </div>
    </nav>
  );
};

export default Navbar;
