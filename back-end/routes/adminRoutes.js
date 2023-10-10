const express = require("express");
const router = express.Router();

const {
  addTrainDetails,
  removeTrain,
  getTrainDetails,
} = require("../controller/Admin/trainMasterController");

const {
  addRouteDetail,
  getAllRouteDetail,
} = require("../controller/Admin/routeDetailController");

const {
  addTrainSchedule,
  getAllTrainSchedule,
} = require("../controller/Admin/trainScheduleController");

// const {
//   addClassDetail,
//   getClassDetails,
// } = require("../controller/Admin/classDetailController");

const {
  addSeatDetail,
  getseatDetails,
  getSingleTrainDetail,
} = require("../controller/Admin/seatDetailController");

const {
  addPickupInfo,
  getPickupInfoForaRoute,
} = require("../controller/Admin/pickupInfoController");

const { createPNRDetail } = require("../controller/Admin/PNRDetailController");

const {
  createBooking,
} = require("../controller/Admin/bookingMasterController");

const {
  // getSeatDetailWithTrainInfo
} = require("../controller/Admin/adminController");

router.post("/add-train", addTrainDetails);
router.get("/get-all-train-detail", getTrainDetails);
router.delete("/remove-train-detail/:id", removeTrain);

// router.post("/add-class", addClassDetail);
// router.get("/get-classes", getClassDetails);

router.post("/add-seatdetails", addSeatDetail);
router.get("/get-seatdetails", getseatDetails);
router.get("/get-single-seatdetails/:trainid", getSingleTrainDetail);

router.post("/add-route-detail", addRouteDetail);
router.get("/get-route-details", getAllRouteDetail);
// router.post("/add-routedetail", addRouteDetail);
// router.post("/add-routedetail", addRouteDetail);

router.post("/add-trainschedule/:trainid/:routeid", addTrainSchedule);
router.get("/get-all-trainschedule", getAllTrainSchedule);

router.post("/add-pickupinfo/:routeid", addPickupInfo);
router.get("/get-pickupinfo/:routeid", getPickupInfoForaRoute);

router.post("/create-booking", createBooking);
router.post("/create-pnrdetail", createPNRDetail);
router.delete("/remove-train", removeTrain);

// ?Below route example for aggregation testing
// router.get("/check-agrt",getSeatDetailWithTrainInfo)

module.exports = router;
