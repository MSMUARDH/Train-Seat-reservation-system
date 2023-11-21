import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import StepsBar from "../../components/User/StepsBar";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/User/Spinner";
import { TrainContext } from "../../context/userSlectedTrainDetails/TrainContext";
import { useContext } from "react";

const AvailabilityPage = () => {
  const [data, setData] = useState("");
  const [isSpin, setIsSpin] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const From = queryParams.get("From");
  const To = queryParams.get("To");
  const date = queryParams.get("date");

  const postData = { From, To, date };

  // const { trainState, dispatch } = useContext(TrainContext);

  const navigate = useNavigate();

  // !test

  // const handleTrainSelection = () => {
  //   const newTrainSelection = {
  //     trainId: "2222 Changed",
  //     trainName: "Bradly Express Changed",
  //     trainType: "express Changed",
  //     route: "Badulla - Colombo Fort Changed",
  //     departureTime: "2023-10-19T11:00:00.811Z Changed",
  //     station: "Nawalapitiya Changed",
  //   };

  //   dispatch({ type: "SET_TRAIN_SELECTION", payload: newTrainSelection });
  // };

  //!test

  // !new data
  const columns = [
    {
      title: "TrainNo",
      dataIndex: "TrainNo",
      key: "TrainId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "TrainName",
      dataIndex: "TrainName",
      key: "TrainId",
    },
    {
      title: "TrainType",
      dataIndex: "TrainType",
      key: "TrainId",
    },
    {
      title: "MainRoute",
      dataIndex: "MainRoute",
      key: "TrainId",
    },
    {
      title: "depatureTime",
      dataIndex: "depatureTime",
      render: (text, record) => (
        <p>{record.depatureTime?.split("T")[1].split(".")[0]}</p>
      ),
      key: "TrainId",
    },
    {
      title: "station",
      dataIndex: "station",
      key: "TrainId",
    },
    {
      title: "Class Type",
      key: "TrainId",
      dataIndex: "fromStationClassDetails",
      render: (_, { fromStationClassDetails }) => (
        <>
          {fromStationClassDetails.map((cls) => {
            // console.log("inside tag", cls.ClassType);
            let color =
              cls.ClassType == "1st Class"
                ? "geekblue"
                : cls.ClassType == "2nd Class"
                ? "green"
                : "red";
            return (
              <Tag
                style={{ display: "flex", marginBottom: 10 }}
                color={color}
                key={cls._id}
              >
                {cls.ClassType.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "TrainId",
      render: (_, record) => (
        <Space
          size="middle"
          onClick={() => {
            const givenDate = new Date(record.depatureTime);
            const hours = givenDate.getUTCHours();
            let minutes = givenDate.getUTCMinutes().toString();

            if (minutes) {
              if (minutes == "0") {
                minutes = "00";
              }
            }

            const time = `${hours}:${minutes}`;

            // const newTrainSelection = {
            //   route: `${record.MainRoute}`,
            //   trainType: `${record.TrainType}`,
            //   trainName: `${record.TrainName}`,
            //   trainNo: `${record.TrainNo}`,
            //   startStation: `${From}`,
            //   endStation: `${To}`,
            //   depatureDate: `${date}`,
            //   departureTime: `${time}`,
            //   trainId: `${record.TrainId}`,
            //   routeId: `${record.RouteId}`,
            // };

            localStorage.setItem(
              "TRAIN_SELECTION",
              JSON.stringify({
                route: `${record.MainRoute}`,
                trainType: `${record.TrainType}`,
                trainName: `${record.TrainName}`,
                trainNo: `${record.TrainNo}`,
                startStation: `${From}`,
                endStation: `${To}`,
                depatureDate: `${date}`,
                departureTime: `${time}`,
                trainId: `${record.TrainId}`,
                routeId: `${record.RouteId}`,
                ScheduleId: `${record.ScheduleId}`,
              })
            );

            navigate(
              `/user/select-train-class/${record.TrainId}/${record.RouteId}?Station=${record.station}&RouteOrder=${record.RouteOrder}`
            );
          }}
        >
          <a>Choose</a>
        </Space>
      ),
    },
  ];

  // const [data, setData] = useState("");
  // const [isSpin, setIsSpin] = useState(false);
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);

  // const From = queryParams.get("From");
  // const To = queryParams.get("To");
  // const date = queryParams.get("date");

  // const postData = { From, To, date };

  // console.log("postdata", postData);

  const getAvailabalityData = async () => {
    try {
      setIsSpin(true);
      const response = await axios.post(
        `http://localhost:5000/api/user/check-train-availability`,
        postData
      );

      if (response.status == 200) {
        setData(response.data.data);
        setIsSpin(false);
      }
    } catch (error) {
      console.log(error.message);
      setIsSpin(false);
    }
  };

  useEffect(() => {
    getAvailabalityData();
  }, []);

  return (
    <>
      <h1
        style={{
          marginTop: "70px",
          color: "black",
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Train Availability
      </h1>
      <StepsBar stepNum={1} />

      <h1 style={{ marginLeft: "320px", fontSize: "25px", fontWeight: "bold" }}>
        {From} - {To}
      </h1>
      <h1
        style={{
          marginLeft: "320px",
          marginTop: "5px",
          marginBottom: "5px",
          fontSize: "20px",
        }}
      >
        Date : {date}
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // minHeight: "100vh",
        }}
      >
        {data ? (
          <Table columns={columns} dataSource={data} />
        ) : (
          isSpin && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default AvailabilityPage;
