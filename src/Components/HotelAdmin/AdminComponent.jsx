import React from "react";
import { RiAdminFill } from "react-icons/ri";

export default function AdminComponent() {
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
          <button className="btn text-white">Manage Hotels</button>
          <button className="btn text-white">Manage Bookings</button>
          <button className="btn text-white">View Payments</button>
          <button className="btn text-white">Reviews and Ratings</button>
        </div>
      </div>
      <div className="col-9">
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <h1 className="p-2">Welcome Admin</h1>
          <RiAdminFill
            style={{
              fontSize: "2rem",
              border: "2px solid black",
              borderRadius: "50%",
              padding: "0.2rem",
              margin: "0.2rem",
            }}
          />
        </div>
      </div>
    </div>
  );
}
