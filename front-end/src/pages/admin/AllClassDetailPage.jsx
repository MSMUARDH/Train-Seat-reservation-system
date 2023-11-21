import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import ClassDetailForm from "../../components/ClassDetailForm";
import axios from "axios";
import ClassDetailTable from "../../components/ClassDetailTable";
import AllClassDetailForm from "../../components/AllClassDetailForm";

const AllClassDetailPage = () => {
  const { trainid } = useParams();
  const [data, setData] = useState();

  // const getClassDetail = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/api/admin/get-single-seatdetails/" + trainid
  //     );
  //     // console.log(response.data.data);
  //     setData(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getClassDetail();
  // }, []);

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "20px",
          marginTop: "10px",
        }}
      >
        All class detail
      </h1>

      <AllClassDetailForm />
    </div>
  );
};
export default AllClassDetailPage;
