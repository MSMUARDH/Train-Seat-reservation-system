const mongoose = require("mongoose");

const SeatDetailSchema = new mongoose.Schema({
  // * SeatDetailId
  TrainId: { type: mongoose.Schema.Types.ObjectId, ref: "Train" },
  ClassType: {
    type: String,
    unique: true,
    required: true,
  },
  SeatColumn: {
    type: Number,
    required: true,
  },

  SeatRow: {
    type: Number,
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

// Define a compound unique index for TrainId and ClassType
SeatDetailSchema.index({ TrainId: 1, ClassType: 1 }, { unique: true });

// const SeatDetailModel = mongoose.model("SeatDetail", SeatDetailSchema);

module.exports = mongoose.model("SeatDetail", SeatDetailSchema);
