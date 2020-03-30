import React from "react";

import { Carousel } from "react-bootstrap";
import Imagethree from "../../Assets/brands.jpg";
import Footer from "./Footer";

export default function Home() {
  return (
    <div>
      <Carousel>
        <Carousel.Item className="d-block w-100" id="images">
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
