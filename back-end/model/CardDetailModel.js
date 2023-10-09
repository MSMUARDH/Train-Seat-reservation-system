const mongoose = require("mongoose");

// ! card is just a dummy model don't make it complex

const CardDetailSchema = new mongoose.Schema({
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  CardNo: Number,
  CVVNo: String,
  BankName: String,
  CardType: String,
  TotalAmount: Number,
});

module.exports = mongoose.model("CardDetail", CardDetailSchema);
