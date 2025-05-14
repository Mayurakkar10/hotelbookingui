import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { FaBed, FaUsers, FaRupeeSign, FaMapMarkerAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import baseUrl from "../../baseUrl";
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
    { name: "", age: "", id_proof_type: "", id_proof_number: "" },
  ]);
  const [customerId, setCustomerId] = useState(null);
  const [showGuestDetailsModal, setShowGuestDetailsModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [isBooking, setIsBooking] = useState(false); // Loading state for booking

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId || userId === "0") {
      const timer = setTimeout(() => {
        Swal.fire({
          title: "Please log in",
          text: "To continue booking your stay, please log in.",
          icon: "warning",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
        navigate("/userlogin");
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setCustomerId(userId);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchHotelAndRooms = async () => {
      try {
        const [hotelRes, roomsRes] = await Promise.all([
          fetch(`${baseUrl}/hotel/${hotelId}`),
          fetch(`${baseUrl}/hotel/${hotelId}/rooms`),
        ]);
        setHotel(await hotelRes.json());
        const roomsData = await roomsRes.json();
        const processedRooms = (
          Array.isArray(roomsData) ? roomsData : roomsData.rooms || []
        ).map((room) => {
          const discount = Math.floor(Math.random() * 16) + 10;
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
      return Swal.fire({
        title: "Missing Details",
        text: "Please fill all details.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    if (numberOfGuests > selectedRoom.max_guests)
      return Swal.fire({
        title: "Guests Exceed Limit",
        text: `Max allowed guests: ${selectedRoom.max_guests}`,
        icon: "error",
        confirmButtonText: "OK",
      });

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

    if (
      guestDetails.some(
        (g) => !g.name || !g.age || !g.id_proof_type || !g.id_proof_number
      )
    ) {
      return Swal.fire({
        title: "Missing Details",
        text: "Please fill all guest details.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }

    setIsBooking(true); // Start loading

    try {
      const res = await fetch(`${baseUrl}/addBooking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
      const data = await res.json();
      const bookingId = data.bookingId;

      if (!bookingId) throw new Error("Booking ID not returned.");

      for (const guest of guestDetails) {
        await fetch(`${baseUrl}/booking/${bookingId}/addGuest`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(guest),
        });
      }

      setShowGuestDetailsModal(false);
      setShowThankYouModal(true);
      console.log(data);
    } catch (err) {
      console.error("Booking failed:", err);
      Swal.fire({
        title: "Booking Failed",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsBooking(false); // Stop loading
    }
  };

  const nights = calculateNights();
  const totalPrice = selectedRoom?.discountedPrice * nights;
  console.log(selectedRoom);
  return (
    <div className="container my-5">
      {/* Hotel Hero */}
      {hotel?.image_url && (
        <div
          className="rounded-4 overflow-hidden shadow-lg position-relative mb-5"
          style={{
            height: "450px",
            background: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9)), url(${hotel.image_url}) center/cover no-repeat`,
          }}
        >
          <div className="position-absolute bottom-0 start-0 p-5 text-white w-100">
            <h1 className="fw-bold display-4">{hotel.name}</h1>
            <p className="fs-5 text-light">
              <FaMapMarkerAlt className="me-2" />
              {hotel.location}
            </p>
          </div>
        </div>
      )}

      {/* Booking Form */}
      <div className="row mb-5">
        <div className="col-lg-8 mb-4">
          <div className="bg-light-subtle p-5 rounded-4 shadow-lg border border-1 border-light">
            <h4 className="text-primary fw-bold mb-3">About the Hotel</h4>
            <p className="text-muted fs-5 mb-0">
              {hotel?.description?.trim()
                ? hotel.description
                : "Welcome to your perfect getaway! Our hotel offers a blend of comfort, convenience, and modern amenities to ensure a memorable stay. Whether you're traveling for business or leisure, you'll enjoy spacious rooms, exceptional service, and a prime location near top attractions. Relax, unwind, and make yourself at home."}
            </p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="p-4 rounded-4 shadow-lg bg-white border border-light-subtle">
            <h4 className="text-primary mb-4">Booking Details</h4>
            <div className="row g-3">
              <div className="col-md-12">
                <label className="form-label fw-semibold text-secondary">
                  Check-In
                </label>
                <input
                  type="date"
                  className="form-control border-2"
                  value={checkIn}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label fw-semibold text-secondary">
                  Check-Out
                </label>
                <input
                  type="date"
                  className="form-control border-2"
                  value={checkOut}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label fw-semibold text-secondary">
                  Guests
                </label>
                <input
                  type="number"
                  min={1}
                  className="form-control border-2"
                  value={numberOfGuests}
                  onChange={handleGuestCountChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms */}
      <h3 className="text-primary fw-bold mb-4">Available Rooms</h3>
      <div className="row">
        {rooms.length === 0 && <p>No rooms available.</p>}
        {rooms.map((room) => (
          <div className="col-md-6 col-lg-4 mb-4" key={room.room_id}>
            <div className="card border-0 shadow rounded-4 h-100">
              <img
                src={room.image_url}
                alt={room.room_type}
                className="card-img-top rounded-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">{room.room_type}</h5>
                  <span
                    className={`badge rounded-pill ${
                      room.availability_status === "Available"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {room.availability_status}
                  </span>
                </div>
                <p className="mb-2 text-success fw-bold fs-5">
                  ₹{room.discountedPrice}{" "}
                  <span className="text-muted text-decoration-line-through small ms-2">
                    ₹{room.price}
                  </span>
                  <span className="badge bg-warning text-dark ms-2">
                    {room.discount}% Off
                  </span>
                </p>
                <p className="text-muted small mb-2">
                  <FaBed /> {room.bed_count} Beds | <FaUsers /> Max{" "}
                  {room.max_guests}
                </p>
                <div className="d-flex flex-wrap gap-1 mb-3">
                  {room.amenities?.map((a, i) => (
                    <span
                      key={i}
                      className="badge bg-secondary-subtle border text-dark"
                    >
                      {a}
                    </span>
                  ))}
                </div>
                {room.availability_status === "Booked" ? (
                  <div className="alert alert-danger text-center mt-auto mb-0 rounded-pill fw-semibold">
                    This room is already booked
                  </div>
                ) : (
                  <button
                    className="btn btn-outline-primary mt-auto"
                    onClick={() => {
                      setSelectedRoom(room);
                      setShowGuestDetailsModal(true);
                    }}
                  >
                    Select Room
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Guest Details Modal */}
      <Modal
        show={showGuestDetailsModal}
        onHide={() => setShowGuestDetailsModal(false)}
        size="lg"
        backdrop={isBooking ? "static" : true}
        keyboard={!isBooking}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Enter Guest Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Summary</h3>

          <div className="mb-4">
            <p>Room Type: {selectedRoom?.room_type}</p>
            <p>Guest:{numberOfGuests}</p>
            <p>Check-In:{checkIn}</p>
            <p>Check-Out:{checkOut}</p>
            <p>Total Price:{totalPrice}</p>
            <p></p>
            <hr />
          </div>
          <form>
            {guestDetails.map((guest, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-4">
                  <label className="form-label">Guest {index + 1} Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={guest.name}
                    onChange={(e) =>
                      handleGuestDetailChange(index, "name", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    value={guest.age}
                    onChange={(e) =>
                      handleGuestDetailChange(index, "age", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">ID Proof</label>
                  <select
                    className="form-select"
                    value={guest.id_proof_type}
                    onChange={(e) =>
                      handleGuestDetailChange(
                        index,
                        "id_proof_type",
                        e.target.value
                      )
                    }
                    required
                  >
                    <option value="">Select ID Proof</option>
                    <option value="Aadhar">Aadhar</option>
                    <option value="Passport">Passport</option>
                    <option value="Driving License">Driving License</option>
                  </select>
                </div>
                <div className="col-md-4 mt-2">
                  <label className="form-label">ID Proof Number</label>
                  <input
                    type="text"
                    className={`form-control ${
                      guest.id_proof_type === "Aadhar" &&
                      !/^\d{12}$/.test(guest.id_proof_number) &&
                      guest.id_proof_number
                        ? "is-invalid"
                        : ""
                    }`}
                    value={guest.id_proof_number}
                    onChange={(e) =>
                      handleGuestDetailChange(
                        index,
                        "id_proof_number",
                        e.target.value
                      )
                    }
                    maxLength={12}
                    placeholder={
                      guest.id_proof_type === "Aadhar"
                        ? "Enter 12-digit Aadhar number"
                        : guest.id_proof_type === "PAN"
                        ? "Enter PAN (e.g., ABCDE1234F)"
                        : guest.id_proof_type === "Voter ID"
                        ? "Enter Voter ID"
                        : "Enter ID number"
                    }
                    required
                  />
                  {guest.id_proof_type === "Aadhar" &&
                    guest.id_proof_number &&
                    !/^\d{12}$/.test(guest.id_proof_number) && (
                      <div className="invalid-feedback">
                        Aadhar number must be exactly 12 digits.
                      </div>
                    )}
                </div>
              </div>
            ))}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-outline-danger"
            onClick={() => setShowGuestDetailsModal(false)}
            disabled={isBooking}
          >
            Cancel
          </button>
          <button
            className="btn btn-success"
            onClick={handleBooking}
            disabled={isBooking}
          >
            {isBooking ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Booking...
              </>
            ) : (
              "Confirm & Pay"
            )}
          </button>
        </Modal.Footer>
      </Modal>

      {/* Thank You Modal */}
      <Modal
        show={showThankYouModal}
        onHide={() => setShowThankYouModal(false)}
        backdrop="static"
        keyboard={false}
        centered // <-- This centers the modal vertically
      >
        <Modal.Header className="border-0 justify-content-center">
          <Modal.Title className="fw-bold text-center w-100 fs-3 text-success">
            🎉 Thank You!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p className="fs-5">
            Your booking is <strong>confirmed</strong>!<br />
            We have sent the details to your registered email.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
            alt="Success"
            style={{ width: "100px", margin: "20px auto" }}
          />
        </Modal.Body>
        <Modal.Footer className="justify-content-center border-0">
          <button
            className="btn btn-primary px-4 py-2 fs-5"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HotelBookingPage;
