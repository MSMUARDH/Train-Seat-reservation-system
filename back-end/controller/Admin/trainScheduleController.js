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
      return res.status(200).send({
        message: "Train Schedule created successfully...",
        success: true,
        data: trainschedule,
      });
    }
    return res.status(400).send({
      message: "Train Schedule already added...",
      success: false,
    });
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

const getAllTrainSchedule = async (req, res) => {
  try {
    const trainSchedules = await TrainSchedule.find({});

    let Alldata;

    if (trainSchedules != "") {
      // Create a formattedTrainSchedules array to store formatted data
      const formattedTrainSchedules = trainSchedules.map((schedule) => {
        // Format date and time here

        console.log(schedule.Date);
        const fotmattedDate = new Date(schedule.Date);

        console.log(fotmattedDate.getDate());
        console.log(fotmattedDate.getMonth() + 1);
        console.log(fotmattedDate.getUTCFullYear());

        const frmtdt = `${fotmattedDate.getDate()}-${
          fotmattedDate.getMonth() + 1
        }-${fotmattedDate.getUTCFullYear()}`;

        console.log(frmtdt);

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

        const { TrainId, RouteId, EstimatedTime } = schedule;

        return {
          TrainId: TrainId,
          RouteId: RouteId,
          Date: frmtdt,
          DepatureTime: formattedDepatureTime,
          ArrivalTime: formattedArrivalTime,
          EstimatedTime: EstimatedTime,
        };

        // console.log(data);

        // Now, you can send the formatted data to the client
        // return res.status(200).send({
        //   message: "Train Schedule provided successfully...",
        //   success: true,
        //   data: Alldata,
        // });
      });

      return res.status(200).send({
        message: "Train Schedule provided successfully...",
        success: true,
        data: Alldata,
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

module.exports = { addTrainSchedule, getAllTrainSchedule };
