import React, { useState } from "react";
import { Button, Table } from "antd";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const TrainDetailTable = (props) => {
  const updateKeyInParent = () => {
    // Call the setKey function passed as a prop with the new value
    props.setKey(3); // Replace 'newKeyValue' with the value you want to set
  };

  const navigate = useNavigate();
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
          onClick={async () =>
            await axios.delete(
              `http://localhost:5000/api/admin/remove-train-detail/${record._id}`
            )
          }
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
        <Button onClick={() => navigate(`/admin/class-detail/${record._id}`)}>
          Add Class Detail
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
          onClick={() => navigate(`/admin/route-detail/${record._id}`)}
        >
          Add Route
        </Button>
      ),
      width: 30,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={props.data}
      pagination={{
        pageSize: 50,
      }}
      scroll={{
        y: 350,
      }}
      rowKey={(record) => record._id} // Replace "id" with the actual unique key property
    />
  );
};
export default TrainDetailTable;

// import React from 'react'

// const AdminTable = () => {
//   return (
//     <div>AdminTable</div>
//   )
// }

// export default AdminTable
