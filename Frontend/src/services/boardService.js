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
