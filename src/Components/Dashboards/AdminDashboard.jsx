import React, { useState } from "react";
export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [isUserManage, setIsUserManage] = useState(false);
  const [isManageHotel, setIsManageHotel] = useState(false);
  const handleUsers = async () => {
    setIsManageHotel(false);
    setIsUserManage(true);
    try {
      const response = await fetch("http://localhost:8080/getallusers");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleHotels = async () => {
    setIsUserManage(false);
    setIsManageHotel(true);
    try {
      const response = await fetch("http://localhost:8080/getAllHotels");
      const data = await response.json();
      setHotels(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-12 col-md-3 bg-dark text-white min-vh-100 p-3">
          <h4 className="mb-4">Admin Panel</h4>
          <button
            className="btn btn-outline-light mb-2 w-100"
            onClick={handleUsers}
          >
            Manage Users
          </button>
          <button
            className="btn btn-outline-light mb-2 w-100"
            onClick={handleHotels}
          >
            View Hotels
          </button>
          <button className="btn btn-outline-light mb-2 w-100">
            Manage Bookings
          </button>
          <button className="btn btn-outline-light mb-2 w-100">
            View Payments
          </button>
          <button className="btn btn-outline-light mb-2 w-100">
            Reviews and Ratings
          </button>
        </div>

        <div className="col-12 col-md-9 p-3">
          <h2 className="mb-4">Welcome Admin</h2>

          {isUserManage && (
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
                  {users.length > 0 ? (
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
                          <button className="btn btn-success btn-sm me-2">
                            Edit
                          </button>
                          <button className="btn btn-danger btn-sm">
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
          )}

          {isManageHotel && (
            <>
              <div className="row align-items-center mb-3">
                <div className="col-12 col-md-8 mb-2 mb-md-0">
                  <input
                    type="search"
                    className="form-control shadow-sm rounded-3"
                    placeholder="Search hotels by name, location..."
                  />
                </div>
                <div className="col-12 col-md-4 text-md-end"></div>
              </div>

              <div className="table-responsive">
                <table className="table table-striped border">
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotels.length > 0 ? (
                      hotels.map((hotel, index) => (
                        <tr key={index}>
                          <td>{hotel.name}</td>
                          <td>{hotel.location}</td>
                          <td>{hotel.category}</td>
                          <td>
                            <button className="btn btn-success btn-sm me-2">
                              Edit
                            </button>
                            <button className="btn btn-danger btn-sm">
                              Delete
                            </button>
                          </td>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
