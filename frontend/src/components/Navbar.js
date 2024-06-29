import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Sports Management
        </Link>
        <div className="navbar-links">
          <Link to="/signup" className="nav-link">
            Signup
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
