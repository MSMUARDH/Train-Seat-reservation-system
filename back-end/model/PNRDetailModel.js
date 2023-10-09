const mongoose = require("mongoose");

const PNRDetailSchema = new mongoose.Schema({
  //* PNRDetailId
  CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  PNRNo: {
    type: String,
    minlength: 6,
    maxlength: 10,
    unique: true,
    required: true,
  }, //! It Should be a auto genarated number
  TotalAmount: {
    type: Number,
    required: true,
  }, //!Doubt on Total Amount
});

PNRDetailSchema.pre("save", async function (next) {
  console.log("PNR Detail Schema");

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  this.PNRNo = Math.random().toString(36).substr(2, randomInteger(6, 10));
  next();
});

module.exports = mongoose.model("PNRDetail", PNRDetailSchema);
