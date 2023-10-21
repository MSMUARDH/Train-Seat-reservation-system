import axios from "axios";

const createRouteDetails = async (routeData) => {
  // console.log(routeData);

  const response = await axios.post(
    "http://localhost:5000/api/admin/add-route-detail",
    routeData
    // {
    //   headers: {
    //     Authorization: `Bearer ${itemData.token}`,
    //   },
    // }
  );

  // console.log(response.data.data);

  return response.data.data;

  // setTimeout(() => {
  //   return response.data.data.savedOriginalRoute;
  // }, 1000);

  // setTimeout(() => {
  //   return response.data.data.savedReverseRoute;
  // }, 2000);

  // for (let i = 0; i < 2; i++) {
  //   if (i == 0) {
  //     return response.data.data.savedOriginalRoute;
  //   } else if (i == 1) {
  //     return response.data.data.savedReverseRoute;
  //   }
  // }
};

const getAllRoutedetail = async (token) => {
  console.log("all route detail called...");
  const response = await axios.get(
    "http://localhost:5000/api/admin/get-route-details"
    //   {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

  console.log(response.data);

  return response.data.data;
};

//? get  route detail by train id
const getSingleRouteDetailByTrain = async (trainId) => {
  const response = await axios.get(
    `http://localhost:5000/api/admin/get-single-route-details/${trainId}`
    //   {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

  return response.data.data;
};

//! not implemented in the backend yet(endpoint created)
const deleteRouteDetail = async (trainId) => {
  const response = await axios.delete(
    // !change the id
    `http://localhost:5000/api/admin/delete-routedetail/${trainId}`

    // {
    //   headers: {
    //     Authorization: `Bearer ${data.token}`,
    //   },
    // }
  );
  // console.log(response.data);

  return response.data.data;
};

const updateRouteDetail = async (routeData) => {
  // const id = noteData.id;
  // const data = { Note_Title: noteData.title, Note_Text: noteData.text };

  //! not implemented in the backend yet(endpoint created)
  const response = await axios.put(
    `http://localhost:5000/api/admin/update-routedetail/${id}`,
    data
  );

  // return response.data.data;
};

const routedetailService = {
  createRouteDetails,
  getAllRoutedetail,
  deleteRouteDetail,
  updateRouteDetail,
  getSingleRouteDetailByTrain,
};

export default routedetailService;
