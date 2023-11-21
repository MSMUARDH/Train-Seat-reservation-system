import React from "react";
import { Card, List } from "antd";
import { Tag } from "antd";
const data = [
  {
    title: "Colombo Fort - Beliatta",
    text: "Intercity & Express trains",
    classTypes: "Available class types : 1st ,2nd and 3rd",
  },
  {
    title: "Colombo Fort - Badulla",
    text: "Intercity & Express trains",
    classTypes: "Available class types : 1st ,2nd, 3rd and observations saloon",
  },
  {
    title: "Colombo Fort - Talaimannar",
    text: "Night mail train",
    classTypes: "Available class types : 2nd class",
  },
  {
    title: "Colombo Fort - Jaffna",
    text: "Intercity, Express & Night mail trains",
    classTypes: "Available class types : 1st ,2nd and 3rd",
  },
  {
    title: "Colombo Fort - Trincomalee",
    text: "Night mail train",
    classTypes: "Available class types : 2nd and 3rd",
  },
  {
    title: "Kandy - Badulla",
    text: "Slow train",
    classTypes: "Available class types : Observations saloon",
  },
  {
    title: "Colombo Fort - Kandy",
    text: "Intercity & Express trains",
    classTypes: "Available class types : 1st ,2nd, 3rd and observations saloon",
  },
  {
    title: "Colombo Fort - Batticaloa",
    text: "Intercity, Express & Night mail trains",
    classTypes: "Available class types : 1st, 2nd and 3rd",
  },
];
const ServicesCard = () => (
  <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 3,
      xxl: 3,
    }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <Card
          style={{
            backgroundColor: "#182747",
            color: "white",
            borderRadius: 25,
          }}
          title={<p style={{ color: "white" }}>{item.title}</p>}
        >
          <p>{item.text}</p>
          <br />
          <Tag color="blue">{item.classTypes}</Tag>
        </Card>
      </List.Item>
    )}
  />
);
export default ServicesCard;
