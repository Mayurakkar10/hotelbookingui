import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, allowedRoles }) => {
  const role = localStorage.getItem("role");

  if (!isLoggedIn || (allowedRoles && !allowedRoles.includes(role))) {
    return <Navigate to="/userlogin" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
