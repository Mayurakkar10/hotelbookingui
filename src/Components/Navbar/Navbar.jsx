import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  let navigate = useNavigate();

  function handleLogout() {
    navigate("/");
    localStorage.setItem("userId", 0);
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-primary border-bottom">
      <div className="container">
        <NavLink className="navbar-brand" to="/" style={{ fontSize: "2rem" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: "60px", width: "auto" }}
          />
        </NavLink>

        <NavLink
          className="navbar-brand"
          to="/"
          style={{ fontSize: "2rem", fontWeight: "bold" }}
        >
          <span className="text-danger">B</span>ook&Stay
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarResponsive">
          <ul className="navbar-nav mx-auto  mb-2 mb-lg-0">
            <li className="nav-item me-3">
              <NavLink className="nav-link text-dark" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink className="nav-link text-dark" to="/aboutus">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-dark" to="/contactus">
                Contact Us
              </NavLink>
            </li>
          </ul>
          {isLoggedIn ? (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink className="btn btn-danger" to="/userlogin">
              Login/Register
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
