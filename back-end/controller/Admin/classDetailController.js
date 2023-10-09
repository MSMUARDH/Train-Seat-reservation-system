// const ClassDetail = require("../../model/ClassDetailModel");

// const addClassDetail = async (req, res) => {
//   const { ClassName } = req.body;

//   try {
//     const trainClassDetail = await ClassDetail.create({ ClassName });

//     if (trainClassDetail) {
//       res.status(200).send({
//         message: "Train Class created successfully...",
//         success: true,
//         data: trainClassDetail,
//       });
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const getClassDetails = async (req, res) => {
//   try {
//     const classes = await ClassDetail.find({});

//     if (classes) {
//       res.status(200).send({
//         //   message: "Train Class created successfully...",
//         success: true,
//         data: classes,
//       });
//     } else {
//       res.status(400).send("Classes not found");
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// module.exports = {addClassDetail,getClassDetails};
