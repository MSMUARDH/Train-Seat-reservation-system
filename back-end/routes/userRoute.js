const express = require("express");
const router = express.Router();

const {
  registerUser,
  accountVerify,
  login,
} = require("../controller/userController");
const {
  checkTrainAvailability,
  getTrainClassDetails,
  bookingTrain,
  getBookedSeatDetails,
} = require("../controller/bookingController");

router.post("/register", registerUser);
router.get("/account-verify/:id/:token", accountVerify);
router.post("/login", login);

router.post("/check-train-availability", checkTrainAvailability);
router.post("/get-train-class-details", getTrainClassDetails);

// !Booking  - ongoing testing
router.post("/ticket-booking", bookingTrain);
router.post("/get-booked-seat-deatils", getBookedSeatDetails);

module.exports = router;
