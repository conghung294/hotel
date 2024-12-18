import axios from '../axios/axios';

const handleLoginApi = (email, password) => {
  return axios.post('/api/login', { email, password });
};

const getAllUsers = (id) => {
  return axios.get(`/api/get-all-user?id=${id}`);
};

const getAllCustomers = () => {
  return axios.get(`/api/get-all-customer`);
};

const createNewUserService = (data) => {
  return axios.post('/api/create-new-user', data);
};

const deleteUserService = (id) => {
  return axios.delete('/api/delete-user', {
    data: {
      id,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put('/api/edit-user', inputData);
};

const handleForgotPassword = (email) => {
  return axios.post('/api/forgot-password', email);
};

const handleResetPassword = (data) => {
  return axios.post('/api/reset-password', data);
};

const searchUserService = (name) => {
  return axios.get(`/api/search-user?name=${name}`);
};

const searchExactUserService = (name) => {
  return axios.get(`/api/search-exact-user?name=${name}`);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  handleForgotPassword,
  handleResetPassword,
  searchUserService,
  getAllCustomers,
  searchExactUserService,
};
