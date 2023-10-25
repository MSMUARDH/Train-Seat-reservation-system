import React, { useState } from "react";
import HomeCarousel from "../components/User/HomeCarousel";
import { Card, Form, message } from "antd";
import { Select } from "antd";

import { DatePicker, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router";
import Navigation from "../components/User/Navigation";

const stations = [
  "Aluthgama",
  "Ambalangoda",
  "Ahangama",
  "Ambalangoda",
  "Ambewela",
  "Anuradhapura",
  "Anuradhapura Town",
  "Avissawella",
  "Badulla",
  "Bandarawela",
  "Batticaloa",
  "Beliatta",
  "Bentota",
  "Beruwala",
  "China bay",
  "Chunnakam",
  "Colombo Fort",
  "Demodara-Ella",
  "Diyathalawa",
  "Ella",
  "Eraur",
  "Galgamuwa",
  "Galle",
  "Galoya",
  "Gampaha",
  "Gampola",
  "Hali Ela",
  "Haputhale",
  "Hatton",
  "Hikkaduwa",
  "Hingurakgoda",
  "Jaffna",
  "Kakirawa",
  "Kalutara South",
  "Kamburugamuwa",
  "Kandy",
  "Kankesanthurai",
  "Kanthale",
  "Kilinochchi",
  "Kodikamam",
  "Koggala",
  "Kurunegala",
  "Madhupara",
  "Mahawa",
  "Makumbura",
  "Mannar",
  "Maradhana",
  "Matale",
  "Matara",
  "Medawachchiya",
  "Mirigama",
  "Mirissa",
  "Moratuwa",
  "Mount Lavinia",
  "NAGOLLAGAMA",
  "Nanu Oya",
  "Nawalapitiya",
  "Nugegoda",
  "Omantha",
  "Pallai",
  "Panadura",
  "Peradeniya",
  "Polgahawela",
  "Polonnaruwa",
  "Puwakpitiya",
  "Ragama",
  "Rambukkana",
  "Rathmalana",
  "Talaimannar Pier",
  "Thambalagamuwa",
  "Thambuththegama",
  "Wellawatte",
  "Trincomalee",
  "Unawatuna",
  "Valachchena",
  "Vauniya",
  "Veyangoda",
  "Veyangoda",
  "Waduwwa",
  "Weligama",
  "Welikanda",
  "Wellawa",
];

const Home = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [date, setDate] = useState("");
  const [form] = Form.useForm();

  const errorMsg = (content) => {
    messageApi.open({
      type: "error",
      content: `${content}`,
      // content: "Please select different stations",
    });
  };

  const warningMsg = (content) => {
    messageApi.open({
      type: "warning",
      content: `${content}`,
    });
  };

  const postSeatDetails = async (values) => {
    function extractStringPart(inputString) {
      // Split the input string by hyphen
      const parts = inputString.split("-");

      // Check if there are at least two parts (before and after the hyphen)
      if (parts.length >= 2) {
        // Return the part after the hyphen (index 1)
        return parts[1].trim();
      }

      // If there are no hyphens in the input string, return the original string
      return inputString.trim();
    }

    const From = extractStringPart(values.From);
    const To = extractStringPart(values.To);

    const data = { From, To, date };

    try {
      if (From == To) {
        errorMsg("Please select different stations");
      } else {
        const response = await axios.post(
          `http://localhost:5000/api/user/check-train-availability`,
          data
        );

        if (response.status == 200) {
          console.log(response);
          navigate(
            `/user/check-train-availability?From=${data.From}&To=${data.To}&date=${data.date}`
          );

          // `/user/check-train-availability?From=${data.From}&To=${data.To}&date=${data.date}`
          // form.resetFields();
        }
      }
    } catch (error) {
      if (error.response.status == 404) {
        warningMsg(error.response.data.message);
      }
      // console.log(error.response.status);
    }

    // console.log(date);
  };

  return (
    <div>
      {/* <Navigation /> */}
      <HomeCarousel />
      {contextHolder}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          size="large"
          title="
Book Your Seat "
          bordered={false}
          style={{
            // backgroundColor: "#232D3F",
            width: 800,
            height: 400,
            margin: "40px",
          }}
        >
          <Form form={form} onFinish={postSeatDetails}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "",
              }}
            >
              <div>
                <span style={{ fontWeight: "bold" }}>From</span>
                <Form.Item
                  style={{ marginTop: 10 }}
                  name="From"
                  rules={[
                    {
                      required: true,
                      message: "Please select a station",
                    },
                  ]}
                  initialValue=""
                >
                  <Select
                    showSearch
                    style={{
                      width: 200,
                      height: 50,
                    }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").toLocaleLowerCase().includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={stations.map((station, index) => ({
                      value: `${index}-${station}`, // Start index from 1
                      label: station,
                    }))}
                  />
                </Form.Item>
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>To</span>
                <Form.Item
                  style={{ marginTop: 10 }}
                  name="To"
                  rules={[
                    {
                      required: true,
                      message: "Please select a station",
                    },
                  ]}
                  initialValue=""
                >
                  <Select
                    showSearch
                    style={{
                      width: 200,
                      height: 50,
                    }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").toLocaleLowerCase().includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={stations.map((station, index) => ({
                      value: `${index}-${station}`, // Start index from 1
                      label: station,
                    }))}
                  />
                </Form.Item>
              </div>

              <div>
                <span style={{ fontWeight: "bold" }}>Date</span>
                <Form.Item
                  style={{ marginTop: 10 }}
                  name="Date"
                  // label=""
                  rules={[
                    {
                      required: true,
                      message: "Please select a Date",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: 200, height: 50 }}
                    size={10}
                    format="DD-MM-YYYY"
                    onChange={(e) =>
                      setDate(
                        `${e.$D}-${parseInt(e?.$d.getMonth() + 1)}-${e.$y}`
                      )
                    }
                  />
                </Form.Item>
              </div>

              {/* <div>
      <span>kdhakldh</span>
      <Form.Item
        style={{ marginTop: 10 }}
        // name="c"
        // label="test"
        // labelAlign="center"
        // labelCol=""
        rules={[
          {
            required: true,
            message: "Select something!",
          },
        ]}
        initialValue=""
      >

      </Form.Item>
    </div> */}

              {/* <div>
      <Space direction="vertical">
        <DatePicker
          style={{ width: 200, height: 50 }}
          // onChange={onChange}
        />
      </Space>
    </div> */}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ marginTop: 20 }}>
                <Button
                  size="large"
                  style={{ marginRight: 20 }}
                  icon={<SearchOutlined />}
                  type="default"
                  htmlType="submit"
                >
                  Search
                </Button>
                <Button
                  size="large"
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Home;

// /* eslint-disable react-hooks/exhaustive-deps */
// import { useContext, useEffect, useState } from "react";
// import { TwoColSideBar } from "../components";
// import appDataContext from "../context/AppDataContext";
// import UserHome from "./user/UserHome";
// import { Navigate } from "react-router-dom";
// import UserBookings from "./user/UserBookings";
// import handleApiCall from "../api/handleApiCall";
// import FaqSection from "./user/FaqSection";

// const loggedUserEmail = localStorage.getItem("train_user_email");
// const adminUrl = import.meta.env.VITE_ADMIN_EMAIL;

// const Home = () => {
//   // const [activeTabIndex] = useContext(appDataContext)
//   const [stations, setStations] = useState([]);
//   const [reservationsCount, setReservationsCount] = useState(0);

//   const handleGetReservationCount = () => {
//     handleApiCall({
//       variant: "userDashboard",
//       urlType: "getReservationsCount",
//       setLoading: () => {},
//       auth: true,
//       cb: (data) => {
//         const totalCount = data?.reduce((acc, item) => acc + item.count, 0);
//         setReservationsCount(totalCount);
//       },
//     });
//   };

//   const GetContentForActiveTab = () => {
//     if (activeTabIndex === 1) {
//       return (
//         <UserHome
//           stations={stations}
//           reservationsCount={reservationsCount}
//           handleGetReservationCount={handleGetReservationCount}
//         />
//       );
//     }
//     if (activeTabIndex === 2) {
//       return <UserBookings />;
//     }
//     if (activeTabIndex === 3) {
//       return <FaqSection />;
//     }
//     return null;
//   };

//   const handleRedirection = () => {
//     return <Navigate to="/admin" replace />;
//   };

//   useEffect(() => {
//     if (adminUrl === loggedUserEmail) {
//       handleRedirection();
//     }
//   }, []);

//   useEffect(() => {
//     handleApiCall({
//       variant: "userDashboard",
//       urlType: "stations",
//       setLoading: () => {},
//       cb: (data, status) => {
//         const mappedStations = data?.map(({ name, id }) => ({
//           label: name,
//           value: id,
//         }));
//         if (status === 200) {
//           setStations(mappedStations);
//         }
//       },
//     });
//     handleGetReservationCount();
//     return () => {};
//   }, []);

//   return <TwoColSideBar sideBar content={<GetContentForActiveTab />} />;
// };

// export default Home;
