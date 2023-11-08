const express = require("express");
const router = express.Router();

const {
  addTrainDetails,
  removeTrain,
  getTrainDetails,
  updateTranDetail,
} = require("../controller/Admin/trainMasterController");

const {
  addRouteDetail,
  getAllRouteDetail,
  deleteRouteDetail,
  updateRouteDetail,
  getSingleRouteDetailByTrain,
} = require("../controller/Admin/routeDetailController");

const {
  addTrainSchedule,
  getAllTrainSchedule,
  updateTrainSchedule,
  deleteTrainSchedule,
  getScheduleDetailByRoute,
} = require("../controller/Admin/trainScheduleController");

// const {
//   addClassDetail,
//   getClassDetails,
// } = require("../controller/Admin/classDetailController");

const {
  addSeatDetail,
  getseatDetails,
  getSingleClassDetail,
  updateSeatDetails,
  deleteSeatDetails,
} = require("../controller/Admin/seatDetailController");

const {
  addPickupInfo,
  getPickupInfoForaRoute,
  updatePickupInfo,
  deletePickupInfo,
  getAllPickupInfo,
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
router.put("/update-train-detail/:trainid", updateTranDetail); //! need to implement
router.delete("/remove-train-detail/:id", removeTrain);

// router.post("/add-class", addClassDetail);
// router.get("/get-classes", getClassDetails);

// ? SeatDetail or ClassDetail(Same)
router.post("/add-seatdetails", addSeatDetail);
router.get("/get-seatdetails", getseatDetails);
router.get("/get-single-seatdetails/:trainid/:routeid", getSingleClassDetail);
// ! updating a seat detail is not good idea (bcz when the user already booked a seat there will be an issue)
router.put("/update-seatdetails/:classid", updateSeatDetails); //! <--- need to implement
router.delete("/delete-seatdetails/:classid", deleteSeatDetails);

// ? Train route Details
router.post("/add-route-detail", addRouteDetail);
router.get("/get-route-details", getAllRouteDetail);
router.get("/get-single-route-details/:trainid", getSingleRouteDetailByTrain);
// ! updating a route is not good idea
router.put("/update-routedetail/:routeid", updateRouteDetail); //! <--- need to implement
router.delete("/delete-routedetail/:trainid", deleteRouteDetail);

//? Train Schedule Details
router.post("/add-trainschedule/:trainid/:routeid", addTrainSchedule);
router.get("/get-all-trainschedule", getAllTrainSchedule);
//!ongoing testing
router.get(
  "/get-single-trainschedule/:trainid/:routeid",
  getScheduleDetailByRoute
);
// //////////////!
router.put("/update-trainschedule", updateTrainSchedule); //! <---need to implement
router.delete("/delete-trainschedule/:scheduleid", deleteTrainSchedule);

//? Pickup info
router.post("/add-pickupinfo/:routeid", addPickupInfo);
router.get("/get-pickupinfo/:routeid", getPickupInfoForaRoute);
// router.get("/get-all-pickupinfo", getAllPickupInfo);
router.put("/update-pickupinfo/:routeid", updatePickupInfo); //!need to implement
router.delete("/delete-pickupinfo/:pickupinfoid", deletePickupInfo);

router.post("/create-booking", createBooking);
router.post("/create-pnrdetail", createPNRDetail);

// ?Below route example for aggregation testing
// router.get("/check-agrt",getSeatDetailWithTrainInfo)

module.exports = router;
