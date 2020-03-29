import React from "react";

import { Carousel } from 'react-bootstrap';
// import Imageone from '../../Assets/brands2.jpg';
// import Imagetwo from '../../Assets/brands3.jpg';
import Imagethree from '../../Assets/brands.jpg';
import Footer from './Footer'

export default function Home() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            id="images"
            src={Imagethree}
            alt="First slide"
          />
        </Carousel.Item>
        {/* <Carousel.Item>
          <img
            className="d-block w-100"
            id="images"
            src={Imagetwo}
            alt="Third slide"
          />

          {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
        {/* </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            id="images"
            src={Imageone}
            alt="Third slide"
          /> */}

          {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption> */}
        {/* </Carousel.Item> */} */}
      </Carousel>
      <Footer />
    </div>
  );
}
