import db from '../models/index';
import emailService from '../services/emailService';
import { combineDateTimeNative } from '../utils/CommonUtils';
import { Op } from 'sequelize';

let createNewBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const timeSetting = await db.Setting.findOne({ order: [['updatedAt', 'DESC']] });
      const time = timeSetting
        ? timeSetting
        : {
            timeCome: '14:00:00',
            timeGo: '12:00:00',
          };
      const booking = await db.Booking.create({
        userId: data.userId,
        typeroomId: data.typeroomId,
        timeCome: combineDateTimeNative(data.timeCome, time.timeCome),
        timeGo: combineDateTimeNative(data.timeGo, time.timeGo),
        price: data.price,
        status: data.status,
      });
      if (data.services) {
        const dataService = data.services.map((item) => {
          return {
            bookingId: booking.id,
            serviceId: item.id,
            quantity: 1,
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
      bookings = await db.Booking.findAll({
        where: {
          status: {
            [Op.ne]: '0', // Lấy các booking có status khác '0'
          },
        },
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
            model: db.Room,
            as: 'roomData',
          },
          {
            model: db.Service,
            through: { attributes: [] }, // Lấy thông tin dịch vụ mà không cần thông tin từ bảng BookingService
            as: 'services',
          },
        ],
      });
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
          model: db.Room,
          as: 'roomData',
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

let getBookingSchedule = async () => {
  try {
    // Fetch rooms with their bookings
    const rooms = await db.Room.findAll({
      include: [
        {
          model: db.Booking,
          as: 'roomData',
          attributes: ['timeCome', 'timeGo'],
          include: [
            {
              model: db.User,
              as: 'bookingData',
              attributes: ['name', 'email'], // Only fetch name and email from User
            },
          ],
        },
      ],
      order: [['id', 'ASC']],
    });

    // Format the data
    const result = rooms?.map((room) => ({
      id: room?.name,
      bookings: room?.roomData?.map((booking) => ({
        timeCome: booking?.timeCome,
        timeGo: booking?.timeGo,
        name: booking?.bookingData?.name || booking?.bookingData?.email,
      })),
    }));

    return result;
  } catch (error) {
    console.error('Error fetching room bookings:', error);
  }
};

module.exports = {
  createNewBooking,
  getBooking,
  updateBooking,
  deleteBooking,
  getBookingByStatus,
  getBookingSchedule,
};
