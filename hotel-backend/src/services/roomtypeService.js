import { Op } from 'sequelize';
import db from '../models/index';

let createNewRoomtype = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Roomtype.create({
        name: data.name,
        image: data.image,
        description: data.description,
        quantity: 0,
        price: data.price,
      });
      resolve({
        errCode: 0,
        message: 'OK',
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getRoomtype = async (typeId) => {
  try {
    let roomtypes = [];
    if (typeId === 'ALL') {
      roomtypes = await db.Roomtype.findAll();
    } else if (typeId) {
      roomtypes = await db.Roomtype.findOne({
        where: { id: typeId },
      });
    }

    if (roomtypes && roomtypes.length > 0) {
      roomtypes.forEach((item) => {
        if (item.image) {
          item.image = Buffer.from(item.image, 'base64').toString('binary');
        }
      });
    }

    return roomtypes;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

let updateRoomtype = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 2,
        errMessage: 'Missing parameter',
      };
    }
    let roomtype = await db.Roomtype.findOne({
      where: { id: data.id },
      raw: false,
    });
    if (roomtype) {
      roomtype.name = data.name;
      roomtype.image = data.image;
      roomtype.description = data.description;
      roomtype.price = data.price;

      await roomtype.save();
      return {
        errCode: 0,
        message: 'Updated successfully',
      };
    } else {
      return {
        errCode: 1,
        errMessage: 'Roomtype not found',
      };
    }
  } catch (e) {
    console.log(e);
  }
};

let deleteRoomtype = async (id) => {
  try {
    let roomtype = await db.Roomtype.findOne({
      where: { id: id },
    });
    if (!roomtype) {
      return {
        errCode: 2,
        errMessage: 'Roomtype not exist',
      };
    }
    let rooms = await db.Room.findAll({
      where: { typeId: id },
    });

    if (rooms.length > 0) {
      await db.Room.destroy({
        where: { typeId: id },
      });
    }

    await db.Roomtype.destroy({
      where: { id: id },
    });

    return {
      errCode: 0,
      message: 'Roomtype deleted',
    };
  } catch (err) {
    console.error(err);
  }
};

let getRoomtypeAvailable = async (timeCome, timeGo) => {
  try {
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
        id: {
          [Op.notIn]: bookedRoomIds, // Lọc các phòng không có trong danh sách đã đặt
        },
      },
      include: {
        model: db.Roomtype,
        as: 'roomtypeData',
        //     attributes: [],
      }, // Kết hợp với Roomtype để lấy thông tin loại phòng
    });

    // Tính số lượng phòng trống theo từng loại phòng
    const availableRoomTypes = {};
    availableRooms.forEach((room) => {
      const roomTypeId = room.typeId;

      // Kiểm tra nếu loại phòng đã tồn tại, thì tăng số lượng phòng trống
      if (availableRoomTypes[roomTypeId]) {
        availableRoomTypes[roomTypeId].count += 1;
      } else {
        availableRoomTypes[roomTypeId] = {
          id: room.roomtypeData.id,
          name: room.roomtypeData.name,
          price: room.roomtypeData.price,
          description: room.roomtypeData.description,
          image: Buffer.from(room.roomtypeData.image, 'base64').toString('binary'),
          count: 1, // Khởi tạo số lượng phòng trống
        };
      }
    });

    const availableRoomTypesArray = Object.values(availableRoomTypes);
    // Trả về danh sách loại phòng và số lượng phòng trống
    return availableRoomTypesArray;
  } catch (error) {
    console.error('Error fetching available room types:', error);
  }
};

const searchRoomtypeByName = async (name) => {
  try {
    const roomtypes = await db.Roomtype.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`, // tìm kiếm theo tên phòng (không phân biệt chữ hoa/chữ thường)
        },
      },
    });

    if (roomtypes && roomtypes.length > 0) {
      roomtypes.forEach((item) => {
        if (item.image) {
          item.image = Buffer.from(item.image, 'base64').toString('binary');
        }
      });
    }

    return roomtypes;
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi tìm kiếm hạng phòng.' });
  }
};

module.exports = {
  createNewRoomtype,
  getRoomtype,
  updateRoomtype,
  deleteRoomtype,
  getRoomtypeAvailable,
  searchRoomtypeByName,
};
