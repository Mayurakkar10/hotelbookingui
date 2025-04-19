import React, { useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import HotelPage from "../Pages/HotelPage";
import { Routes, Route } from "react-router-dom";
import HomeComponent from "../HomeComponent";
export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [isUserManage, setIsUserManage] = useState(false);
  const [isManageHotel, setIsHotelManage] = useState(false);
  const navigate = useNavigate();
  const handleUsers = async () => {
    setIsUserManage(true);
    const fetchusers = async () => {
      try {
        const response = await fetch("http://localhost:8080/getallusers");
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchusers();
  };

  const handleHotels = async () => {
    setIsHotelManage(true);
    const fetchusers = async () => {
      try {
        const response = await fetch("http://localhost:8080/getAllHotels");
        const data = await response.json();
        console.log(data);
        setHotels(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchusers();
  };
  return (
    <div
      className="row"
      style={{
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <div
        className="col-3"
        style={{
          minHeight: "100vh",
          backgroundColor: "gray",
        }}
      >
        <div className="d-flex flex-column m-2 adminpanel">
          <button className="btn text-white" onClick={() => handleUsers()}>
            Manage Users
          </button>
          <button className="btn text-white" onClick={() => handleHotels()}>
            Manage Hotels
          </button>
          <button className="btn text-white">Manage Bookings</button>
          <button className="btn text-white">View Payments</button>
          <button className="btn text-white">Reviews and Ratings</button>
        </div>
      </div>
      <div className="col-9">
        <div
          className="d-flex flex-column "
          style={{ justifyContent: "space-between" }}
        >
          <h1 className="p-2">Welcome Admin</h1>
          {isUserManage ? (
            <div className="container usertable">
              <table className="table table-striped border">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.role_id === 1
                            ? "Customer"
                            : user.role_id == 2
                            ? "Owner"
                            : "Admin"}
                        </td>
                        <td>
                          <button className="btn btn-success me-2">Edit</button>
                          <button className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <h2>No User Found</h2>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <h2>Hello</h2>
          )}
        </div>
      </div>
    </div>
  );
}
