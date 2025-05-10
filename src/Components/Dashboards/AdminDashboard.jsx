// import React, { useState } from "react";

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [allUsers, setAllUsers] = useState([]); // Store original users
//   const [hotels, setHotels] = useState([]);
//   const [isUserManage, setIsUserManage] = useState(false);
//   const [isManageHotel, setIsManageHotel] = useState(false);
//   const [showAddOwnerModal, setShowAddOwnerModal] = useState(false);
//   const [newOwner, setNewOwner] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleUsers = async () => {
//     setIsManageHotel(false);
//     setIsUserManage(true);
//     try {
//       const response = await fetch("http://localhost:8080/getallusers");
//       const data = await response.json();
//       setUsers(data);
//       setAllUsers(data); // Keep unfiltered copy
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleHotels = async () => {
//     setIsUserManage(false);
//     setIsManageHotel(true);
//     try {
//       const response = await fetch("http://localhost:8080/getAllHotels");
//       const data = await response.json();
//       setHotels(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleOwnerInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewOwner((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSaveOwner = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/addUsers", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newOwner, role_id: 2 }),
//       });

//       const message = await response.text();
//       alert(message);
//       setShowAddOwnerModal(false);
//       setNewOwner({ name: "", email: "", password: "" });
//       handleUsers(); // Refresh list
//     } catch (error) {
//       console.error("Failed to add owner:", error);
//       alert("Error adding owner.");
//     }
//   };

//   return (
//     <div className="container-fluid px-0">
//       <div className="row g-0">
//         {/* Sidebar */}
//         <div className="col-12 col-md-3 bg-dark text-white min-vh-100 p-3">
//           <h4 className="mb-4">Admin Panel</h4>
//           <button
//             className="btn btn-outline-light mb-2 w-100"
//             onClick={handleUsers}
//           >
//             Manage Users
//           </button>
//           <button
//             className="btn btn-outline-light mb-2 w-100"
//             onClick={handleHotels}
//           >
//             View Hotels
//           </button>
//           {/* <button className="btn btn-outline-light mb-2 w-100">
//             Manage Bookings
//           </button>
//           <button className="btn btn-outline-light mb-2 w-100">
//             View Payments
//           </button>
//           <button className="btn btn-outline-light mb-2 w-100">
//             Reviews and Ratings
//           </button> */}
//         </div>

//         <div className="col-12 col-md-9 p-3">
//           <h2 className="mb-4">Welcome Admin</h2>

//           {/* User Management Section */}
//           {isUserManage && (
//             <div className="container">
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <input
//                   type="search"
//                   className="form-control w-75 shadow-sm rounded"
//                   placeholder="Search users..."
//                   onChange={(e) => {
//                     const q = e.target.value.toLowerCase();
//                     const filtered = allUsers.filter((u) =>
//                       u.name.toLowerCase().includes(q)
//                     );
//                     setUsers(filtered);
//                   }}
//                 />
//                 <button
//                   className="btn btn-success"
//                   onClick={() => setShowAddOwnerModal(true)}
//                 >
//                   <i className="bi bi-plus-lg"></i> Add Owner
//                 </button>
//               </div>

//               <div className="table-responsive">
//                 <table className="table table-striped border">
//                   <thead className="table-dark">
//                     <tr>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Role</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {users.length > 0 ? (
//                       users.map((user, index) => (
//                         <tr key={index}>
//                           <td>{user.name}</td>
//                           <td>{user.email}</td>
//                           <td>
//                             {user.role_id === 1
//                               ? "Customer"
//                               : user.role_id === 2
//                               ? "Owner"
//                               : "Admin"}
//                           </td>
//                           <td>
//                             <button className="btn btn-danger btn-sm">
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="text-center">
//                           <h5>No Users Found</h5>
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* Hotel Management Section */}
//           {isManageHotel && (
//             <>
//               <div className="row align-items-center mb-3">
//                 <div className="col-12 col-md-8 mb-2 mb-md-0">
//                   <input
//                     type="search"
//                     className="form-control shadow-sm rounded-3"
//                     placeholder="Search hotels by name, location..."
//                   />
//                 </div>
//                 <div className="col-12 col-md-4 text-md-end"></div>
//               </div>

//               <div className="table-responsive">
//                 <table className="table table-striped border">
//                   <thead className="table-dark">
//                     <tr>
//                       <th>Name</th>
//                       <th>Location</th>
//                       <th>Category</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {hotels.length > 0 ? (
//                       hotels.map((hotel, index) => (
//                         <tr key={index}>
//                           <td>{hotel.name}</td>
//                           <td>{hotel.location}</td>
//                           <td>{hotel.category}</td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="text-center">
//                           <h5>No Hotels Found</h5>
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Modal for Add Owner */}
//       {showAddOwnerModal && (
//         <>
//           <div
//             className="modal-backdrop fade show"
//             style={{ zIndex: 1040 }}
//           ></div>
//           <div
//             className="modal d-block fade show"
//             tabIndex="-1"
//             style={{ zIndex: 1050 }}
//           >
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title w-100 text-center m-0">
//                     Register New Owner
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => setShowAddOwnerModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <label className="form-label">Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="name"
//                       value={newOwner.name}
//                       onChange={handleOwnerInputChange}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       name="email"
//                       value={newOwner.email}
//                       onChange={handleOwnerInputChange}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Password</label>
//                     <input
//                       type="password"
//                       className="form-control"
//                       name="password"
//                       value={newOwner.password}
//                       onChange={handleOwnerInputChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setShowAddOwnerModal(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={handleSaveOwner}
//                   >
//                     Save Owner
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [isUserManage, setIsUserManage] = useState(false);
  const [isManageHotel, setIsManageHotel] = useState(false);
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
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/getallusers");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await fetch("http://localhost:8080/getAllHotels");
      const data = await response.json();
      setHotels(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Chart data
  const chartData = {
    labels: ["Users", "Hotels"], // X-Axis Labels
    datasets: [
      {
        label: "Count", // Y-Axis Label
        data: [users.length, hotels.length], // Data points for Users and Hotels
        backgroundColor: ["#4e73df", "#1cc88a"], // Bar colors
        borderColor: ["#4e73df", "#1cc88a"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Dashboard Overview", // Title for the chart
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start Y-axis from 0
      },
    },
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-12 col-md-3 bg-dark text-white min-vh-100 p-3">
          <h4 className="mb-4">Admin Panel</h4>
          <button
            className="btn btn-outline-light mb-2 w-100"
            onClick={() => {
              setIsUserManage(true);
              setIsManageHotel(false);
            }}
          >
            Manage Users
          </button>
          <button
            className="btn btn-outline-light mb-2 w-100"
            onClick={() => {
              setIsManageHotel(true);
              setIsUserManage(false);
            }}
          >
            View Hotels
          </button>
        </div>

        <div className="col-12 col-md-9 p-3">
          <h2 className="mb-4">Welcome Admin</h2>

          {/* Bar Chart - Displayed First */}
          {!isUserManage && !isManageHotel && (
            <div className="mb-4">
              <h3>Dashboard Overview</h3>
              <Bar data={chartData} options={chartOptions} />
            </div>
          )}

          {/* User Management Section */}
          {isUserManage && (
            <div className="container">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <input
                  type="search"
                  className="form-control w-75 shadow-sm rounded"
                  placeholder="Search users..."
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
            </div>
          )}

          {/* Hotel Management Section */}
          {isManageHotel && (
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
