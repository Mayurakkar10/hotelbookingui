import React from "react";
import { Container } from "react-bootstrap";

const HotelInspiration = () => {
  return (
    <div
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        height: "300px",
        color: "white",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container className="text-center">
          <h2 className="fw-bold display-5">“A stay that becomes a memory.”</h2>
          <p className="fs-5">
            Experience comfort, care, and class at every step of your journey.
          </p>
        </Container>
      </div>
    </div>
  );
};

export default HotelInspiration;
