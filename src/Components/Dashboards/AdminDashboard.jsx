import React, { useState, useEffect } from "react";
import baseUrl from "../../baseUrl";
export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [bookings, setBookings] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [view, setView] = useState("dashboard");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalHotels, setTotalHotels] = useState(0);
  const [showAddOwnerModal, setShowAddOwnerModal] = useState(false);
  const [newOwner, setNewOwner] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Fetch users and hotels data when the component mounts
  useEffect(() => {
    fetchUsers();
    fetchHotels();
    fetchBookings();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${baseUrl}/getallusers`);
      const data = await response.json();
      setUsers(data);
      setTotalUsers(data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await fetch(`${baseUrl}/getAllHotels`);
      const data = await response.json();
      setHotels(data);
      setTotalHotels(data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${baseUrl}/getAllBookings`);
      const data = await response.json();
      setBookings(data);
      setTotalBookings(data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    alert("Do you Really want to delete this user?");
    try {
      const response = await fetch(`${baseUrl}/deleteuser/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      const message = await response.text(); // assuming backend returns a string
      console.log(message);

      setUsers((prev) => prev.filter((user) => user.user_id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSaveOwner = async () => {
    try {
      const response = await fetch(`${baseUrl}/addUsers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newOwner.name,
          email: newOwner.email,
          password: newOwner.password,
          role_id: 2, // Assuming 2 is for Owner
        }),
      });

      if (response.ok) {
        alert("Owner registered successfully");
        setShowAddOwnerModal(false);
        setNewOwner({ name: "", email: "", password: "" });
        fetchUsers(); // refresh the user list
      } else {
        alert("Failed to register owner");
      }
    } catch (error) {
      console.error("Error saving owner:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        <div className="col-12 col-md-3 bg-dark text-white min-vh-100 p-3">
          <h4 className="mb-4">Admin Panel</h4>
          <button
            className="btn btn-outline-light mb-2 w-100"
            onClick={() => setView("dashboard")}
          >
            Dashboard
          </button>
          <button
            className="btn btn-outline-light mb-2 w-100"
            onClick={() => {
              setView("manageUsers");
            }}
          >
            Manage Users
          </button>
          <button
            className="btn btn-outline-light mb-2 w-100"
            onClick={() => {
              setView("manageHotels");
            }}
          >
            View Hotels
          </button>
          <button
            className="btn btn-outline-light mb-2 w-100"
            onClick={() => setView("viewbookings")}
          >
            View Bookings
          </button>
        </div>

        <div className="col-12 col-md-9 p-3">
          <h2 className="mb-4">Welcome Admin</h2>

          {view === "dashboard" && (
            <div className="row text-center">
              <div className="col-md-4 mb-4">
                <div className="card shadow-sm border-1">
                  <div className="card-body">
                    <i className="bi bi-building display-6 text-primary mb-2"></i>
                    <h5 className="card-title">Total Hotels</h5>
                    <p className="fs-4 fw-bold">{totalHotels}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card shadow-sm border-1">
                  <div className="card-body">
                    <i className="bi bi-person-circle display-6 text-success mb-2"></i>
                    <h5 className="card-title">Total Users</h5>
                    <p className="fs-4 fw-bold">{totalUsers}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card shadow-sm border-1">
                  <div className="card-body">
                    <i className="bi bi-calendar-check display-6 text-success mb-2"></i>
                    <h5 className="card-title">Total Bookings</h5>
                    <p className="fs-4 fw-bold">{totalBookings}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Management Section */}
          {view === "manageUsers" && (
            <div className="container">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <input
                  type="search"
                  className="form-control w-75 shadow-sm rounded"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button
                  className="btn btn-success"
                  onClick={() => setShowAddOwnerModal(true)}
                >
                  <i className="bi bi-plus-lg"></i> Add Owner
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-striped border">
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={index}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            {user.role_id === 1
                              ? "Customer"
                              : user.role_id === 2
                              ? "Owner"
                              : "Admin"}
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteUser(user.user_id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          <h5>No Users Found</h5>
                        </td>
                      </tr>
                    )} */}
                    {users.length > 0 ? (
                      users
                        .filter((user) =>
                          user.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                        .map((user, index) => (
                          <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              {user.role_id === 1
                                ? "Customer"
                                : user.role_id === 2
                                ? "Owner"
                                : "Admin"}
                            </td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteUser(user.user_id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          <h5>No Users Found</h5>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Hotel Management Section */}
          {view == "manageHotels" && (
            <div className="table-responsive">
              <table className="table table-striped border">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels.length > 0 ? (
                    hotels.map((hotel, index) => (
                      <tr key={index}>
                        <td>{hotel.name}</td>
                        <td>{hotel.location}</td>
                        <td>{hotel.category}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        <h5>No Hotels Found</h5>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {view === "viewbookings" && (
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
                          <td>{b.hotelName}</td>
                          <td>{b.roomType}</td>
                          <td>{b.customerName}</td>
                          <td>
                            {new Date(b.check_in_date).toLocaleDateString()}
                          </td>
                          <td>
                            {new Date(b.check_out_date).toLocaleDateString()}
                          </td>
                          <td>₹{b.total_price}</td>
                          <td>{b.status}</td>
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
        </div>
      </div>

      {/* Modal for Add Owner */}
      {showAddOwnerModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal d-block fade show" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title w-100 text-center m-0">
                    Register New Owner
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddOwnerModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={newOwner.name}
                      onChange={(e) =>
                        setNewOwner({ ...newOwner, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={newOwner.email}
                      onChange={(e) =>
                        setNewOwner({ ...newOwner, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={newOwner.password}
                      onChange={(e) =>
                        setNewOwner({ ...newOwner, password: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddOwnerModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveOwner}
                  >
                    Save Owner
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
