import db from '../models/index';
import { Op } from 'sequelize';
import { combineDateTimeNative } from '../utils/CommonUtils';

let createNewRoom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Room.create({
        name: data.name,
        status: data.status,
        typeId: data.typeId,
        status: '1',
      });

      let roomtype = await db.Roomtype.findOne({
        where: { id: data.typeId },
        raw: false,
      });
      if (roomtype) {
        roomtype.quantity = roomtype.quantity + 1;
        await roomtype.save();
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

// let getRoom = async (roomId) => {
//   try {
//     let rooms = '';
//     if (roomId === 'ALL') {
//       rooms = await db.Room.findAll({
//         include: [
//           {
//             model: db.Roomtype,
//             as: 'roomtypeData',
//             attributes: ['name', 'price'],
//             nested: false,
//           },
//         ],
//       });
//     }
//     if (roomId && roomId !== 'ALL') {
//       rooms = db.Room.findOne({
//         where: { id: typeId },
//       });
//     }
//     return rooms;
//   } catch (e) {
//     console.log(e);
//   }
// };

let getRoom = async (roomId) => {
  try {
    let rooms = '';
    if (roomId === 'ALL') {
      // Lấy giá trị comeFirst từ bản ghi Setting mới nhất
      const setting = await db.Setting.findOne({
        order: [['updatedAt', 'DESC']],
      });

      let comeFirst = setting?.comeFirst || '06:00:00';

      // Chuyển đổi comeFirst thành khoảng thời gian
      const [hours, minutes, seconds] = comeFirst.split(':').map(Number);
      const currentTime = new Date();
      const adjustedTime = new Date(currentTime.getTime());
      adjustedTime.setHours(currentTime.getHours() + hours);
      adjustedTime.setMinutes(currentTime.getMinutes() + minutes);
      adjustedTime.setSeconds(currentTime.getSeconds() + seconds);

      rooms = await db.Room.findAll({
        order: [['id', 'ASC']],
        include: [
          {
            model: db.Booking,
            as: 'roomData',
            where: {
              timeCome: {
                [Op.between]: [currentTime, adjustedTime],
              },
              status: 1,
            },
            include: [
              {
                model: db.User,
                as: 'bookingData',
              },
            ],
            required: false, // Để lấy cả phòng không có booking
          },
          {
            model: db.Roomtype,
            as: 'roomtypeData',
            attributes: ['name', 'price'],
            nested: false,
          },
        ],
      });

      // Cập nhật trạng thái phòng dựa trên booking
      const roomData = rooms.map((room) => {
        const hasUpcomingBooking = room.roomData && room.roomData.length > 0;
        return {
          ...room.toJSON(),
          status: hasUpcomingBooking ? '3' : room.status,
        };
      });

      return roomData;
    }
    // if (roomId && roomId !== 'ALL') {
    //   rooms = db.Room.findOne({
    //     where: { id: typeId },
    //   });
    // }
  } catch (e) {
    console.log(e);
  }
};

let updateRoom = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 2,
        errMessage: 'Missing parameter',
      };
    }
    let room = await db.Room.findOne({
      where: { id: data.id },
      raw: false,
    });
    if (room) {
      room.name = data.name;
      room.status = data.status;
      room.typeId = data.typeId;

      await room.save();
      return {
        errCode: 0,
        message: 'Updated successfully',
      };
    } else {
      return {
        errCode: 1,
        errMessage: 'Room not found',
      };
    }
  } catch (e) {
    console.log(e);
  }
};

let deleteRoom = async (id) => {
  try {
    let room = await db.Room.findOne({
      where: { id: id },
    });
    if (!room) {
      return {
        errCode: 2,
        errMessage: 'Room not exist',
      };
    }

    await db.Room.destroy({
      where: { id: id },
    });

    return {
      errCode: 0,
      message: 'Room deleted',
    };
  } catch (err) {
    console.error(err);
  }
};

let getRoomAvailableByRoomtype = async (typeId, timeCome, timeGo) => {
  const timeSetting = await db.Setting.findOne({ order: [['updatedAt', 'DESC']] });
  const time = timeSetting
    ? timeSetting
    : {
        timeCome: '14:00:00',
        timeGo: '12:00:00',
      };
  try {
    if (typeId && timeGo && timeCome) {
      const bookedRooms = await db.Booking.findAll({
        where: {
          status: '1',
          timeCome: {
            [Op.lte]: combineDateTimeNative(timeGo, time.timeGo), // Thời gian đến <= thời gian đi người dùng chọn
          },
          timeGo: {
            [Op.gte]: combineDateTimeNative(timeCome, time.timeCome), // Thời gian đi >= thời gian đến người dùng chọn
          },
        },
      });

      // Lấy danh sách roomId đã được đặt
      const bookedRoomIds = bookedRooms?.map((booking) => booking.roomId);

      // Tìm các phòng còn trống (không nằm trong danh sách bookedRoomIds)
      const availableRooms = await db.Room.findAll({
        where: {
          typeId: typeId,
          id: {
            [Op.notIn]: bookedRoomIds, // Lọc các phòng không có trong danh sách đã đặt
          },
        },
      });

      return availableRooms;
    }
  } catch (error) {
    console.error('Error fetching available room:', error);
  }
};

const searchRoomByName = async (name) => {
  try {
    const rooms = await db.Room.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`, // tìm kiếm theo tên phòng (không phân biệt chữ hoa/chữ thường)
        },
      },
    });

    if (rooms && rooms.length > 0) {
      rooms.forEach((item) => {
        if (item.image) {
          item.image = Buffer.from(item.image, 'base64').toString('binary');
        }
      });
    }

    return rooms;
  } catch (error) {
    console.log(error);
  }
};

const checkInRoom = async (data) => {
  try {
    const timeSetting = await db.Setting.findOne({ order: [['updatedAt', 'DESC']] });
    const time = timeSetting
      ? timeSetting
      : {
          timeCome: '14:00:00',
          timeGo: '12:00:00',
        };

    if (data?.bookingId && data?.user) {
      await db.User.update(
        { ...data?.user },
        {
          where: {
            id: data?.userId,
          },
        }
      );
      await db.Booking.update(
        {
          status: '2',
        },
        {
          where: {
            id: data?.bookingId,
          },
        }
      );
    } else {
      const user = await db.User.create(data.user);
      if (user) {
        await db.Booking.create({
          userId: user?.id,
          roomId: data?.roomId,
          typeroomId: data?.typeroomId,
          timeCome: combineDateTimeNative(data.timeCome, time.timeCome),
          timeGo: combineDateTimeNative(data.timeGo, time.timeGo),
          price: data?.price,
          status: '2',
          paid: data?.paid || 0,
          sale: data?.sale || 0,
        });
      }
    }

    let room = await db.Room.findOne({
      where: { id: data.roomId },
      raw: false,
    });
    if (room) {
      room.status = '2';
      await room.save();
    }
    return 'Nhận phòng thành công';
  } catch (error) {
    console.log(error);
  }
};

const getInfoCheckIn = async (roomId) => {
  try {
    const occupiedRoom = await db.Booking.findOne({
      where: {
        status: '2', // Booking đã xác nhận (có thể người dùng vẫn chưa trả phòng)
        roomId: roomId,
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
          model: db.Service, // Thêm thông tin dịch vụ
          as: 'services',
          attributes: ['id', 'name', 'price', 'description'], // Các trường cần lấy từ bảng Service
          through: {
            attributes: ['quantity'], // Thêm thông tin về quantity từ bảng trung gian BookingService
          },
        },
      ],
    });

    return occupiedRoom;
  } catch (error) {
    console.error('Error fetching occupied rooms:', error);
  }
};

const checkOut = async (data) => {
  const t = await db.sequelize.transaction(); // Bắt đầu một transaction
  try {
    // Tìm kiếm thông tin đặt phòng
    let booking = await db.Booking.findOne({
      where: { id: data.bookingId },
      raw: false,
      transaction: t,
    });

    // Kiểm tra nếu đặt phòng tồn tại và chưa trả phòng
    if (booking) {
      if (booking.status !== '3') {
        booking.status = '3'; // Cập nhật trạng thái trả phòng
        booking.sale = data?.sale;
        booking.paid = data?.paid;
        booking.price = data?.price;
        await booking.save({ transaction: t });
      } else {
        throw new Error('Booking đã được trả phòng trước đó');
      }
    } else {
      throw new Error('Không tìm thấy đặt phòng');
    }

    // Tìm kiếm thông tin phòng
    let room = await db.Room.findOne({
      where: { id: data.roomId },
      raw: false,
      transaction: t,
    });

    // Kiểm tra nếu phòng tồn tại và chưa được đánh dấu là trống
    if (room) {
      if (room.status !== '1') {
        // Trạng thái "1" là trạng thái có sẵn
        room.status = '1'; // Cập nhật trạng thái phòng
        await room.save({ transaction: t });
      } else {
        throw new Error('Phòng đã ở trạng thái trống');
      }
    } else {
      throw new Error('Không tìm thấy phòng');
    }

    // Commit transaction nếu mọi thứ thành công
    await t.commit();
    console.log('Trả phòng thành công');
  } catch (error) {
    // Nếu có lỗi, rollback transaction
    await t.rollback();
    console.error('Trả phòng lỗi:', error.message);
  }
};

module.exports = {
  createNewRoom,
  getRoom,
  updateRoom,
  deleteRoom,
  getRoomAvailableByRoomtype,
  searchRoomByName,
  checkInRoom,
  getInfoCheckIn,
  checkOut,
};
