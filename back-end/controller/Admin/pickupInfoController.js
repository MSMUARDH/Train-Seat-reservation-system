const PickupInfo = require("../../model/PickupInfoModel");
const RouteDetail = require("../../model/RouteDetailModel");
const mongoose = require("mongoose");
const SeatDetailModel = require("../../model/SeatDetailModel");
const {
  Types: { ObjectId },
} = mongoose;

//! Add pickup info
const addPickupInfo = async (req, res) => {
  try {
    const { Station, Fair, Time } = req.body;
    const { routeid } = req.params;

    // //! Convert Fair
    const validatedFair = parseInt(Fair);

    // Check if the objectId is valid
    if (
      ObjectId.isValid(req.body.seatDetailIdPart) &&
      ObjectId.isValid(routeid)
    ) {
      //! validated time for Time
      const [depHours, depMinutes] = Time.split(":").map(Number);
      const validatedTime = new Date();

      validatedTime.setUTCHours(depHours);
      validatedTime.setUTCMinutes(depMinutes);
      validatedTime.setUTCSeconds(0);

      // console.log("dep", validatedTime);

      const pickupInfo = await PickupInfo.create({
        RouteId: routeid,
        Station,
        Time: validatedTime,
        SeatDetailId: req.body.seatDetailIdPart,
        ClassType: req.body.classTypePart,
        Fair: validatedFair,
      });

      if (pickupInfo) {
        return res.status(200).send({
          messdage: "PickupStandInfo  created successfully... ",
          success: true,
          data: pickupInfo,
        });
      }
    } else {
      return res.status(400).send({
        message: "Invalid ObjectID",
        success: false,
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      success: false,
    });
  }
};

//! get all the pickup stand detail for specific Route
const getPickupInfoForaRoute = async (req, res) => {
  try {
    // !on Testing
    // const routeDetail = await RouteDetail.findOne({
    //   _id: req.params.routeid,
    // }).select("TrainId");
    // if (routeDetail) {
    //   console.log(routeDetail.TrainId);
    //   const seatDeatail = await SeatDetailModel.find({
    //     TrainId: routeDetail.TrainId,
    //   });
    //   console.log(seatDeatail);
    // }
    ////////////////// !

    const pickupInfo = await PickupInfo.find({ RouteId: req.params.routeid });
    if (pickupInfo) {
      console.log(pickupInfo);

      pickupInfo.map((info) => {
        console.log(info.SeatDetailId);
      });

      return res.status(200).send({
        messdage: "PickupStandInfo for the route provided success",
        success: true,
        data: pickupInfo,
      });
    } else {
      return res.status(400).send({
        messdage: "Pick up info not found ",
        success: false,
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { addPickupInfo, getPickupInfoForaRoute };
