
// const addPickupInfo = async (req, res) => {
//   const { StandId, TrainId, RouteId, PlaceTime } = req.body;
//   try {
//     const isPickupStandExists = await PickupStand.find({ PlaceName });
//     if (isPickupStandExists == "") {
//       const pickupstand = await PickupStand.create({
//         PlaceName,
//       });
//       res.status(200).send({
//         message: "Pickup stand created successfully...",
//         success: true,
//         data: pickupstand,
//       });
//     }
//     res.status(400).send({
//       message: "Pickup stand already added...",
//       success: false,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// *Below function example for aggregation testing
// async function getSeatDetailWithTrainInfo(req, res) {
//   try {
//     const result = await SeatDeatil.aggregate([
//       {
//         $lookup: {
//           from: "trains", // Collection name for the "Train" model
//           localField: "TrainId",
//           foreignField: "_id",
//           as: "trainInfo",
//         },
//         $lookup: {
//           from: "classdetails", // Collection name for the "Train" model
//           localField: "ClassId",
//           foreignField: "_id",
//           as: "trainInfo",
//         },
//       },
//     ]);

//     res.send(result);
//   } catch (err) {
//     console.error("Error:", err);
//     throw err;
//   }
// }

module.exports = {
  //   getSeatDetailWithTrainInfo,
};
