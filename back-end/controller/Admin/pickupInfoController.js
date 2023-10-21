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
    const { Station, Fair, Time, RouteOrder } = req.body;
    const { routeid } = req.params;

    console.log("test", Station, Fair, Time, RouteOrder, routeid);

    // //! Convert Fair
    const validatedFair = parseInt(Fair);

    //  ! convert RouteOrder
    const validatedRouteOrder = parseInt(RouteOrder);

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
      const isPickupInfoExist = await PickupInfo.find({
        RouteId: routeid,
        Station: Station,
        ClassType: req.body.classTypePart,
      });
      console.log("isPickupInfoExist", isPickupInfoExist);
      if (isPickupInfoExist == "") {
        const pickupInfo = await PickupInfo.create({
          RouteId: routeid,
          Station,
          Time: validatedTime,
          SeatDetailId: req.body.seatDetailIdPart,
          ClassType: req.body.classTypePart,
          Fair: validatedFair,
          RouteOrder: validatedRouteOrder,
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
          message: "pickup station already added",
          success: false,
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

const getAllPickupInfo = async (req, res) => {};

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
        message: "PickupStandInfo for the route provided success",
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

//! update needs to be implemented
const updatePickupInfo = (req, res) => {};

const deletePickupInfo = async (req, res) => {
  const { pickupinfoid } = req.params;

  console.log("Pickup info id", pickupinfoid);

  try {
    const isPickupInfoExist = await PickupInfo.findOne({
      _id: pickupinfoid,
    });

    console.log("delete pickup Info", isPickupInfoExist);

    if (isPickupInfoExist != "") {
      const deletedPickupInfoDetails = await PickupInfo.deleteMany({
        _id: pickupinfoid,
      });

      if (deletedPickupInfoDetails.acknowledged) {
        return res.status(200).send({
          message: "Pickup Info  deleted success...",
          success: true,
          data: isPickupInfoExist,
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

module.exports = {
  addPickupInfo,
  getAllPickupInfo,
  getPickupInfoForaRoute,
  updatePickupInfo,
  deletePickupInfo,
};
