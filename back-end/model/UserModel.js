const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // User_id: {},
  First_name: String,
  Last_name: String,
  Gender: String,
  Age: Number,
  Email: String,
  Password: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  emailToken: String,
  Nic_no: String,
  Mobile_no: Number,
  role: String,
  Points: {
    type: Number,
    default: 0,
  },
});
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
