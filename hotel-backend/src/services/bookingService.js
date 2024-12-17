import db from '../models/index';
import emailService from '../services/emailService';
import { combineDateTimeNative } from '../utils/CommonUtils';
import { Op } from 'sequelize';
import dayjs from 'dayjs';
import sequelize from 'sequelize';

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
        userId: data?.userId,
        typeroomId: data.typeroomId,
        timeCome: combineDateTimeNative(data.timeCome, time.timeCome),
        timeGo: combineDateTimeNative(data.timeGo, time.timeGo),
        price: data.price,
        status: data.status,
        paid: data?.paid || 0,
        orderCode: data?.orderCode,
        sale: data?.sale || 0,
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

let getBooking = async (userId) => {
  try {
    let bookings = '';
    if (userId === 'ALL') {
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
    if (userId && userId !== 'ALL') {
      bookings = await db.Booking.findAll({
        where: { userId: userId },
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

let getBookingById = async (id) => {
  try {
    const bookings = await db.Booking.findAll({
      where: { id: id },
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
          attributes: ['timeCome', 'timeGo', 'id'],
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
      roomName: room?.name,
      bookings: room?.roomData?.map((booking) => ({
        id: booking?.id,
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

const caculateDailyRoomUse = async (month, year) => {
  try {
    if (!month || !year) {
      return;
    }

    // Lấy ngày đầu và cuối tháng
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // Lấy tất cả phòng
    const totalRooms = await db.Room.count();
    if (totalRooms === 0) {
      return res.status(200).json({
        message: 'Không có phòng nào trong hệ thống.',
        data: [],
      });
    }

    // Khởi tạo kết quả
    const dailyUsage = [];

    // Duyệt qua từng ngày trong tháng
    for (let day = 1; day <= endDate.getDate(); day++) {
      const currentDayStart = new Date(year, month - 1, day, 0, 0, 0);
      const currentDayEnd = new Date(year, month - 1, day, 23, 59, 59);

      // Lấy danh sách booking trong ngày
      const bookings = await db.Booking.findAll({
        where: {
          [Op.or]: [
            { timeCome: { [Op.between]: [currentDayStart, currentDayEnd] } },
            { timeGo: { [Op.between]: [currentDayStart, currentDayEnd] } },
            {
              timeCome: { [Op.lte]: currentDayStart },
              timeGo: { [Op.gte]: currentDayEnd },
            },
          ],
        },
      });

      // Tổng số phòng được sử dụng trong ngày
      const usedRooms = bookings.length;

      // Tính công suất sử dụng
      const usagePercentage = ((usedRooms / totalRooms) * 100).toFixed(2);

      dailyUsage.push({
        date: `${year}-${month}-${day}`,
        usedRooms,
        totalRooms,
        usagePercentage: `${usagePercentage}`,
      });
    }

    return {
      month,
      year,
      dailyUsage,
    };
  } catch (error) {
    console.error(error);
  }
};

const caculateRevenue = async (month) => {
  try {
    // Lấy tất cả các ngày trong tháng
    const startDate = dayjs(`${month}-01`).startOf('month');
    const endDate = dayjs(`${month}-01`).endOf('month');
    const daysInMonth = [];
    for (let day = startDate; day.isBefore(endDate); day = day.add(1, 'day')) {
      daysInMonth.push(day.format('YYYY-MM-DD')); // Thêm tất cả các ngày trong tháng vào mảng
    }
    // Truy vấn dữ liệu doanh thu
    const revenueData = await db.Booking.findAll({
      attributes: [
        [sequelize.fn('DATE', sequelize.col('updatedAt')), 'day'], // Nhóm theo ngày cập nhật
        [sequelize.fn('SUM', sequelize.col('price')), 'totalRevenue'],
      ],
      where: {
        status: '3', // Lọc theo status = 3
        updatedAt: {
          [Op.gte]: startDate.toDate(), // Tính từ đầu tháng
          [Op.lte]: endDate.toDate(), // Đến cuối tháng
        },
      },
      group: [sequelize.fn('DATE', sequelize.col('updatedAt'))], // Nhóm theo ngày của updatedAt
      raw: true,
    });

    // Tạo một đối tượng để lưu trữ doanh thu của mỗi ngày
    const revenueMap = {};
    revenueData.forEach((item) => {
      revenueMap[item.day] = item.totalRevenue;
    });

    // Tạo danh sách kết quả với doanh thu mỗi ngày, nếu không có doanh thu thì gán là 0
    const result = daysInMonth.map((day) => ({
      day,
      totalRevenue: revenueMap[day] || 0, // Nếu không có doanh thu cho ngày, gán là 0
    }));

    return {
      month,
      revenueData: result,
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createNewBooking,
  getBooking,
  updateBooking,
  deleteBooking,
  getBookingByStatus,
  getBookingSchedule,
  caculateDailyRoomUse,
  caculateRevenue,
  getBookingById,
};
