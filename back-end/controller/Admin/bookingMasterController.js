const BookingMaster = require("../../model/BookingMasterModel");

const createBooking = async (req, res) => {
  const {
    TrainId,
    UserId,
    ScheduleId,
    BoardingId,
    SeatNo,
    TravalDate,
    Origin,
    Destination,
  } = req.body;

  const booking = await BookingMaster.create({
    TrainId,
    UserId,
    ScheduleId,
    BoardingId,
    SeatNo,
    TravalDate,
    Origin,
    Destination,
  });

  if (booking) {
    res.status(200).send({
      message: "Booking created successfully..",
      success: true,
      data: booking,
    });
  }
};

module.exports = { createBooking };
