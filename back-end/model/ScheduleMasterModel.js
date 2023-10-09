const mongoose = require("mongoose");

const TrainScheduleSchema = new mongoose.Schema({
  //* ScheduleId
  TrainId: { type: mongoose.Schema.Types.ObjectId, ref: "Train" },
  RouteId: { type: mongoose.Schema.Types.ObjectId, ref: "RouteDetail" },
  Date: {
    type: Date,
    format: "YYYY-MM-DD",
    required: true,
  },
  DepatureTime: {
    type: Date,
    format: "HH:ss",
    required: true,
  },
  ArrivalTime: {
    type: Date,
    format: "HH:ss",
    required: true,
  },
  EstimatedTime: {
    type: String,
    required: true,
  },
  DelayReason: {
    type: String,
    default: null,
  },
  TrainStatus: {
    type: String,
    default: "Active",
  },
});

module.exports = mongoose.model("TrainSchedule", TrainScheduleSchema);
