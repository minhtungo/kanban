import axiosClient from './axiosClient';

const taskApi = {
  create: (boardId, params) =>
    axiosClient.post(
      `http://localhost:5000/api/v1/boards/${boardId}/tasks`,
      params
    ),
  updatePosition: (boardId, params) =>
    axiosClient.put(
      `http://localhost:5000/api/v1/boards/${boardId}/tasks/update-position`,
      params
    ),
  delete: (boardId, taskId) =>
    axiosClient.delete(
      `http://localhost:5000/api/v1/boards/${boardId}/tasks/${taskId}`
    ),
  update: (boardId, taskId, params) =>
    axiosClient.put(
      `http://localhost:5000/api/v1/boards/${boardId}/tasks/${taskId}`,
      params
    ),
};

export default taskApi;
