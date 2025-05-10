// import React from "react";
// import { FaArrowCircleUp } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { CiFacebook } from "react-icons/ci";
// import { CiLinkedin } from "react-icons/ci";
// import { NavLink } from "react-router-dom";
// export default function Footer() {
//   return (
//     <div
//       className="p-5 text-white "
//       style={{
//         backgroundColor: "#6D787D",
//         alignItems: "center",
//       }}
//     >
//       <h3>Book&Stay</h3>
//       <hr style={{ border: "1px solid", color: "white" }} />
//       <div
//         className="d-flex flex-column flex-lg-row gap-2"
//         style={{ justifyContent: "space-between", color: "white" }}
//       >
//         <div className="d-flex gap-2">
//           <NavLink style={{ color: "white" }}>
//             <FaInstagram style={{ fontSize: "2rem" }} />
//           </NavLink>

//           <NavLink style={{ color: "white" }}>
//             <CiFacebook style={{ fontSize: "2rem" }} />
//           </NavLink>

//           <NavLink style={{ color: "white" }}>
//             <CiLinkedin style={{ fontSize: "2rem" }} />
//           </NavLink>
//         </div>
//         <div className="">
//           <p>2025 &copy; Book&Store All Rights Reserved</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">Book&Stay</h5>
            <p className="text-white">
              Your trusted partner in seamless hotel bookings. Experience
              comfort and class with every stay.
            </p>
          </Col>

          <Col md={4} className="mb-3">
            <h6 className="fw-bold">Contact Us</h6>
            <p className="mb-1">
              <FaPhone className="me-2" /> +91 8766947403
            </p>
            <p className="mb-1">
              <FaEnvelope className="me-2" /> bookandstayteam@gmail.com
            </p>
          </Col>

          <Col md={4} className="mb-3">
            <h6 className="fw-bold">Follow Us</h6>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="#" className="text-light fs-5">
                <FaFacebook />
              </a>
              <a href="#" className="text-light fs-5">
                <FaInstagram />
              </a>
              <a href="#" className="text-light fs-5">
                <FaTwitter />
              </a>
            </div>
          </Col>
        </Row>
        <hr className="bg-light opacity-25" />
        <p className="text-center mb-0 small">
          © {new Date().getFullYear()} Book&Stay All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
