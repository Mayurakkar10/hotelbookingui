// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";

// import userService from "../../service/userService";
// export default function UserRegister() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//   });

//   function setField(field, value) {
//     setForm({ ...form, [field]: value });
//   }

//   const validateForm = () => {
//     let formErrors = {};
//     let isValid = true;

//     // Validate name
//     if (!form.name) {
//       formErrors.name = "Name is required";
//       isValid = false;
//     }

//     // Validate email
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!form.email) {
//       formErrors.email = "Email is required";
//       isValid = false;
//     } else if (!emailPattern.test(form.email)) {
//       formErrors.email = "Enter a valid email";
//       isValid = false;
//     }

//     // Validate password
//     if (!form.password) {
//       formErrors.password = "Password is required";
//       isValid = false;
//     }

//     // Validate confirm password
//     if (!form.confirmPassword) {
//       formErrors.confirmPassword = "Confirm Password is required";
//       isValid = false;
//     } else if (form.confirmPassword !== form.password) {
//       formErrors.confirmPassword = "Passwords do not match";
//       isValid = false;
//     }

//     // Validate phone
//     const phonePattern = /^[0-9]{10}$/;
//     if (!form.phone) {
//       formErrors.phone = "Phone number is required";
//       isValid = false;
//     } else if (!phonePattern.test(form.phone)) {
//       formErrors.phone = "Enter a valid phone number";
//       isValid = false;
//     }

//     setErrors(formErrors);
//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const { name, email, password, phone } = form;
//       console.log("Form Submitted:", { name, email, password, phone });
//       userService.userRegister(form)
//         .then((response) => {
//           console.log("User registered successfully:", response.data);
//         })
//         .catch((error) => {
//           console.error("Error registering user:", error);
//         });
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center vh-100"
//       style={{ backgroundColor: "#f7f7f7" }}
//     >
//       <div
//         className="bg-white p-5 rounded shadow-sm"
//         style={{ maxWidth: "450px", width: "100%" }}
//       >
//         <h2 className="text-center mb-4 text-dark">Create an Account</h2>

//         <div className="mb-3">
//           <input
//             type="text"
//             className={`form-control ${errors.name ? "is-invalid" : ""}`}
//             placeholder="Full Name"
//             value={form.name}
//             onChange={(e) => setField("name", e.target.value)}
//             required
//           />
//           {errors.name && <div className="invalid-feedback">{errors.name}</div>}
//         </div>

//         <div className="mb-3">
//           <input
//             type="email"
//             className={`form-control ${errors.email ? "is-invalid" : ""}`}
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) => setField("email", e.target.value)}
//             required
//           />
//           {errors.email && <div className="invalid-feedback">{errors.email}</div>}
//         </div>

//         <div className="mb-3">
//           <input
//             type="password"
//             className={`form-control ${errors.password ? "is-invalid" : ""}`}
//             placeholder="Password"
//             value={form.password}
//             onChange={(e) => setField("password", e.target.value)}
//             required
//           />
//           {errors.password && <div className="invalid-feedback">{errors.password}</div>}
//         </div>

//         <div className="mb-3">
//           <input
//             type="password"
//             className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
//             placeholder="Confirm Password"
//             value={form.confirmPassword}
//             onChange={(e) => setField("confirmPassword", e.target.value)}
//             required
//           />
//           {errors.confirmPassword && (
//             <div className="invalid-feedback">{errors.confirmPassword}</div>
//           )}
//         </div>

//         <div className="mb-3">
//           <input
//             type="tel"
//             className={`form-control ${errors.phone ? "is-invalid" : ""}`}
//             placeholder="Phone Number"
//             value={form.phone}
//             onChange={(e) => setField("phone", e.target.value)}
//             required
//           />
//           {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
//         </div>
//         <button className="btn btn-danger w-100" onClick={handleSubmit}>
//           Register
//         </button>
//         <p className="text-center mt-3">
//           Already have an account?{" "}
//           <NavLink to="/userlogin" className="text-primary">
//             Login
//           </NavLink>
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import userService from "../../service/userService";

export default function UserRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  function setField(field, value) {
    setForm({ ...form, [field]: value });
  }

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!form.name) {
      formErrors.name = "Name is required";
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(form.email)) {
      formErrors.email = "Enter a valid email";
      isValid = false;
    }

    if (!form.password) {
      formErrors.password = "Password is required";
      isValid = false;
    }

    if (!form.confirmPassword) {
      formErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (form.confirmPassword !== form.password) {
      formErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!form.phone) {
      formErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phonePattern.test(form.phone)) {
      formErrors.phone = "Enter a valid phone number";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { name, email, password, phone } = form;

      const payload = {
        name,
        email,
        password,
        phone,
        role_id: 1, // hardcoded role_id to satisfy foreign key constraint
      };

      userService
        .userRegister(payload)
        .then((response) => {
          console.log("User registered successfully:", response.data);
          alert("User Registerd Successfully");
          // Optional: redirect or notify user
        })
        .catch((error) => {
          console.error("Error registering user:", error);
          alert("invalid input");
          setForm({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
          });
        });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f7f7f7" }}
    >
      <div
        className="bg-white p-5 rounded shadow-sm"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <h2 className="text-center mb-4 text-dark">Create an Account</h2>

        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
            required
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="password"
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) => setField("confirmPassword", e.target.value)}
            required
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="tel"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            required
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
        </div>

        <button className="btn btn-danger w-100" onClick={handleSubmit}>
          Register
        </button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <NavLink to="/userlogin" className="text-primary">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}
