import axios from '../axios/axios';

const createNewBookingService = (data) => {
  return axios.post('/api/create-new-booking', data);
};

const getBookingService = (id) => {
  return axios.get(`/api/get-all-booking?id=${id}`);
};

const getBookingByStatusService = (status) => {
  return axios.get(`/api/get-all-booking-by-status?status=${status}`);
};

const editBookingService = (inputData) => {
  return axios.put('/api/edit-booking', inputData);
};

const deleteBookingService = (id) => {
  return axios.delete('/api/delete-booking', {
    data: {
      id,
    },
  });
};

export {
  createNewBookingService,
  getBookingService,
  editBookingService,
  deleteBookingService,
  getBookingByStatusService,
};
