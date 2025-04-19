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
import AdminLogin from "./Components/HotelAdmin/AdminLogin";
import AdminRegister from "./Components/HotelAdmin/AdminRegister";
import AdminComponent from "./Components/HotelAdmin/AdminComponent";
import HotelPage from "./Components/Pages/HotelPage";
import CustomerDashboard from "./Components/Dashboards/CustomerDashboard";
import OwnerDashboard from "./Components/Dashboards/OwnerDashboard";
import AdminDashboard from "./Components/Dashboards/AdminDashboard";



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (value) => {
    setIsLoggedIn(value);
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/userlogin" element={<UserLogin setLogin={handleLogin} />} />
        <Route path="/userregister" element={<UserRegister />} />
        <Route path="/adminlogin" element={<AdminLogin setLogin={handleLogin} />} />
        <Route path="/adminregister" element={<AdminRegister />} />
        <Route path="/adminpage" element={<AdminComponent />} />
        <Route path="/hotelpage" element={<HotelPage />} />
        <Route path="/customerdashboard" element={<CustomerDashboard />} />
        <Route path="/ownerdashboard" element={<OwnerDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
