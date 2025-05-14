import React, { useEffect, useState } from "react";
import BookCard from "./HotelCard/BookCard";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import baseUrl from "../baseUrl";
export default function BookCardList(props) {
  const [hotelData, setHotelData] = useState([]);
  const [originalHotelData, setOriginalHotelData] = useState([]);
  const [selectRating, setSelectRating] = useState("");
  const [selectPriceRange, setSelectPriceRange] = useState("");
  const [selectRoomType, setSelectRoomType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectLocation, setSelectLocation] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchapi = async () => {
      try {
        const response = await fetch(`${baseUrl}/hotels`);
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
  }, [
    searchQuery,
    selectRating,
    selectPriceRange,
    selectRoomType,
    selectLocation,
  ]);

  function filterHotels() {
    let filtered = originalHotelData;

    if (searchQuery) {
      filtered = filtered.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectRating) {
      const star = parseInt(selectRating[0]);
      filtered = filtered.filter(
        (hotel) => Math.floor(hotel.avg_rating) === star
      );
    }

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

    if (selectRoomType) {
      if (selectRoomType === "AC") {
        filtered = filtered.filter((hotel) => hotel.ac_rooms > 0);
      } else if (selectRoomType === "Non-AC") {
        filtered = filtered.filter((hotel) => hotel.non_ac_rooms > 0);
      }
    }

    setHotelData(filtered);
    setCurrentPage(1); // reset page when filters are applied
  }

  const clearFilters = () => {
    setSelectRating("");
    setSelectPriceRange("");
    setSelectRoomType("");
    setSearchQuery("");
    setSelectLocation("");
  };

  function GotoBookings() {
    navigate(`/customerdashboard/${userId}`);
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHotels = hotelData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(hotelData.length / itemsPerPage);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Find Hotels</h1>
        {props.isLoggedIn && localStorage.getItem("role") === "customer" && (
          <button
            className="btn btn-success rounded-pill px-4"
            onClick={GotoBookings}
          >
            My Bookings
          </button>
        )}
      </div>

      {/* Filters Summary */}
      <div className="mb-3">
        <h6 className="text-muted">
          Filters:
          {selectRating && (
            <span className="badge bg-primary mx-1">{selectRating}</span>
          )}
          {selectPriceRange && (
            <span className="badge bg-success mx-1">{selectPriceRange}</span>
          )}
          {selectRoomType && (
            <span className="badge bg-info text-dark mx-1">
              {selectRoomType}
            </span>
          )}
          {!selectRating && !selectPriceRange && !selectRoomType && (
            <span className="text-muted"> All Hotels</span>
          )}
        </h6>
        <h6 className="text-muted">{hotelData.length} hotels found</h6>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-4 shadow border mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-6 col-lg-4">
            <input
              type="text"
              placeholder="🔍 Search Hotel Name, Location"
              className="form-control form-control-lg border-primary-subtle"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-6 col-md-3 col-lg-2">
            <select
              className="form-select border-info-subtle"
              value={selectRating}
              onChange={(e) => setSelectRating(e.target.value)}
            >
              <option disabled value="">
                ⭐ Select Rating
              </option>
              <option>5 Star</option>
              <option>4 Star</option>
              <option>3 Star</option>
            </select>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <select
              className="form-select border-info-subtle"
              value={selectPriceRange}
              onChange={(e) => setSelectPriceRange(e.target.value)}
            >
              <option disabled value="">
                💰 Price Range
              </option>
              <option>200-1000</option>
              <option>1000-2000</option>
              <option>2000-5000</option>
              <option>above 5000</option>
            </select>
          </div>
          <div className="col-6 col-md-3 col-lg-2">
            <select
              className="form-select border-info-subtle"
              value={selectRoomType}
              onChange={(e) => setSelectRoomType(e.target.value)}
            >
              <option disabled value="">
                🛏 Room Type
              </option>
              <option>AC</option>
              <option>Non-AC</option>
            </select>
          </div>
          <div className="col-6 col-md-3 col-lg-2">
            <button
              className="btn btn-outline-danger w-100"
              onClick={clearFilters}
            >
              ✖ Clear Filters
            </button>
          </div>
        </div>
      </div>

      {errMsg && <p className="text-danger mb-3">{errMsg}</p>}

      <div className="row">
        {currentHotels.length > 0 ? (
          currentHotels.map((hotel) => (
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

      {/* Pagination Controls */}
      {hotelData.length > itemsPerPage && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  «
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages && "disabled"
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  »
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
