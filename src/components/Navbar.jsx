import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Skinstric
        </Link>
        <button className="navbar-button">Enter Code</button>
      </div>
    </nav>
  );
};

export default Navbar;
