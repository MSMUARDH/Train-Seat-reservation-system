const Train = require("../../model/TrainModel");

const addTrainDetails = async (req, res) => {
  const { TrainNo, TrainType, TrainName } = req.body;

  try {
    const train = await Train.create({
      TrainNo,
      TrainType,
      TrainName,
    });

    if (train) {
      return res.status(200).send({
        message: "Train created successfully...",
        success: true,
        data: train,
      });
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

const getTrainDetails = async (req, res) => {
  try {
    const train = await Train.find({});

    if (train) {
      return res.status(200).send({
        message: "get train detail success",
        success: true,
        data: train,
      });
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

// !delete a train (cascade delete test)
const removeTrain = async (req, res) => {
  const TrainId = req.params.id;
  const traindetail = await Train.findOneAndDelete({
    _id: TrainId,
  });

  return res.status(200).send({
    message: "Train Detail Successfully deleted",
    success: true,
    data: traindetail,
  });
};

module.exports = { addTrainDetails, getTrainDetails, removeTrain };
