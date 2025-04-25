import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HotelRoomPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch hotel info
    fetch(`http://localhost:8080/hotels/${id}`)
      .then((res) => res.json())
      .then((data) => setHotel(data))
      .catch((err) => console.error("Hotel fetch failed", err));

    // Fetch rooms for hotel
    fetch(`http://localhost:8080/hotels/${id}/rooms`)
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Rooms fetch failed", err));
  }, [id]);

  return (
    <div className="container my-4">
      {hotel ? (
        <>
          <h2 className="mb-1">{hotel.name}</h2>
          <p className="text-muted mb-3">
            {hotel.location} | {hotel.category}
          </p>

          <h4 className="mb-3">Available Rooms</h4>
          <div className="row">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <div className="col-md-4 mb-4" key={room.room_id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={room.image_url || "https://via.placeholder.com/300"}
                      className="card-img-top"
                      alt={`Room ${room.room_id}`}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">Type {room.type_id}</h5>
                      <p className="card-text">
                        <strong>Price:</strong> ₹{room.price}
                        <br />
                        <strong>Status:</strong> {room.availability_status}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No rooms available for this hotel.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading hotel details...</p>
      )}
    </div>
  );
};

export default HotelRoomPage;
