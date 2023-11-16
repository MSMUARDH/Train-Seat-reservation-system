const mongoose = require("mongoose");

const BookingMasterSchema = new mongoose.Schema({
  // * BookingId
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  PNRNo: {
    type: String,
    unique: true, // Ensures uniqueness
  },
  ScheduleId: { type: mongoose.Schema.Types.ObjectId, ref: "TrainSchedule" },
  TravalDate: Date,
  TrainId: { type: mongoose.Schema.Types.ObjectId, ref: "Train" },
  RouteId: { type: mongoose.Schema.Types.ObjectId, ref: "RouteDetail" },
  BookedSeatNo: [String],
  ClassType: String,
  Origin: String,
  Destination: String,
  TotalAmount: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
  // !newly added
  BookedTicket: {
    type: String,
    default: null,
  },
});

BookingMasterSchema.pre("save", async function (next) {
  if (!this.PNRNo) {
    // Generate PNR number as a combination of a static string and a unique identifier
    this.PNRNo = `PNR-${Math.floor(100000 + Math.random() * 900000)}`;
  }
  next();
});

module.exports = mongoose.model("BookingMaster", BookingMasterSchema);
