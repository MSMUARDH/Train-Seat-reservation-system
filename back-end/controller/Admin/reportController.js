// const PickupInfoModel = require("../model/PickupInfoModel");
const ScheduleMasterModel = require("../../model/ScheduleMasterModel");
const CardDetailModel = require("../../model/CardDetailModel");
const BookingModel = require("../../model/BookingMasterModel");
const TrainModel = require("../../model/TrainModel");

const getIncomeDetailsByTrain = async (req, res) => {
  const bookedTrainId = await BookingModel.find()
    .select("TrainId")
    .distinct("TrainId");

  let totalAmountDetails = [];

  await Promise.all(
    bookedTrainId.map(async (trainid) => {
      const trainFair = await BookingModel.find({ TrainId: trainid })
        .select("TrainId TotalAmount")
        .populate("TrainId");

      // Create an object to store the total amount for each TrainId
      const totalAmounts = {};

      // Iterate over the data and calculate the total amount for each TrainId
      trainFair.forEach((item) => {
        const { TrainId, TotalAmount } = item;
        if (totalAmounts[TrainId]) {
          totalAmounts[TrainId].TotalAmount += TotalAmount;
        } else {
          totalAmounts[TrainId] = {
            TotalAmount,
            TrainName: item.TrainId.TrainName,
          };
        }
      });

      // Convert the result into an array of objects
      const result = Object.values(totalAmounts);

      totalAmountDetails.push(result);
    })
  );

  if (totalAmountDetails != "") {
    // console.log("end", AvailabilityDetails);
    return res.status(200).send({
      message: "Amount by Train Privided success",
      totalAmountDetails: totalAmountDetails,
    });
  } else {
    return res.status(404).send({
      message: "no any Schedule found",
    });
  }
};

const getIncomeDetail = async (req, res) => {
  const { date } = req.query;

  console.log(date);

  try {
    const providedMonth = date; //? month from selection Format: MM-YYYY

    // Extract month and year from the provided month
    const [year, month] = providedMonth.split("-").map(Number);

    console.log("month", month, "year", year);

    // Get the start date of the provided month
    const startDate = new Date(year, month - 1, 2);

    // console.log("startDate", startDate);

    // Get the end date of the provided month
    const endDate = new Date(year, month);

    const bookingDetails = await BookingModel.find({
      createdDate: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .select("TrainId RouteId TotalAmount createdDate")
      .populate("TrainId RouteId");

    let detailsForReport = [];

    await Promise.all(
      bookingDetails.map((detail) => {
        const trainName = detail.TrainId.TrainName;
        const trainNo = detail.TrainId.TrainNo;
        const bookedDate = detail.createdDate;
        const trainRoute = `${detail.RouteId.From} - ${detail.RouteId.To}`;
        const amount = detail.TotalAmount;

        const datasum = { trainName, trainNo, bookedDate, trainRoute, amount };

        detailsForReport.push(datasum);
      })
    );

    if (detailsForReport != "") {
      // console.log("end", AvailabilityDetails);
      return res.status(200).send({
        message: "Detail provided success...",
        detailsForReport: detailsForReport,
      });
    } else {
      return res.status(404).send({
        message: "no detail found",
      });
    }
  } catch (error) {
    console.log(error);
  }

  //?booked ticket income will be calculated by booked date time
  //?we need to calculate the total amount between a specific month like feb-1 to feb 38

  // const bookingDetails = await BookingModel.find()
};

const getIncomeByRoute = async (req, res) => {};

module.exports = {
  getIncomeDetail,
  getIncomeDetailsByTrain,
};
