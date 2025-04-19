import React from "react";
import { RiAdminFill } from "react-icons/ri";

export default function OwnerDashboard() {
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
          <h1 className="p-2">Welcome Owner</h1>
        </div>
      </div>
    </div>
  );
}
