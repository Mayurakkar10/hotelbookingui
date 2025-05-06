import React, { useState, useEffect } from "react";
import { VscTriangleRight, VscTriangleLeft } from "react-icons/vsc";

const images = [
  "https://img.freepik.com/premium-photo/grand-hotel-lobby-with-polished-marble-floors-tall-windows-elegant-furniture_1022970-45482.jpg?ga=GA1.1.1464861887.1734063462&semt=ais_hybrid&w=740",
  "https://img.freepik.com/premium-photo/luxurious-hotel-lobby-with-marble-floor_1369729-40414.jpg?ga=GA1.1.1464861887.1734063462&semt=ais_hybrid&w=740",
  "https://img.freepik.com/free-photo/hammocks-umbrellas-placed-row_1203-185.jpg?ga=GA1.1.1464861887.1734063462&semt=ais_hybrid&w=740",
];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  const setPrevious = () => {
    setIndex(index === 0 ? images.length - 1 : index - 1);
  };

  const setNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div
      className="position-relative"
      style={{ width: "100%", height: "20rem", overflow: "hidden" }} // Adjusted height here
    >
      <img
        src={images[index]}
        alt={`Slide ${index + 1}`}
        className="img-fluid w-100 h-100"
        style={{ objectFit: "cover" }}
      />

      {/* Previous Arrow */}
      <button
        onClick={setPrevious}
        style={{
          position: "absolute",
          top: "50%",
          left: "1rem",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
          outline: "none",
          cursor: "pointer",
        }}
        aria-label="Previous Slide"
      >
        <VscTriangleLeft
          style={{
            color: "#fff",
            fontSize: "2.5rem",
            textShadow: "0 0 8px rgba(0,0,0,0.7)",
          }}
        />
      </button>

      {/* Next Arrow */}
      <button
        onClick={setNext}
        style={{
          position: "absolute",
          top: "50%",
          right: "1rem",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
          outline: "none",
          cursor: "pointer",
        }}
        aria-label="Next Slide"
      >
        <VscTriangleRight
          style={{
            color: "#fff",
            fontSize: "2.5rem",
            textShadow: "0 0 8px rgba(0,0,0,0.7)",
          }}
        />
      </button>
    </div>
  );
};

export default Carousel;
