import axios from "axios";

const createClassDetail = async (classData) => {
  const response = await axios.post(
    "http://localhost:5000/api/admin/add-seatdetails",
    classData
    // {
    //   headers: {
    //     Authorization: `Bearer ${itemData.token}`,
    //   },
    // }
  );

  // console.log(response.data);

  return response.data.data;
};

//? get All class details
const getAllClassDetail = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/admin/get-seatdetails"
    //   {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

  // console.log(response.data.data);
  return response.data.data;
};

//? get  class detail by train id
const getSingleclassDetailByTrain = async (trainId) => {
  const response = await axios.get(
    `http://localhost:5000/api/admin/get-single-seatdetails/${trainId}`
    //   {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

  // console.log(response.data.data);
  return response.data.data;
};

//! not implemented in the backend yet(endpoint created)
const deleteClassDetail = async (classId) => {
  const response = await axios.delete(
    // !change the id
    `http://localhost:5000/api/admin/delete-seatdetails/${classId}`
    // {
    //   headers: {
    //     Authorization: `Bearer ${data.token}`,
    //   },
    // }
  );

  // console.log(response.data);
  return response.data.data;
};

const updateClassDetail = async (classData) => {
  // const id = noteData.id;
  // const data = { Note_Title: noteData.title, Note_Text: noteData.text };

  //! not implemented in the backend yet(endpoint created)
  const response = await axios.put(
    `http://localhost:5000/api/admin/update-seatdetails/${id}`,
    classData
  );

  // return response.data.data;
};

const classdetailService = {
  createClassDetail,
  getAllClassDetail,
  deleteClassDetail,
  updateClassDetail,
  getSingleclassDetailByTrain,
};

export default classdetailService;
