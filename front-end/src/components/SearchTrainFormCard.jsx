import React, { useState } from "react";
import { Card, Form } from "antd";
import { Select } from "antd";

import { DatePicker, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";

// const [fromStation, setFromStation] = useState("");
// const [toStation, setToStation] = useState();
// const [date, setDate] = useState(null);

// const onChangeDate = (date, dateString) => {
//   console.log(date);
// };

// const onChangeDate = (date, dateString) => {
//   console.log(date);
// };

// const handleSubmit = () => {
//   console.log(date);
// };

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
// const [form] = Form.useForm();

const postSeatDetails = () => {
  console.log("posted....");
};

const SearchTrainFormCard = () => (
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
    <Form onFinish={postSeatDetails}>
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
                message: "Select something!",
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
                message: "Select something!",
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
                message: "this field is required",
              },
            ]}
          >
            <DatePicker
              style={{ width: 200, height: 50 }}
              size={10}
              format="DD-MM-YYYY"
              // onChange={(e) => setDate(`${e.$D}-${e?.$d.getMonth()}-${e.$y}`)}
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
            // onClick={handleSubmit}
          >
            Search
          </Button>
          <Button size="large">Reset</Button>
        </div>
      </div>
    </Form>
  </Card>
);

export default SearchTrainFormCard;

// import React from 'react'

// const SearchTrainFormCard = () => {
//   return (
//     <div>SearchTrainFormCard</div>
//   )
// }

// export default SearchTrainFormCard
