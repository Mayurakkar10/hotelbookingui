import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function HotelRoomManagement() {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const roomTypes = [
    { id: 1, label: "Single" },
    { id: 2, label: "Double" },
    { id: 3, label: "Suite" },
  ];

  const [roomForm, setRoomForm] = useState({
    room_id: null,
    type_id: "",
    price: "",
    availability_status: "Available",
    image_url: "",
    amenities: [],
    bed_count: "", // New field for bed count
    max_guests: "", // New field for max guests
  });

  const availableAmenities = [
    "Wi-Fi",
    "TV",
    "AC",
    "Non-AC",
    "Heater",
    "Room Service",
    "Mini Bar",
    "Balcony",
    "Bathtub",
  ];

  useEffect(() => {
    fetchRooms();
  }, [hotelId]);

  const fetchRooms = async () => {
    try {
      const res = await fetch(`http://localhost:8080/hotel/${hotelId}/rooms`);
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      console.error("Error fetching rooms", err);
    }
  };

  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setRoomForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditRoom = (room) => {
    setRoomForm({
      room_id: room.room_id,
      type_id: room.type_id || "",
      price: room.price,
      availability_status: room.availability_status,
      image_url: room.image_url,
      amenities: room.amenities || [],
      bed_count: room.bed_count || "", // Ensure bed count is set from the room data
      max_guests: room.max_guests || "", // Ensure max guests is set from the room data
    });
    setIsEditMode(true);
    setShowRoomModal(true);
  };

  const handleAddRoom = () => {
    setIsEditMode(false);
    setRoomForm({
      room_id: null,
      type_id: "",
      price: "",
      availability_status: "Available",
      image_url: "",
      amenities: [],
      bed_count: "", // Reset bed count
      max_guests: "", // Reset max guests
    });
    setShowRoomModal(true);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("http://localhost:8080/roomimages/uploadImage", {
        method: "POST",
        body: formData,
      });
      return await res.text();
    } catch (err) {
      console.error("Image upload failed:", err);
      return null;
    }
  };

  const handleSaveRoom = async () => {
    const roomData = { ...roomForm, amenities: roomForm.amenities || [] }; // Ensure amenities are not null
    const url = isEditMode
      ? `http://localhost:8080/updateRoomById/${roomForm.room_id}`
      : `http://localhost:8080/hotel/${hotelId}/addrooms`;

    const method = isEditMode ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomData), // Send the amenities, bed_count, and max_guests as part of the request body
      });
      const result = await res.text();
      alert(result);
      console.log(result);
      setShowRoomModal(false);
      fetchRooms();
    } catch (err) {
      console.error("Failed to save room:", err);
      alert("Error saving room");
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await fetch(`http://localhost:8080/deleteRoomById/${roomId}`, {
          method: "DELETE",
        });
        alert("Room deleted");
        fetchRooms();
      } catch (err) {
        console.error("Failed to delete room:", err);
        alert("Error deleting room");
      }
    }
  };

  const toggleAmenity = (amenity) => {
    setRoomForm((prev) => {
      const updatedAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: updatedAmenities };
    });
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        <div className="col-12 col-md-3 bg-dark text-white min-vh-100 p-3">
          <h4 className="mb-4">Room Management</h4>
        </div>

        <div className="col-12 col-md-9 p-4">
          <div className="d-flex justify-content-between mb-3">
            <h2>Rooms for Hotel ID: {hotelId}</h2>
            <button className="btn btn-success" onClick={handleAddRoom}>
              + Add Room
            </button>
          </div>

          {rooms.length > 0 ? (
            <div className="row">
              {rooms.map((room) => (
                <div className="col-md-4 mb-4" key={room.room_id}>
                  <div className="card h-100">
                    <img
                      src={room.image_url || "https://via.placeholder.com/300"}
                      className="card-img-top"
                      alt={`Room ${room.room_id}`}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <p>
                        <strong>Room ID:</strong> {room.room_id}
                      </p>
                      <p>
                        <strong>Type:</strong>{" "}
                        {room.room_type || `Type ID ${room.type_id}`}
                      </p>
                      <p>
                        <strong>Price:</strong> {room.price}
                      </p>
                      <p>
                        <strong>Status:</strong> {room.availability_status}
                      </p>
                      <p>
                        <strong>Amenities:</strong>{" "}
                        {(room.amenities || []).join(", ")}
                      </p>
                      <p>
                        <strong>Number of Beds:</strong> {room.bed_count}
                      </p>
                      <p>
                        <strong>Max Guests:</strong> {room.max_guests}
                      </p>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditRoom(room)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteRoom(room.room_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No rooms found.</p>
          )}

          {showRoomModal && (
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
                        {isEditMode ? "Edit Room" : "Add Room"}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowRoomModal(false)}
                      />
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Room Type</label>
                        <select
                          className="form-select"
                          name="type_id"
                          value={roomForm.type_id}
                          onChange={handleRoomChange}
                        >
                          <option value="">Select room type</option>
                          {roomTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          value={roomForm.price}
                          onChange={handleRoomChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Availability</label>
                        <select
                          name="availability_status"
                          className="form-select"
                          value={roomForm.availability_status}
                          onChange={handleRoomChange}
                        >
                          <option value="Available">Available</option>
                          <option value="Occupied">Occupied</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Upload Image</label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const uploadedUrl = await uploadImage(file);
                              if (uploadedUrl) {
                                setRoomForm((prev) => ({
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
                      {roomForm.image_url && (
                        <div className="text-center mb-3">
                          <img
                            src={roomForm.image_url}
                            alt="Preview"
                            className="img-fluid rounded"
                            style={{ maxHeight: "200px", objectFit: "cover" }}
                          />
                        </div>
                      )}
                      <div className="mb-3">
                        <label className="form-label">Number of Beds</label>
                        <input
                          type="number"
                          className="form-control"
                          name="bed_count"
                          value={roomForm.bed_count}
                          onChange={handleRoomChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Max Guests</label>
                        <input
                          type="number"
                          className="form-control"
                          name="max_guests"
                          value={roomForm.max_guests}
                          onChange={handleRoomChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Amenities</label>
                        <div className="row">
                          {availableAmenities.map((amenity) => (
                            <div className="col-6" key={amenity}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={roomForm.amenities.includes(amenity)}
                                  onChange={() => toggleAmenity(amenity)}
                                  id={`amenity-${amenity}`}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`amenity-${amenity}`}
                                >
                                  {amenity}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setShowRoomModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={handleSaveRoom}
                      >
                        {isEditMode ? "Update Room" : "Save Room"}
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
