import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaBed, FaStar, FaRupeeSign } from "react-icons/fa";

export default function BookCard(props) {
  const navigate = useNavigate();

  const handleData = (hotelid) => {
    navigate(`/hotelPage/${hotelid}`);
  };

  return (
    <div
      className="card border-0 shadow-lg rounded-4 overflow-hidden"
      style={{ height: "100%", cursor: "pointer" }}
      onClick={() => handleData(props.hotelid)}
    >
      <div
        className="position-relative"
        style={{
          height: "220px",
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.2)), url(${
            props.hotelImage
              ? props.hotelImage
              : "https://img.freepik.com/premium-photo/hotel-interior-its-beautiful-surroundings-with-flowers-drinks-lobby-stairs-lift-resturants_747046-543.jpg"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="position-absolute bottom-0 p-3 text-white">
          <h5 className="fw-bold">{props.hotelName}</h5>
          <p className="mb-0">
            <FaMapMarkerAlt className="me-1" /> {props.hotelLocation}
          </p>
        </div>
      </div>

      <div className="p-3 bg-light rounded-bottom">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <small>
            <FaBed className="me-1" /> Rooms Available:{" "}
            {props.hotelRoomsAvailable}
          </small>
          <small>
            {[...Array(Math.round(props.hotelRating || 1))].map((_, i) => (
              <FaStar key={i} className="text-warning me-1" />
            ))}
          </small>
          <div className="mb-2">
            <span className="badge bg-danger">25% OFF</span>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-semibold">
            <FaRupeeSign className="me-1" />
            {props.hotelPrice}
          </span>
          <span className="text-primary fw-semibold">Book Now</span>
        </div>
      </div>
    </div>
  );
}
