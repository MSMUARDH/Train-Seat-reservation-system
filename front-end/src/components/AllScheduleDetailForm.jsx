import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Form, Row, Select, Space, theme } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { getAllScheduleDetail } from "../features/Schedule/trainScheduleSlice";
import AllScheduleDetailTable from "./AllScheduleDetailTable";
const { Option } = Select;
const AdvancedSearchForm = ({ trainid }) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);
  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  //   const getFields = () => {
  //     // const count = expand ? 6 : 6;

  //     const fields = ["SeatColumn", "ClassType", "SeatRow"];

  //     const children = [];
  //     for (let i = 0; i < fields.length; i++) {
  //       children.push(
  //         <Col span={8} key={i}>
  //           {i % 5 !== 1 ? (
  //             <Form.Item
  //               name={fields[i]}
  //               label={fields[i]}
  //               rules={[
  //                 {
  //                   required: true,
  //                   message: "this field is required",
  //                 },
  //               ]}
  //             >
  //               <Input type="number" placeholder="placeholder" />
  //             </Form.Item>
  //           ) : (
  //             <Form.Item
  //               name={fields[i]}
  //               label={fields[i]}
  //               rules={[
  //                 {
  //                   required: true,
  //                   message: "Select something!",
  //                 },
  //               ]}
  //               initialValue="1st Class"
  //             >
  //               <Select>
  //                 <Option value="1st Class">1st Class</Option>
  //                 <Option value="2nd Class"> 2nd Class</Option>
  //                 <Option value="3rd Class"> 3rd Class</Option>
  //               </Select>
  //             </Form.Item>
  //           )}
  //         </Col>
  //       );
  //     }
  //     return children;
  //   };

  // const postSeatDetails = async (values) => {
  //   console.log("Received values of form: ", values.SeatColumn);

  //   const data = { trainid, values };

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/admin/add-seatdetails",
  //       data
  //     );

  //     if (response.status == 200) {
  //       form.resetFields();
  //     }
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
const AllScheduleDetailForm = () => {
  const { trainSchedules } = useSelector((state) => state.Scheduledetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllScheduleDetail());
  }, []);

  // console.log("this is from all shedule Form", trainSchedules);

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
      {/* <AdvancedSearchForm trainid={trainid} /> */}

      <div style={listStyle}>
        <AllScheduleDetailTable trainSchedules={trainSchedules} />
      </div>
    </>
  );
};
export default AllScheduleDetailForm;

// import React from "react";

// const AllScheduleDetailForm = () => {
//   return <div>AllScheduleDetailForm</div>;
// };

// export default AllScheduleDetailForm;
