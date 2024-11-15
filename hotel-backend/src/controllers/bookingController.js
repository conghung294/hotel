import BookingService from '../services/bookingService';

let handleCreateBooking = async (req, res) => {
  let message = await BookingService.createNewBooking(req.body);
  return res.status(200).json(message);
};

let handleGetBooking = async (req, res) => {
  try {
    let id = req.query.id;
    let Bookings = await BookingService.getBooking(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: Bookings,
    });
  } catch (e) {
    return res.status(500).json({
      EM: 'error from sever',
      EC: '-1',
      DT: '',
    });
  }
};

let handleGetBookingByStatus = async (req, res) => {
  try {
    let status = req.query.status;
    let bookings = await BookingService.getBookingByStatus(status);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: bookings,
    });
  } catch (e) {
    return res.status(500).json({
      EM: 'error from sever',
      EC: '-1',
      DT: '',
    });
  }
};

let handleEditBooking = async (req, res) => {
  let data = req.body;
  let message = await BookingService.updateBooking(data);
  return res.status(200).json(message);
};

let handleDeleteBooking = async (req, res) => {
  if (!req.body.id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: 'Missing parameter',
    });
  }
  let message = await BookingService.deleteBooking(req.body.id);
  return res.status(200).json(message);
};

let handleGetBookingSchedule = async (req, res) => {
  try {
    let Bookings = await BookingService.getBookingSchedule();
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: Bookings,
    });
  } catch (e) {
    return res.status(500).json({
      EM: 'error from sever',
      EC: '-1',
      DT: '',
    });
  }
};

module.exports = {
  handleCreateBooking,
  handleGetBooking,
  handleEditBooking,
  handleDeleteBooking,
  handleGetBookingByStatus,
  handleGetBookingSchedule,
};
