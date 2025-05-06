import React from "react";
import Carousel from "./Carousel";
import BookCardList from "./BookCardList";
export default function HomeComponent(props) {
  return (
    <div>
      <Carousel />
      <BookCardList isLoggedIn={props.isLoggedIn} />
    </div>
  );
}
