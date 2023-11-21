import React from "react";
import Navigation from "../../components/User/Navigation";
import ContactUs from "../../components/User/ContactUs";

const ContactPage = () => {
  return (
    <>
      <Navigation selectedPage="contact" />
      <h1
        style={{
          marginTop: "100px",
          color: "black",
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Contact us
      </h1>
      <div
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ContactUs />
      </div>
    </>
  );
};

export default ContactPage;
