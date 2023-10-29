import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { useLocation } from "react-router-dom";
import axios from "axios";
import StepsBar from "../../components/User/StepsBar";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/User/Spinner";
import { TrainContext } from "../../context/userSlectedTrainDetails/TrainContext";
import { useContext } from "react";

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sydney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];

const AvailabilityPage = () => {
  const { trainState, dispatch } = useContext(TrainContext);

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
            console.log("inside tag", cls.ClassType);
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

    // {
    //   title: "Class Type",
    //   key: "tags",
    //   dataIndex: "classes",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Choose</a>
    //     </Space>
    //   ),
    // },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Choose</a>
    //     </Space>
    //   ),
    // },
    {
      title: "Action",
      key: "TrainId",
      render: (_, record) => (
        <Space
          size="middle"
          onClick={() => {
            const date = new Date(record.depatureTime);
            const hours = date.getUTCHours();
            let minutes = date.getUTCMinutes().toString();

            if (minutes) {
              if (minutes == "0") {
                minutes = "00";
              }
            }

            const time = `${hours}:${minutes}`;

            const newTrainSelection = {
              trainId: `${record.MainRoute}`,
              trainName: `${record.TrainName}`,
              trainType: `${record.TrainType}`,
              route: `${record.MainRoute}`,
              departureTime: `${time}`,
              station: `${record.station}`,
            };

            dispatch({
              type: "SET_TRAIN_SELECTION",
              payload: newTrainSelection,
            });
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

  const [data, setData] = useState("");
  const [isSpin, setIsSpin] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const From = queryParams.get("From");
  const To = queryParams.get("To");
  const date = queryParams.get("date");

  const postData = { From, To, date };

  // console.log(postData);

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
      <h1 style={{ textAlign: "center" }}>AvailabilityPage</h1>
      <StepsBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
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

// const App = () => <Table columns={columns} dataSource={data} />;
// export default App;
