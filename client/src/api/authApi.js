import axiosClient from './axiosClient';

const authApi = {
  signup: (params) =>
    axiosClient.post('/auth/signup', params),
  login: (params) =>
    axiosClient.post('/auth/login', params),
  verifyToken: (params) =>
    axiosClient.post('/auth/verify-token'),
};

export default authApi;
