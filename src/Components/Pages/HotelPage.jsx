import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { FaBed, FaUsers, FaRupeeSign } from "react-icons/fa";

const HotelPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [guestDetails, setGuestDetails] = useState([
    { name: "", age: "", id_proof_type: "", id_proof_number: "" },
  ]);
  const [customerId, setCustomerId] = useState(1);
  const [showGuestDetailsModal, setShowGuestDetailsModal] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setCustomerId(userId);

    const fetchHotelAndRooms = async () => {
      try {
        const [hotelRes, roomsRes] = await Promise.all([
          fetch(`http://localhost:8080/hotel/${hotelId}`),
          fetch(`http://localhost:8080/hotel/${hotelId}/rooms`),
        ]);
        setHotel(await hotelRes.json());
        const roomsData = await roomsRes.json();
        setRooms(Array.isArray(roomsData) ? roomsData : roomsData.rooms || []);
      } catch (error) {
        console.error("Failed to fetch hotel or rooms:", error);
      }
    };

    fetchHotelAndRooms();
  }, [hotelId]);

  const handleGuestDetailChange = (index, field, value) => {
    const updated = [...guestDetails];
    updated[index][field] = value;
    setGuestDetails(updated);
  };

  const handleGuestCountChange = (e) => {
    const count = parseInt(e.target.value);
    setNumberOfGuests(count);
    const updated = Array.from(
      { length: count },
      (_, i) =>
        guestDetails[i] || {
          name: "",
          age: "",
          id_proof_type: "",
          id_proof_number: "",
        }
    );
    setGuestDetails(updated);
  };

  const calculateNights = () =>
    checkIn && checkOut
      ? (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
      : 0;

  const handleBooking = async () => {
    if (!checkIn || !checkOut || !selectedRoom)
      return alert("Fill all details.");
    if (numberOfGuests > selectedRoom.max_guests)
      return alert(`Max allowed guests: ${selectedRoom.max_guests}`);

    const nights = calculateNights();
    const totalPrice = selectedRoom.price * nights;

    const booking = {
      customer_id: parseInt(customerId),
      hotel_id: parseInt(hotelId),
      room_id: selectedRoom.room_id,
      check_in_date: checkIn,
      check_out_date: checkOut,
      total_price: totalPrice,
      status: "Confirmed",
      number_of_guests: numberOfGuests,
      created_at: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:8080/addBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
      const data = await res.json();
      const bookingId = data.bookingId;

      if (!bookingId) throw new Error("Booking ID not returned.");

      for (const guest of guestDetails) {
        await fetch(`http://localhost:8080/booking/${bookingId}/addGuest`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(guest),
        });
      }

      alert("Booking successful!");
      navigate(`/customerdashboard/${customerId}`);
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed.");
    }
  };

  const nights = calculateNights();
  const totalPrice = selectedRoom?.price * nights;

  return (
    <div className="container my-4">
      {hotel && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-primary">{hotel.name}</h2>
          <p className="mb-1">{hotel.description}</p>
          <small className="text-muted">Location: {hotel.location}</small>
        </div>
      )}

      <div className="bg-white p-4 rounded shadow mb-4">
        <h4 className="mb-3">Booking Details</h4>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>Check-In</label>
            <input
              type="date"
              className="form-control"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Check-Out</label>
            <input
              type="date"
              className="form-control"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Guests</label>
            <input
              type="number"
              min={1}
              className="form-control"
              value={numberOfGuests}
              onChange={handleGuestCountChange}
            />
          </div>
        </div>
      </div>

      <h4 className="mb-3">Available Rooms</h4>
      <div className="row">
        {rooms.length === 0 && <p>No rooms available.</p>}
        {rooms.map((room) => (
          <div className="col-md-6 col-lg-4" key={room.room_id}>
            <div className="card mb-4 shadow-sm">
              <img
                src={room.image_url}
                className="card-img-top"
                alt={room.room_type}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{room.room_type}</h5>
                <p className="card-text">
                  <FaRupeeSign /> {room.price} per night
                </p>
                <p>
                  <FaBed /> Beds: {room.bed_count}, <FaUsers /> Max Guests:{" "}
                  {room.max_guests}
                </p>
                <p>
                  Status: <strong>{room.availability_status}</strong>
                </p>
                {room.amenities?.length > 0 && (
                  <ul className="small text-muted">
                    {room.amenities.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                )}
                <button
                  className="btn btn-primary w-100 mt-2"
                  onClick={() => {
                    setSelectedRoom(room);
                    setShowGuestDetailsModal(true);
                  }}
                >
                  Select Room
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={showGuestDetailsModal}
        onHide={() => setShowGuestDetailsModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <h5>Booking Summary</h5>
            <p>
              <strong>Room:</strong> {selectedRoom?.room_type}
            </p>
            <p>
              <strong>Dates:</strong> {checkIn} to {checkOut}
            </p>
            <p>
              <strong>Guests:</strong> {numberOfGuests}
            </p>
            <p>
              <strong>Price/Night:</strong> ₹{selectedRoom?.price}
            </p>
            <p>
              <strong>Total Nights:</strong> {nights}
            </p>
            <p>
              <strong>Total Price:</strong> ₹{totalPrice}
            </p>
          </div>
          <hr />
          <h5>Guest Information</h5>
          {guestDetails.map((guest, idx) => (
            <div key={idx} className="border rounded p-3 mb-3 bg-light">
              <strong>Guest #{idx + 1}</strong>
              <input
                type="text"
                placeholder="Name"
                value={guest.name}
                onChange={(e) =>
                  handleGuestDetailChange(idx, "name", e.target.value)
                }
                className="form-control my-1"
              />
              <input
                type="number"
                placeholder="Age"
                value={guest.age}
                onChange={(e) =>
                  handleGuestDetailChange(idx, "age", e.target.value)
                }
                className="form-control my-1"
              />
              <select
                className="form-control my-1"
                value={guest.id_proof_type}
                onChange={(e) =>
                  handleGuestDetailChange(idx, "id_proof_type", e.target.value)
                }
              >
                <option value="">Select ID Proof Type</option>
                <option value="Aadhar">Aadhar</option>
                <option value="PAN">PAN</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Others">Others</option>
              </select>
              <input
                type="text"
                placeholder="ID Number"
                value={guest.id_proof_number}
                onChange={(e) =>
                  handleGuestDetailChange(
                    idx,
                    "id_proof_number",
                    e.target.value
                  )
                }
                className="form-control my-1"
              />
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowGuestDetailsModal(false)}
          >
            Cancel
          </button>
          <button className="btn btn-success" onClick={handleBooking}>
            Confirm & Pay
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HotelPage;
