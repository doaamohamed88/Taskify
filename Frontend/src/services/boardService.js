import { authFetch } from "../helpers/authFetch"

const BASE_URL = "/boards"

export const getBoardById = async (id) => {
  return await authFetch(`${BASE_URL}/${id}`, {
    method: "GET",
  })
}

export const updateBoard = async (id, data) => {
  return await authFetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export const createTask = async (boardId, taskData) => {
  console.log("Creating task with data:", taskData);

  return await authFetch(`${BASE_URL}/${boardId}/tasks`, {
    method: "POST",
    body: JSON.stringify(taskData),
  })
}

export const updateTask = async (boardId, taskId, taskData) => {
  return await authFetch(`${BASE_URL}/${boardId}/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
};

export const deleteBoard = async (id) => {
  return await authFetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};