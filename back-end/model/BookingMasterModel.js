const mongoose = require("mongoose");

const BookingMasterSchema = new mongoose.Schema({
  // * BookingId
  TrainId: { type: mongoose.Schema.Types.ObjectId, ref: "Train" },
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ScheduleId: { type: mongoose.Schema.Types.ObjectId, ref: "TrainSchedule" },
  BoardingId: { type: mongoose.Schema.Types.ObjectId, ref: "Pickupstandinfo" },
  SeatNo: Number,
  TravalDate: Date,

  Origin: String,
  Destination: String,
});

module.exports = mongoose.model("BookingMaster", BookingMasterSchema);
``