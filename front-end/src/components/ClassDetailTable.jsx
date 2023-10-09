import React from "react";
import { Button, Table } from "antd";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const ClassDetailTable = ({ data }) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: "TrainId",
      dataIndex: "TrainId",
      width: 40,
    },
    {
      title: "Class type",
      dataIndex: "ClassType",
      width: 20,
    },
    {
      title: "Seat Column",
      dataIndex: "SeatColumn",
      width: 20,
    },
    {
      title: "Seat Row",
      dataIndex: "SeatRow",
      width: 40,
    },
    {
      title: "Total Seats",
      dataIndex: "TotalSeats",
      width: 40,
    },
    {
      title: "Booked Seats",
      dataIndex: "BookedSeats",
      width: 40,
    },
    {
      title: "Available Seats",
      dataIndex: "AvailableSeats",
      width: 40,
    },
    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   render: (text, record) => (
    //     <Button
    //       onClick={async () =>
    //         await axios.delete(
    //           `http://localhost:5000/api/admin/remove-train-detail/${record._id}`
    //         )
    //       }
    //     >
    //       Delete
    //     </Button>
    //   ),
    //   width: 20,
    // },
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
    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   render: (text, record) => <Button>Click Me</Button>,
    //   width: 30,
    // },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
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
export default ClassDetailTable;

// import React from "react";

// const ClassDetailTable = () => {
//   return <div>ClassDetailTable</div>;
// };

// export default ClassDetailTable;
