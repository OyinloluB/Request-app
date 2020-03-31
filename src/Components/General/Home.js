import React from "react";

import { Carousel } from "react-bootstrap";
import Navbar from "../Layout/Navbar";
// import Imagethree from "../../Assets/brands.jpg";
import Footer from "./Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Carousel>
        <Carousel.Item id="images">
          {/* <img
            className="d-block w-100"
            id="images"
            src={Imagethree}
            alt="First slide"
          /> */}
        </Carousel.Item>
      </Carousel>
      <Footer />
    </div>
  );
}
