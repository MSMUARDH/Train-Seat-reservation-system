import React, { useState } from "react";
import { Button, Table } from "antd";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const PickupInfoTable = (props) => {
  const updateKeyInParent = () => {
    // Call the setKey function passed as a prop with the new value
    props.setKey(3); // Replace 'newKeyValue' with the value you want to set
  };

  const navigate = useNavigate();
  const columns = [
    // {
    //   title: "Route Id",
    //   dataIndex: "RouteId",
    //   width: 40,
    // },
    {
      title: "Station",
      dataIndex: "Station",
      width: 20,
    },
    {
      title: "Time",
      dataIndex: "Time",
      width: 20,
    },
    {
      title: "ClassType",
      dataIndex: "ClassType",
      width: 20,
    },
    {
      title: "Fair",
      dataIndex: "Fair",
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
      dataSource={props.pickupInfo}
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
export default PickupInfoTable;

// import React from "react";

// const PickupInfoTable = () => {
//   return <div>PickupInfoTable</div>;
// };

// export default PickupInfoTable;
