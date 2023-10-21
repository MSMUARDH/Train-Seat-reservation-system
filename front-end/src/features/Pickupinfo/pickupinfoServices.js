import axios from "axios";

const createPickupInfoDetail = async (picupInfo) => {
  console.log("from service", picupInfo.routeid);

  const { Station, Time, seatDetailIdPart, classTypePart, Fair, RouteOrder } =
    picupInfo;

  const data = {
    Station,
    Time,
    seatDetailIdPart,
    classTypePart,
    Fair,
    RouteOrder,
  };

  const response = await axios.post(
    `http://localhost:5000/api/admin/add-pickupinfo/${picupInfo.routeid}`,
    data
    // {
    //   headers: {
    //     Authorization: `Bearer ${itemData.token}`,
    //   },
    // }
  );

  return response.data.data;
};

const getAllPickupInfoByRoute = async (routeId) => {
  const response = await axios.get(
    `http://localhost:5000/api/admin/get-pickupinfo/${routeId}`
    //   {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

  return response.data.data;
};

//! not implemented in the backend yet(endpoint created)
const deletePickupInfo = async (pickupInfoId) => {
  const response = await axios.delete(
    // !change the routeid
    `http://localhost:5000/api/admin/delete-pickupinfo/${pickupInfoId}`
    // {
    //   headers: {
    //     Authorization: `Bearer ${data.token}`,
    //   },
    // }
  );
  return response.data.data;
};

const updatePicupInfo = async (pickupInfo) => {
  // const id = noteData.id;
  // const data = { Note_Title: noteData.title, Note_Text: noteData.text };

  //! not implemented in the backend yet(endpoint created)
  // ! change routeid
  const response = await axios.put(
    `http://localhost:5000/api/admin/update-pickupinfo/:routeid`,
    pickupInfo
  );

  // return response.data.data;
};

const pickupinfoService = {
  createPickupInfoDetail,
  getAllPickupInfoByRoute,
  deletePickupInfo,
  updatePicupInfo,
};

export default pickupinfoService;
