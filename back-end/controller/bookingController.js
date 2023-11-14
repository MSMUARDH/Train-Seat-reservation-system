const PickupInfoModel = require("../model/PickupInfoModel");
const ScheduleMasterModel = require("../model/ScheduleMasterModel");
const RouteDetailModel = require("../model/RouteDetailModel");
const ClassDetailModel = require("../model/SeatDetailModel");
const CardDetailModel = require("../model/CardDetailModel");
const BookingModel = require("../model/BookingMasterModel");

const checkTrainAvailability = async (req, res) => {
  const { From, To, date } = req.body;

  // console.log("date test", date);

  try {
    // !check for the from station available
    // const FromStation = await PickupInfoModel.find({
    //   Station: From,
    // })
    //   .populate("SeatDetailId")
    //   .populate("RouteId");

    // console.log("From station details", FromStation);`

    // !test

    let AvailabilityDetails = [];

    const uniqueRoutId = await PickupInfoModel.find({ Station: From }).distinct(
      "RouteId"
    );

    // console.log("start");

    await Promise.all(
      uniqueRoutId.map(async (routeId) => {
        // console.log(routeId.toHexString());

        const fromStationRouteOrder = await PickupInfoModel.find({
          RouteId: routeId,
          Station: From,
        }).distinct("RouteOrder");

        // console.log("from station", fromStationRouteOrder);

        const toStationRouteOrder = await PickupInfoModel.find({
          RouteId: routeId,
          Station: To,
        }).distinct("RouteOrder");

        // console.log("to station", toStationRouteOrder);

        // console.log(toStationRouteOrder > fromStationRouteOrder);

        if (toStationRouteOrder > fromStationRouteOrder) {
          const fromStationDetails = await PickupInfoModel.findOne({
            RouteId: routeId,
            Station: From,
            RouteOrder: fromStationRouteOrder,
          })
            .populate("RouteId")
            .populate("SeatDetailId");

          // console.log("from station : new", fromStationDetails.RouteOrder);

          const ScheduleDetail = await ScheduleMasterModel.findOne({
            RouteId: fromStationDetails.RouteId,
          })
            .populate("TrainId")
            .populate("RouteId");

          // console.log("date test shedule", ScheduleDetail.Date);

          if (ScheduleDetail != "") {
            // console.log("inside shdule", ScheduleDetail.Date);
            const fotmattedDate = new Date(ScheduleDetail.Date);
            const frmtdt = `${fotmattedDate.getDate()}-${
              fotmattedDate.getMonth() + 1
            }-${fotmattedDate.getUTCFullYear()}`;

            // console.log("shdl", frmtdt);
            // console.log("mydate", date);

            if (frmtdt == date) {
              // AvailabilityDetails.push(fromStationDetails);

              const classType = await ClassDetailModel.find({
                TrainId: fromStationDetails.RouteId.TrainId,
              })
                .populate("TrainId")
                .select("_id ClassType TrainNo TrainType TrainName");
              // .lean()
              // .exec();

              // ! Departure Time
              // console.log("Depature Time", fromStationDetails.Time);
              // !your station
              // console.log("Your station", fromStationDetails.Station);
              // ! getTrain Id
              // console.log(
              //   "TrainId",
              //   fromStationDetails.RouteId.TrainId.toHexString()
              // );

              // ! gett All classes related to the train

              // ! commented now(3.29)
              // const classes = await ClassDetailModel.find({
              //   TrainId: fromStationDetails.RouteId.TrainId,
              // }).select("_id ClassType");

              //!testing....

              const fromStationClassDetails = await PickupInfoModel.find({
                RouteId: routeId,
                Station: req.body.From,
                RouteOrder: fromStationRouteOrder,
              }).select("RouteId SeatDetailId ClassType Fair");

              // console.log(
              //   "frm station with cls details",
              //   fromStationClassDetails[0].RouteId.toHexString()
              // );

              //!testing....  test above

              const From = fromStationDetails.RouteId.From;
              const To = fromStationDetails.RouteId.To;

              // !testing
              console.log("ScheduleId", ScheduleDetail._id);
              ////!

              const RouteId = fromStationClassDetails[0].RouteId.toHexString();
              const TrainId = fromStationDetails.RouteId.TrainId.toHexString();
              const ScheduleId = ScheduleDetail._id;
              const RouteOrder = fromStationDetails.RouteOrder;
              const TrainNo = classType[0].TrainId.TrainNo;
              const TrainType = classType[0].TrainId.TrainType;
              const TrainName = classType[0].TrainId.TrainName;
              const MainRoute = `${From} - ${To}`;
              const station = fromStationDetails.Station;
              const depatureTime = fromStationDetails.Time;

              const data = {
                RouteId,
                TrainId,
                ScheduleId,
                TrainNo,
                TrainName,
                TrainType,
                MainRoute,
                depatureTime,
                station,
                //! classes, (commented 3.29 pm)
                fromStationClassDetails,
                RouteOrder,
              };
              // console.log(data);

              AvailabilityDetails.push(data);

              // console.log("All classes", classes);
              // console.log("from Station Details", fromStationDetails);
              // console.log("Main Route", MainRoute);
              // console.log("cls type", classType);
              // console.log("train no", classType[0].TrainId.TrainNo);
              // console.log("train type", classType[0].TrainId.TrainType);
              // console.log("train name", classType[0].TrainId.TrainName);
              // console.log("From", fromStationDetails.RouteId.From);
              // console.log("To", fromStationDetails.RouteId.To);
              // console.log("date matched...");

              // ! Please consider about seat availability
            }
          }
        }
      })
    );

    if (AvailabilityDetails != "") {
      // console.log("end", AvailabilityDetails);
      return res.status(200).send({
        message: "PickupStandInfo for the route provided success",
        success: true,
        data: AvailabilityDetails,
      });
    } else {
      return res.status(404).send({
        message: "no any Schedule found",
      });
    }

    //! ///// //////// //////// ///////// //////// //////////// //////////// /////////

    // const toStation = await PickupInfoModel.findOne({
    //   RouteId: routeId.toHexString(),
    //   Station: To,
    // }).distinct("RouteId");

    // if (toStation != "") {
    //   console.log("Tostation", toStation[0].toHexString());

    //   if (toStation[0].toHexString() == routeId.toHexString()) {
    //     console.log("Station matches");

    //     const stationDetails = await PickupInfoModel.findOne({
    //       RouteId: routeId.toHexString(),
    //       Station: From,
    //     })
    //       .populate("SeatDetailId")
    //       .populate("RouteId");

    //     if (stationDetails != "") {
    //       const ScheduleDetail = await ScheduleMasterModel.findOne({
    //         RouteId: routeId,
    //       }).populate("TrainId");

    //       console.log("Shedule", ScheduleDetail.Date);

    //       if (ScheduleDetail != "") {
    //         const fotmattedDate = new Date(ScheduleDetail.Date);

    //         const frmtdt = `${fotmattedDate.getDate()}-${
    //           fotmattedDate.getMonth() + 1
    //         }-${fotmattedDate.getUTCFullYear()}`;

    //         if (date == frmtdt) {
    //           console.log("Date matched...");
    //           // !!!!!!!!! Start here
    //           // console.log("succss", stationDetails);
    //           AvailabilityDetails.push(stationDetails);
    //         }
    //       }
    //     }
    //   }

    //   if (AvailabilityDetails != "") {
    //     console.log("Array", AvailabilityDetails);
    //   }
    // }
    // });

    // if (FromStation != "") {
    // console.log(FromStation.RouteId.TrainId.TrainNo);
    // console.log(FromStation.RouteId.TrainId.TrainType);

    // const trainNo = FromStation.RouteId.TrainId.TrainNo;
    // const trainType = FromStation.RouteId.TrainId.TrainType;
    // const MainRoute = `${FromStation.RouteId.From}-${FromStation.RouteId.To}`;
    //? trainName = trainNo+trainType+MainRoute

    //* Departs
    //* Arrives

    // ! take the class type and the fair for the station
    // ! this function will work only for find() method not findOne
    // const FairDetail = FromStation.map(({ ClassType, Fair }) => ({
    //   ClassType,
    //   Fair,
    // }));

    // console.log(FairDetail);

    //   if (ToStation != "") {
    //     // !Check for the Schedule Detail
    //     const routeId = FromStation.RouteId._id.toHexString();

    //     // console.log("testing", routeId);

    //     const ScheduleDetail = await ScheduleMasterModel.findOne({
    //       RouteId: routeId,
    //     }).populate("TrainId");

    //     // console.log("Schedule Details", ScheduleDetail);

    //     const fotmattedDate = new Date(ScheduleDetail.Date);

    //     const frmtdt = `${fotmattedDate.getDate()}-${
    //       fotmattedDate.getMonth() + 1
    //     }-${fotmattedDate.getUTCFullYear()}`;

    //     if (frmtdt == date) {
    //       return res.status(200).send({
    //         message:
    //           "we have pass all the test now we can provide the schedule",
    //         success: true,
    //         // data: formattedTrainSchedules,
    //       });
    //     } else {
    //       return res.status(404).send({
    //         message: "No Train Schedule Found",
    //         success: false,
    //         data: "",
    //       });
    //     }
    //   } else {
    //     return res.status(404).send({
    //       message:
    //         "Specified destination station is not available for this route",
    //       success: false,
    //       data: "",
    //     });
    //   }
    // } else {
    //   return res.status(404).send({
    //     message: "No any Schedule for this Station",
    //     success: false,
    //     data: "",
    //   });
    // }

    // console.log();

    // console.log(FromStation.RouteId);
    // // !check for the To station availabl
    // const ToStation = await PickupInfoModel.findOne({ Station: To });

    // console.log(
    //   FromStation.RouteId.toHexString() == ToStation.RouteId.toHexString()
    // );

    // //! if both station are in the same id
    // if (FromStation.RouteId.toHexString() == ToStation.RouteId.toHexString()) {
    //   //! take the from station time
    //   const classDetails = await ClassDetailModel.find({
    //     _id: FromStation.SeatDetailId,
    //   });

    //   console.log(classDetails);

    //   const RouteDetail = await RouteDetailModel.find({
    //     _id: FromStation.RouteId.toHexString(),
    //   });
    //   console.log(RouteDetail);

    //   const scheduleDetail = await ScheduleMasterModel.find({
    //     RouteId: FromStation.RouteId.toHexString(),
    //   });

    //   console.log(scheduleDetail);
  } catch (error) {
    console.log("error", error.message);
  }
};

const getTrainClassDetails = async (req, res) => {
  const { routeid, trainid, Station, RouteOrder } = req.body;

  // console.log(routeid, trainid, Station, RouteOrder);

  const fromStationDetails = await PickupInfoModel.find({
    RouteId: routeid,
    Station: Station,
    RouteOrder: RouteOrder,
  })
    .populate("SeatDetailId")
    .select("SeatDetailId Fair");

  // console.log("from details", fromStationDetails);

  return res.status(200).send({
    message: "Class detail success...",
    success: true,
    data: fromStationDetails,
  });
};

const bookingTrain = async (req, res) => {
  const { trainDetails, seatSelection } = req.body;

  try {
    console.log("seat Selection details", seatSelection);

    const isCardDetailExist = await CardDetailModel.findOne({
      CardNo: req.body.enteredCardNumber.cardNumber,
      CVVNo: req.body.enteredCardNumber.cvv,
    });

    if (!isCardDetailExist) {
      return res.status(404).json({ message: "Invalid Card details" });
    }

    // Extract number values from the 'selectedSeats' string

    console.log("trainDetails", trainDetails);

    // ! dont need to convert selected seat
    // const seatNumbers = seatSelection.selectedSeats
    //   .split(",")
    //   .map((seat) => parseInt(seat));
    // console.log(seatNumbers); // Output: [14, 18]seat
    // !

    // !seat count to ruduce from the total count
    console.log("seat count", seatSelection.selectedSeats.length);

    // console.log("testing", {
    //   RouteId: trainDetails.routeId,
    //   TrainId: trainDetails.trainId,
    //   ClassType: seatSelection.class,
    // });

    const classDetails = await ClassDetailModel.findOne({
      RouteId: trainDetails.routeId,
      TrainId: trainDetails.trainId,
      ClassType: seatSelection.class,
    });

    // console.log("BookedSeats", classDetails.BookedSeats);
    // console.log("AvailableSeats", classDetails.AvailableSeats);
    // console.log("TotalSeats", classDetails.TotalSeats);

    // // Split the original string into day, month, and year parts
    const [day, month, year] = trainDetails.depatureDate.split("-");

    // Create a new Date object in the format YYYY-MM-DD
    const formattedTravalDate = new Date(`${year}-${month}-${day}`);

    console.log(formattedTravalDate);

    // !testing

    if (isCardDetailExist && classDetails) {
      await BookingModel.create({
        UserId: "654b43522f3020a526b6f42c",
        ScheduleId: trainDetails.ScheduleId,
        TravalDate: formattedTravalDate,
        TrainId: trainDetails.trainId,
        RouteId: trainDetails.routeId,
        BookedSeatNo: seatSelection.selectedSeats,
        // * we can add the Passenger count here
        Origin: trainDetails.startStation,
        ClassType: seatSelection.class,
        Destination: trainDetails.endStation,
        TotalAmount: seatSelection.totalFair,
      })
        .then(async (bookedDetails) => {
          console.log("Booking created successfully:", bookedDetails);
          // Do something with the created booking details

          let updatedBookedSeat =
            classDetails.BookedSeats + seatSelection.selectedSeats.length;
          let updatedAvailableSeats =
            classDetails.AvailableSeats - seatSelection.selectedSeats.length;

          // console.log(updatedBookedSeat, updatedAvailableSeats, updatedTotalSeats);

          const updatedClassDetail = await ClassDetailModel.findByIdAndUpdate(
            classDetails._id,

            {
              BookedSeats: updatedBookedSeat,
              AvailableSeats: updatedAvailableSeats,
            }
          );

          if (updatedClassDetail) {
            return res.status(200).send({
              message: "Seat reservation successful...",
              data: bookedDetails,
            });
            // console.log("updatedClassDetail", updatedClassDetail);
          }
        })
        .catch((error) => {
          console.error("Error creating booking:", error);
          // Handle errors during booking creation
        });
    }

    //!

    // if (isCardDetailExist) {
    //   const bookedDetails = await BookingModel.create({
    //     UserId: "654b43522f3020a526b6f42c",
    //     ScheduleId: trainDetails.ScheduleId,
    //     TravalDate: formattedTravalDate,
    //     TrainId: trainDetails.trainId,
    //     RouteId: trainDetails.routeId,
    //     BookedSeatNo: seatNumbers,
    //     Origin: trainDetails.startStation,
    //     ClassType: seatDetails.class,
    //     Destination: trainDetails.endStation,
    //     TotalAmount: seatDetails.totalFair,
    //   });

    //   console.log("Booking created succes", bookedDetails);
    // }
  } catch (error) {
    console.log(error);
  }

  // return res.status(200).send({
  //   message: "Provided card details wrong",
  //   data: isCardDetailExist,
  // });

  // if (!isCardDetailExist) {
  //   return res.status(404).send({
  //     message: "Provided card details wrong",
  //   });
  // }
};

const getBookedSeatDetails = async (req, res) => {
  const { ScheduleId, trainId, routeId, classtype } = req.body;

  console.log(ScheduleId, trainId, routeId, classtype);

  // ?get already  booked seat detail logic
  const bookedseatDetails = await BookingModel.find({
    TrainId: trainId,
    RouteId: routeId,
    ScheduleId: ScheduleId,
    ClassType: classtype,
  });

  // Create an array to collect all BookedSeatNo values
  const allBookedSeats = [];

  // Loop through the bookings and collect BookedSeatNo values
  bookedseatDetails.forEach((booking) => {
    allBookedSeats.push(...booking.BookedSeatNo);
  });

  // Convert string array elements to numbers
  const convertedAllBookedSeats = allBookedSeats.map(Number);

  console.log(convertedAllBookedSeats);

  return res.status(200).send({
    success: true,
    BookedSeats: convertedAllBookedSeats,
  });
};

module.exports = {
  checkTrainAvailability,
  getTrainClassDetails,
  bookingTrain,
  getBookedSeatDetails,
};
