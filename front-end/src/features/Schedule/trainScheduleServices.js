import axios from "axios";

const createTrainSchedule = async (sheduleData) => {
  const {
    trainid,
    routeid,
    EstimatedDuration,
    date,
    depatureTime,
    arrivalTime,
  } = sheduleData;

  const data = { EstimatedDuration, date, depatureTime, arrivalTime };

  //! provide valid trainid and routeid
  const response = await axios.post(
    `http://localhost:5000/api/admin/add-trainschedule/${trainid}/${routeid}`,
    data
    // {
    //   headers: {
    //     Authorization: `Bearer ${itemData.token}`,
    //   },
    // }
  );

  console.log("createTrainSchedule", response.data.data);

  return response.data.data;
};

const getAllScheduleDetail = async (token) => {
  const response = await axios.get(
    "http://localhost:5000/api/admin/get-all-trainschedule"
    //   {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

  return response.data.data;
};

//* get  schedule detail by train id
const getScheduleDetailByRoute = async (params) => {
  const { trainid, routeid } = params;

  const response = await axios.get(
    `http://localhost:5000/api/admin/get-single-trainschedule/${trainid}/${routeid}`
    //   {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

  // console.log("getScheduleDetailByRoute", response.data.data);
  return response.data.data;
};

//! not implemented in the backend yet(endpoint created)
const deleteTrainSchedule = async (scheduleId) => {
  const response = await axios.delete(
    // !change the id
    `http://localhost:5000/api/admin/delete-trainschedule/${scheduleId}`
    // {
    //   headers: {
    //     Authorization: `Bearer ${data.token}`,
    //   },
    // }
  );
  return response.data.data;
};

const updateTrainSchedule = async (trainId) => {
  // const id = noteData.id;
  // const data = { Note_Title: noteData.title, Note_Text: noteData.text };

  //! not implemented in the backend yet(endpoint created)
  const response = await axios.put(
    //! change :scheduleid
    `http://localhost:5000/api/admin//update-trainschedule/:scheduleid`,
    data
  );

  // return response.data.data;
};

const scheduledetailService = {
  createTrainSchedule,
  getAllScheduleDetail,
  deleteTrainSchedule,
  updateTrainSchedule,
  getScheduleDetailByRoute,
};

export default scheduledetailService;
