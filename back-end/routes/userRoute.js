const express = require("express");
const router = express.Router();

const {
  registerUser,
  verifyEmail,
  loginUser,
} = require("../controller/userController");

router.post("/register", registerUser);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", loginUser);

module.exports = router;
