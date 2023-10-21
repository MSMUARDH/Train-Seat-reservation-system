import React from "react";
import { Button, Table } from "antd";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import {
  deleteClassDetail,
  getSingleclassDetailByTrain,
} from "../features/ClassDetail/classdetailSlice";
import { useDispatch, useSelector } from "react-redux";

const ClassDetailTable = ({ classdetails }) => {
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
      width: 20,
    },
    {
      title: "Total Seats",
      dataIndex: "TotalSeats",
      width: 20,
    },
    {
      title: "Booked Seats",
      dataIndex: "BookedSeats",
      width: 30,
    },
    {
      title: "Available Seats",
      dataIndex: "AvailableSeats",
      width: 30,
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
            dispatch(deleteClassDetail(record._id));
            dispatch(getSingleclassDetailByTrain(record.TrainId));
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
      dataSource={classdetails}
      pagination={{
        pageSize: 50,
      }}
      scroll={{
        y: 350,
      }}
      key={(text, record) => record._id}
      rowKey={(text, record) => record._id} // Replace "id" with the actual unique key property
    />
  );
};
export default ClassDetailTable;

// import React from "react";

// const ClassDetailTable = () => {
//   return <div>ClassDetailTable</div>;
// };

// export default ClassDetailTable;
