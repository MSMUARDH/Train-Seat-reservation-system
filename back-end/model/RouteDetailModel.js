const mongoose = require("mongoose");

//* RouteID(Primary)
//  Origin
//  Destination
//  CreatedDate
//! TrainID (FR) --> 2

const RouteDetailSchema = new mongoose.Schema({
  // * RouteID
  TrainId: { type: mongoose.Schema.Types.ObjectId, ref: "Train" },
  From: {
    type: String,
    required: true,
  },
  To: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("RouteDetail", RouteDetailSchema);
