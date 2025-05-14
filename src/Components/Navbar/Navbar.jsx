import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Swal from "sweetalert2";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  let navigate = useNavigate();

  function handleLogout() {
    handleNavLinkClick();
    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You have been successfully logged out.",
      timer: 2000,
      showConfirmButton: false,
    });
    navigate("/");
    localStorage.setItem("userId", 0);
    setIsLoggedIn(!isLoggedIn);
  }
  const handleNavLinkClick = () => {
    const bsCollapse = document.getElementById("navbarResponsive");
    if (bsCollapse && bsCollapse.classList.contains("show")) {
      new window.bootstrap.Collapse(bsCollapse).hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container ">
        <NavLink
          className="navbar-brand"
          to="/"
          style={{ fontSize: "2rem", fontWeight: "bold" }}
        >
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
          <span className="text-danger">B</span>ook&
          <span className="text-danger">S</span>tay
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
          <ul className="navbar-nav mx-auto d-flex flex-column flex-md-row justify-content-center align-content-center  mb-2 mb-lg-0 ">
            <li className="nav-item me-3">
              <NavLink
                className="nav-link text-dark"
                to="/"
                onClick={handleNavLinkClick}
                style={{ fontWeight: "bold" }}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink
                className="nav-link text-dark"
                to="/aboutus"
                onClick={handleNavLinkClick}
                style={{ fontWeight: "bold" }}
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-dark"
                to="/contactus"
                onClick={handleNavLinkClick}
                style={{ fontWeight: "bold" }}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
          {isLoggedIn ? (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink
              className="btn btn-danger"
              to="/userlogin"
              onClick={handleNavLinkClick}
            >
              Login/Register
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
