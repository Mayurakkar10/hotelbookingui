import React from "react";
import { useNavigate } from "react-router-dom";

export default function BookCard(props) {
  const navigate = useNavigate();

  function handleData(hotelid) {
    navigate(`/hotelPage/${hotelid}`);
  }

  return (
    <div className="card text-white w-100 h-100 border-0 shadow-sm">
      <div
        className="d-flex flex-column justify-content-end p-3"
        style={{
          height: "250px",
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.1)), url(${
            props.hotelImage
              ? props.hotelImage
              : "https://img.freepik.com/premium-photo/hotel-interior-its-beautiful-surroundings-with-flowers-drinks-lobby-stairs-lift-resturants_747046-543.jpg"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "0.5rem",
        }}
      >
        <h5 className="fw-bold mb-1">{props.hotelName}</h5>
        <p className="mb-1">Rooms Available: {props.hotelRoomsAvailable}</p>
        <p className="mb-1">Location: {props.hotelLocation}</p>
        <p className="mb-1">
          Rating: {"⭐".repeat(Math.min(5, Math.round(props.hotelRating)))}
        </p>
        <p className="mb-2">Price: ₹{props.hotelPrice}</p>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleData(props.hotelid)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
