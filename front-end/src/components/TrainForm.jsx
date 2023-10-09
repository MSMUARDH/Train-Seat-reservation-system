import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";

const TrainForm = () => {
  const [TrainNo, setTrainNo] = useState(null);
  const [TrainType, setTrainType] = useState("");
  const [TrainName, setTrainName] = useState("");

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const data = { TrainNo, TrainName, TrainType };

  const AddTrain = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/add-train",
        data
      );

      console.log(response.data);

      if (response.status == 200) {
        setTrainNo("");
        setTrainType("");
        setTrainName("");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSubmit = () => {
    AddTrain();
  };

  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Train No">
        <InputNumber type="number" onChange={(e) => setTrainNo(e)} />
      </Form.Item>

      <Form.Item label="Train Name">
        <Input onChange={(e) => setTrainName(e.target.value)} />
      </Form.Item>

      <Form.Item label="Train Type">
        <Select onSelect={(e) => setTrainType(e)}>
          <Select.Option value="demo1">Demo1</Select.Option>
          <Select.Option value="demo2">Demo2</Select.Option>
          <Select.Option value="demo3">Demo3</Select.Option>
          <Select.Option value="demo4">Demo4</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Number">
        <InputNumber />
      </Form.Item>

      <Form.Item style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleSubmit}>Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default TrainForm;
