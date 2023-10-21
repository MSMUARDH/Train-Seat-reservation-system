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
  TimePicker,
} from "antd";
import axios from "axios";
import { useParams } from "react-router";
const { Option } = Select;
import { DatePicker } from "antd";
import PickupInfoTable from "./PickupInfoTable";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

import {
  getAllPickupInfoByRoute,
  deletePickupInfo,
  createPickupInfoDetail,
} from "../features/Pickupinfo/pickupinfoSlice";

import { useDispatch, useSelector } from "react-redux";

const AdvancedSearchForm = ({ trainid, routeid, classDetails }) => {
  const [Time, setTime] = useState("");
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

    const fields = [
      "Station",
      "Time",
      "Class",
      "Fair",
      "RouteOrder",
      "SearchdrpdownTest",
    ];

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

    const children = [];
    for (let i = 0; i < fields.length; i++) {
      children.push(
        <Col span={6} key={i}>
          {i == 0 && (
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
                style={
                  {
                    // width: 200,
                  }
                }
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
          )}
          {i == 1 && (
            <Form.Item
              name={fields[i]}
              label={fields[i]}
              rules={[
                {
                  required: true,
                  message: "this field is required",
                },
              ]}
            >
              <TimePicker
                style={{
                  width: 200,
                }}
                onChange={(e) => setTime(`${e.$H}:${e.$m}`)}
                format="HH:mm"
              />
            </Form.Item>
          )}
          {i == 2 && (
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
              <Select>
                {classDetails.map((cls, index) => (
                  <Option value={`${cls._id}-${cls.ClassType}`} key={index}>
                    {cls.ClassType}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {i == 3 && (
            <Form.Item
              name={fields[i]}
              label={fields[i]}
              rules={[
                {
                  required: true,
                  message: "this field is required",
                },
              ]}
            >
              <Input type="number" placeholder="placeholder" />
            </Form.Item>
          )}

          {i == 4 && (
            <Form.Item
              name={fields[i]}
              label={fields[i]}
              rules={[
                {
                  required: true,
                  message: "this field is required",
                },
              ]}
            >
              <Input type="number" placeholder="placeholder" />
            </Form.Item>
          )}
        </Col>
      ); //array end
    } //end
    return children;
  };

  const postPickupInfo = async (values) => {
    console.log("values", values);

    const { Fair, RouteOrder } = values;

    // ! split id and the station
    const stationString = values.Station;
    const partsStation = stationString.split("-");
    const Station = partsStation[1].trim();

    const inputString = values.Class;
    const partsClass = inputString.split("-"); // Split the string by hyphen

    const part1 = partsClass[0].trim();
    const part2 = partsClass[1].trim(); // Get the part after the hyphen and trim any leading/trailing spaces

    const seatDetailIdPart = part1;
    const classTypePart = part2;

    const data = {
      Station,
      Time,
      seatDetailIdPart,
      classTypePart,
      Fair,
      routeid,
      RouteOrder,
    };

    // console.log("data", data);

    dispatch(createPickupInfoDetail(data));

    setTimeout(() => {
      dispatch(getAllPickupInfoByRoute(routeid));
    }, 1500);

    // console.log(classDetailId, classType);
    // try {
    //   const response = await axios.post(
    //     `http://localhost:5000/api/admin/add-pickupinfo/${routeid}`,
    //     data
    //   );

    //   if (response.status == 200) {
    //     form.resetFields();
    //   }
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={postPickupInfo}
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
const PickupInfoForm = ({ trainid, routeid, classDetails, pickupInfo }) => {
  //   console.log(trainid, routeid);

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
      <AdvancedSearchForm
        trainid={trainid}
        routeid={routeid}
        classDetails={classDetails}
      />

      <div style={listStyle}>
        <PickupInfoTable pickupInfo={pickupInfo} />
      </div>
    </>
  );
};
export default PickupInfoForm;
