import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";

// import ClassDetailForm from "../../components/ClassDetailForm";
// import axios from "axios";
// import ClassDetailTable from "../../components/ClassDetailTable";
// import AllClassDetailForm from "../../components/AllClassDetailForm";
import AllRouteDetailForm from "../../components/AllRouteDetailForm";

const AllRouteDetailPage = () => {
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "20px",
          marginTop: "10px",
        }}
      >
        Route Details
      </h1>

      <AllRouteDetailForm />
    </div>
  );
};
export default AllRouteDetailPage;
