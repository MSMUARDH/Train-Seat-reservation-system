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
  TimePicker,
} from "antd";
import axios from "axios";
import { useParams } from "react-router";
import ClassDetailTable from "./ClassDetailTable";
const { Option } = Select;
import { DatePicker } from "antd";
import ScheduleTable from "./ScheduleTable";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import { useDispatch, useSelector } from "react-redux";
import {
  getScheduleDetailByRoute,
  createTrainSchedule,
} from "../features/Schedule/trainScheduleSlice";
const AdvancedSearchForm = ({ trainid, routeid }) => {
  // const { trainSchedules } = useSelector((state) => state.Scheduledetails);
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [depatureTime, setDepatureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");

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
      "Date",
      "Dipature",
      "Arrival",
      "EstimatedDuration",
      "Status",
      "DelayReason",
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
                  message: "this field is required",
                },
              ]}
            >
              <DatePicker
                size={10}
                format="DD-MM-YYYY"
                onChange={(e) => setDate(`${e.$D}-${e?.$d.getMonth()}-${e.$y}`)}
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
                onChange={(e) => setDepatureTime(`${e.$H}:${e.$m}`)}
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
            >
              <TimePicker
                onChange={(e) => setArrivalTime(`${e.$H}:${e.$m}`)}
                format="HH:mm"
              />
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
          {/* {i == 4 && (
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
              <Select>
                <Option value="Active">Active</Option>
                <Option value="Delay"> Delay</Option>
              </Select>
            </Form.Item>
          )} */}
          {/* {i == 5 && (
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
              <TextArea rows={4} />
            </Form.Item>
          )} */}
        </Col>
      ); //array end
    } //end
    return children;
  };

  const postSeatDetails = async (values) => {
    const { EstimatedDuration, Status, DelayReason } = values;

    const data = {
      trainid,
      routeid,
      EstimatedDuration,
      date,
      depatureTime,
      arrivalTime,
    };

    console.log("Received from shedule form: ", data);

    dispatch(createTrainSchedule(data));
    setTimeout(() => {
      dispatch(getScheduleDetailByRoute(routeid));
    }, 1500);

    // trainid, routeid

    // try {
    //   const response = await axios.post(
    //     `http://localhost:5000/api/admin/add-trainschedule/${trainid}/${routeid}`,
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
const ScheduleForm = ({ trainid, routeid }) => {
  const { trainSchedules } = useSelector((state) => state.Scheduledetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScheduleDetailByRoute(routeid));
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
      <AdvancedSearchForm trainid={trainid} routeid={routeid} />

      <div style={listStyle}>
        <ScheduleTable trainSchedules={trainSchedules} />
      </div>
    </>
  );
};
export default ScheduleForm;

// import React from 'react'

// const ScheduleForm = () => {
//   return (
//     <div>ScheduleForm</div>
//   )
// }

// export default ScheduleForm;
