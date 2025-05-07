// import React, { useEffect, useState } from "react";

// export default function CustomerDashboard() {
//   const [bookings, setBookings] = useState([]);
//   const [activeReviewId, setActiveReviewId] = useState(null);
//   const [reviewText, setReviewText] = useState("");
//   const [reviewRating, setReviewRating] = useState(5);

//   const customer_id = localStorage.getItem("userId");

//   useEffect(() => {
//     const fetchBookings = async () => {
//       const response = await fetch(
//         `http://localhost:8080/bookings/customer/${customer_id}`
//       );
//       const data = await response.json();
//       setBookings(data);
//     };

//     fetchBookings();
//   }, []);

//   const handleReviewSubmit = async (bookingId) => {
//     const response = await fetch(`http://localhost:8080/${bookingId}/review`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         review_rating: reviewRating,
//         review_text: reviewText,
//       }),
//     });

//     if (response.ok) {
//       const updated = await response.json();
//       setBookings((prev) =>
//         prev.map((b) => (b.booking_id === updated.booking_id ? updated : b))
//       );
//       setActiveReviewId(null);
//       setReviewText("");
//       setReviewRating(5);
//     } else {
//       alert("Failed to submit review.");
//     }
//   };

//   return (
//     <div className="container mt-4" style={{ minHeight: "80vh" }}>
//       <div className="row">
//         <div className="col-12">
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h1 className="text-primary">Welcome to Your Dashboard</h1>
//           </div>

//           {/* Bookings Section */}
//           <div className="mt-4">
//             <h3>Your Bookings</h3>
//             {bookings.length === 0 ? (
//               <p className="text-muted">You have no bookings at the moment.</p>
//             ) : (
//               <div className="table-responsive">
//                 <table className="table table-striped">
//                   <thead>
//                     <tr>
//                       <th>Hotel Name</th>
//                       <th>Room Type</th>
//                       <th>Check-in Date</th>
//                       <th>Check-out Date</th>
//                       <th>Total Price</th>
//                       <th>Status</th>
//                       <th>Review</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {bookings.map((booking) => (
//                       <tr key={booking.booking_id}>
//                         <td>{booking.hotel_name}</td>
//                         <td>{booking.room_type}</td>
//                         <td>
//                           {new Date(booking.check_in_date).toLocaleDateString()}
//                         </td>
//                         <td>
//                           {new Date(
//                             booking.check_out_date
//                           ).toLocaleDateString()}
//                         </td>
//                         <td>{booking.total_price}</td>
//                         <td>
//                           <span
//                             className={`badge ${
//                               booking.status === "Confirmed"
//                                 ? "bg-success"
//                                 : "bg-warning"
//                             }`}
//                           >
//                             {booking.status}
//                           </span>
//                         </td>
//                         <td>
//                           {booking.review_text ? (
//                             <>
//                               <strong>Rating:</strong> {booking.review_rating}
//                               <br />
//                               <p>{booking.review_text}</p>
//                             </>
//                           ) : activeReviewId === booking.booking_id ? (
//                             <div>
//                               <select
//                                 className="form-select mb-2"
//                                 value={reviewRating}
//                                 onChange={(e) =>
//                                   setReviewRating(Number(e.target.value))
//                                 }
//                               >
//                                 {[5, 4, 3, 2, 1].map((r) => (
//                                   <option key={r} value={r}>
//                                     {r} Star{r > 1 && "s"}
//                                   </option>
//                                 ))}
//                               </select>
//                               <textarea
//                                 className="form-control mb-2"
//                                 value={reviewText}
//                                 onChange={(e) => setReviewText(e.target.value)}
//                                 placeholder="Write your review..."
//                               />
//                               <button
//                                 className="btn btn-sm btn-primary me-2"
//                                 onClick={() =>
//                                   handleReviewSubmit(booking.booking_id)
//                                 }
//                               >
//                                 Submit
//                               </button>
//                               <button
//                                 className="btn btn-sm btn-secondary"
//                                 onClick={() => setActiveReviewId(null)}
//                               >
//                                 Cancel
//                               </button>
//                             </div>
//                           ) : (
//                             <button
//                               className="btn btn-link"
//                               onClick={() =>
//                                 setActiveReviewId(booking.booking_id)
//                               }
//                             >
//                               Add Review
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";

export default function CustomerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [activeReviewId, setActiveReviewId] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const customer_id = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch(
        `http://localhost:8080/bookings/customer/${customer_id}`
      );
      const data = await response.json();
      setBookings(data);
    };

    fetchBookings();
  }, [customer_id]);

  const handleReviewSubmit = async (bookingId) => {
    const response = await fetch(`http://localhost:8080/${bookingId}/review`, {
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
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Hotel</th>
                  <th>Room Type</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Price ($)</th>
                  <th>Status</th>
                  <th>Review</th>
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
