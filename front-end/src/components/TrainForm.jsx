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
const { Option } = Select;
import { DatePicker } from "antd";
import PickupInfoTable from "./PickupInfoTable";
import TrainDetailTable from "./TrainDetailTable";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

import { useDispatch, useSelector } from "react-redux";
import { createTrain, getAllTrain } from "../features/Train/trainSlice";

const AdvancedSearchForm = () => {
  const dispatch = useDispatch();
  const [Time, setTime] = useState("");

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

    const fields = ["TrainNo", "TrainType", "TrainName"];

    const trainTypes = ["express", "slow", "nightmail", "intercity"];

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

    const children = [];
    for (let i = 0; i < fields.length; i++) {
      children.push(
        <Col span={6} key={i}>
          {i == 1 && (
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
              <Select placeholder="">
                {trainTypes.map((trainType, index) => (
                  <Option value={trainType} key={index}>
                    {trainType}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {i == 2 && (
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
              <Input />
            </Form.Item>
          )}

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
              <Input type="number" placeholder="placeholder" />
            </Form.Item>
          )}
        </Col>
      ); //array end
    } //end
    return children;
  };

  const postTraindata = async (values) => {
    const { TrainNo, TrainType, TrainName } = values;

    const data = { TrainNo, TrainType, TrainName };

    dispatch(createTrain(data));
    dispatch(getAllTrain());
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={postTraindata}
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
const TrainForm = () => {
  const { trains } = useSelector((state) => state.Trains);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTrain());
  }, [trains]);

  // console.log("this is from Train", trains);

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
      <AdvancedSearchForm />

      <div style={listStyle}>
        {/* {console.log(trains)} */}
        <TrainDetailTable data={trains} />
      </div>
    </>
  );
};
export default TrainForm;

// import React from 'react'

// const PickupInfoForm = () => {
//   return (
//     <div>PickupInfoForm</div>
//   )
// }

// export default PickupInfoForm

// import React, { useState } from "react";
// import { Button, Form, Input, InputNumber, Select, Col } from "antd";
// import axios from "axios";

// import { createTrain, getAllTrain } from "../features/Train/trainSlice";
// import { useDispatch } from "react-redux";

// const TrainForm = () => {
//   const [TrainNo, setTrainNo] = useState(null);
//   const [TrainType, setTrainType] = useState("");
//   const [TrainName, setTrainName] = useState("");

//   const dispatch = useDispatch();

//   const [componentSize, setComponentSize] = useState("default");
//   const onFormLayoutChange = ({ size }) => {
//     setComponentSize(size);
//   };
//   const data = { TrainNo, TrainName, TrainType };

//   const AddTrain = async () => {
//     try {
//       dispatch(createTrain(data));
//       dispatch(getAllTrain());

//       // const response = await axios.post(
//       //   "http://localhost:5000/api/admin/add-train",
//       //   data
//       // );

//       // console.log(response.data);

//       // if (response.status == 200) {
//       //   setTrainNo("");
//       //   setTrainType("");
//       //   setTrainName("");
//       // }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSubmit = () => {
//     AddTrain();
//   };

//   return (
//     <Form
//       labelCol={{
//         span: 4,
//       }}
//       wrapperCol={{
//         span: 14,
//       }}
//       layout="horizontal"
//       initialValues={{
//         size: componentSize,
//       }}
//       onValuesChange={onFormLayoutChange}
//       size={componentSize}
//       style={{
//         maxWidth: 600,
//       }}
//     >
//       <Col span={8}>
//         <Form.Item label="Train No">
//           <InputNumber type="number" onChange={(e) => setTrainNo(e)} />
//         </Form.Item>
//         <Form.Item label="Train Name">
//           <Input onChange={(e) => setTrainName(e.target.value)} />
//         </Form.Item>

//         <Form.Item label="Train Type">
//           <Select onSelect={(e) => setTrainType(e)}>
//             <Select.Option value="demo1">Demo1</Select.Option>
//             <Select.Option value="demo2">Demo2</Select.Option>
//             <Select.Option value="demo3">Demo3</Select.Option>
//             <Select.Option value="demo4">Demo4</Select.Option>
//           </Select>
//         </Form.Item>
//         <Form.Item label="Number">
//           <InputNumber />
//         </Form.Item>

//         <Form.Item style={{ display: "flex", justifyContent: "center" }}>
//           <Button onClick={handleSubmit}>Submit</Button>
//         </Form.Item>
//       </Col>
//     </Form>
//   );
// };

// export default TrainForm;
