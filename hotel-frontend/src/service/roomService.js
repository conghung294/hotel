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

export {
  createNewRoomService,
  getRoomService,
  editRoomService,
  deleteRoomService,
  getRoomServiceAvailable,
};
