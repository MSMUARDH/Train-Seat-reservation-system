import React, { useEffect, useState } from "react";
import AllScheduleDetailForm from "../../components/AllScheduleDetailForm";

const AllScheduleDetailPage = () => {
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "20px",
          marginTop: "10px",
        }}
      >
        Schedule Details
      </h1>

      <AllScheduleDetailForm />
    </div>
  );
};
export default AllScheduleDetailPage;

// import React from 'react'

// const AllScheduleDetailPage = () => {
//   return (
//     <div>AllScheduleDetailPage</div>
//   )
// }

// export default AllScheduleDetailPage
