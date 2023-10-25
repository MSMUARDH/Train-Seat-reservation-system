const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const crypto = require("crypto");

const { sendVerificationMail } = require("../utils/sendVerificationMail");

const createToken = (_id) => {
  const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
  return jwt.sign({ _id }, jwtSecretKey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  try {
    const {
      First_name,
      Last_name,
      Gender,
      Age,
      Email,
      Password,
      Nic_no,
      Mobile_no,
    } = req.body;

    const hashedPassword = await bcrypt.hash(Password, 10);

    const userDetails = {
      First_name,
      Last_name,
      Gender,
      Age,
      Email,
      Password: hashedPassword,
      emailToken: crypto.randomBytes(64).toString("hex"),
      Nic_no,
      Mobile_no,
    };

    const userExist = await User.findOne({ Email: Email });
    if (userExist) return res.status(402).send("User already exists..");

    const user = await User.create(userDetails);

    sendVerificationMail(user);

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, Email, token });

    if (!user) return res.status(401).json("Problem creating a user");
  } catch (err) {
    res.status(500).json("error");
  }
};

// ! verifyEmail
const verifyEmail = async (req, res) => {
  const token = req.params.token;

  console.log(token);
  try {
    if (!token) return res.status(401).json("EmailToken not found...");

    const user = await User.findOne({ emailToken: token });

    if (user) {
      user.emailToken = null;
      user.isVerified = true;

      await user.save();

      return res.redirect("http://localhost:3000/user/signin");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const userExist = await User.findOne({ Email: Email });

    if (!userExist)
      return res
        .status(400)
        .json({ message: "user needs to register first ", success: false });

    const isValid = await bcrypt.compare(Password, userExist.Password);

    // !check below code with the help of ui
    if (userExist && !isValid)
      return res
        .status(400)
        .json({ message: "Password is incorrect", success: false });

    const isVerified = userExist.isVerified;

    if (isValid && isVerified) {
      // const user = { _id: userExist._id };
      // const token = createToken(user._id);
      const _id = userExist._id;
      const token = createToken(_id);

      res
        .status(200)
        .send({
          message: "Login successful",
          success: true,
          token: token,
          role: userExist.role,
        });
    } else if (!isVerified) {
      res
        .status(400)
        .send({ message: "Email Has Not Verified", success: false });
    } else {
      res
        .status(400)
        .json({ message: "Email or password is incorrect", success: false });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

module.exports = { registerUser, verifyEmail, loginUser };
