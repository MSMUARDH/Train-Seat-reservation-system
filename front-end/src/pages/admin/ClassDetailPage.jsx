import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import ClassDetailForm from "../../components/ClassDetailForm";
import axios from "axios";
import ClassDetailTable from "../../components/ClassDetailTable";

const ClassDetailPage = () => {
  const { trainid, routeid } = useParams();
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
      <h1 style={{ textAlign: "center", marginTop: 10 }}>
        Class detail Managment
      </h1>
      <ClassDetailForm trainid={trainid} routeid={routeid} data={data} />
      {/* //! Class Details table inside the ClassDetailForm */}
    </div>
  );
};
export default ClassDetailPage;
