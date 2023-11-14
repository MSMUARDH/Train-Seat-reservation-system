import React from "react";
import { Carousel, Button } from "antd";
import "./HomeCarousel.css";
import img1 from "../../assets/img/1 (2).jpg";
import img2 from "../../assets/img/2 (2).jpg";
import img3 from "../../assets/img/3 (2).jpg";
import img4 from "../../assets/img/4 (2).jpg";

const contentStyle = {
  height: "100px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const HomeCarousel = () => (
  <div>
    <div className="heading">
      <p className="heading-text">
        Welcome to Sri Lanka <br />
        Railways
      </p>

      <p className="sub-heading-text">Advance Online Train Seats Reservation</p>
      <br />
      <button class="button-46" role="button">
        Book Your Seat
      </button>
    </div>
    <Carousel autoplay effect="fade" className="Carousel">
      <div>
        <img src={img1} alt="Image 1" />
      </div>
      <div>
        <img src={img2} alt="Image 2" />
      </div>
      <div>
        <img src={img3} alt="Image 3" />
      </div>
      <div>
        <img src={img4} alt="Image 4" />
      </div>
    </Carousel>
  </div>
);

export default HomeCarousel;

// !old code
// import React from "react";
// import { Carousel } from "antd";
// const contentStyle = {
//   height: "400px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };
// const HomeCarousel = () => (
//   <Carousel autoplay effect="fade">
//     <div>
//       <h3 style={contentStyle}>1</h3>
//     </div>
//     <div>
//       <h3 style={contentStyle}>2</h3>
//     </div>
//     <div>
//       <h3 style={contentStyle}>3</h3>
//     </div>
//     <div>
//       <h3 style={contentStyle}>4</h3>
//     </div>
//   </Carousel>
// );
// export default HomeCarousel;
