import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllRoutedetail,
  deleteRouteDetail,
} from "../features/Route/routeDetailSlice";

const AllRouteDetailTable = ({ routeDetails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns = [
    {
      title: "TrainId",
      dataIndex: "TrainId",
      width: 40,
    },
    {
      title: "From",
      dataIndex: "From",
      width: 20,
    },
    {
      title: "To",
      dataIndex: "To",
      width: 20,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <Button
          onClick={() => {
            dispatch(deleteRouteDetail(record.TrainId));
            dispatch(getAllRoutedetail());
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
          onClick={() =>
            navigate(`/admin/pickup-info/${record.TrainId}/${record._id}`)
          }
        >
          Pickup Info Details
        </Button>
      ),
      width: 20,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={routeDetails}
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
export default AllRouteDetailTable;
