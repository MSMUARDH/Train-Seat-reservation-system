const TrainSchedule = require("../../model/ScheduleMasterModel");

const addTrainSchedule = async (req, res) => {
  const { EstimatedDuration, date, depatureTime, arrivalTime } = req.body;

  // console.log(req.params.trainid, req.params.routeid);

  try {
    // console.log(EstimatedDuration, date, depatureTime, arrivalTime);

    const [depHours, depMinutes] = depatureTime.split(":").map(Number);
    const [arrHours, arrMinutes] = arrivalTime.split(":").map(Number);
    const [dd, mm, yy] = date.split("-").map(Number);

    const validatedDepatureTime = new Date();
    const validatedarrivalTime = new Date();
    const validatedDate = new Date();

    // ?validated date
    validatedDate.setUTCDate(dd);
    validatedDate.setUTCMonth(mm);
    validatedDate.setUTCFullYear(yy);

    console.log("date", validatedDate);

    //? validated time for arrival
    validatedarrivalTime.setUTCHours(arrHours);
    validatedarrivalTime.setUTCMinutes(arrMinutes);
    validatedarrivalTime.setUTCSeconds(0);

    console.log("arr", validatedarrivalTime);

    //? validated time for depatureTime
    validatedDepatureTime.setUTCHours(depHours);
    validatedDepatureTime.setUTCMinutes(depMinutes);
    validatedDepatureTime.setUTCSeconds(0);

    console.log("dep", validatedDepatureTime);

    const isTrainScheduleExists = await TrainSchedule.find({
      RouteId: req.params.routeid,
    });
    if (isTrainScheduleExists == "") {
      const trainschedule = await TrainSchedule.create({
        TrainId: req.params.trainid,
        RouteId: req.params.routeid,
        Date: validatedDate,
        DepatureTime: validatedDepatureTime,
        ArrivalTime: validatedarrivalTime,
        EstimatedTime: EstimatedDuration,
      });

      // ! new code below
      const trainSchedules = await TrainSchedule.find({
        RouteId: trainschedule.RouteId,
      });

      if (trainSchedules != "") {
        // Create a formattedTrainSchedules array to store formatted data
        const formattedTrainSchedules = trainSchedules.map((schedule) => {
          // Format date and time here

          // console.log(schedule.Date);
          const fotmattedDate = new Date(schedule.Date);

          // console.log(fotmattedDate.getDate());
          // console.log(fotmattedDate.getMonth() + 1);
          // console.log(fotmattedDate.getUTCFullYear());

          const frmtdt = `${fotmattedDate.getDate()}-${
            fotmattedDate.getMonth() + 1
          }-${fotmattedDate.getUTCFullYear()}`;

          // console.log(frmtdt);

          // console.log(schedule.DepatureTime);
          // console.log(schedule.ArrivalTime);

          const formatTime = (dateTimeString) => {
            const startIndex = dateTimeString.indexOf("T") + 1;
            const endIndex = dateTimeString.indexOf(".");

            const timePart = dateTimeString.substring(startIndex, endIndex);
            return timePart.toString();
          };

          const formattedDepatureTime = formatTime(
            JSON.stringify(schedule.DepatureTime)
          );
          const formattedArrivalTime = formatTime(
            JSON.stringify(schedule.ArrivalTime)
          );

          // const { TrainId, RouteId, EstimatedTime } = schedule;

          return {
            _id: schedule._id,
            TrainId: schedule.TrainId,
            RouteId: schedule.RouteId,
            Date: frmtdt,
            DepatureTime: formattedDepatureTime,
            ArrivalTime: formattedArrivalTime,
            EstimatedTime: schedule.EstimatedTime,
          };
        });

        console.log("formated train shedule", formattedTrainSchedules);

        return res.status(200).send({
          message: "Train Schedule provided successfully...",
          success: true,
          data: formattedTrainSchedules,
        });
      } else {
        return res.status(404).send({
          message: "No train schedules found.",
          success: false,
        });
      }

      // ! old return
      // return res.status(200).send({
      //   message: "Train Schedule created successfully...",
      //   success: true,
      //   data: trainschedule,
      // });
    } else {
      return res.status(400).send({
        message: "Train Schedule already added...",
        success: false,
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      success: false,
    });
  }
};

// const getAllTrainSchedule = async (req, res) => {
//   try {
//     const trainSchedules = await TrainSchedule.find({});

//     if (trainSchedules != "") {
//       console.log(trainSchedules);

//       // return res.status(200).send({
//       //   message: "Train Schedule provided successfully...",
//       //   success: true,
//       //   data: trainSchedules,
//       // });
//     }
//   } catch (error) {
//     return res.status(400).send({
//       message: error.message,
//       success: false,
//     });
//   }
// };

const getScheduleDetailByRoute = async (req, res) => {
  const routeid = req.params.routeid;
  const trainid = req.params.trainid;

  try {
    const trainScheduleDetail = await TrainSchedule.find({
      RouteId: routeid,
      TrainId: trainid,
    });

    return res.status(200).send({
      message: "Train Schedule provided successfully...",
      success: true,
      data: trainScheduleDetail,
    });


  } catch (error) {
    return res.status(400).send({
      message: error.message,
      success: false,
    });
  }
};

const getAllTrainSchedule = async (req, res) => {
  try {
    const trainSchedules = await TrainSchedule.find({});

    if (trainSchedules != "") {
      // Create a formattedTrainSchedules array to store formatted data
      const formattedTrainSchedules = trainSchedules.map((schedule) => {
        // Format date and time here

        // console.log(schedule.Date);
        const fotmattedDate = new Date(schedule.Date);

        // console.log(fotmattedDate.getDate());
        // console.log(fotmattedDate.getMonth() + 1);
        // console.log(fotmattedDate.getUTCFullYear());

        const frmtdt = `${fotmattedDate.getDate()}-${
          fotmattedDate.getMonth() + 1
        }-${fotmattedDate.getUTCFullYear()}`;

        // console.log(frmtdt);

        // console.log(schedule.DepatureTime);
        // console.log(schedule.ArrivalTime);

        const formatTime = (dateTimeString) => {
          const startIndex = dateTimeString.indexOf("T") + 1;
          const endIndex = dateTimeString.indexOf(".");

          const timePart = dateTimeString.substring(startIndex, endIndex);
          return timePart.toString();
        };

        const formattedDepatureTime = formatTime(
          JSON.stringify(schedule.DepatureTime)
        );
        const formattedArrivalTime = formatTime(
          JSON.stringify(schedule.ArrivalTime)
        );

        // const { TrainId, RouteId, EstimatedTime } = schedule;

        return {
          _id: schedule._id,
          TrainId: schedule.TrainId,
          RouteId: schedule.RouteId,
          Date: frmtdt,
          DepatureTime: formattedDepatureTime,
          ArrivalTime: formattedArrivalTime,
          EstimatedTime: schedule.EstimatedTime,
        };
      });

      return res.status(200).send({
        message: "Train Schedule provided successfully...",
        success: true,
        data: formattedTrainSchedules,
      });
    } else {
      return res.status(404).send({
        message: "No train schedules found.",
        success: false,
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      success: false,
    });
  }
};

// !on tesing
// const getAllTrainSchedules = async (req, res) => {
//   try {
//     // Fetch all data from the document
//     const allData = await TrainSchedule.find({}); // Modify this query as needed

//     // Check if data was found
//     if (allData.length > 0) {
//       // Modify the data as needed
//       const modifiedData = allData.map((item) => {
//         return {
//           _id: item._id,
//           TrainId: item.TrainId,
//           RouteId: item.RouteId,
//           Date:,
//           DepatureTime:,
//           ArrivalTime:,
//           EstimatedTime:item.EstimatedTime,

//         };
//       });

//       // Send the modified data to the client
//       return res.status(200).json({
//         success: true,
//         message: "Data retrieved and modified successfully",
//         data: modifiedData,
//       });
//     } else {
//       return res.status(404).json({
//         success: false,
//         message: "No data found.",
//         data: null,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

//! need to implment
const updateTrainSchedule = async (req, res) => {};

//! need to implment
const deleteTrainSchedule = async (req, res) => {
  const { scheduleid } = req.params;

  console.log("Shedule id", scheduleid);

  try {
    const isTrainScheduleExist = await TrainSchedule.findOne({
      _id: scheduleid,
    });

    console.log("delete route", isTrainScheduleExist);

    if (isTrainScheduleExist != "") {
      const deletedScheduleDetails = await TrainSchedule.deleteMany({
        _id: scheduleid,
      });

      if (deletedScheduleDetails.acknowledged) {
        return res.status(200).send({
          message: "Shedule detail deleted success...",
          success: true,
          data: isTrainScheduleExist,
        });
      } else {
        return res.status(400).send({
          message: "something went wrong ",
          success: false,
        });
      }
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  addTrainSchedule,
  getAllTrainSchedule,
  updateTrainSchedule,
  deleteTrainSchedule,
  getScheduleDetailByRoute,
};
