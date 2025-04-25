import React from "react";
import logo from "../../assets/logo.png"; // Make sure your logo path is correct

export default function AboutUsPage() {
  return (
    <div className="container py-5">
      {/* Logo */}
      <div className="text-center mb-5">
        <img
          src={logo}
          alt="Book&Stay Logo"
          style={{ width: "140px", height: "auto" }}
          className="mb-3"
        />
        <h1 className="fw-bold text-primary">About Us</h1>
      </div>

      {/* Welcome Text */}
      <div className="text-center mb-4 px-3">
        <h3 className="text-dark mb-3">
          Welcome to <span className="text-primary">Book&Stay</span> – Your
          Trusted Hotel Booking Partner!
        </h3>
        <p className="lead text-muted">
          Seamless stays, stress-free travels — that’s our promise.
        </p>
      </div>

      {/* Description */}
      <div className="bg-light p-4 rounded shadow-sm mb-5">
        <p style={{ fontSize: "1.2rem", textAlign: "justify" }}>
          At <strong>Book&Stay</strong>, we believe that finding the perfect
          place to stay should be simple, seamless, and stress-free. Whether
          you're planning a vacation, a business trip, or a weekend getaway, our
          platform connects you with the best hotels at the most competitive
          prices.
        </p>
      </div>

      {/* Mission Section */}
      <div className="text-center mb-4">
        <h4 className="text-secondary mb-3 fw-semibold">Our Mission</h4>
        <p
          className="mx-auto"
          style={{
            maxWidth: "800px",
            fontSize: "1.1rem",
            textAlign: "justify",
          }}
        >
          Our mission is to revolutionize the way people experience travel by
          offering intuitive tools, trusted reviews, and top-tier hotel
          listings. We are committed to providing exceptional service and
          ensuring our users enjoy a hassle-free booking journey.
        </p>
      </div>

      {/* Team Section */}
      <div className="text-center mt-5">
        <h4 className="text-secondary mb-3 fw-semibold">Meet Our Team</h4>
        <p
          className="mx-auto"
          style={{
            maxWidth: "800px",
            fontSize: "1.1rem",
            textAlign: "justify",
          }}
        >
          We are a passionate group of travel enthusiasts, developers, and
          customer experience specialists who aim to make your travel planning
          as enjoyable as the trip itself. <span>💼 ✈️ 🌍</span>
        </p>
      </div>
    </div>
  );
}
