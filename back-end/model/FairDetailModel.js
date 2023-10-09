const mongoose = require("mongoose");

const FairDetailSchema = new mongoose.Schema({
  PickupStandInfoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pickupstandinfo",
  },
  ClassId: { type: mongoose.Schema.Types.ObjectId, ref: "ClassDetail" },
  Fair: Number,
});

module.exports = mongoose.model("Fairdetail", FairDetailSchema);
