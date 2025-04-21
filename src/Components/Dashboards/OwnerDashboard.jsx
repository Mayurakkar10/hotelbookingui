import React, { useState } from "react";
export default function OwnerDashboard() {
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [isUserManage, setIsUserManage] = useState(false);
  const [isManageHotel, setIsHotelManage] = useState(false);
  const [showAddHotel, setShowAddHotel] = useState(false);
  const handleUsers = async () => {
    setIsUserManage(true);
    setIsHotelManage(false);
    try {
      const response = await fetch("http://localhost:8080/getallusers");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleHotels = async () => {
    setIsHotelManage(true);
    setIsUserManage(false);
    try {
      const response = await fetch("http://localhost:8080/getAllHotels");
      const data = await response.json();
      setHotels(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddHotel = () => {
    setShowAddHotel(true);
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-12 col-md-3 bg-dark text-white min-vh-100 p-3">
          <h4 className="mb-4">Owner Panel</h4>
          <button
            className="btn btn-outline-light mb-2 w-100"
            onClick={handleHotels}
          >
            Manage Hotels
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

        {/* Main Panel */}
        <div className="col-12 col-md-9 p-3">
          <h2 className="mb-4">Welcome Owner</h2>

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
                <div className="col-12 col-md-4 text-md-end">
                  <button
                    className="btn btn-success px-4 py-2 shadow"
                    onClick={handleAddHotel}
                  >
                    Add Hotel
                  </button>
                </div>
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

          {showAddHotel && (
            <>
              <div
                className="modal-backdrop fade show"
                style={{
                  zIndex: 1040,
                }}
              ></div>

              <div
                className="modal d-block fade show"
                tabIndex="-1"
                style={{
                  zIndex: 1050,
                }}
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add Hotel</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowAddHotel(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="mb-3">
                          <label className="form-label">Hotel Name</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Location</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Category</label>
                          <input type="text" className="form-control" />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowAddHotel(false)}
                      >
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Save Hotel
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
