import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HomeComponent from "./Components/HomeComponent";
import Footer from "./Components/Footer/Footer";
import AboutUsPage from "./Components/Pages/AboutUsPage";
import ContactUsPage from "./Components/Pages/ContactUsPage";
import UserLogin from "./Components/User/UserLogin"; // ✅ Only once
import UserRegister from "./Components/User/UserRegister";

import HotelBookingPage from "./Components/Pages/HotelBookingPage";
import CustomerDashboard from "./Components/Dashboards/CustomerDashboard";
import OwnerDashboard from "./Components/Dashboards/OwnerDashboard";
import AdminDashboard from "./Components/Dashboards/AdminDashboard";
import HotelRoomPage from "./Components/Pages/HotelRoomPage";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoutes";
import { MdLocalHospital } from "react-icons/md";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (value) => {
    setIsLoggedIn(value);
  };
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomeComponent isLoggedIn={isLoggedIn} />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route
          path="/userlogin"
          element={<UserLogin setLogin={handleLogin} />}
        />
        <Route path="/userregister" element={<UserRegister />} />
        <Route path="/hotelpage/:hotelId" element={<HotelBookingPage />} />
        <Route path="/hotelroompage/:hotelId" element={<HotelRoomPage />} />

        {/* Protected Routes - Customer */}
        <Route
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              allowedRoles={["customer"]}
            />
          }
        >
          <Route
            path="/customerdashboard/:userId"
            element={<CustomerDashboard />}
          />
        </Route>

        {/* Protected Routes - Owner */}
        <Route
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} allowedRoles={["owner"]} />
          }
        >
          <Route path="/ownerdashboard/:userId" element={<OwnerDashboard />} />
        </Route>

        {/* Protected Routes - Admin */}
        <Route
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} allowedRoles={["admin"]} />
          }
        >
          <Route path="/admindashboard/:userId" element={<AdminDashboard />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
