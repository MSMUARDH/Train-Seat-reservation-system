require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require("cors");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./model/UserModel");

app.use(cors());
app.use(
  cors({
    origin: "http://localhost:4511", // Replace with your frontend URL
    methods: "GET,POST,PUT,DELETE", // Specify the HTTP methods you want to allow
    allowedHeaders: "Content-Type, Authorization", // Specify the headers you want to allow
  })
);

const userRoutes = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use(express.json());

// app.get("/api/test", (req, res) => {
//   res.send("hi");
//   console.log("hello");
// });

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);

// !below code authorization
// app.get("/post", authenticateToken, (req, res) => {
//   const post = posts.filter((post) => post.username === req.user.name);
//   res.json(post);
// });

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

const port = process.env.PORT || 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/Project")
  .then(() =>
    app.listen(port, () => {
      console.log("MongoDB connected success....");
      console.log(`app is listening on port ${port}.....`);
    })
  )
  .catch((err) => console.error("Could not connect to MongoDB", err.message));
