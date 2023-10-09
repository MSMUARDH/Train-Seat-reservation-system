const mongoose = require("mongoose");

const PickupStandInfoSchema = new mongoose.Schema({
  // TrainId: { type: mongoose.Schema.Types.ObjectId, ref: "Train" },
  StandId: { type: mongoose.Schema.Types.ObjectId, ref: "Pickupstand" },
  RouteId: { type: mongoose.Schema.Types.ObjectId, ref: "RouteDetail" },
  PlaceTime: String,
});

module.exports = mongoose.model("Pickupstandinfo", PickupStandInfoSchema);
