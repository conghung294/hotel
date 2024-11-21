import RoomService from '../services/roomService';

let handleCreateRoom = async (req, res) => {
  let message = await RoomService.createNewRoom(req.body);
  return res.status(200).json(message);
};

let handleGetRoom = async (req, res) => {
  try {
    let id = req.query.id;
    let rooms = await RoomService.getRoom(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: rooms,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Lỗi từ server',
      data: '',
    });
  }
};

let handleEditRoom = async (req, res) => {
  let data = req.body;
  let message = await RoomService.updateRoom(data);
  return res.status(200).json(message);
};

let handleDeleteRoom = async (req, res) => {
  if (!req.body.id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: 'Missing parameter',
    });
  }
  let message = await RoomService.deleteRoom(req.body.id);
  return res.status(200).json(message);
};

let handleGetRoomAvailable = async (req, res) => {
  try {
    let { typeId, timeCome, timeGo } = req.query;
    let rooms = await RoomService.getRoomAvailableByRoomtype(typeId, timeCome, timeGo);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: rooms,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Lỗi từ server',
      data: '',
    });
  }
};

let searchRoomByName = async (req, res) => {
  try {
    let name = req.query.name;
    let rooms = await RoomService.searchRoomByName(name);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: rooms,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Lỗi từ server',
      data: '',
    });
  }
};

let handleCheckIn = async (req, res) => {
  try {
    let data = await RoomService.checkInRoom(req.body);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: data,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Lỗi từ server',
      data: '',
    });
  }
};

let handleGetInfoCheckIn = async (req, res) => {
  try {
    let data = await RoomService.getInfoCheckIn(req.query?.id);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: data,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Lỗi từ server',
      data: '',
    });
  }
};

let handleCheckOut = async (req, res) => {
  try {
    let data = await RoomService.checkOut(req.body);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: data,
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
  handleCreateRoom,
  handleGetRoom,
  handleEditRoom,
  handleDeleteRoom,
  handleGetRoomAvailable,
  searchRoomByName,
  handleCheckIn,
  handleGetInfoCheckIn,
  handleCheckOut,
};
