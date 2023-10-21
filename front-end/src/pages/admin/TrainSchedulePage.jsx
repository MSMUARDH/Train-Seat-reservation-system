import React, { useEffect, useState } from "react";
import ScheduleForm from "../../components/ScheduleForm";
import { useParams } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getScheduleDetailByRoute,
  getAllScheduleDetail,
  createTrainSchedule,
} from "../../features/Schedule/trainScheduleSlice";

const TrainSchedulePage = () => {
  const { trainid, routeid } = useParams();
  // const [data, setData] = useState();
  // const { trainSchedules } = useSelector((state) => state.Scheduledetails);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getScheduleDetailByRoute(routeid));
  // }, []);

  // const getScheduleDetails = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/api/admin/get-all-trainschedule"
  //     );
  //     // console.log(response.data.data);
  //     setData(response.data.data);
  //     // console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <h1>TrainSchedulePage</h1>
      <ScheduleForm
        // trainSchedules={trainSchedules}
        trainid={trainid}
        routeid={routeid}
      />
    </div>
  );
};

export default TrainSchedulePage;

// import React from "react";
// import { Button, DatePicker, Form, Input, Select, TimePicker } from "antd";
// const { RangePicker } = DatePicker;
// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 8,
//     },
//   },
//   wrapperCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 16,
//     },
//   },
// };
// const config = {
//   rules: [
//     {
//       type: "object",
//       required: true,
//       message: "Please select time!",
//     },
//   ],
// };
// const rangeConfig = {
//   rules: [
//     {
//       type: "array",
//       required: true,
//       message: "Please select time!",
//     },
//   ],
// };
// const onFinish = (fieldsValue) => {
//   const rangeTimeValue = fieldsValue["range-time-picker"];
//   const values = {
//     "range-time-picker": [
//       rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"),
//       rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss"),
//     ],
//   };
//   console.log("Received values of form: ", values);
// };
// const TrainSchedulePage = () => (
//   <Form
//     name="time_related_controls"
//     {...formItemLayout}
//     onFinish={onFinish}
//     style={{
//       maxWidth: 600,
//       marginTop: 20,
//     }}
//   >
//     <Form.Item
//       name="range-time-picker"
//       label="RangePicker[showTime]"
//       {...rangeConfig}
//     >
//       <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
//     </Form.Item>
//     <Form.Item
//       wrapperCol={{
//         xs: {
//           span: 24,
//           offset: 0,
//         },
//         sm: {
//           span: 16,
//           offset: 8,
//         },
//       }}
//     >
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
// );
// export default TrainSchedulePage;
