import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { FaBed, FaUsers, FaRupeeSign, FaMapMarkerAlt } from "react-icons/fa";

const HotelBookingPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [guestDetails, setGuestDetails] = useState([
    {
      name: "",
      age: "",
      id_proof_type: "",
      id_proof_number: "",
      gender: "",
    },
  ]);
  const [customerId, setCustomerId] = useState(null);
  const [showGuestDetailsModal, setShowGuestDetailsModal] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId || userId === "0") {
      const timer = setTimeout(() => {
        alert("Please log in to continue booking your stay. Redirecting...");
        navigate("/userlogin");
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setCustomerId(userId);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchHotelAndRooms = async () => {
      try {
        const [hotelRes, roomsRes] = await Promise.all([
          fetch(`http://localhost:8080/hotel/${hotelId}`),
          fetch(`http://localhost:8080/hotel/${hotelId}/rooms`),
        ]);
        setHotel(await hotelRes.json());
        const roomsData = await roomsRes.json();
        const processedRooms = (
          Array.isArray(roomsData) ? roomsData : roomsData.rooms || []
        ).map((room) => {
          const discount = Math.floor(Math.random() * 21) + 10;
          const discountedPrice = Math.floor(room.price * (1 - discount / 100));
          return { ...room, discount, discountedPrice };
        });
        setRooms(processedRooms);
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
          gender: "",
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
    const totalPrice = selectedRoom.discountedPrice * nights;

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
  const totalPrice = selectedRoom?.discountedPrice * nights;

  return (
    <div className="container my-4">
      {hotel?.image_url && (
        <div
          className="mb-4 rounded-4 overflow-hidden shadow"
          style={{
            position: "relative",
            height: "350px",
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${hotel.image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
          }}
        >
          <div
            className="p-4"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
            }}
          >
            <h2 className="fw-bold">{hotel.name}</h2>
            <p className="mb-0">
              <FaMapMarkerAlt className="me-2" />
              {hotel.location}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded shadow mb-4 border">
        <h4 className="mb-3 text-primary">Booking Details</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Check-In Date</label>
            <input
              type="date"
              className="form-control"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Check-Out Date</label>
            <input
              type="date"
              className="form-control"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Number of Guests</label>
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

      <h4 className="mb-3 text-primary">Available Rooms</h4>
      <div className="row">
        {rooms.length === 0 && <p>No rooms available.</p>}
        {rooms.map((room) => (
          <div className="col-md-6 col-lg-4" key={room.room_id}>
            <div className="card h-100 border-0 shadow-sm rounded-4 mb-4 d-flex flex-column">
              <img
                src={room.image_url}
                className="card-img-top rounded-top"
                alt={room.room_type}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">{room.room_type}</h5>
                  <span
                    className={`badge ${
                      room.availability_status === "Available"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {room.availability_status}
                  </span>
                </div>
                <p className="mb-1 text-success">
                  <FaRupeeSign /> {room.discountedPrice} / night
                  <span className="text-muted text-decoration-line-through ms-2 small">
                    ₹{room.price}
                  </span>
                  <span className="badge bg-warning text-dark ms-2">
                    {room.discount}%
                  </span>
                </p>
                <p className="text-muted small mb-2">
                  <FaBed /> Beds: {room.bed_count} | <FaUsers /> Max:{" "}
                  {room.max_guests}
                </p>

                <ul className="list-unstyled small mt-2">
                  {room.amenities?.map((a, i) => (
                    <li key={i}>• {a}</li>
                  ))}
                </ul>
                <button
                  className="btn btn-outline-primary w-100 mt-auto"
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
          <div className="mb-4">
            <h5 className="text-primary">Booking Summary</h5>
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Room:</strong> {selectedRoom?.room_type}
                </p>
                <p>
                  <strong>Guests:</strong> {numberOfGuests}
                </p>
                <p>
                  <strong>Dates:</strong> {checkIn} to {checkOut}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Price/Night:</strong> ₹{selectedRoom?.discountedPrice}
                  <span className="text-muted text-decoration-line-through ms-2 small">
                    ₹{selectedRoom?.price}
                  </span>{" "}
                  ({selectedRoom?.discount}% off)
                </p>
                <p>
                  <strong>Total Nights:</strong> {nights}
                </p>
                <p>
                  <strong>Total Price:</strong> ₹{totalPrice}
                </p>
              </div>
            </div>
          </div>
          <hr />
          <h5 className="text-primary mb-3">Guest Information</h5>
          {guestDetails.map((guest, idx) => (
            <div key={idx} className="border rounded p-3 mb-3 bg-light">
              <h6>Guest #{idx + 1}</h6>
              <input
                type="text"
                placeholder="Full Name"
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
                value={guest.gender}
                onChange={(e) =>
                  handleGuestDetailChange(idx, "gender", e.target.value)
                }
              >
                <option value="">Select Gender</option>
                <option value="0">Male</option>
                <option value="1">Female</option>
                <option value="2">Other</option>
              </select>
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
                placeholder="ID Proof Number"
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

export default HotelBookingPage;
