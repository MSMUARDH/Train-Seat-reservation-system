const express = require("express");
const router = express.Router();

const {
  addTrainDetails,
  removeTrain,
  getTrainDetails,
} = require("../controller/Admin/trainMasterController");

const { addFairDetail } = require("../controller/Admin/fairDetailController");

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

const { addPickupInfo } = require("../controller/Admin/pickupInfoController");

const { addPickupStand } = require("../controller/Admin/pickupstandController");

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

router.post("/add-pickupstand", addPickupStand);
router.post("/add-pickupinfo", addPickupInfo);
router.post("/add-fairedetail", addFairDetail);

router.post("/create-booking", createBooking);
router.post("/create-pnrdetail", createPNRDetail);

router.delete("/remove-train", removeTrain);

// ?Below route example for aggregation testing
// router.get("/check-agrt",getSeatDetailWithTrainInfo)

module.exports = router;
