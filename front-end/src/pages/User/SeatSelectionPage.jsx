import React, { useState } from "react";
import "./SeatSelection.css"; // Import your CSS styles for seat selection

const SeatSelectionPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const maxSelection = 5; // Maximum seats a user can select

  const toggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      // If the seat is already selected, deselect it
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else if (selectedSeats.length < maxSelection) {
      // If the seat is not selected and user hasn't reached the max selection limit, select it
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const isSeatSelected = (seatNumber) => selectedSeats.includes(seatNumber);

  const renderSeats = () => {
    const seats = [];
    const totalSeats = 30; // Total number of seats

    for (let i = 1; i <= totalSeats; i++) {
      seats.push(
        <div
          style={{
            backgroundColor: isSeatSelected(i) ? "green" : "blue", // Change color based on selection
            padding: "10px",
            height: "50px",
            width: "50px",
            margin: "5px",
            cursor: "pointer",
            marginRight:
              i == 3 || i == 9 || i == 15 || i == 21 || i == 27 ? "20px" : "",
          }}
          key={i}
          className={`seat ${isSeatSelected(i) ? "selected" : ""}`}
          onClick={() => toggleSeat(i)}
        >
          {i == 6 ||
          i == 12 ||
          i == 18 ||
          i == 24 ||
          i == 30 ||
          i == 1 ||
          i == 7 ||
          i == 13 ||
          i == 19 ||
          i == 25
            ? `${i}W`
            : i}
        </div>
      );
    }

    return seats;
  };

  return (
    <div className="seat-selection-container" style={{ margin: "50px" }}>
      <h2>Seat Selection</h2>
      <p>Click on up to 5 seats to select them.</p>

      <br />
      <br />

      <h2 style={{ color: "maroon", fontWeight: 500 }}>Front</h2>

      <div
        className="seats grid-container "
        style={{
          border: "solid",
          width: "25vw",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {renderSeats()}
      </div>

      <div className="selected-seats">
        <p>Selected Seats: {selectedSeats.join(", ")}</p>
      </div>

      <h2 style={{ color: "maroon", fontWeight: 500 }}>Rear</h2>
    </div>
  );
};

export default SeatSelectionPage;

// import React, { useState } from "react";

// let screens = [
//   { id: 1, time: "10:00am", seats: [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1] },
//   { id: 2, time: "10:00am", seats: [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1] },
//   { id: 3, time: "10:00am", seats: [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1] },
//   { id: 4, time: "10:00am", seats: [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1] },
// ];

// const SeatSelectionPage = () => {
//   //! const [selectedMovie, setSelectedMovie] = useState(null);
//   const [selectedScreen, setSelectedScreen] = useState(null);
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   const handleSeatSelect = () => {
//     if (screen?.id !== selectedScreen?.id) {
//       setSelectedSeats([index]);
//       setSelectedScreen(screen);
//       return;
//     }
//     setSelectedScreen(screens);

//     if (selectedSeats.includes(index)) {
//     }
//   };

//   return (
//     <div>
//       <h1>SeatSelectionPage</h1>
//       <>
//         <h2>Choose your Screen</h2>
//         <div className="screen-selection">
//           {screens.map((screen) => {
//             return (
//               <div
//                 key={screen.id}
//                 className={`screen ${
//                   screen.id == selectedScreen.id ? "selected" : ""
//                 } ${screen.seats.includes(1) ? "available" : ""}`}
//               >
//                 <div className="screen-number">Screen {screen.id}</div>
//                 <div className="screen-seats">
//                   {" "}
//                   {screen.seats.map((seat, index) => {
//                     return (
//                       <div
//                         key={index}
//                         className={`seat ${
//                           seat ? "available" : "unavailable"
//                         } ${
//                           selectedSeats.includes(index) &&
//                           selectedScreen?.id === screen.id
//                             ? "selected"
//                             : ""
//                         }

//                         ${selectedSeats.includes(index) ? "booked" : ""}
//                         `}
//                         onClick={() => {
//                           if (seat) {
//                             handleSeatSelect(index, {
//                               ...screen,
//                               //! movie:selectedMovie
//                             });
//                           }
//                         }}
//                       >
//                         <div className="seat-number">{index + 1}</div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </>
//     </div>
//   );
// };

// export default SeatSelectionPage;
