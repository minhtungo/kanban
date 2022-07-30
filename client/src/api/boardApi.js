import axiosClient from './axiosClient';

const boardApi = {
  create: () => axiosClient.post('http://localhost:5000/api/v1/boards'),
  getAll: () => axiosClient.get('http://localhost:5000/api/v1/boards'),
  updatePosition: (params) =>
    axiosClient.put('http://localhost:5000/api/v1/boards', params),
  getOne: (id) => axiosClient.get(`http://localhost:5000/api/v1/boards/${id}`),
  delete: (id) => axiosClient.delete(`http://localhost:5000/api/v1/boards/${id}`),
  update: (id, params) =>
    axiosClient.put(`http://localhost:5000/api/v1/boards/${id}`, params),
  getStars: () =>
    axiosClient.get('http://localhost:5000/api/v1/boards/stars'),
  updateStarredPosition: (params) =>
    axiosClient.put('http://localhost:5000/api/v1/boards/stars', params),
};

export default boardApi;
