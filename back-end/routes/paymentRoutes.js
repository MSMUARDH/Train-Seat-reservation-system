const express = require("express");
const router = express.Router();

const { addPaymentDetails } = require("../controller/paymentController");

router.post("/add-payment-details", addPaymentDetails);

module.exports = router;
