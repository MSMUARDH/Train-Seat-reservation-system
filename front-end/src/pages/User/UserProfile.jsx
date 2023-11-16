import React, { useEffect, useState } from "react";
import Navigation from "../../components/User/Navigation";

import { Space, Table, Tag } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  {
    title: "PNR No",
    dataIndex: "PNRNo",
    key: "PNRNo",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Travel Date",
    dataIndex: "TravalDate",
    key: "TravalDate",
    render: (text, record) => <p>{record.TravalDate?.split("T")[0]}</p>,
  },
  {
    title: "Origin",
    dataIndex: "Origin",
    key: "Origin",
  },
  {
    title: "Destination",
    dataIndex: "Destination",
    key: "Destination",
  },
  {
    title: "Class",
    dataIndex: "ClassType",
    key: "ClassType",
  },

  {
    title: "Booked Date",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text, record) => <p>{record.createdDate?.split("T")[0]}</p>,
  },

  {
    title: "Class Type",
    key: "ClassType",
    dataIndex: "ClassType",
    render: (text, record) => (
      <Tag
        style={{ marginBottom: 10 }}
        color={
          record.ClassType == "1st Class"
            ? "geekblue"
            : record.ClassType == "2nd Class"
            ? "green"
            : "red"
        }
        key={record.ClassType}
      >
        {record.ClassType.toUpperCase()}
      </Tag>
    ),
  },

  {
    title: "Ticket",
    dataIndex: "BookedTicket",
    key: "BookedTicket",
    render: (text, record) => (
      <a download href={`${record.BookedTicket}`}>
        {" "}
        DOWNLOAD TICKETS{" "}
      </a>
    ),
    // console.log("check for booked tickets", record.BookedTicket),
  },

  // {
  //   title: "Tags",
  //   key: "tags",
  //   dataIndex: "tags",
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? "geekblue" : "green";
  //         if (tag === "loser") {
  //           color = "volcano";
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  // {
  //   title: "Action",
  //   key: "action",
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   ),
  // },
];

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [bookedDetails, setBookedDetails] = useState([]);
  const getUserBookingDetails = async () => {
    try {
      //* use below userid to test
      // 654b43522f3020a526b6f42c  or user
      const response = await axios.get(
        `http://localhost:5000/api/user/get-booked-tickets-by-userid/${user}`
      );
      console.log("TTTT BOOKING DD", response.data.bookingDetails);
      setBookedDetails(response.data.bookingDetails);
    } catch (error) {
      console.log(
        "error from fatching getUserBookingDetails from user profile",
        error
      );
    }
  };

  useEffect(() => {
    getUserBookingDetails();
  }, []);

  return (
    <div>
      <Navigation selectedPage="profile" />
      <h1>UserProfile</h1>
      <div style={{ margin: 90 }}>
        <Table columns={columns} dataSource={bookedDetails} />
      </div>
    </div>
  );
};

export default UserProfile;
