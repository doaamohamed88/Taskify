import { authFetch } from "../helpers/authFetch"

const BASE_URL = import.meta.env.VITE_APP_BASE_URL + "/users"

export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }

  return response.json()
}

export const registerUser = async (name, email, password) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })

  if (!response.ok) {
    throw new Error("Email already exists")
  }

  return response.json()
}

export const getUserByEmail = async (email) => {
  const response = await fetch(`${BASE_URL}/email/${email}`, {
    method: "GET",
  })

  if (!response.ok) {
    throw new Error("User not found")
  }

  return response.json()
}

export const verifyUser = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}/verify`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ verified: true }),
  })

  if (!response.ok) {
    throw new Error("User not found")
  }

  return response.json()
}

export const updatePassword = async (id, password) => {
  const response = await fetch(`${BASE_URL}/${id}/reset-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }

  return response.json()
}

export const updateUser = async (id, data) => {
  return await authFetch(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export const logout = async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") }),
  })
  if (!response.ok) {
    throw new Error("Logout failed")
  }

  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  window.location.reload()

  return response.json()
}
