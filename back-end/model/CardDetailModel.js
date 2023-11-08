const mongoose = require("mongoose");

// ! card is just a dummy model don't make it complex

const CardDetailSchema = new mongoose.Schema({
  //   UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  OwnerName: {
    type: String,
    required: true,
  },
  CardNo: {
    type: Number,
    required: true,
  },
  CVVNo: {
    type: Number,
    required: true,
  },
  CardType: {
    type: String,
    required: true,
  },
  ExpDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CardDetail", CardDetailSchema);
