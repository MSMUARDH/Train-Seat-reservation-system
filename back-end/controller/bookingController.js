const PickupInfoModel = require("../model/PickupInfoModel");
const ScheduleMasterModel = require("../model/ScheduleMasterModel");
const RouteDetailModel = require("../model/RouteDetailModel");
const ClassDetailModel = require("../model/SeatDetailModel");

const checkTrainAvailability = async (req, res) => {
  const { From, To, date } = req.body;

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

    console.log("start");

    await Promise.all(
      uniqueRoutId.map(async (routeId) => {
        // console.log(routeId.toHexString());

        // ! 1.initially check for the from station and take the RouteId of them
        const fromStationRouteOrder = await PickupInfoModel.find({
          RouteId: routeId,
          Station: From,
        }).distinct("RouteOrder");

        // console.log("from station", fromStationRouteOrder);

        // ! 2. check for the to station
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

          console.log("from station : new", fromStationDetails.RouteOrder);

          const ScheduleDetail = await ScheduleMasterModel.findOne({
            RouteId: fromStationDetails.RouteId,
          })
            .populate("TrainId")
            .populate("RouteId");

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
              console.log("Depature Time", fromStationDetails.Time);
              // !your station
              console.log("Your station", fromStationDetails.Station);
              // ! getTrain Id
              console.log(
                "TrainId",
                fromStationDetails.RouteId.TrainId.toHexString()
              );

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

              console.log(
                "frm station with cls details",
                fromStationClassDetails[0].RouteId.toHexString()
              );

              //!testing....

              const From = fromStationDetails.RouteId.From;
              const To = fromStationDetails.RouteId.To;

              const RouteId = fromStationClassDetails[0].RouteId.toHexString();
              const TrainId = fromStationDetails.RouteId.TrainId.toHexString();
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

  console.log(routeid, trainid, Station, RouteOrder);

  const fromStationDetails = await PickupInfoModel.find({
    RouteId: routeid,
    Station: Station,
    RouteOrder: RouteOrder,
  })
    .populate("SeatDetailId")
    .select("SeatDetailId Fair");

  console.log("from details", fromStationDetails);

  return res.status(200).send({
    message: "Class detail success...",
    success: true,
    data: fromStationDetails,
  });
};

const bookingTrain = async (req, res) => {
  const {} = req.body;
};

module.exports = { checkTrainAvailability, getTrainClassDetails };
