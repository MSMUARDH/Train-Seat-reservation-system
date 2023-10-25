const express = require("express");
const router = express.Router();

const {
  registerUser,
  verifyEmail,
  loginUser,
} = require("../controller/userController");
const {
  checkTrainAvailability,
  getTrainClassDetails,
} = require("../controller/bookingController");

router.post("/register", registerUser);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", loginUser);

router.post("/check-train-availability", checkTrainAvailability);
router.post("/get-train-class-details", getTrainClassDetails);

module.exports = router;
