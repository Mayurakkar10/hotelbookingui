import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function OwnerDashboard() {
  const [hotels, setHotels] = useState([]);
  const [isManageHotel, setIsHotelManage] = useState(false);
  const [showAddHotel, setShowAddHotel] = useState(false);

  // Rooms state
  const [showRoomsModal, setShowRoomsModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    type_id: 1,
    price: "",
    availability_status: "Available",
    image_url: "",
  });

  // Hotel form state
  const [newHotel, setNewHotel] = useState({
    name: "",
    location: "",
    category: "Luxury",
  });

  const ownerId = localStorage.getItem("userId");

  // Fetch this owner's hotels
  const handleManageHotels = async () => {
    setIsHotelManage(true);
    try {
      const res = await fetch(`http://localhost:8080/hotels/owner/${ownerId}`);
      const data = await res.json();
      setHotels(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Open Add Hotel modal
  const handleAddHotel = () => setShowAddHotel(true);

  // Hotel form input change
  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setNewHotel((prev) => ({ ...prev, [name]: value }));
  };

  // Save new hotel
  const handleSaveHotel = async () => {
    try {
      const res = await fetch(`http://localhost:8080/addhotels/${ownerId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHotel),
      });
      alert(await res.text());
      setShowAddHotel(false);
      setNewHotel({ name: "", location: "", category: "Luxury" });
      handleManageHotels();
    } catch (err) {
      console.error(err);
      alert("Failed to save hotel");
    }
  };

  // When clicking a hotel row, fetch & show rooms
  const handleRowClick = async (hotel) => {
    setSelectedHotel(hotel);
    try {
      const res = await fetch(
        `http://localhost:8080/owner/${ownerId}/hotels/${hotel.hotel_id}/rooms`
      );
      const data = await res.json();
      setRooms(data);
      setShowRoomsModal(true);
    } catch (err) {
      console.error("Failed to load rooms:", err);
    }
  };

  // Room form change
  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({ ...prev, [name]: value }));
  };

  // Save new room
  const handleSaveRoom = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/owner/${ownerId}/hotels/${selectedHotel.hotel_id}/rooms`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRoom),
        }
      );
      alert(await res.text());
      // refresh rooms
      const refresh = await fetch(
        `http://localhost:8080/owner/${ownerId}/hotels/${selectedHotel.hotel_id}/rooms`
      );
      setRooms(await refresh.json());
      setNewRoom({
        type_id: 1,
        price: "",
        availability_status: "Available",
        image_url: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save room");
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-12 col-md-3 bg-dark text-white min-vh-100 p-3">
          <h4 className="mb-4">Owner Panel</h4>
          <button
            className="btn btn-outline-light mb-2 w-100"
            onClick={handleManageHotels}
          >
            Manage Hotels
          </button>
          <button className="btn btn-outline-light mb-2 w-100" disabled>
            Manage Bookings
          </button>
          <button className="btn btn-outline-light mb-2 w-100" disabled>
            View Payments
          </button>
          <button className="btn btn-outline-light mb-2 w-100" disabled>
            Reviews & Ratings
          </button>
        </div>

        {/* Main Panel */}
        <div className="col-12 col-md-9 p-3">
          <h2 className="mb-4">Welcome Owner</h2>

          {/* Hotel Management */}
          {isManageHotel && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <input
                  type="search"
                  className="form-control w-75 shadow-sm rounded"
                  placeholder="Search hotels..."
                  onChange={(e) => {
                    const q = e.target.value.toLowerCase();
                    setHotels((hs) =>
                      hs.filter(
                        (h) =>
                          h.name.toLowerCase().includes(q) ||
                          h.location.toLowerCase().includes(q)
                      )
                    );
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
                    </tr>
                  </thead>
                  <tbody>
                    {hotels.length > 0 ? (
                      hotels.map((hotel) => (
                        <tr
                          key={hotel.hotel_id}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRowClick(hotel)}
                          className="hoteltr"
                        >
                          <td>{hotel.name}</td>
                          <td>{hotel.location}</td>
                          <td>{hotel.category}</td>
                          <td>{new Date(hotel.created_at).toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No Hotels Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Add Hotel Modal */}
          {showAddHotel && (
            <>
              <div
                className="modal-backdrop fade show"
                style={{ zIndex: 1040 }}
              />
              <div
                className="modal d-block fade show"
                tabIndex="-1"
                style={{ zIndex: 1050 }}
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add Hotel</h5>
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
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowAddHotel(false)}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSaveHotel}
                      >
                        Save Hotel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Manage Rooms Modal */}
          {showRoomsModal && selectedHotel && (
            <>
              <div
                className="modal-backdrop fade show"
                style={{ zIndex: 1040 }}
              />
              <div
                className="modal d-block fade show"
                tabIndex="-1"
                style={{ zIndex: 1050 }}
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content p-3">
                    <div className="modal-header">
                      <h5 className="modal-title">
                        Rooms for “{selectedHotel.name}”
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowRoomsModal(false)}
                      />
                    </div>
                    <div className="modal-body">
                      <ul className="list-group mb-3">
                        {rooms.length > 0 ? (
                          rooms.map((r) => (
                            <li key={r.room_id} className="list-group-item">
                              Type {r.type_id} — ₹{r.price} —{" "}
                              {r.availability_status}
                            </li>
                          ))
                        ) : (
                          <li className="list-group-item text-center">
                            No rooms yet.
                          </li>
                        )}
                      </ul>

                      <h6>Add New Room</h6>
                      <div className="row g-2 mb-3">
                        <div className="col">
                          <input
                            type="number"
                            name="type_id"
                            className="form-control"
                            placeholder="Type ID"
                            value={newRoom.type_id}
                            onChange={handleRoomChange}
                          />
                        </div>
                        <div className="col">
                          <input
                            type="number"
                            name="price"
                            className="form-control"
                            placeholder="Price"
                            value={newRoom.price}
                            onChange={handleRoomChange}
                          />
                        </div>
                      </div>
                      <div className="mb-2">
                        <select
                          name="availability_status"
                          className="form-select"
                          value={newRoom.availability_status}
                          onChange={handleRoomChange}
                        >
                          <option>Available</option>
                          <option>Booked</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          name="image_url"
                          className="form-control"
                          placeholder="Image URL"
                          value={newRoom.image_url}
                          onChange={handleRoomChange}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setShowRoomsModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={handleSaveRoom}
                      >
                        Save Room
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
