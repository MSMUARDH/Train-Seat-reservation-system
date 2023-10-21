const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

//* RouteID(Primary)
//  Origin
//  Destination
//  CreatedDate
//! TrainID (FR) --> 2

const RouteDetailSchema = new mongoose.Schema({
  // * RouteID
  TrainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Train",
    // autopopulate: {
    //   model: "Train",
    //   strictPopulate: false,
    // },
  },
  From: {
    type: String,
    required: true,
  },
  To: {
    type: String,
    required: true,
  },
});

RouteDetailSchema.plugin(autopopulate);

module.exports = mongoose.model("RouteDetail", RouteDetailSchema);
