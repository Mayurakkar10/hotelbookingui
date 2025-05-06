import React, { useEffect, useState } from "react";
import BookCard from "./HotelCard/BookCard";
import { useNavigate } from "react-router-dom";

export default function BookCardList(props) {
  const [hotelData, setHotelData] = useState([]);
  const [originalHotelData, setOriginalHotelData] = useState([]);
  const [selectRating, setSelectRating] = useState("");
  const [selectPriceRange, setSelectPriceRange] = useState("");
  const [selectRoomType, setSelectRoomType] = useState(""); // Added room type filter (AC/Non-AC)
  const [searchQuery, setSearchQuery] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchapi = async () => {
      try {
        const response = await fetch("http://localhost:8080/hotels");
        const data = await response.json();
        setHotelData(data);
        setOriginalHotelData(data);
      } catch (err) {
        setErrMsg(err.message);
      }
    };
    fetchapi();
  }, []);

  useEffect(() => {
    filterHotels();
  }, [searchQuery, selectRating, selectPriceRange, selectRoomType]); // Added selectRoomType to dependency array

  function filterHotels() {
    let filtered = originalHotelData;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((hotel) =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply rating filter
    if (selectRating) {
      const star = parseInt(selectRating[0]);
      filtered = filtered.filter(
        (hotel) => Math.floor(hotel.avg_rating) === star
      );
    }

    // Apply price filter
    if (selectPriceRange) {
      if (selectPriceRange === "above 5000") {
        filtered = filtered.filter((hotel) => hotel.avg_price > 5000);
      } else {
        const [min, max] = selectPriceRange.split("-").map(Number);
        filtered = filtered.filter(
          (hotel) => hotel.avg_price >= min && hotel.avg_price <= max
        );
      }
    }

    // Apply room type filter (AC/Non-AC)
    if (selectRoomType) {
      if (selectRoomType === "AC") {
        filtered = filtered.filter((hotel) => hotel.ac_rooms > 0);
      } else if (selectRoomType === "Non-AC") {
        filtered = filtered.filter((hotel) => hotel.non_ac_rooms > 0);
      }
    }

    setHotelData(filtered);
  }

  const clearFilters = () => {
    setSelectRating("");
    setSelectPriceRange("");
    setSelectRoomType("");
    setSearchQuery("");
  };

  function GotoBookings() {
    navigate(`/customerdashboard/${userId}`);
  }

  return (
    <div className="container py-4">
      <div className="d-flex" style={{ justifyContent: "space-between" }}>
        <h1 className="mb-3" style={{ fontSize: "2rem" }}>
          Find Hotels
        </h1>

        {props.isLoggedIn && (
          <button className="btn btn-outline-success" onClick={GotoBookings}>
            My Bookings
          </button>
        )}
      </div>

      <h5 className="mb-3 text-muted">
        {selectRating || "All Ratings"} -{" "}
        {selectPriceRange || "All Price Ranges"} -{" "}
        {selectRoomType || "All Room Types"}
      </h5>
      <h6 className="text-muted mb-4">{hotelData.length} hotels found</h6>

      <div className="row g-2 mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <input
            type="text"
            placeholder="Search Hotel..."
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <select
            className="form-select"
            value={selectRating}
            onChange={(e) => setSelectRating(e.target.value)}
          >
            <option disabled value="">
              Select Rating
            </option>
            <option>5 Star</option>
            <option>4 Star</option>
            <option>3 Star</option>
          </select>
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <select
            className="form-select"
            value={selectPriceRange}
            onChange={(e) => setSelectPriceRange(e.target.value)}
          >
            <option disabled value="">
              Select Price Range
            </option>
            <option>200-1000</option>
            <option>1000-2000</option>
            <option>2000-5000</option>
            <option>above 5000</option>
          </select>
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <select
            className="form-select"
            value={selectRoomType}
            onChange={(e) => setSelectRoomType(e.target.value)}
          >
            <option disabled value="">
              Select Room Type
            </option>
            <option>AC</option>
            <option>Non-AC</option>
          </select>
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <button
            className="btn btn-outline-secondary w-100"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {errMsg && <p className="text-danger mb-3">{errMsg}</p>}

      <div className="row">
        {hotelData.length > 0 ? (
          hotelData.map((hotel) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={hotel.hotel_id}>
              <BookCard
                hotelid={hotel.hotel_id}
                hotelRoomsAvailable={hotel.available_rooms}
                hotelName={hotel.name}
                hotelLocation={hotel.location}
                hotelImage={hotel.image_url ? hotel.image_url : null}
                hotelPrice={hotel.avg_price}
                hotelRating={hotel.avg_rating}
              />
            </div>
          ))
        ) : (
          <p className="text-muted">No hotels found.</p>
        )}
      </div>
    </div>
  );
}
