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

const searchServiceService = (name) => {
  return axios.get(`/api/search-service?name=${name}`);
};

const saveSelectedServices = (data) => {
  return axios.post('/api/update-service-for-booking', data);
};

const getServiceServiceByBooking = (id) => {
  return axios.get(`/api/get-service-by-booking?id=${id}`);
};

const getQuantityEachService = (month, year) => {
  return axios.get(`/api/get-quantity-each-service`, {
    params: {
      month,
      year,
    },
  });
};

export {
  createNewServiceService,
  getServiceService,
  editServiceService,
  deleteServiceService,
  searchServiceService,
  saveSelectedServices,
  getServiceServiceByBooking,
  getQuantityEachService,
};
