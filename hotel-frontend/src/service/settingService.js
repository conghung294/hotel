import axios from '../axios/axios';

const getSettingService = () => {
  return axios.get(`/api/get-setting`);
};

const editSettingService = (inputData) => {
  return axios.put('/api/update-setting', inputData);
};

export { getSettingService, editSettingService };
