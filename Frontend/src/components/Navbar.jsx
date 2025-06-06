import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  return (
    <nav className="navbar-custom">

      <div className="navbar-container">
        <Link to="/" className="logo">
          Auxicordo
        </Link>

        <ul className="nav-links">
          
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <div className="auth-buttons">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn login">
                Login
              </Link>
              <Link to="/signup" className="btn signup">
                Sign Up
              </Link>
            </>
          ) : (
            <button
              className="btn btn-danger mx-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
