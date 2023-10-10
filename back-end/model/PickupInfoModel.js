const mongoose = require("mongoose");

const PickupStandInfoSchema = new mongoose.Schema({
  RouteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RouteDetail",
    required: true,
    validate: {
      validator: async function (routeId) {
        const routeDetail = await mongoose
          .model("RouteDetail")
          .findById(routeId);
        return !!routeDetail; // Returns true if the routeDetail exists, false otherwise
      },
      message: "Invalid RouteId. RouteDetail not found.",
    },
  },
  Station: {
    type: String,
    required: true,
  },
  Time: {
    type: Date,
    require: true,
  },
  SeatDetailId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SeatDetail",
    required: true,
  },
  ClassType: {
    type: String,
    required: true,
  },
  Fair: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Pickupstandinfo", PickupStandInfoSchema);
