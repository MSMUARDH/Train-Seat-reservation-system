import axios from "axios";

const createTrain = async (trainData) => {
  const response = await axios.post(
    "http://localhost:5000/api/admin/add-train",
    trainData
    // {
    //   headers: {
    //     Authorization: `Bearer ${itemData.token}`,
    //   },
    // }
  );

  return response.data.data;
};

const getAllTrain = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/admin/get-all-train-detail"
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

  return response.data.data;
};

const deleteTrain = async (id) => {
  const response = await axios.delete(
    `http://localhost:5000/api/admin/remove-train-detail/${id}`
    // ,
    // {
    //   headers: {
    //     Authorization: `Bearer ${data.token}`,
    //   },
    // }
  );
  return response.data.data;
};

const updateTrain = async (noteData) => {
  const id = noteData.id;
  const data = { Note_Title: noteData.title, Note_Text: noteData.text };

  const response = await axios.put(
    `http://localhost:5000/api/note/${id}`,
    data
  );
};

const trainService = {
  createTrain,
  getAllTrain,
  deleteTrain,
  updateTrain,
};

export default trainService;
