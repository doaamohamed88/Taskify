import { authFetch } from "../helpers/authFetch";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL + '/users';

export const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
}

export const registerUser = async (name, email, password) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
        throw new Error("Email already exists");
    }

    return response.json();
}

export const getUserByEmail = async (email) => {
    return await authFetch(`/users/email/${email}`, {
        method: 'GET',
    });
}

export const verifyUser = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verified: true }),
    });

    if (!response.ok) {
        throw new Error("User not found");
    }

    return response.json();
}

export const updatePassword = async (id, password) => {
    return await authFetch(`/users/${id}/reset-password`, {
        method: 'PUT',
        body: JSON.stringify({ password }),
    });
}

export const updateUser = async (id, data) => {
    return await authFetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}