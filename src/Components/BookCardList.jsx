import React, { useEffect, useState } from "react";
import BookCard from "./HotelCard/BookCard";
export default function BookCardList() {
  const [hotelData, setHotelData] = useState([]);
  const [originalHotelData, setOriginalHotelData] = useState([]);
  const [selectRating, setSelectRating] = useState("");
  const [selectPriceRange, setSelectPriceRange] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchapi = async () => {
      try {
        const response = await fetch("http://localhost:8080/getAllHotels");
        const data = await response.json();
        setHotelData(data);
        setOriginalHotelData(data);
      } catch (err) {
        setErrMsg(err.message);
      }
    };
    fetchapi();
  }, []);

  function handleSearch(value) {
    const filterData = originalHotelData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setHotelData(filterData);
  }

  return (
    <div className="container py-4">
      <h1 className="mb-3" style={{ fontSize: "2rem" }}>
        Find Hotels
      </h1>

      <h5 className="mb-3 text-muted">
        {selectRating || "All Ratings"} -{" "}
        {selectPriceRange || "All Price Ranges"}
      </h5>
      <h6 className="text-muted mb-4">{hotelData.length} hotels found</h6>

      <div className="row g-2 mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <input
            type="text"
            placeholder="Search Hotel..."
            className="form-control"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <select
            className="form-select"
            onChange={(e) => setSelectRating(e.target.value)}
            defaultValue=""
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
      </div>

      {errMsg && <p className="text-danger mb-3">{errMsg}</p>}

      <div className="row">
        {hotelData.length > 0 ? (
          hotelData.map((hotel) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={hotel.id}>
              <BookCard
                hotelName={hotel.name}
                hotelPrice={hotel.price}
                hotelLocation={hotel.location}
                hotelRoomsAvailable={hotel.roomsAvailable}
                hotelid={hotel.id}
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
