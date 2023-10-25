import React, { useState } from "react";
import { Button, Table } from "antd";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getSingleRouteDetailByTrain,
  createRouteDetails,
  deleteRouteDetail,
} from "../features/Route/routeDetailSlice";

const RouteDetailTable = ({ routeDetails }) => {
  console.log("Route Details", routeDetails);

  const dispatch = useDispatch();

  const navigate = useNavigate();
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
          // onClick={async () =>
          //   await axios.delete(
          //     `http://localhost:5000/api/admin/remove-train-detail/${record._id}`
          //   )
          // }

          onClick={() => {
            dispatch(deleteRouteDetail(record.TrainId));
            dispatch(getSingleRouteDetailByTrain(record.TrainId));
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
      width: 20,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <Button
          onClick={() =>
            navigate(`/admin/schedule-detail/${record.TrainId}/${record._id}`)
          }
        >
          Add Shedule
        </Button>
      ),
      width: 40,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <Button
          // onClick={updateKeyInParent}
          onClick={() =>
            navigate(`/admin/pickup-info/${record.TrainId}/${record._id}`)
          }
        >
          Add Pickup Info
        </Button>
      ),
      width: 30,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={routeDetails}
      pagination={{
        pageSize: 50,
      }}
      scroll={{
        y: 350,
      }}
      
      key={(_, record) => record._id}
      // rowKey={(text, record) => record._id} // Replace "id" with the actual unique key property
    />
  );
};
export default RouteDetailTable;
