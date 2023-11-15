const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const crypto = require("crypto");
const mongoose = require("mongoose");

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const BookingMasterModel = require("../model/BookingMasterModel");
dotenv.config();

//!load envirement variable (newly added)
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const USER_EMAIL = process.env.USER_EMAIL;
const SECRET_KEY = process.env.SECRET_KEY;

//! nodemailer congfigure(newly added)
const transpoter = nodemailer.createTransport({
  service: "hotmail",
  //host: 'smtp.your-email-provider.com', // SMTP server hostname
  port: 587, // SMTP server port (usually 587 for TLS)
  secure: false, // Set to true for TLS, false for non-secure
  auth: {
    user: "msmuaz98@outlook.com",
    pass: "199820200646Muaz",
  },
});

//!email sending function (newly added)
async function emailHandle(subject, body, userEmail) {
  const mailoption = {
    from: "msmuaz98@outlook.com", //company email
    to: userEmail,
    subject: subject,
    html: body,
  };

  transpoter.sendMail(mailoption, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({ message: "email sending success" });
    }
  });
}

// const { sendVerificationMail } = require("../utils/sendVerificationMail");

const createToken = (_id) => {
  const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
  return jwt.sign({ _id }, jwtSecretKey, { expiresIn: "3d" });
};

// * Registration Controller
const registerUser = async (req, res) => {
  try {
    const { Name, Email, Password, Nic_no, Mobile_no } = req.body;

    console.log(
      "this is from register",
      Name,
      Email,
      Password,
      Nic_no,
      Mobile_no
    );

    const hashedPassword = await bcrypt.hash(Password, 10);

    const userDetails = {
      Name,
      Email,
      Password: hashedPassword,
      Nic_no,
      Mobile_no,
    };

    const userExist = await User.findOne({ Email: Email });
    if (userExist)
      return res.status(402).json({ message: "User already exists.." });

    // !New Added

    const FRONTEND_URL = "http://localhost:5000/api/user";

    User.create(userDetails).then(async (user) => {
      //res.status(201).json({ message: "User created successfully", user });

      //verify link generate
      const secret = JWT_SECRET;
      const payload = {
        email: user.Email,
        id: user._id,
      };

      const token = jwt.sign(payload, secret, { expiresIn: "15m" });
      const encodedToken = token.replace(/\./g, "%252E");

      const link = `${FRONTEND_URL}/account-verify/${user._id}/${encodedToken}`;

      //email details
      const subject = "Railway Department";
      const body = `You can <a href="${link}">Click here to verify your account.</a>
          <span style="color: red;">Please don't click it if you did not create an account with Clean my land.</span>`;

      emailHandle(subject, body, user.Email);

      return res.status(200).json({
        message: "Email verfication link has been sent to your email",
        link: `${link}`,
      });
    });

    // !old code
    // const user = await User.create(userDetails);

    // sendVerificationMail(user);

    // const token = createToken(user._id);

    // res.status(200).json({ _id: user._id, Email, token });

    // if (!user) return res.status(401).json("Problem creating a user");
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

// * account verify API
const accountVerify = async (req, res) => {
  const { id, token } = req.params;

  // !console
  console.log("token id", id, token);

  const decodedToken = decodeURIComponent(token);

  // !console
  console.log("decodedToken", decodedToken);

  const user = await User.findOne({ _id: id });

  // !console
  console.log("user", user);

  //check user exists or not
  if (!user) {
    return res.status(404).json({ message: "invalid user ID" });
  }

  try {
    //check JWT valid or not
    const secret = JWT_SECRET;
    const payload = jwt.verify(decodedToken, secret);

    // !console
    console.log("payload", payload);

    if (payload) {
      //verify the user
      await User.updateOne({ _id: payload.id }, { isVerified: true })
        .then((result) => {
          if (result) {
            res.status(200).json({
              message: "user verified successfully",
              username: user.Name,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    res.status(404).json({ message: "invalid Link" });
  }
};

// * Login controller
const login = async (req, res) => {
  const { Email, Password } = req.body;

  const user = await User.findOne({ Email: Email });

  //check user exists or not
  if (!user) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  //check user verified or not
  if (!user.isVerified) {
    return res.status(404).json({ message: "User not verified" });
  }

  //compare the password
  const isPasswordValid = await bcrypt.compare(Password, user.Password);

  if (!isPasswordValid) {
    return res.status(404).json({ message: "Password is incorrect" });
  }

  // !check for the deleted user(soft delete)
  if (user.IsDeleted) {
    return res.status(404).json({ message: "user has been deleted already" });
  }

  const _id = user._id;
  const token = createToken(_id);

  res.status(200).send({
    message: "Login successful",
    token: token,
  });
};

// ?get user by id for the protected routes
const getUser = async (req, res) => {
  const { User_Id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(User_Id)) {
    return res.status(404).json({ error: "No such User" });
  }

  const user = await User.findById(User_Id);

  if (!user) {
    return res.status(404).json("no such User");
  }

  return res.status(200).json({ success: true, data: user });
};

const getSingleUserBookedTickets = async (req, res) => {
  const { userid } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userid)) {
    return res.status(404).json({ error: "No such User" });
  }

  // const user = await User.findOne({ _id: userid });

  // //check user exists or not
  // if (!user) {
  //   return res.status(404).json({ message: "User doesn't exist" });
  // }

  const bookingDetails = await BookingMasterModel.find({ UserId: userid });

  // console.log(bookingDetails);

  return res.status(200).json({
    message: "Bookin Details Provided successfully",
    bookingDetails: bookingDetails,
  });
};

module.exports = {
  registerUser,
  accountVerify,
  login,
  getUser,
  getSingleUserBookedTickets,
};

// ! verifyEmail (old code)
// const verifyEmail = async (req, res) => {
//   const token = req.params.token;

//   console.log(token);
//   try {
//     if (!token) return res.status(401).json("EmailToken not found...");

//     const user = await User.findOne({ emailToken: token });

//     if (user) {
//       user.emailToken = null;
//       user.isVerified = true;

//       await user.save();

//       return res.redirect("http://localhost:3000/user/signin");
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error.message);
//   }
// };
