import ServiceService from '../services/serviceService';

let handleCreateService = async (req, res) => {
  let message = await ServiceService.createNewService(req.body);
  return res.status(200).json(message);
};

let handleGetService = async (req, res) => {
  try {
    let id = req.query.id;
    let services = await ServiceService.getService(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: services,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Lỗi từ server',
      data: '',
    });
  }
};

let handleEditService = async (req, res) => {
  let data = req.body;
  let message = await ServiceService.updateService(data);
  return res.status(200).json(message);
};

let handleDeleteService = async (req, res) => {
  if (!req.body.id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: 'Missing parameter',
    });
  }
  let message = await ServiceService.deleteService(req.body.id);
  return res.status(200).json(message);
};

let searchServiceByName = async (req, res) => {
  try {
    let name = req.query.name;
    let services = await ServiceService.searchServiceByName(name);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: services,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Lỗi từ server',
      data: '',
    });
  }
};
let handleUpdateServiceForBooking = async (req, res) => {
  try {
    let services = await ServiceService.updateServiceForBooking(req.body);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: services,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Lỗi từ server',
      data: '',
    });
  }
};

let handleGetServiceByBooking = async (req, res) => {
  try {
    let id = req.query.id;
    let services = await ServiceService.getServiceByBooking(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: services,
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
  handleCreateService,
  handleGetService,
  handleEditService,
  handleDeleteService,
  searchServiceByName,
  handleUpdateServiceForBooking,
  handleGetServiceByBooking,
};
