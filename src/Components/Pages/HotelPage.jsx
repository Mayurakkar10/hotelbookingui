import React from "react";

const HotelPage = () => {
  return (
    <div
      className="container my-4 p-4"
      style={{
        border: "1px solid #ccc",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "15px",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div className="row g-4 align-items-start">
        {/* Hotel Image */}
        <div className="col-12 col-md-6">
          <img
            src="https://img.freepik.com/premium-photo/lobby-with-large-lobby-with-large-chandelier-plant-center_1109006-87779.jpg"
            alt="Hotel"
            className="img-fluid rounded"
          />
        </div>

        {/* Booking Form */}
        <div className="col-12 col-md-6">
          <div className="form">
            <h2 className="mb-3">Book Room</h2>

            <div className="mb-3">
              <label htmlFor="date" className="form-label fw-semibold">
                Select Date
              </label>
              <input type="date" id="date" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Room Type</label>
              <select className="form-select">
                <option>Select Room</option>
                <option>AC</option>
                <option>Non-AC</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Members</label>
              <div className="d-flex align-items-center gap-3">
                <button className="btn btn-outline-success">+</button>
                <h5 className="mb-0">1</h5>
                <button className="btn btn-outline-success">-</button>
              </div>
            </div>

            <h4 className="mt-3">Total Price: ₹0</h4>

            <button className="btn btn-success mt-3 w-100">
              Continue To Book
            </button>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-5">
        <h3 className="mb-2">Hotel Description</h3>
        <p className="text-muted">
          Welcome to our luxurious hotel located in the heart of the city. Enjoy
          premium rooms, top-notch services, and amenities designed for your
          comfort and convenience. Whether you're here for business or leisure,
          we ensure a memorable stay.
        </p>
      </div>

      {/* Amenities Section */}
      <div className="mt-4">
        <h4 className="mb-3">Amenities</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">✅ Free Wi-Fi</li>
          <li className="list-group-item">✅ Swimming Pool</li>
          <li className="list-group-item">✅ 24/7 Room Service</li>
          <li className="list-group-item">✅ Complimentary Breakfast</li>
          <li className="list-group-item">✅ Gym & Spa Access</li>
          <li className="list-group-item">✅ Free Parking</li>
        </ul>
      </div>
    </div>
  );
};

export default HotelPage;
