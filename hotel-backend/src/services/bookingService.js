import db from '../models/index';
import emailService from '../services/emailService';

let createNewBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const booking = await db.Booking.create({
        userId: data.userId,
        typeroomId: data.typeroomId,
        timeCome: data.timeCome,
        timeGo: data.timeGo,
        price: data.price,
        status: data.status,
      });
      if (data.services) {
        const dataService = data.services.map((item) => {
          return {
            bookingId: booking.id,
            serviceId: item.id,
          };
        });

        await db.BookingService.bulkCreate(dataService);
      }

      resolve({
        errCode: 0,
        message: 'OK',
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getBooking = async (bookingId) => {
  try {
    let bookings = '';
    if (bookingId === 'ALL') {
      bookings = await db.Booking.findAll();
    }
    if (bookingId && bookingId !== 'ALL') {
      bookings = await db.Booking.findOne({
        where: { id: bookingId },
      });
    }
    return bookings;
  } catch (e) {
    console.log(e);
  }
};

let getBookingByStatus = async (status) => {
  try {
    const bookings = await db.Booking.findAll({
      where: { status: status },
      include: [
        {
          model: db.User,
          as: 'bookingData',
        },
        {
          model: db.Roomtype,
          as: 'typeData',
        },
        {
          model: db.Service,
          through: { attributes: [] }, // Lấy thông tin dịch vụ mà không cần thông tin từ bảng BookingService
          as: 'services',
        },
      ],
    });

    return bookings;
  } catch (e) {
    console.log(e);
  }
};

let updateBooking = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 2,
        errMessage: 'Missing parameter',
      };
    }
    let booking = await db.Booking.findOne({
      where: { id: data.id },
      raw: false,
    });
    if (booking) {
      booking.roomId = data.roomId;
      booking.status = data.status;

      await booking.save();

      await emailService.sendSimpleEmail(data.data);
      return {
        errCode: 0,
        message: 'Updated successfully',
      };
    } else {
      return {
        errCode: 1,
        errMessage: 'Booking not found',
      };
    }
  } catch (e) {
    console.log(e);
  }
};

let deleteBooking = async (id) => {
  try {
    let booking = await db.Booking.findOne({
      where: { id: id },
    });
    if (!booking) {
      return {
        errCode: 2,
        errMessage: 'Booking not exist',
      };
    }

    await db.Booking.destroy({
      where: { id: id },
    });

    return {
      errCode: 0,
      message: 'Booking deleted',
    };
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createNewBooking,
  getBooking,
  updateBooking,
  deleteBooking,
  getBookingByStatus,
};
