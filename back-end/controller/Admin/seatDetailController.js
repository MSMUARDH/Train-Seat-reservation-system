const SeatDeatil = require("../../model/SeatDetailModel");

const addSeatDetail = async (req, res) => {
  const { ClassType } = req.body.values;

  const TrainId = req.body.trainid;
  const SeatColumn = parseInt(req.body.values.SeatColumn, 10); // 10 is the radix/base for parsing integers
  const SeatRow = parseInt(req.body.values.SeatRow, 10);

  try {
    const TotalSeats = SeatColumn * SeatRow;

    // !ClassType Should be ClassType:ClassType (Dont change)

    const seatDetail = await SeatDeatil.create({
      TrainId,
      ClassType: ClassType,
      SeatColumn,
      SeatRow,
      TotalSeats,
    });

    if (seatDetail) {
      return res.status(200).send({
        message: "Seat detail is created successfully...",
        success: true,
        data: seatDetail,
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      success: false,
    });
  }
};

const getseatDetails = async (req, res) => {
  try {
    const seatDetails = await SeatDeatil.find({});

    if (seatDetails) {
      return res.status(200).send({
        message: "Seat details provided successfully...",
        success: true,
        data: seatDetails,
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      success: false,
    });
  }
};

const getSingleTrainDetail = async (req, res) => {
  const TrainId = req.params.trainid;
  try {
    const seatDetails = await SeatDeatil.find({ TrainId: TrainId });

    if (seatDetails) {
      return res.status(200).send({
        message: "Seat details of this train provided successfully...",
        success: true,
        data: seatDetails,
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { addSeatDetail, getseatDetails, getSingleTrainDetail };
