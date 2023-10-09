const PNRDetail = require("../../model/PNRDetailModel");

const createPNRDetail = async (req, res) => {
  const { CreatedBy, PNRNo, TotalAmount } = req.body;

  try {
    const newpnr = await new PNRDetail({
      CreatedBy,
      PNRNo,
      TotalAmount,
    });

    const pnrdetail = await newpnr.save();

    if (pnrdetail) {
      res.status(200).send({
        message: "successfully created PNRDetail",
        success: true,
        data: pnrdetail,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createPNRDetail };
