import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminLogin({ setLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();
  function setField(field, value) {
    setForm({ ...form, [field]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    if (form.username == "admin" && form.password == "123") {
      setLogin(!isLoggedIn);
      navigate("/adminpage");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`container mt-2 mb-3 p-5 d-flex flex-column gap-4 text-center ${
        validated ? "was-validated" : ""
      }`}
      style={{
        background: "white",
        border: "1px solid #ccc",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 className="text-dark mb-3">Admin Login</h1>

      <input
        type="text"
        className={`form-control ${
          validated && !form.username ? "is-invalid" : ""
        }`}
        placeholder="Username"
        name="username"
        value={form.username}
        onChange={(e) => setField("username", e.target.value)}
        required
      />
      <div className="invalid-feedback text-start">Username is Required</div>

      <input
        type="password"
        className={`form-control ${
          validated && !form.password ? "is-invalid" : ""
        }`}
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={(e) => setField("password", e.target.value)}
        required
      />
      <div className="invalid-feedback text-start">Password is required</div>

      <button type="submit" className="btn btn-danger">
        Login
      </button>

      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center gap-2">
        <NavLink to="/adminlogin" className="btn btn-danger">
          Hotel Admin Login
        </NavLink>
        <NavLink to="/superadminlogin" className="btn btn-danger">
          Admin Login
        </NavLink>
      </div>

      <p>
        Don't have an account?
        <NavLink to="/adminregister" className="text-primary">
          Register
        </NavLink>
      </p>
    </form>
  );
}
