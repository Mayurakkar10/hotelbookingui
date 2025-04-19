import React from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { NavLink } from "react-router-dom";
export default function Footer() {
  return (
    <div
      className="p-5 text-white "
      style={{
        backgroundColor: "#6D787D",
        alignItems: "center",
      }}
    >
      <h3>Book&Stay</h3>
      <hr style={{ border: "1px solid", color: "white" }} />
      <div
        className="d-flex flex-column flex-lg-row gap-2"
        style={{ justifyContent: "space-between", color: "white" }}
      >
        <div className="d-flex gap-2">
          <NavLink style={{ color: "white" }}>
            <FaInstagram style={{ fontSize: "2rem" }} />
          </NavLink>

          <NavLink style={{ color: "white" }}>
            <CiFacebook style={{ fontSize: "2rem" }} />
          </NavLink>

          <NavLink style={{ color: "white" }}>
            <CiLinkedin style={{ fontSize: "2rem" }} />
          </NavLink>
        </div>
        <div className="">
          <p>2025 &copy; Book&Store All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}
