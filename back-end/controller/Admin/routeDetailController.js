const { default: mongoose } = require("mongoose");
const RouteDetail = require("../../model/RouteDetailModel");
const { ObjectId } = require("mongodb");

const addRouteDetail = async (req, res) => {
  const { From, To } = req.body;
  const TrainId = req.body.trainid;

  // console.log(From, To);
  // console.log(TrainId);
  // console.log(req.body);

  try {
    if (mongoose.Types.ObjectId.isValid(TrainId)) {
      console.log("Valid ObjectId:", TrainId);
      // !here i sould check for the Train whether its exist or not
      const checkExist = await RouteDetail.find({ TrainId: TrainId });

      if (checkExist != "") {
        return res.status(400).send({
          message: "Route for this train have created already",
          success: false,
        });
      }

      // Create the original route.
      const originalRoute = new RouteDetail({
        TrainId: TrainId,
        From: From,
        To: To,
      });

      // Create the reverse route by swapping "From" and "To" values.
      const reverseRoute = new RouteDetail({
        TrainId: TrainId,
        From: To, // Swap "From" and "To".
        To: From, // Swap "From" and "To".
      });

      // Save both the original and reverse routes.

      const savedOriginalRoute = await originalRoute.save();
      const savedReverseRoute = await reverseRoute.save();

      return res.status(200).send({
        message: "Route detail created successfully...",
        success: true,
        data: {
          savedOriginalRoute,
          savedReverseRoute,
        },
      });
    } else {
      return res.status(400).send({
        message: "Invalid Train selection",
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

const getAllRouteDetail = async (req, res) => {
  try {
    const routeDetails = await RouteDetail.find({});

    if (routeDetails) {
      return res.status(200).send({
        message: "route details provided successfully...",
        success: true,
        data: routeDetails,
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      success: false,
    });
  }
};

const getSingleRouteDetailByTrain = async (req, res) => {
  const TrainId = req.params.trainid;
  try {
    const routeDetail = await RouteDetail.find({ TrainId: TrainId });

    if (routeDetail) {
      return res.status(200).send({
        message: "Seat details of this train provided successfully...",
        success: true,
        data: routeDetail,
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      success: false,
    });
  }
};

//! if i want to delete a route all TrainId related  routes will be deleted
const deleteRouteDetail = async (req, res) => {
  const { trainid } = req.params;
  try {
    const availableRouteDetail = await RouteDetail.findOne({
      TrainId: trainid,
    });

    console.log(availableRouteDetail == "");

    if (availableRouteDetail != "") {
      console.log(availableRouteDetail);

      const deletedRoutes = await RouteDetail.deleteMany({ TrainId: trainid });

      if (deletedRoutes.acknowledged) {
        return res.status(200).send({
          message: "route details deleted success...",
          success: true,
          data: availableRouteDetail,
        });
      }
    } else {
      console.log("availableRouteDetail is empty");
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      data: error.message,
    });
  }
};

//! need to implement
const updateRouteDetail = async (req, res) => {};

module.exports = {
  addRouteDetail,
  getAllRouteDetail,
  deleteRouteDetail,
  updateRouteDetail,
  getSingleRouteDetailByTrain,
};
