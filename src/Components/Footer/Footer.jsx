import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
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
              <FaPhoneAlt className="me-2" /> +91 8766947403
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
