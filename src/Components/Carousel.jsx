import React, { useState, useEffect } from "react";
import { VscTriangleRight, VscTriangleLeft } from "react-icons/vsc";

const images = [
  "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHx8MHx8fDA%3D",
  "https://img.freepik.com/premium-photo/luxurious-hotel-lobby-with-marble-floor_1369729-40414.jpg?ga=GA1.1.1464861887.1734063462&semt=ais_hybrid&w=1000",
  "https://img.freepik.com/free-photo/hammocks-umbrellas-placed-row_1203-185.jpg?ga=GA1.1.1464861887.1734063462&semt=ais_hybrid&w=1000",
  "https://img.freepik.com/free-vector/horizontal-sale-banner-template-hotel-business_23-2150245693.jpg?t=st=1746678679~exp=1746682279~hmac=ec99dd9e05d19e8b3c977b9921069a5d6dd29ddf1de4e940fc68387e2c380e71&w=1380",
  "https://img.freepik.com/free-vector/travel-sale-landing-page-with-photo_23-2148628259.jpg?t=st=1746678635~exp=1746682235~hmac=b50d815062f0ba34eae17e918cbfebe01a695866e2574f7ac892138555a980f5&w=1380",
  "https://cdn.smartslider3.com/wp-content/uploads/slider/cache/2246430895b9002bd1db7616d566b283/slide2.jpg",
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
