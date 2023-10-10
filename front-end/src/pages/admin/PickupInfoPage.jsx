import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PickupInfoForm from "../../components/PickupInfoForm";

const PickupInfoPage = () => {
  const [classDetails, setClassDetails] = useState([]);
  const [pickupInfo, setpickupInfo] = useState([]);

  const { trainid, routeid } = useParams();

  console.log(trainid, routeid);

  const getSeatDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/get-single-seatdetails/${trainid}`
      );

      if (response.status == 200) {
        setClassDetails(response.data.data);
        // console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPickupInfoDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/get-pickupinfo/${routeid}`
      );

      if (response.status == 200) {
        setpickupInfo(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSeatDetails();
    getPickupInfoDetails();
  }, []);

  console.log(classDetails);

  return (
    <div>
      <h1>PickupInfoPage</h1>
      <PickupInfoForm
        classDetails={classDetails}
        pickupInfo={pickupInfo}
        routeid={routeid}
      />
    </div>
  );
};

export default PickupInfoPage;
