import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import userService from "../../service/userService";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../../assets/logo.png";

export default function UserLogin({ setLogin }) {
  const [form, setForm] = useState({ email: "", password: "", message: "" });
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    isSuccess: true,
  });

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

        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);
        setModalContent({
          title: "Login Successful",
          message: "You have logged in successfully!",
          isSuccess: true,
        });
        setShowModal(true);

        setForm({ ...form, message: "Login successful" });

        setLogin(true);
        setTimeout(() => {
          if (role === "customer") {
            navigate(`/`);
          } else if (role === "owner") {
            navigate(`/ownerdashboard/${userId}`);
          } else if (role === "admin") {
            navigate(`/admindashboard/${userId}`);
          }
        }, 3000);
      })
      .catch((error) => {
        console.error("Login Error:", error);
        setModalContent({
          title: "Login Failed",
          message: "An error occurred during login",
          isSuccess: false,
        });
        setShowModal(true);
        setForm({ ...form, message: "An error occurred during login" });
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="p-5 rounded shadow bg-white w-100 d-flex flex-column align-items-center"
        style={{ maxWidth: "450px", border: "1px solid #ddd" }}
      >
        <img
          src={logo}
          alt="Logo"
          className="mb-4"
          style={{ height: "5rem", width: "5rem" }}
        />
        <h2 className="text-center mb-4 text-dark">Login</h2>

        <div className="mb-3 w-100">
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

        <div className="mb-3 position-relative w-100">
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
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <NavLink to="/userregister" className="text-primary">
            Register
          </NavLink>
        </p>
      </form>

      {showModal && (
        <>
          <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal d-block fade show" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow-lg border-0 rounded-4">
                  <div
                    className={`modal-header ${
                      modalContent.isSuccess ? "bg-success" : "bg-danger"
                    } text-white rounded-top-4`}
                  >
                    <h5 className="modal-title mx-auto">
                      {modalContent.title}
                    </h5>
                  </div>

                  <div className="modal-body text-center py-4">
                    <i
                      className={`bi ${
                        modalContent.isSuccess
                          ? "bi-check-circle-fill"
                          : "bi-exclamation-triangle-fill"
                      } fs-1 ${
                        modalContent.isSuccess ? "text-success" : "text-danger"
                      } mb-3`}
                    ></i>
                    <p className="fs-5">{modalContent.message}</p>
                    {modalContent.isSuccess && (
                      <p className="text-muted">Redirecting....</p>
                    )}
                  </div>

                  <div className="modal-footer border-0 px-4 pb-4">
                    <button
                      className="btn btn-outline-secondary w-100 rounded-pill"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </div>
  );
}
