const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Password: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  Nic_no: String,
  Mobile_no: Number,
  role: {
    type: String,
    default: "user",
  },
});
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
