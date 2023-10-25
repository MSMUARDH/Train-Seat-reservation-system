import React from "react";
import { Steps } from "antd";
const StepsBar = () => (
  <Steps
    style={{ padding: 50, marginRight: 50 }}
    size="small"
    current={3}
    items={[
      {
        title: "Home",
      },
      {
        title: "Check Availability",
      },
      {
        title: "Seat Selection",
      },
      {
        title: "Seat Selection",
      },
      {
        title: "Seat Selection",
      },
    ]}
  />
);
export default StepsBar;
