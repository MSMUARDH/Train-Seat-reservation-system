const mongoose = require("mongoose");

const SeatDetailSchema = new mongoose.Schema({
  // * SeatDetailId
  TrainId: { type: mongoose.Schema.Types.ObjectId, ref: "Train" },
  RouteId: { type: mongoose.Schema.Types.ObjectId, ref: "RouteDetail" },

  ClassType: {
    type: String,
    required: true,
  },

  TotalSeats: {
    type: Number,
    reaquired: true,
    // default: SeatColumn * SeatRow,
  },
  BookedSeats: {
    type: Number,
    default: 0,
  },
  AvailableSeats: {
    type: Number,
    virtual: true, // This marks it as a virtual property
    default: 0,
    get: function () {
      // Calculate AvailableSeats based on TotalSeats and BookedSeats
      return this.TotalSeats - this.BookedSeats;
    },
  },
});

//? Define a compound unique index for TrainId and ClassType
SeatDetailSchema.index(
  { TrainId: 1, RouteId: 1, ClassType: 1 },
  { unique: true }
);

SeatDetailSchema.pre("save", function (next) {
  if (this.ClassType === "3rd Class") {
    this.TotalSeats = 60;
  } else {
    this.TotalSeats = 40;
  }
  next();
});

SeatDetailSchema.pre("save", function (next) {
  this.AvailableSeats = this.TotalSeats - this.BookedSeats;
  next();
});

module.exports = mongoose.model("SeatDetail", SeatDetailSchema);
