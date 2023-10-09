import React, { useEffect, useState } from "react";
import RouteDetailForm from "../../components/RouteDetailForm";
import { useParams } from "react-router";
import axios from "axios";

const RouteDetailPage = () => {
  const { trainid } = useParams();
  const [data, setData] = useState();

  const getRouteDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/get-route-details"
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRouteDetails();
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>RouteDetailPage</h1>
      <RouteDetailForm trainid={trainid} data={data} />
    </div>
  );
};

export default RouteDetailPage;
