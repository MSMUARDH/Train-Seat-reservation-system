const mongoose = require("mongoose");

const PickupStandSchema = new mongoose.Schema({
  PlaceName: String,
});

module.exports = mongoose.model("Pickupstand", PickupStandSchema);
