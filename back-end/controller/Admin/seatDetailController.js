const SeatDeatil = require("../../model/SeatDetailModel");

const addSeatDetail = async (req, res) => {
  const { ClassType } = req.body.values;

  // console.log(req.body.values.SeatColumn);

  // console.log(ClassType);

  // console.log(req.body.trainid);

  const RouteId = req.body.routeid;
  const TrainId = req.body.trainid;

  // console.log("TrainId", TrainId);
  // console.log("RouteId", RouteId);

  // console.log(ClassType);

  // const SeatColumn = parseInt(req.body.values.SeatColumn, 10); // 10 is the radix/base for parsing integers
  // const SeatRow = parseInt(req.body.values.SeatRow, 10);

  try {
    // !removed
    // const TotalSeats = SeatColumn * SeatRow;
    // !ClassType Should be ClassType:ClassType (Dont change)
    const seatDetail = await SeatDeatil.create({
      TrainId: TrainId,
      RouteId: RouteId,
      ClassType: ClassType,
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

// !update
const updateSeatDetails = async (req, res) => {};

//!delete
const deleteSeatDetails = async (req, res) => {
  const { classid } = req.params;

  console.log("class id", classid);

  try {
    const isSeatDetailExist = await SeatDeatil.findOne({
      _id: classid,
    });

    console.log(isSeatDetailExist);

    if (isSeatDetailExist != "") {
      const deletedSeatDetails = await SeatDeatil.deleteMany({
        _id: classid,
      });

      if (deletedSeatDetails.acknowledged) {
        return res.status(200).send({
          message: "Class detail deleted success...",
          success: true,
          data: isSeatDetailExist,
        });
      } else {
        return res.status(400).send({
          message: "something went wrong ",
          success: false,
        });
      }
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      success: false,
    });
  }
};

const getSingleClassDetail = async (req, res) => {
  const TrainId = req.params.trainid;
  // !newly added
  const RouteId = req.params.routeid;

  try {
    const seatDetails = await SeatDeatil.find({
      TrainId: TrainId,
      RouteId: RouteId,
    });

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

module.exports = {
  addSeatDetail,
  getseatDetails,
  getSingleClassDetail,
  updateSeatDetails,
  deleteSeatDetails,
};
