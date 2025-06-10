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
  return await authFetch(`${BASE_URL}/${boardId}/tasks`, {
    method: "POST",
    body: JSON.stringify(taskData),
  })
}