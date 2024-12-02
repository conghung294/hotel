import userService from '../services/userService';

let handleGetAllUsers = async (req, res) => {
  try {
    let id = req.query.id;
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: users,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Lỗi từ server',
      data: '',
    });
  }
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);

  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: 'Missing parameter',
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let handleForgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    let data = await userService.handleForgotPassword(email);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Error from server',
    });
  }
};

let handleResetPassword = async (req, res) => {
  const { newPassword, token } = req.body;
  try {
    let data = await userService.handleResetPassword({ token, newPassword });
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Error from server',
    });
  }
};

let searchUserByName = async (req, res) => {
  try {
    let name = req.query.name;
    let users = await userService.searchUserByName(name);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: users,
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
  handleGetAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
  handleForgotPassword,
  handleResetPassword,
  searchUserByName,
};
