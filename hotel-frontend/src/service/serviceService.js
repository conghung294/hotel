import axios from '../axios/axios';

const createNewServiceService = (data) => {
  return axios.post('/api/create-new-service', data);
};

const getServiceService = (id) => {
  return axios.get(`/api/get-all-service?id=${id}`);
};

const editServiceService = (inputData) => {
  return axios.put('/api/edit-service', inputData);
};

const deleteServiceService = (id) => {
  return axios.delete('/api/delete-service', {
    data: {
      id,
    },
  });
};

export { createNewServiceService, getServiceService, editServiceService, deleteServiceService };
