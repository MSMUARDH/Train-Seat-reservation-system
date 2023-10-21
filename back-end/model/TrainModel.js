const mongoose = require("mongoose");
const TrainSchedule = require("./ScheduleMasterModel");
const RouteDetail = require("./RouteDetailModel");
// ! newly added plug in on test
const autopopulate = require("mongoose-autopopulate");

const TrainSchema = new mongoose.Schema({
  // * TrainId
  // ClassDetailId: [{ type: Schema.Types.ObjectId, ref: "TrainClass" }], // !Class Detail shold  be
  TrainNo: {
    type: Number,
    unique: true,
    required: true,
  },
  TrainType: {
    type: String,
    required: true,
  },
  TrainName: {
    type: String,
    required: true,
  },
});

// Middleware to handle cascading deletion
TrainSchema.post("findOneAndDelete", async function (next) {
  // Remove all child documents with the same parentId when a Parent document is deleted
  try {
    // console.log("this is from Schema", this._conditions._id);
    const routedetail = await RouteDetail.deleteMany({
      TrainId: this._conditions._id,
    });
    // console.log(routedetail);

    const trainschedule = await TrainSchedule.deleteMany({
      TrainId: this._conditions._id,
    });
    // console.log(trainschedule);
    // next();
  } catch (error) {
    console.log(error);
  }
});

module.exports = mongoose.model("Train", TrainSchema);
