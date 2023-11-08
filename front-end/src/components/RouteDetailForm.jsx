import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleRouteDetailByTrain,
  createRouteDetails,
  getAllRoutedetail,
} from "../features/Route/routeDetailSlice";
import RouteDetailTable from "./RouteDetailTable";
const { Option } = Select;
const AdvancedSearchForm = ({ trainid }) => {
  const dispatch = useDispatch();

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
            initialValue=""
          >
            <Select
              showSearch
              style={{
                width: 300,
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
        </Col>
      );
    }
    return children;
  };

  const postSeatDetails = async (values) => {
    console.log(values.From, values.To);

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

    if (From == To) {
      console.log("Station should be different");
    } else {
      // console.log(From, To, trainid);

      const data = { trainid, From, To };

      // console.log("data", data);

      dispatch(createRouteDetails(data));
      // ! i change below code gett all to get single
      dispatch(getSingleRouteDetailByTrain(trainid));
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
const RouteDetailForm = ({ trainid }) => {
  const { routeDetails } = useSelector((state) => state.Routedetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleRouteDetailByTrain(trainid));
  }, []);

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
        <RouteDetailTable routeDetails={routeDetails} />
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
