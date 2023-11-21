import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import StepsBar from "../../components/User/StepsBar";
import { Button, Radio, Space, Tag, message } from "antd";

import { Card, Col, Row } from "antd";
import { useState } from "react";
import { TrainContext } from "../../context/userSlectedTrainDetails/TrainContext";
import { useContext } from "react";
import "./ClassSelectionPage.css";
import SeatSelectionModalTest from "../../components/User/FirstClassSeatSelection";
import FirstClassSeatSelection from "../../components/User/FirstClassSeatSelection";
import SecoundClassSeatSelection from "../../components/User/SecoundClassSeatSelection";
import ThirdClassSeatSelection from "../../components/User/ThirdClassSeatSelection";

const ClassSelectionPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const warningMessage = (msg) => {
    messageApi.open({
      type: "warning",
      content: `${msg}`,
    });
  };
  const navigate = useNavigate();
  const [seatSelection, setSeatSelection] = useState(null);

  const trainState = JSON.parse(localStorage.getItem("TRAIN_SELECTION"));

  // !old
  // const { trainState } = useContext(TrainContext);

  // !test
  const [openFirstClassModal, setOpenFirstClassModal] = useState(false);
  const [openSecondClassModal, setOpenSecondClassModal] = useState(false);
  const [openThirdClassModal, setOpenThirdClassModal] = useState(false);

  const [FirstClassFair, setFirstClassFiar] = useState("");
  const [SecondClassFair, setSecondClassFiar] = useState("");
  const [ThirdClassFair, setThirdClassFiar] = useState("");

  // !
  const [radioValue, setRadioValue] = useState("");
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setRadioValue(e.target.value);
  };

  console.log("trainState", trainState);

  const [seatDetails, setSeatDetails] = useState([]);
  const { trainid, routeid } = useParams();
  const search = useLocation().search;
  const Station = new URLSearchParams(search).get("Station");
  const RouteOrder = new URLSearchParams(search).get("RouteOrder");

  // console.log("Station", Station, "RouteOrder", RouteOrder);
  // console.log("params route id train id ", trainid, routeid);

  console.log("seatDetals", seatDetails);

  const postData = { routeid, trainid, Station, RouteOrder };

  // console.log("post Data", postData);

  const getClassDetails = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/get-train-class-details`,
        postData
      );

      if (response.status == 200) {
        // console.log(response.data.data);
        setSeatDetails(response.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }

    // console.log(response.data.data);
  };

  // !handleCheckout
  const handleCheckout = () => {
    const isTrainDetailExist = localStorage.getItem("TRAIN_SELECTION");

    if (isTrainDetailExist == null || seatDetails == null || radioValue == "") {
      console.log("you can't checkout");
    } else {
      navigate("/user/payment");
    }
  };

  // !
  useEffect(() => {
    getClassDetails();
  }, []);

  //!testing

  useEffect(() => {
    const seatSelectionData = JSON.parse(
      localStorage.getItem("SEAT_SELECTION")
    );
    if (seatSelectionData) {
      setSeatSelection(seatSelectionData);
    }
  }, [openFirstClassModal, openSecondClassModal, openThirdClassModal]); // This will run once when the component mounts to reflect the initial value from localStorage

  //! /////

  return (
    <div>
      <StepsBar stepNum={2} />

      <Card className="seat-details-card conatiner" title="Seat Details">
        <Row gutter={16}>
          {seatDetails.map((seatDetail, index) => {
            console.log(seatDetail);
            return (
              <Col key={index} span={8}>
                <Card
                  style={{
                    width: "360px",
                    height: "192px",
                    borderRadius: "16px",
                    marginRight: "24px",
                    boxShadow: "5px 8px 24px 5px #c4c7d2",
                    cursor: "pointer",
                  }}
                  bordered={false}
                  onClick={() => {
                    if (seatDetail.SeatDetailId.ClassType == "1st Class") {
                      setOpenFirstClassModal(true);
                      setFirstClassFiar(seatDetail.Fair);
                    } else if (
                      seatDetail.SeatDetailId.ClassType == "2nd Class"
                    ) {
                      setOpenSecondClassModal(true);
                      setSecondClassFiar(seatDetail.Fair);
                    } else if (
                      seatDetail.SeatDetailId.ClassType == "3rd Class"
                    ) {
                      setOpenThirdClassModal(true);
                      setThirdClassFiar(seatDetail.Fair);
                    }
                    // seatDetail.SeatDetailId.ClassType == "1st Class"
                    //   ? setOpenFirstClassModal(true)
                    //   : seatDetail.SeatDetailId.ClassType == "2nd Class"
                    //   ? setOpenSecondClassModal(true)
                    //   : setOpenThirdClassModal(true);

                    // seatDetail.SeatDetailId.ClassType == "1st Class"
                    //   ? setFirstClassFiar(seatDetail.Fair)
                    //   : seatDetail.SeatDetailId.ClassType == "2nd Class"
                    //   ? setSecondClassFiar(seatDetail.Fair)
                    //   : setThirdClassFiar(seatDetail.Fair);

                    // console.log("clg fair", seatDetail.Fair);
                  }}
                >
                  <Tag color="blue" className="available-price">
                    LKR {seatDetail.Fair}
                  </Tag>

                  <div className="class-selection-title">
                    <h2>{seatDetail.SeatDetailId.ClassType}</h2>
                  </div>

                  <div className="available-seat">
                    <span className="available-seat-text">
                      Available Seat Counts:
                    </span>
                    <span className="available-seat-no">
                      {seatDetail.SeatDetailId.AvailableSeats}
                    </span>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>

      <FirstClassSeatSelection
        Fair={FirstClassFair}
        open={openFirstClassModal}
        onClose={() => setOpenFirstClassModal(false)}
      />

      <SecoundClassSeatSelection
        Fair={SecondClassFair}
        open={openSecondClassModal}
        onClose={() => setOpenSecondClassModal(false)}
      />

      <ThirdClassSeatSelection
        Fair={ThirdClassFair}
        open={openThirdClassModal}
        onClose={() => setOpenThirdClassModal(false)}
      />

      <Card className="train-details-card" title="Summary">
        <Card className="train-details-card-one">
          <table className="train-details-table">
            <tr>
              <th>Train Name</th>
              <td>{trainState.trainName}</td>
            </tr>

            <tr>
              <th>Train No</th>
              <td>{trainState.trainNo}</td>
            </tr>

            <tr>
              <th>Train Type</th>
              <td>{trainState.trainType}</td>
            </tr>

            <tr>
              <th>Start Station</th>
              <td>{trainState.startStation}</td>
            </tr>

            <tr>
              <th>End Station</th>
              <td>{trainState.endStation}</td>
            </tr>

            <tr>
              <th>Date</th>
              <td>{trainState.depatureDate}</td>
            </tr>

            <tr>
              <th>Depature Time</th>
              <td>{trainState.departureTime}</td>
            </tr>

            <tr>
              <th>No of Passengers</th>
              <td>{seatSelection?.selectedSeats.length}</td>
            </tr>

            <tr>
              <th>Train Class</th>
              <td>{seatSelection?.class}</td>
            </tr>

            <tr>
              <th>Price</th>
              <td>
                <Tag color="red">LKR {seatSelection?.totalFair}</Tag>
              </td>
            </tr>
          </table>
        </Card>
      </Card>

      <Card
        style={{
          // width: "100vw",
          // height: "40vh",
          marginTop: 30,
          marginBottom: 50,
          marginLeft: 50,
          marginRight: 50,
          borderRadius: "16px",
          boxShadow: "5px 8px 24px 5px #babcc0",
        }}
        title="Payment"
      >
        <Card
          type="inner"
          title="Payment Method"
          // extra={<a href="#">More</a>}
        >
          Please Select Payment Method
          <br />
          <br />
          <Radio.Group size="large" onChange={onChange} value={radioValue}>
            <Radio value="VISA">VISA</Radio>
            <Radio value="MASTER CARD">Master</Radio>
            <Radio value="LANKA QR">LANKA QR</Radio>
          </Radio.Group>
        </Card>
      </Card>

      <Space
        direction="vertical"
        style={{
          marginTop: 50,
          marginBottom: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
        }}
      >
        <Button size="large" color="blue" onClick={handleCheckout}>
          Checkout
        </Button>
      </Space>
    </div>
  );
};

export default ClassSelectionPage;

// !--------------------------------------------------------------------------------------------------
// import axios from "axios";
// import React, { useEffect } from "react";
// import { useLocation, useParams } from "react-router";
// import StepsBar from "../../components/User/StepsBar";
// import { Button, Radio, Space } from "antd";

// import { Card, Col, Row } from "antd";
// import { useState } from "react";
// import { TrainContext } from "../../context/userSlectedTrainDetails/TrainContext";
// import { useContext } from "react";
// import "./ClassSelectionPage.css";

// const ClassSelectionPage = () => {
//   //! this is from useContext api
//   // const { trainState } = useContext(TrainContext);

// !newly implemented local storage
//   const trainState = JSON.parse(localStorage.getItem("TRAIN_SELECTION"));

//   console.log("trainState from local storage", trainState);

//   // console.log(
//   //   "local storage",
//   //   JSON.parse(localStorage.getItem("TRAIN_SELECTION"))
//   // );

//   const [radioValue, setRadioValue] = useState(1);
//   const onChange = (e) => {
//     console.log("radio checked", e.target.value);
//     setRadioValue(e.target.value);
//   };

//   console.log("trainState", trainState);

//   const [seatDetails, setSeatDetails] = useState([]);
//   const { trainid, routeid } = useParams();
//   const search = useLocation().search;
//   const Station = new URLSearchParams(search).get("Station");
//   const RouteOrder = new URLSearchParams(search).get("RouteOrder");

//   // console.log("Station", Station, "RouteOrder", RouteOrder);
//   // console.log("params route id train id ", trainid, routeid);

//   console.log("seatDetals", seatDetails);

//   const postData = { routeid, trainid, Station, RouteOrder };

//   // console.log("post Data", postData);

//   const getClassDetails = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/user/get-train-class-details`,
//         postData
//       );

//       if (response.status == 200) {
//         // console.log(response.data.data);
//         setSeatDetails(response.data.data);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }

//     // console.log(response.data.data);
//   };

//   useEffect(() => {
//     getClassDetails();
//   }, []);

//   return (
//     <div>
//       <h1>Seat Details</h1>
//       <StepsBar />

//       <Card
//         style={{
//           borderRadius: "16px",
//           marginLeft: 10,
//           marginRight: 10,
//           // marginRight: "24px",
//           boxShadow: "5px 8px 24px 5px rgba(0, 0, 0, 0)",
//         }}
//         title="Seat Details"
//       >
//         <Row gutter={16}>
//           {seatDetails.map((seatDetail) => {
//             console.log(seatDetail);
//             return (
//               <Col span={8}>
//                 <Card
//                   style={{
//                     width: "360px",
//                     height: "192px",
//                     borderRadius: "16px",
//                     marginRight: "24px",
//                     boxShadow: "5px 8px 24px 5px #c4c7d2",
//                   }}
//                   title={seatDetail.SeatDetailId.ClassType}
//                   bordered={false}
//                 >
//                   Available Seat Count {seatDetail.SeatDetailId.AvailableSeats}
//                   <br />
//                   Price {seatDetail.Fair}
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       </Card>

//       <Card
//         style={{
//           width: "40vw",
//           height: "100vh",
//           marginLeft: 40,
//           marginRight: 40,
//           borderRadius: "16px",
//           boxShadow: "5px 8px 24px 5px #babcc0",
//         }}
//         title="Card title"
//       >
//         <Card>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-around",
//               marginBottom: "40px",
//             }}
//           >
//             <div>Train Name</div>
//             <div>{trainState.trainName}</div>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-around",
//               marginBottom: "40px",
//             }}
//           >
//             <div>Train No</div>
//             <div>{trainState.trainId}</div>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-around",
//               marginBottom: "40px",
//             }}
//           >
//             <div>Main Route</div>
//             <div>{trainState.route}</div>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-around",
//               marginBottom: "40px",
//             }}
//           >
//             <div>Your Station</div>
//             <div>{trainState.station}</div>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-around",
//               marginBottom: "40px",
//             }}
//           >
//             <div>End Station</div>
//             <div>{trainState.station}</div>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-around",
//               marginBottom: "40px",
//             }}
//           >
//             <div>Depature Time</div>
//             <div>{trainState.departureTime}</div>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-around",
//               marginBottom: "40px",
//             }}
//           >
//             <div>No of Passengers</div>
//             <div>Passenger count here</div>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-around",
//               marginBottom: "40px",
//             }}
//           >
//             <div>Train Class</div>
//             <div>Train Class here</div>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-around",
//               alignItems: "flex-start",
//               marginBottom: "40px",
//             }}
//           >
//             <div>Price</div>
//             <div>Price here</div>
//           </div>
//         </Card>
//       </Card>

//       <Card
//         style={{
//           // width: "100vw",
//           // height: "40vh",
//           marginTop: 30,
//           marginBottom: 50,
//           marginLeft: 50,
//           marginRight: 50,
//           borderRadius: "16px",
//           boxShadow: "5px 8px 24px 5px #babcc0",
//         }}
//         title="Payment"
//       >
//         <Card
//           type="inner"
//           title="Payment Method"
//           // extra={<a href="#">More</a>}
//         >
//           Please Select Payment Method
//           <br />
//           <br />
//           <Radio.Group size="large" onChange={onChange} value={radioValue}>
//             <Radio value="VISA">VISA</Radio>
//             <Radio value="MASTER CARD">Master</Radio>
//             <Radio value="LANKA QR">LANKA QR</Radio>
//           </Radio.Group>
//         </Card>
//       </Card>

//       <Space
//         direction="vertical"
//         style={{
//           marginTop: 50,
//           marginBottom: 50,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           width: "100vw",
//         }}
//       >
//         <Button size="large" color="blue">
//           Checkout
//         </Button>
//       </Space>
//     </div>
//   );
// };

// export default ClassSelectionPage;
