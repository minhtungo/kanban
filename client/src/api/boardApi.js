import axiosClient from './axiosClient';

const boardApi = {
  create: () => axiosClient.post('http://localhost:5000/api/v1/boards'),
  getAll: () => axiosClient.get('http://localhost:5000/api/v1/boards'),
  updatePosition: (params) =>
    axiosClient.put('http://localhost:5000/api/v1/boards', params),
};

export default boardApi;
