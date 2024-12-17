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
      errCode: -1,
      errMessage: 'Lỗi từ server',
      data: '',
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
      errCode: -1,
      errMessage: 'Lỗi từ server',
      data: '',
    });
  }
};

let handleGetBookingById = async (req, res) => {
  try {
    let id = req.query.id;
    let bookings = await BookingService.getBookingById(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: bookings,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Lỗi từ server',
      data: '',
    });
  }
};

let handleEditBooking = async (req, res) => {
  let data = req.body;
  let message = await BookingService.updateBooking(data);
  if (message?.errCode === 0) {
    req.app.get('io').emit('confirmSuccess');
  }
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
      errCode: -1,
      errMessage: 'Lỗi từ server',
      data: '',
    });
  }
};

const handleCaculateDailyUse = async (req, res) => {
  try {
    const { month, year } = req.query;
    let result = await BookingService.caculateDailyRoomUse(month, year);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Lỗi từ server',
      data: '',
    });
  }
};

const handleCaculateRevenue = async (req, res) => {
  try {
    const { month } = req.query;
    let result = await BookingService.caculateRevenue(month);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Lỗi từ server',
      data: '',
    });
  }
};

module.exports = {
  handleCreateBooking,
  handleGetBooking,
  handleGetBookingById,
  handleEditBooking,
  handleDeleteBooking,
  handleGetBookingByStatus,
  handleGetBookingSchedule,
  handleCaculateDailyUse,
  handleCaculateRevenue,
};
