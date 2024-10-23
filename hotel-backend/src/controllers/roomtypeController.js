import roomtypeService from '../services/roomtypeService';

let handleCreateRoomtype = async (req, res) => {
  let message = await roomtypeService.createNewRoomtype(req.body);
  return res.status(200).json(message);
};

let handleGetRoomtype = async (req, res) => {
  try {
    let id = req.query.id;
    let roomtypes = await roomtypeService.getRoomtype(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: roomtypes,
    });
  } catch (e) {
    return res.status(500).json({
      EM: 'error from sever',
      EC: '-1',
      DT: '',
    });
  }
};

let handleEditRoomtype = async (req, res) => {
  let data = req.body;
  let message = await roomtypeService.updateRoomtype(data);
  return res.status(200).json(message);
};

let handleDeleteRoomtype = async (req, res) => {
  if (!req.body.id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: 'Missing parameter',
    });
  }
  let message = await roomtypeService.deleteRoomtype(req.body.id);
  return res.status(200).json(message);
};

let handleGetRoomtypeAvailable = async (req, res) => {
  try {
    let timeCome = req.query.timeCome;
    let timeGo = req.query.timeGo;

    let roomtypeAvailable = await roomtypeService.getRoomtypeAvailable(timeCome, timeGo);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: roomtypeAvailable,
    });
  } catch (e) {
    return res.status(500).json({
      EM: 'error from sever',
      EC: '-1',
      DT: '',
    });
  }
};

let searchRoomtypeByName = async (req, res) => {
  try {
    let name = req.query.name;
    let roomtypes = await roomtypeService.searchRoomtypeByName(name);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: roomtypes,
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
  handleCreateRoomtype,
  handleGetRoomtype,
  handleEditRoomtype,
  handleDeleteRoomtype,
  handleGetRoomtypeAvailable,
  searchRoomtypeByName,
};
