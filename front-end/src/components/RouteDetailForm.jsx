import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  theme,
} from "antd";
import axios from "axios";
import { useParams } from "react-router";
import ClassDetailTable from "./ClassDetailTable";
import RouteDetailTable from "./RouteDetailTable";
const { Option } = Select;
const AdvancedSearchForm = ({ trainid }) => {
  // const [trigger, setTrigger] = useState(false);

  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);
  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };
  const getFields = () => {
    // const count = expand ? 6 : 6;

    const stations = [
      "Choose Station",
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
      "Habaraduwa",
      "Habarana",
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
      "Nawalapitya",
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
      "Return Colombo",
      "Return Waga",
      "Talaimannar Pier",
      "Thambalagamuwa",
      "Thambuththegama",
      "Wellawatte",
      "Thandikulam",
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

    const fields = ["From", "To"];

    const children = [];

    for (let i = 0; i < fields.length; i++) {
      children.push(
        <Col span={8} key={i}>
          <Form.Item
            name={fields[i]}
            label={fields[i]}
            rules={[
              {
                required: true,
                message: "Select something!",
              },
            ]}
            initialValue="Choose Station"
          >
            <Select>
              {stations.map((station, index) => (
                <Option value={station} key={index}>
                  {station}{" "}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      );
    }
    return children;
  };

  const postSeatDetails = async (values) => {
    console.log(values.From, values.To);

    if (values.From == "Choose Station" || values.To == "Choose Station") {
      console.log("Please select a station");
    } else if (values.From == values.To) {
      console.log("Station should be different");
    } else {
      const data = { trainid, values };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/admin/add-route-detail",
          data
        );

        if (response.status == 200) {
          form.resetFields();
        }
        console.log(response);
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={postSeatDetails}
    >
      <Row gutter={24}>{getFields()}</Row>
      <div
        style={{
          textAlign: "right",
        }}
      >
        <Space size="middle">
          <Button type="default" htmlType="submit">
            Add
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Space>
      </div>
    </Form>
  );
};
const RouteDetailForm = ({ trainid, data }) => {
  const { token } = theme.useToken();
  const listStyle = {
    lineHeight: "200px",
    textAlign: "center",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  };
  return (
    <>
      <AdvancedSearchForm trainid={trainid} />

      <div style={listStyle}>
        <RouteDetailTable data={data} />
      </div>
    </>
  );
};
export default RouteDetailForm;

// import React from 'react'

// const RouteDetailForm = () => {
//   return (
//     <div>RouteDetailForm</div>
//   )
// }

// export default RouteDetailForm
