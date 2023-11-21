import axios from "axios";
import React, { useState, useRef } from "react";
import { Button, DatePicker, Space, Select, Table } from "antd";
import { useReactToPrint } from "react-to-print";
import { DownloadOutlined } from "@ant-design/icons";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const columns = [
  {
    title: "Train Name",
    dataIndex: "trainName",
    key: "trainName",
    render: (text) => <a>{text}</a>,
    width: 150,
  },
  {
    title: "Train No",
    dataIndex: "trainNo",
    key: "trainNo",
    width: 150,
  },
  {
    title: "Route",
    dataIndex: "trainRoute",
    key: "trainRoute",
    width: 250,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: 150,
  },
  {
    title: "Booked Date",
    dataIndex: "bookedDate",
    render: (text, record) => <p>{record.bookedDate?.split("T")[0]}</p>,
    key: "bookedDate",
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

const MonthlyIncomeReport = () => {
  const [size, setSize] = useState("large"); // default is 'middle'
  const [data, setData] = useState([]);
  const [dateString, setDateString] = useState("");
  const [monthName, setMonthName] = useState("");

  let totalAmount = 0;

  {
    data?.map((item) => {
      totalAmount += item.amount;
      console.log("TotalAmount", totalAmount);
    });
  }

  const downloadPDF = () => {
    const capture = document.querySelector(".actual-receipt");

    // Set a higher DPI for better quality
    const dpi = 900; // You can adjust this value
    const scale = dpi / 345;

    html2canvas(capture, { scale: scale, logging: true }).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");

      // Increase the image size
      const imgWidth = (canvas.width * scale) / 25; // Convert to inches
      const imgHeight = (canvas.height * scale) / 20; // Convert to inches
      const doc = new jsPDF("landscape", "mm", "a4");

      doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      doc.save("incomereport.pdf");
    });
  };

  const getMonthlyIncomeDetais = async () => {
    try {
      const [year, month] = dateString.split("-");

      const monthName = new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(new Date(`${year}-${month}-01`));

      setMonthName(monthName);

      const response = await axios.get(
        "http://localhost:5000/api/admin/get-income-report",
        {
          params: {
            date: dateString,
          },
        }
      );

      console.log(response.data.detailsForReport);
      setData(response.data.detailsForReport);
    } catch (error) {
      setData([]);
      console.log(error);
    }

    // console.log("getMonthlyIncomeDetais", response);
  };

  const onChange = (date, dateString) => {
    setDateString(dateString);
  };

  return (
    <React.Fragment>
      <h1
        style={{
          textAlign: "center",
          fontSize: "25px",
          marginBottom: "40px",
        }}
      >
        Monthly income report
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <DatePicker onChange={onChange} picker="month" />
        <Button onClick={getMonthlyIncomeDetais} style={{ marginLeft: "20px" }}>
          Search
        </Button>
      </div>

      <div className="actual-receipt" style={{ height: "100%", width: "100%" }}>
        {monthName != "" ? (
          <h1 style={{ margin: "10px", fontSize: "20px" }}>
            Monthly income details Of {monthName}{" "}
          </h1>
        ) : (
          ""
        )}
        <p style={{ margin: "10px" }}>
          {totalAmount != 0
            ? `Total amount of ${monthName}: LKR ${totalAmount}`
            : ""}
        </p>
        <Table columns={columns} dataSource={data} />
      </div>

      <Button
        style={{ marginTop: "10px" }}
        shape="round"
        icon={<DownloadOutlined />}
        size={70}
        onClick={downloadPDF}
      >
        Download PDF
      </Button>
    </React.Fragment>
  );
};

export default MonthlyIncomeReport;
