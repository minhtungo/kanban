import axiosClient from './axiosClient';

const sectionApi = {
  create: (boardId) =>
    axiosClient.post(`http://localhost:5000/api/v1/boards/sections`),
  update: (boardId, sectionId, params) =>
    axiosClient.put(
      `http://localhost:5000/api/v1/boards/${boardId}/sections/${sectionId}`,
      params
    ),
  delete: (boardId, sectionId) =>
    axiosClient.delete(
      `http://localhost:5000/api/v1/boards/${boardId}/sections/${sectionId}`
    ),

};

export default sectionApi;