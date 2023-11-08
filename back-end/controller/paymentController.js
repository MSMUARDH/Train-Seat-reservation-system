const CardDetail = require("../model/CardDetailModel");

const addPaymentDetails = async (req, res) => {
  const { OwnerName, CardNo, CVVNo, CardType, ExpDate } = req.body;

  console.log(OwnerName, CardNo, CVVNo, CardType, ExpDate);

  const isCardExist = await CardDetail.findOne({ CardNo });

  if (!isCardExist) {
    const carddetail = await CardDetail.create({
      OwnerName: OwnerName,
      CardNo: CardNo,
      CVVNo: CVVNo,
      CardType: CardType,
      ExpDate: ExpDate,
    });

    return res.status(200).json({ carddetail });
  }

  return res
    .status(400)
    .json({ message: "provided card detail alraedy added..." });
};

module.exports = { addPaymentDetails };
