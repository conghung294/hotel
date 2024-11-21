import axios from '../axios/axios';

const createNewRoomService = (data) => {
  return axios.post('/api/create-new-room', data);
};

const getRoomService = (id) => {
  return axios.get(`/api/get-all-room?id=${id}`);
};

const editRoomService = (inputData) => {
  return axios.put('/api/edit-room', inputData);
};

const deleteRoomService = (id) => {
  return axios.delete('/api/delete-room', {
    data: {
      id,
    },
  });
};

const getRoomServiceAvailable = (typeId, timeCome, timeGo) => {
  return axios.get(
    `/api/get-all-room-available?typeId=${typeId}&timeCome=${timeCome}&timeGo=${timeGo}`
  );
};

const searchRoomService = (name) => {
  return axios.get(`/api/search-room?name=${name}`);
};

const checkInService = (data) => {
  return axios.post(`/api/check-in-room`, data);
};

const checkOutService = (data) => {
  return axios.post(`/api/check-out-room`, data);
};

const getInfoCheckInByRoom = (id) => {
  return axios.get(`/api/get-info-check-in-by-room?id=${id}`);
};

export {
  createNewRoomService,
  getRoomService,
  editRoomService,
  deleteRoomService,
  getRoomServiceAvailable,
  searchRoomService,
  checkInService,
  getInfoCheckInByRoom,
  checkOutService,
};
