const PickupStand = require("../../model/PickupStandModel");

const addPickupStand = async (req, res) => {
  let { PlaceName } = req.body;

  PlaceName = PlaceName.toLowerCase();

  try {
    const isPickupStandExists = await PickupStand.find({ PlaceName });
    if (isPickupStandExists == "") {
      const pickupstand = await PickupStand.create({
        PlaceName,
      });
      res.status(200).send({
        message: "Pickup stand created successfully...",
        success: true,
        data: pickupstand,
      });
    }
    res.status(400).send({
      message: "Pickup stand already added...",
      success: false,
    });
  } catch (error) {
    console.log(error.message);
  }
};


// const UpdatePickupStand = async (req, res) => {
//     try {
//         const { } = req.body;
//     //   const
//   } catch (error) {}
// };

module.exports = { addPickupStand };
