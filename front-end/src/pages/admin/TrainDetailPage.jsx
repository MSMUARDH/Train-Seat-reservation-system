import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import TrainForm from "../../components/TrainForm";

const TrainDetailPage = () => {
  const { trainid } = useParams();
  const [data, setData] = useState();

  //   const getClassDetail = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/api/admin/get-single-seatdetails/" + trainid
  //       );
  //       // console.log(response.data.data);
  //       setData(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     getClassDetail();
  //   }, []);

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "20px",
          // marginTop: "px",
        }}
      >
        Train details
      </h1>
      <TrainForm />
      {/* //! Class Details table inside the ClassDetailForm */}
    </div>
  );
};
export default TrainDetailPage;

// import React from "react";

// const TrainDetailPage = () => {
//   return (
//     <div>
//       <h1>TrainDetailPage</h1>
//     </div>
//   );
// };

// export default TrainDetailPage;
