import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};
const ContactUs = () => (
  <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    validateMessages={validateMessages}
  >
    <Form.Item
      name={["user", "name"]}
      label="Your Name"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={["user", "email"]}
      label="You Email"
      rules={[
        {
          type: "email",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item name={["user", "age"]} label="Contact No">
      <InputNumber width={1000} />
    </Form.Item>
    <Form.Item name={["user", "website"]} label="Subject">
      <Input />
    </Form.Item>
    <Form.Item name={["user", "introduction"]} label="Message">
      <Input.TextArea />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        ...layout.wrapperCol,
        offset: 8,
      }}
    >
      <Button htmlType="submit">Send</Button>
    </Form.Item>
  </Form>
);
export default ContactUs;

// import React from 'react'

// const ContactUs = () => {
//   return (
//     <div>ContactUs</div>
//   )
// }

// export default ContactUs
