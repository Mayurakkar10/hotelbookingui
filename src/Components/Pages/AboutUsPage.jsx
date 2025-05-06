import React from "react";
import logo from "../../assets/logo.png"; // Ensure the logo path is correct
import { FaUsers, FaBullseye, FaSuitcaseRolling } from "react-icons/fa";

export default function AboutUsPage() {
  return (
    <div className="container py-5">
      {/* Header & Logo */}
      <div className="text-center mb-5">
        <img
          src={logo}
          alt="Book&Stay Logo"
          className="mb-3"
          style={{ width: "120px" }}
        />
        <h1 className="fw-bold text-primary">About Book&Stay</h1>
        <p className="lead text-muted">
          Making travel simpler, smarter, and more joyful.
        </p>
      </div>

      {/* Welcome Section */}
      <section className="mb-5">
        <div className="bg-white rounded shadow-sm p-4">
          <h3 className="text-center text-dark fw-semibold mb-3">
            Welcome to <span className="text-primary">Book&Stay</span>
          </h3>
          <p className="text-center lead text-muted mb-0">
            Seamless stays, stress-free travels — that’s our promise.
          </p>
        </div>
      </section>

      {/* Divider */}
      <hr className="my-5" />

      {/* Mission Section */}
      <section className="mb-5">
        <div className="d-flex align-items-start gap-3">
          <FaBullseye size={32} className="text-primary mt-1" />
          <div>
            <h4 className="text-secondary fw-bold">Our Mission</h4>
            <p className="text-muted" style={{ textAlign: "justify" }}>
              We aim to revolutionize the way you travel. Our platform blends
              intuitive tools, real user reviews, and a handpicked list of top
              hotels. We’re committed to giving you the smoothest, most reliable
              booking experience possible.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-5">
        <div className="d-flex align-items-start gap-3">
          <FaUsers size={32} className="text-primary mt-1" />
          <div>
            <h4 className="text-secondary fw-bold">Meet Our Team</h4>
            <p className="text-muted" style={{ textAlign: "justify" }}>
              We’re a team of passionate developers, travel experts, and
              hospitality lovers. Every line of code and feature we build is
              rooted in our love for travel and commitment to your comfort.{" "}
              <span role="img" aria-label="travel">
                💼 ✈️ 🌍
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-light p-4 rounded shadow-sm mt-5">
        <FaSuitcaseRolling size={40} className="text-primary mb-2" />
        <h5 className="fw-bold mb-2">Ready for your next journey?</h5>
        <p className="text-muted">
          Discover top hotels and book your perfect stay in just a few clicks.
        </p>
        <a href="/" className="btn btn-primary mt-2">
          Explore Hotels
        </a>
      </section>
    </div>
  );
}
