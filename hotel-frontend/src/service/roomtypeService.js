import axios from '../axios/axios';

const createNewRoomtypeService = (data) => {
  return axios.post('/api/create-new-roomtype', data);
};

const getRoomtypeService = (id) => {
  return axios.get(`/api/get-all-roomtype?id=${id}`);
};

const editRoomtypeService = (inputData) => {
  return axios.put('/api/edit-roomtype', inputData);
};

const deleteRoomtypeService = (id) => {
  return axios.delete('/api/delete-roomtype', {
    data: {
      id,
    },
  });
};

const getRoomtypeAvailableService = (timeCome, timeGo) => {
  return axios.get(`/api/get-all-roomtype-available?timeCome=${timeCome}&timeGo=${timeGo}`);
};

const searchRoomtypeService = (name) => {
  return axios.get(`/api/search-roomtype?name=${name}`);
};

export {
  createNewRoomtypeService,
  getRoomtypeService,
  editRoomtypeService,
  deleteRoomtypeService,
  getRoomtypeAvailableService,
  searchRoomtypeService,
};
