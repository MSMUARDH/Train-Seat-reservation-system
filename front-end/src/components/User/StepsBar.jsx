import React from "react";
import { Steps } from "antd";
const StepsBar = ({ stepNum }) => (
  <Steps
    style={{ padding: 50, marginRight: 50 }}
    size="large"
    current={stepNum}
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
        title: "Payment",
      },
    ]}
  />
);
export default StepsBar;
