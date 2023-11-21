import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllClassDetail,
  deleteClassDetail,
} from "../features/ClassDetail/classdetailSlice";

const AllClassDetailTable = ({ classdetails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns = [
    {
      title: "TrainId",
      dataIndex: "TrainId",
      width: 40,
    },
    {
      title: "Class type",
      dataIndex: "ClassType",
      width: 30,
    },
    // {
    //   title: "Seat Column",
    //   dataIndex: "SeatColumn",
    //   width: 20,
    // },
    // {
    //   title: "Seat Row",
    //   dataIndex: "SeatRow",
    //   width: 20,
    // },
    {
      title: "Total Seats",
      dataIndex: "TotalSeats",
      width: 20,
    },
    {
      title: "Booked Seats",
      dataIndex: "BookedSeats",
      width: 20,
    },
    {
      title: "Available Seats",
      dataIndex: "AvailableSeats",
      width: 20,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <Button
          onClick={() => {
            dispatch(deleteClassDetail(record._id));
            dispatch(getAllClassDetail());
          }}
        >
          Delete
        </Button>
      ),
      width: 30,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <Button
        // ! navigate to the update page
        // onClick={() => navigate(`/admin/class-detail/${record._id}`)}
        >
          Update
        </Button>
      ),
      width: 40,
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={classdetails}
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
export default AllClassDetailTable;
