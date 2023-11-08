import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteTrain,
  getAllTrain,
  createTrain,
} from "../features/Train/trainSlice";

const TrainDetailTable = (prop) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const columns = [
    {
      title: "TrainId",
      dataIndex: "_id",
      width: 40,
    },
    {
      title: "Train No",
      dataIndex: "TrainNo",
      width: 20,
    },
    {
      title: "Train Type",
      dataIndex: "TrainType",
      width: 20,
    },
    {
      title: "Train Name",
      dataIndex: "TrainName",
      width: 25,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <Button
          onClick={() => {
            dispatch(deleteTrain(record._id));
            dispatch(getAllTrain());
          }}
        >
          Delete
        </Button>
      ),
      width: 20,
    },

    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   render: (text, record) => (
    //     <Button onClick={() => navigate(`/admin/class-detail/${record._id}`)}>
    //       Add Class Detail
    //     </Button>
    //   ),
    //   width: 40,
    // },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <Button
          // onClick={updateKeyInParent}
          onClick={() => navigate(`/admin/route-detail/${record._id}`)}
        >
          Add Route
        </Button>
      ),
      width: 30,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={prop.data}
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
export default TrainDetailTable;
