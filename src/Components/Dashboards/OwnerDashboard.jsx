import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink } from "react-router-dom";

export default function OwnerDashboard() {
  const [hotels, setHotels] = useState([]);
  const [allHotels, setAllHotels] = useState([]);
  const [isManageHotel, setIsHotelManage] = useState(false);
  const [isManageBookings, setIsManageBookings] = useState(false);
  const [showAddHotel, setShowAddHotel] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [bookings, setBookings] = useState([]);

  const [newHotel, setNewHotel] = useState({
    hotel_id: null,
    name: "",
    location: "",
    category: "",
    image_url: "",
    numberOfBeds: 1, // New property for number of beds
    maxGuests: 1, // New property for max number of guests
  });

  const ownerId = localStorage.getItem("userId");

  const handleManageHotels = async () => {
    setIsManageBookings(false);
    setIsHotelManage(true);
    try {
      const res = await fetch(`http://localhost:8080/hotels/owner/${ownerId}`);
      const data = await res.json();
      setHotels(data);
      setAllHotels(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleManageBookings = async () => {
    setIsHotelManage(false);
    setIsManageBookings(true);
    try {
      const res = await fetch(
        `http://localhost:8080/bookings/owner/${ownerId}`
      );
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  const handleAddHotel = () => {
    setIsEditMode(false);
    setNewHotel({
      hotel_id: null,
      name: "",
      location: "",
      category: "",
      image_url: "",
      numberOfBeds: 1, // Reset to default value
      maxGuests: 1, // Reset to default value
    });
    setShowAddHotel(true);
  };

  const handleEditHotel = (hotel) => {
    setIsEditMode(true);
    setNewHotel(hotel);
    setShowAddHotel(true);
  };

  const handleDeleteHotel = async (hotelId) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      try {
        await fetch(`http://localhost:8080/deleteHotelById/${hotelId}`, {
          method: "DELETE",
        });
        alert("Hotel deleted.");
        handleManageHotels();
      } catch (err) {
        console.error(err);
        alert("Failed to delete hotel.");
      }
    }
  };

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setNewHotel((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImageToServer = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8080/hotelimage/uploadImage", {
        method: "POST",
        body: formData,
      });
      return await res.text();
    } catch (err) {
      console.error("Image upload failed:", err);
      return null;
    }
  };

  const handleSaveHotel = async () => {
    if (!newHotel.image_url) {
      alert("Please upload an image before saving.");
      return;
    }

    const url = isEditMode
      ? `http://localhost:8080/updateHotelById${newHotel.hotel_id}`
      : `http://localhost:8080/addHotels/${ownerId}`;

    const method = isEditMode ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHotel),
      });

      alert(await res.text());
      setShowAddHotel(false);
      setNewHotel({
        hotel_id: null,
        name: "",
        location: "",
        category: "",
        image_url: "",
        numberOfBeds: 1, // Reset after save
        maxGuests: 1, // Reset after save
      });
      handleManageHotels();
    } catch (err) {
      console.error(err);
      alert("Failed to save hotel");
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        <div className="col-12 col-md-3 bg-dark text-white min-vh-100 p-3">
          <h4 className="mb-4">Owner Panel</h4>
          <button
            className="btn btn-outline-light mb-2 w-100"
            onClick={handleManageHotels}
          >
            Manage Hotels
          </button>
          <button
            className="btn btn-outline-light w-100"
            onClick={handleManageBookings}
          >
            Manage Bookings
          </button>
        </div>

        <div className="col-12 col-md-9 p-3">
          <h2 className="mb-4">Welcome Owner</h2>

          {isManageHotel && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <input
                  type="search"
                  className="form-control w-75 shadow-sm rounded"
                  placeholder="Search hotels..."
                  onChange={(e) => {
                    const q = e.target.value.toLowerCase();
                    const filtered = allHotels.filter(
                      (h) =>
                        h.name.toLowerCase().includes(q) ||
                        h.location.toLowerCase().includes(q)
                    );
                    setHotels(filtered);
                  }}
                />
                <button className="btn btn-success" onClick={handleAddHotel}>
                  <i className="bi bi-plus-lg"></i> Add Hotel
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-striped border">
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Category</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotels.length > 0 ? (
                      hotels.map((hotel) => (
                        <tr key={hotel.hotel_id}>
                          <td>
                            <NavLink to={`/hotelroompage/${hotel.hotel_id}`}>
                              {hotel.name}
                            </NavLink>
                          </td>
                          <td>{hotel.location}</td>
                          <td>{hotel.category}</td>
                          <td>{new Date(hotel.created_at).toLocaleString()}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => handleEditHotel(hotel)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeleteHotel(hotel.hotel_id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No Hotels Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {isManageBookings && (
            <>
              <h4>All Bookings</h4>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th>Booking ID</th>
                      <th>Hotel</th>
                      <th>Room</th>
                      <th>Customer</th>
                      <th>Check-In</th>
                      <th>Check-Out</th>
                      <th>Total Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length > 0 ? (
                      bookings.map((b) => (
                        <tr key={b.booking_id}>
                          <td>{b.booking_id}</td>
                          <td>{b.hotel_name || b.hotel_id}</td>
                          <td>{b.room_id || b.room_type}</td>
                          <td>{b.customer_id || b.customer_name}</td>
                          <td>
                            {new Date(b.check_in_date).toLocaleDateString()}
                          </td>
                          <td>
                            {new Date(b.check_out_date).toLocaleDateString()}
                          </td>
                          <td>₹{b.total_price}</td>
                          <td>{b.booking_status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No bookings found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {showAddHotel && (
            <>
              <div
                className="modal-backdrop fade show"
                style={{ zIndex: 1040 }}
              />
              <div className="modal d-block fade show" style={{ zIndex: 1050 }}>
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title w-100 text-center">
                        {isEditMode ? "Edit Hotel" : "Add Hotel"}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowAddHotel(false)}
                      />
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Hotel Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={newHotel.name}
                          onChange={handleHotelChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Location</label>
                        <input
                          type="text"
                          className="form-control"
                          name="location"
                          value={newHotel.location}
                          onChange={handleHotelChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select
                          name="category"
                          className="form-select"
                          value={newHotel.category}
                          onChange={handleHotelChange}
                        >
                          <option value="Luxury">Luxury</option>
                          <option value="Standard">Standard</option>
                          <option value="Boutique">Boutique</option>
                          <option value="Budget">Budget</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Number of Beds</label>
                        <input
                          type="number"
                          className="form-control"
                          name="numberOfBeds"
                          value={newHotel.numberOfBeds}
                          onChange={handleHotelChange}
                          min={1}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Max Guests</label>
                        <input
                          type="number"
                          className="form-control"
                          name="maxGuests"
                          value={newHotel.maxGuests}
                          onChange={handleHotelChange}
                          min={1}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Upload Image</label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const uploadedUrl = await uploadImageToServer(
                                file
                              );
                              if (uploadedUrl) {
                                setNewHotel((prev) => ({
                                  ...prev,
                                  image_url: uploadedUrl,
                                }));
                              } else {
                                alert("Failed to upload image");
                              }
                            }
                          }}
                        />
                      </div>
                      {newHotel.image_url && (
                        <div className="text-center mb-3">
                          <img
                            src={newHotel.image_url}
                            alt="Preview"
                            className="img-fluid rounded"
                            style={{ maxHeight: "200px", objectFit: "cover" }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowAddHotel(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSaveHotel}
                      >
                        {isEditMode ? "Update Hotel" : "Save Hotel"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
