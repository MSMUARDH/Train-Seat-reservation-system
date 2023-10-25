import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import StepsBar from "../../components/User/StepsBar";

import { Card, Col, Row } from "antd";
import { useState } from "react";
import { TrainContext } from "../../context/userSlectedTrainDetails/TrainContext";
import { useContext } from "react";
import "./ClassSelectionPage.css";

const ClassSelectionPage = () => {
  const { trainState } = useContext(TrainContext);

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

  useEffect(() => {
    getClassDetails();
  }, []);

  return (
    <div>
      <h1>Seat Details</h1>
      <StepsBar />

      <Card
        style={{
          borderRadius: "16px",
          marginLeft: 10,
          marginRight: 10,
          // marginRight: "24px",
          boxShadow: "5px 8px 24px 5px rgba(0, 0, 0, 0)",
        }}
        title="Seat Details"
      >
        <Row gutter={16}>
          {seatDetails.map((seatDetail) => {
            console.log(seatDetail);
            return (
              <Col span={8}>
                <Card
                  style={{
                    width: "360px",
                    height: "192px",
                    borderRadius: "16px",
                    marginRight: "24px",
                    boxShadow: "5px 8px 24px 5px #c4c7d2",
                  }}
                  title={seatDetail.SeatDetailId.ClassType}
                  bordered={false}
                >
                  Available Seat Count {seatDetail.SeatDetailId.AvailableSeats}
                  <br />
                  Price {seatDetail.Fair}
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>

      <Card
        style={{
          width: "40vw",
          height: "1000px",
          marginLeft: 40,
          marginRight: 40,
          borderRadius: "16px",
          boxShadow: "5px 8px 24px 5px #babcc0",
        }}
        title="Card title"
      >
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "40px",
            }}
          >
            <div>1st</div>
            <div>2nd</div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "40px",
            }}
          >
            <div>1st</div>
            <div>2nd</div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "40px",
            }}
          >
            <div>1st</div>
            <div>2nd</div>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default ClassSelectionPage;
