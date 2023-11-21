import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";

const ThirdClassSeatSelection = ({ open, onClose, Fair }) => {
  const [bookedSeats, setBookedSeat] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const maxSelection = 5; // Maximum seats a user can select

  const data = JSON.parse(localStorage.getItem("TRAIN_SELECTION"));

  const ScheduleId = data.ScheduleId;
  const trainId = data.trainId;
  const routeId = data.routeId;
  const classtype = "3rd Class";

  // console.log(ScheduleId, trainId, routeId,classtype);

  const bodyData = { ScheduleId, trainId, routeId, classtype };

  const getBookedSeat = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/get-booked-seat-deatils",
        bodyData
      );
      console.log("3rd class seat data response", response.data.BookedSeats);
      setBookedSeat(response.data.BookedSeats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookedSeat();
  }, []);

  // ! New CODE FOR TESTING ///////////////
  // Logic for adding second class seat selection to localStorage
  useEffect(() => {
    // Check if seats are selected and the modal is closed
    if (selectedSeats.length > 0 && !open) {
      localStorage.setItem(
        "SEAT_SELECTION",
        JSON.stringify({
          class: "3rd Class",
          selectedSeats: selectedSeats,
          totalFair: selectedSeats.length * Fair,
        })
      );
    }
  }, [open, selectedSeats, Fair]);

  // ! /////////////////////////////

  // !old code
  // {
  //   onClose && selectedSeats.length < 1
  //     ? localStorage.removeItem("SEAT_SELECTION_3")
  //     : localStorage.setItem(
  //         "SEAT_SELECTION_3",
  //         JSON.stringify({
  //           class: "3rd Class",
  //           selectedSeats: `${selectedSeats}`,
  //           totalFair: `${selectedSeats.length * Fair}`,
  //         })
  //       );
  // }

  // ! //////////////////////////////

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
      const isSeatBooked = bookedSeats.includes(i);
      seats.push(
        <div
          style={{
            backgroundColor: isSeatSelected(i)
              ? "green"
              : bookedSeats.includes(i)
              ? "yellow"
              : "blue",
            padding: "10px",
            height: "50px",
            width: "50px",
            margin: "5px",
            cursor: bookedSeats.includes(i) ? "not-allowed" : "pointer", // Change cursor based on booked status
            marginRight:
              i == 3 || i == 9 || i == 15 || i == 21 || i == 27 ? "20px" : "",
          }}
          key={i}
          className={`seat ${isSeatSelected(i) ? "selected" : ""}`}
          onClick={() => (isSeatBooked ? null : toggleSeat(i))}
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
    <>
      {/* <Button onClick={() => setOpen(true)}>Open Modal of 1000px width</Button> */}
      <Modal
        style={{ margin: "20px" }}
        title="Seat Selection"
        centered
        open={open}
        onOk={onClose}
        onCancel={onClose}
        width={500}
      >
        <div className="seat-selection-container" style={{ margin: "30px" }}>
          <p>Click on up to 5 seats to select them.</p>

          <br />
          <br />

          <h2
            style={{
              color: "maroon",
              fontWeight: 500,
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Front
          </h2>

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
          <h2
            style={{
              color: "maroon",
              fontWeight: 500,
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Rear
          </h2>

          <div className="selected-seats">
            <p>Selected Seats: {selectedSeats.join(", ")}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ThirdClassSeatSelection;
