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
      EM: 'error from sever',
      EC: '-1',
      DT: '',
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
      EM: 'error from sever',
      EC: '-1',
      DT: '',
    });
  }
};

module.exports = {
  handleCreateRoom,
  handleGetRoom,
  handleEditRoom,
  handleDeleteRoom,
  handleGetRoomAvailable,
};
