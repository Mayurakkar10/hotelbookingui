import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import userService from "../../service/userService";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function UserLogin({ setLogin }) {
  const [form, setForm] = useState({ email: "", password: "", message: "" });
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const setField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    userService
      .userLogin({ email: form.email, password: form.password })
      .then(({ data }) => {
        // `data` is now an object: { role: "Owner", userId: 3 }
        const { role: rawRole, userId } = data;
        const role = typeof rawRole === "string" ? rawRole.toLowerCase() : null;

        if (!role || role === "login failed invalid credentials") {
          setForm({ ...form, message: "Invalid email or password" });
          return;
        }

        // SUCCESS
        setLogin(true);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);
        setForm({ ...form, message: "Login successful" });

        if (role === "customer") {
          navigate("/customerdashboard");
        } else if (role === "owner") {
          navigate("/ownerdashboard");
        } else if (role === "admin") {
          navigate("/admindashboard");
        } else {
          alert("Unknown role: " + role);
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
        setForm({ ...form, message: "An error occurred during login" });
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="p-5 rounded shadow bg-white w-100"
        style={{ maxWidth: "450px", border: "1px solid #ddd" }}
      >
        <h2 className="text-center mb-4 text-dark">Login</h2>

        <div className="mb-3">
          <input
            type="email"
            className={`form-control ${
              validated && !form.email ? "is-invalid" : ""
            }`}
            placeholder="Email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            required
          />
          <div className="invalid-feedback">Email is required</div>
        </div>

        <div className="mb-3 position-relative">
          <input
            type={showPassword ? "text" : "password"}
            className={`form-control ${
              validated && !form.password ? "is-invalid" : ""
            }`}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
            required
          />
          <div className="invalid-feedback">Password is required</div>

          <i
            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              top: "50%",
              right: "15px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "1.2rem",
              color: "#888",
            }}
          ></i>
        </div>

        {form.message && (
          <div className="text-danger text-center mb-3">{form.message}</div>
        )}

        <button type="submit" className="btn btn-danger w-100">
          Login
        </button>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <label>
            <input type="checkbox" className="me-2" />
            Remember Me
          </label>
          <NavLink to="/forgotpassword" className="text-primary">
            Forgot Password?
          </NavLink>
        </div>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <NavLink to="/userregister" className="text-primary">
            Register
          </NavLink>
        </p>
      </form>
    </div>
  );
}
