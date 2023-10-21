import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllScheduleDetail,
  deleteTrainSchedule,
} from "../features/Schedule/trainScheduleSlice";

const AllScheduleDetailTable = ({ trainSchedules }) => {
  //   console.log("this is from all shedule table", trainSchedules);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns = [
    // {
    //   title: "Route Id",
    //   dataIndex: "RouteId",
    //   width: 40,
    // },
    {
      title: "Date",
      dataIndex: "Date",
      width: 20,
    },
    {
      title: "DepatureTime",
      dataIndex: "DepatureTime",
      width: 20,
    },
    {
      title: "ArrivalTime",
      dataIndex: "ArrivalTime",
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
          onClick={() => {
            dispatch(deleteTrainSchedule(record._id));
            dispatch(getAllScheduleDetail());
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
        //   onClick={ }
        >
          Update
        </Button>
      ),
      width: 20,
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
    <>
      <Table
        columns={columns}
        dataSource={trainSchedules}
        pagination={{
          pageSize: 50,
        }}
        scroll={{
          y: 350,
        }}
        rowKey={(record) => record._id} // Replace "id" with the actual unique key property
      />
    </>
  );
};
export default AllScheduleDetailTable;

// import React from 'react'

// const AllScheduleDetailTable = () => {
//   return (
//     <div>AllScheduleDetailTable</div>
//   )
// }

// export default AllScheduleDetailTable
