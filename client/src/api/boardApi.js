import axiosClient from './axiosClient';

const boardApi = {
  create: () => axiosClient.post('/boards'),
  getAll: () => axiosClient.get('/boards'),
  updatePosition: (params) =>
    axiosClient.put('/boards', params),
  getOne: (id) => axiosClient.get(`/boards/${id}`),
  delete: (id) => axiosClient.delete(`/boards/${id}`),
  update: (id, params) =>
    axiosClient.put(`/boards/${id}`, params),
  getStars: () =>
    axiosClient.get('/boards/stars'),
  updateStarredPosition: (params) =>
    axiosClient.put('/boards/stars', params),
};

export default boardApi;
