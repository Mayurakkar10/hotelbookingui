import React from "react";
import { NavLink } from "react-router-dom";

export default function AdminRegister() {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #ccc",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
      className="text-center p-5 d-flex flex-column gap-5 container mt-2 mb-3"
    >
      <h1 className="text-dark mb-3">Register</h1>
      <input type="text" className="form-control" placeholder="Username" />
      <input type="text" className="form-control" placeholder="Password" />
      <input type="text" className="form-control" placeholder="Email" />
      <button className="btn btn-danger">Register</button>
      <p>
        Already Have an account <NavLink to="/adminlogin">Login</NavLink>
      </p>
    </div>
  );
}
