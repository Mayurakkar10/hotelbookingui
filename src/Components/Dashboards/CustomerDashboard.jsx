import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import baseUrl from "../../baseUrl";
export default function CustomerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [activeReviewId, setActiveReviewId] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const customer_id = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch(
        `${baseUrl}/bookings/customer/${customer_id}`
      );
      const data = await response.json();
      setBookings(data);
    };

    fetchBookings();
  }, [customer_id]);

  const handleReviewSubmit = async (bookingId) => {
    const response = await fetch(`${baseUrl}/${bookingId}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        review_rating: reviewRating,
        review_text: reviewText,
      }),
    });

    if (response.ok) {
      const updated = await response.json();
      setBookings((prev) =>
        prev.map((b) => (b.booking_id === updated.booking_id ? updated : b))
      );
      setActiveReviewId(null);
      setReviewText("");
      setReviewRating(5);
    } else {
      alert("Failed to submit review.");
    }
  };

  const handleCheckOut = async (bookingId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to check out this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, check out",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;
    try {
      const res = await fetch(`${baseUrl}/checkout/${bookingId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_status: "Checkedout" }),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Checked out successfully",
        });
        const updatedBookings = await fetch(
          `${baseUrl}/bookings/owner/${customer_id}`
        );
        const bookingsData = await updatedBookings.json();
        setBookings(bookingsData);
      } else {
        throw new Error("Failed to check out");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to check out. Please try again.",
      });
    }
  };
  const statusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-success";
      case "cancelled":
        return "bg-danger";
      case "pending":
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container mt-4" style={{ minHeight: "80vh" }}>
      {/* Welcome & Profile Section */}
      <div className="mb-4">
        <h2 className="text-primary">Welcome to Your Dashboard</h2>
        <p className="text-muted">
          Here’s a summary of your bookings and reviews.
        </p>
      </div>

      {/* Bookings Section */}
      <div className="mt-4">
        <h4>Your Bookings</h4>
        {bookings.length === 0 ? (
          <p className="text-muted">You have no bookings at the moment.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>Hotel</th>
                  <th>Room Type</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Review</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.booking_id}>
                    <td>{booking.hotel_name}</td>
                    <td>{booking.room_type}</td>
                    <td>
                      {new Date(booking.check_in_date).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(booking.check_out_date).toLocaleDateString()}
                    </td>
                    <td>{booking.total_price}</td>
                    <td>
                      <span
                        className={`badge ${statusBadgeClass(booking.status)}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      {booking.review_text ? (
                        <>
                          <strong>{booking.review_rating}★</strong>
                          <p className="mb-0">{booking.review_text}</p>
                        </>
                      ) : activeReviewId === booking.booking_id ? (
                        <div>
                          <select
                            className="form-select form-select-sm mb-2"
                            value={reviewRating}
                            onChange={(e) =>
                              setReviewRating(Number(e.target.value))
                            }
                          >
                            {[5, 4, 3, 2, 1].map((r) => (
                              <option key={r} value={r}>
                                {r} Star{r > 1 ? "s" : ""}
                              </option>
                            ))}
                          </select>
                          <textarea
                            className="form-control form-control-sm mb-2"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review..."
                          />
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() =>
                              handleReviewSubmit(booking.booking_id)
                            }
                          >
                            Submit
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => setActiveReviewId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setActiveReviewId(booking.booking_id)}
                        >
                          Add Review
                        </button>
                      )}
                    </td>
                    <td>
                      {booking.status === "Checkedout" ? (
                        <button disabled className="btn btn-secondary">
                          Checked Out
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger"
                          onClick={() => handleCheckOut(booking.booking_id)}
                        >
                          CheckOut
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
