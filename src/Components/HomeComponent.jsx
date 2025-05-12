import React from "react";
import Carousel from "./Carousel";
import BookCardList from "./BookCardList";
import HotelQuote from "./Pages/HotelQuote";
export default function HomeComponent(props) {
  return (
    <div>
      <Carousel />
      <BookCardList
        isLoggedIn={props.isLoggedIn}
        style={{ backgroundColor: "#F2F2F2" }}
      />
      <HotelQuote />
    </div>
  );
}
