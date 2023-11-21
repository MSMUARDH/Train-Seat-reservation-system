import React, { useEffect, useState } from "react";
import RouteDetailForm from "../../components/RouteDetailForm";
import { useParams } from "react-router";
import axios from "axios";

const RouteDetailPage = () => {
  const { trainid } = useParams();

  // const { classdetails } = useSelector((state) => state.Classdetails);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getSingleclassDetailByTrain(trainid));
  // }, []);

  // const [data, setData] = useState();

  // const getRouteDetails = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/api/admin/get-route-details"
  //     );
  //     setData(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "20px",
          marginTop: "10px",
        }}
      >
        Route details
      </h1>

      <RouteDetailForm trainid={trainid} />
    </div>
  );
};

export default RouteDetailPage;
