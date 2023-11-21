import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Table,
  Tag,
  Input,
  Select,
  Space,
  Tooltip,
  Typography,
  message,
} from "antd";
const { Option } = Select;

const columns = [
  {
    title: "Your station",
    dataIndex: "yourStation",
    key: "yourStation",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Train Name",
    dataIndex: "trainName",
    key: "trainName",
  },
  {
    title: "Train Type",
    dataIndex: "trainType",
    key: "trainType",
  },

  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Last Station",
    dataIndex: "lastStation",
    key: "lastStation",
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

const TrainScheduleCheckPage = () => {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const [station, setStation] = useState();

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

  const getScheduleDetails = async (val) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/search-for-the-train",
        { From: val }
      );

      setData(response.data.scheduleDetails);

      console.log(
        "from train shedule detail page",
        response.data.scheduleDetails
      );
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const handleSearch = (selectedValue) => {
    const extractStringPart = (selectedValue) => {
      // Split the input string by hyphen
      const parts = selectedValue.split("-");

      // Check if there are at least two parts (before and after the hyphen)
      if (parts.length >= 2) {
        // Return the part after the hyphen (index 1)
        return parts[1].trim();
      }

      // If there are no hyphens in the input string, return the original string
      return selectedValue.trim();
    };

    const extractedValue = extractStringPart(selectedValue);
    // console.log(extractedValue);

    console.log("extractedValue", extractedValue);

    getScheduleDetails(extractedValue);
    // location.reload();
  };

  console.log(data);

  return (
    <div style={{ margin: "50px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form>
          <Form.Item
            style={{ marginTop: 10, color: "white" }}
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
              onChange={(e) => setSelectedValue(e)}
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
        </Form>

        <button
          onClick={() => handleSearch(selectedValue)}
          color="blue"
          style={{ marginLeft: "20px" }}
        >
          Search
        </button>
      </div>

      {/* </div> */}

      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};
export default TrainScheduleCheckPage;
