import React, { useState } from "react";
import { Button, Table } from "antd";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getScheduleDetailByRoute,
  getAllScheduleDetail,
  deleteTrainSchedule,
} from "../features/Schedule/trainScheduleSlice";

const ScheduleTable = ({ trainSchedules }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Date",
      dataIndex: "Date",
      render: (text, record) => <p>{record.Date?.split("T")[0]}</p>,
      width: 20,
    },
    {
      title: "DepatureTime",
      dataIndex: "DepatureTime",
      // render: (text, record) => (
      //   <p>
      //     {record.DepatureTime != ""
      //       ? record.DepatureTime.split("T")[1].split(".")[0]
      //       : ""}
      //   </p>
      // ),

      width: 20,
    },
    {
      title: "ArrivalTime",
      dataIndex: "ArrivalTime",
      // render: (text, record) => (
      //   <p>{record.ArrivalTime?.split("T")[1].split(".")[0]}</p>
      // ),
      width: 20,
    },
    {
      title: "EstimatedTime",
      dataIndex: "EstimatedTime",
      width: 20,
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <Button
          // onClick={async () =>
          //   await axios.delete(
          //     `http://localhost:5000/api/admin/remove-train-detail/${record._id}`
          //   )
          // }

          onClick={() => {
            dispatch(deleteTrainSchedule(record._id));
            dispatch(getScheduleDetailByRoute(record.RouteId));
          }}
        >
          Delete
        </Button>
      ),
      width: 20,
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <Button
          onClick={async () =>
            await axios.delete(
              `http://localhost:5000/api/admin/remove-train-detail/${record._id}`
            )
          }
        >
          Update
        </Button>
      ),
      width: 40,
    },
    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   render: (text, record) => (
    //     <Button
    //       onClick={() => navigate(`/admin/schedule-detail/${record._id}`)}
    //     >
    //       Add Shedule
    //     </Button>
    //   ),
    //   width: 40,
    // },
    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   render: (text, record) => (
    //     <Button
    //       // onClick={updateKeyInParent}
    //       onClick={() => navigate(`/admin/route-detail/${record._id}`)}
    //     >
    //       Add Route
    //     </Button>
    //   ),
    //   width: 30,
    // },
  ];

  return (
    <Table
      columns={columns}
      dataSource={trainSchedules}
      pagination={{
        pageSize: 50,
      }}
      scroll={{
        y: 350,
      }}
      key={(text, record) => record._id}
      // rowKey={(text, record) => record._id} // Replace "id" with the actual unique key property
    />
  );
};
export default ScheduleTable;

// import React from 'react'

// const ScheduleTable = () => {
//   return (
//     <div>ScheduleTable</div>
//   )
// }

// export default ScheduleTable
