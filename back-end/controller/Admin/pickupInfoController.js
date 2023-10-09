const PickupInfo = require("../../model/PickupInfoModel");



const addPickupInfo = async (req, res) => {
    const { StandId, RouteId, PlaceTime } = req.body;
    const pickupInfo = await PickupInfo.create({ StandId, RouteId, PlaceTime });
  
    if (pickupInfo) {
      res.status(200).send({
        messdage: "PickupStandInfo  created successfully... ",
        success: true,
        data: pickupInfo,
      });
    }
  };
  

module.exports = {addPickupInfo};