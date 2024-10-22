import axios from '../axios/axios';

const handleLoginApi = (email, password) => {
  return axios.post('/api/login', { email, password });
};

const getAllUsers = (page, limit) => {
  return axios.get(`/api/get-all-user?page=${page}&limit=${limit}`);
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



export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService
};
