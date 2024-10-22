import db from '../models/index';
import { Op } from 'sequelize';

let createNewRoom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Room.create({
        name: data.name,
        status: data.status,
        typeId: data.typeId,
        status: 'TRỐNG',
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

let getRoom = async (roomId) => {
  try {
    let rooms = '';
    if (roomId === 'ALL') {
      rooms = await db.Room.findAll({
        include: [
          {
            model: db.Roomtype,
            as: 'roomtypeData',
            attributes: ['name', 'price'],
            nested: false,
          },
        ],
      });
    }
    if (roomId && roomId !== 'ALL') {
      rooms = db.Room.findOne({
        where: { id: typeId },
      });
    }
    return rooms;
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

let getRoomAvailableByRoomtype = async (typeId, timeGo, timeCome) => {
  try {
    if (typeId && timeGo && timeCome) {
      // Lấy danh sách các phòng đã được đặt trong khoảng thời gian yêu cầu
      const bookedRooms = await db.Booking.findAll({
        where: {
          status: '1',
          [Op.or]: [
            {
              timeCome: {
                [Op.lte]: timeGo, // Thời gian đến <= thời gian đi người dùng chọn
              },
              timeGo: {
                [Op.gte]: timeCome, // Thời gian đi >= thời gian đến người dùng chọn
              },
            },
          ],
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

module.exports = {
  createNewRoom,
  getRoom,
  updateRoom,
  deleteRoom,
  getRoomAvailableByRoomtype,
};
