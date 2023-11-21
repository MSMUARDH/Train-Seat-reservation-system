import React from "react";
import Navigation from "../../components/User/Navigation";
import ServicesCard from "../../components/User/ServicesCard";

const RailwayServicesPage = () => {
  return (
    <div>
      <Navigation selectedPage="services" />
      <h1
        style={{
          marginTop: "80px",
          color: "black",
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Railway Services Page
      </h1>
      <div style={{ margin: "50px" }}>
        <ServicesCard />
      </div>
    </div>
  );
};

export default RailwayServicesPage;
