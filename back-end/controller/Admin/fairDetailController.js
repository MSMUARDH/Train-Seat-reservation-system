const FairDetail = require("../../model/FairDetailModel");

const addFairDetail = async (req, res) => {
  const { PickupStandInfoId, ClassId, Fair } = req.body;

  const fairDetail = await FairDetail.create({
    PickupStandInfoId,
    ClassId,
    Fair,
  });

  if (fairDetail) {
    res.status(200).send({
      messdage: "Fairdetail created successfully...",
      success: true,
      data: fairDetail,
    });
  }
};

module.exports = { addFairDetail };
