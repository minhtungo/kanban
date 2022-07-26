import axiosClient from './axiosClient';

const authApi = {
  signup: (params) =>
    axiosClient.post('http://localhost:5000/api/v1/auth/signup', params),
  login: (params) =>
    axiosClient.post('http://localhost:5000/api/v1/auth/login', params),
  verifyToken: (params) =>
    axiosClient.post('http://localhost:5000/api/v1/auth/verify-token'),
};

export default authApi;
