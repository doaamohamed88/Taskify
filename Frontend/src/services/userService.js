import { authFetch } from "../helpers/authFetch";

const BASE_URL = '/users';

export const login = async (email, password) => {
    return await authFetch(`${BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
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
    return await authFetch(`${BASE_URL}/email/${email}`, {
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
    const response = await fetch(`${BASE_URL}/${id}/reset-password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
    });

    if (!response.ok) {
        throw new Error("Failed to update password");
    }

    return response.json();
}

export const updateUser = async (id, data) => {
    return await authFetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}