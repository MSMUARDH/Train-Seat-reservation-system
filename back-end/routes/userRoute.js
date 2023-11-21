const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  registerUser,
  accountVerify,
  login,
  getUser,
  getSingleUserBookedTickets,
  searchfortheTrainSchedule,
} = require("../controller/userController");

const {
  checkTrainAvailability,
  getTrainClassDetails,
  bookingTrain,
  getBookedSeatDetails,
  addBookedTicket,
} = require("../controller/bookingController");
const { uploadFile } = require("../controller/imageUploadController.js");

// !packeges for the image uploading part
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/register", registerUser);
router.get("/account-verify/:id/:token", accountVerify);
router.post("/login", login);

router.post("/check-train-availability", checkTrainAvailability);
router.post("/get-train-class-details", getTrainClassDetails);

// !Booking  - ongoing testing
router.post("/ticket-booking/:userid", bookingTrain);
router.post("/get-booked-seat-deatils", getBookedSeatDetails);

// !testing image uploads

router.post("/image-upload", upload.single("image"), uploadFile);

// !get user by id
router.get("/get-user-by-id", authMiddleware, getUser);

router.get("/get-booked-tickets-by-userid/:userid", getSingleUserBookedTickets);

router.patch("/upadte-user-ticket/:userid/:pnrno", addBookedTicket);

// ! search for the train
router.post("/search-for-the-train", searchfortheTrainSchedule);

module.exports = router;
