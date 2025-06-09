const { request } = require('express');
const fileUtils = require('../utils/fileUtils');
process.loadEnvFile('./env/.env');
const usersFilePath = process.env.usersFilePath;
const { v4: uuid } = require('uuid');

const getAllUsers = (query = null) => {
    try {
        const users = fileUtils.read(usersFilePath);
        if (query) {
            const pattern = new RegExp(query, 'i');
            return users.filter(user => pattern.test(user.email) || pattern.test(user.name));
        }
        return users;
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
}

const getUserById = (id) => {
    const users = getAllUsers();
    const user = users.find(user => user.id === id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

const getUserByEmail = (email) => {
    const users = getAllUsers();
    const user = users.find(user => user.email === email);
    if (!user) {
        return null;
    }
    return user;
}

const login = (email, password) => {
    const users = getAllUsers();
    const user = users.find(user => user.email === email);
    if (!user) throw new Error('User not found');
    if (!user.verified) throw new Error('User not verified');
    if (user.password !== password) throw new Error('Invalid Credentials');
    return user;
}

const addUser = (userData) => {
    const users = getAllUsers();
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    const newUser = { id: uuid(), ...userData, boards: [], verified: false };
    users.push(newUser);
    fileUtils.write(usersFilePath, users);
    return newUser;
}

const updateUser = (id, userData) => {
    const users = getAllUsers();
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    users[userIndex] = { ...users[userIndex], ...userData };
    fileUtils.write(usersFilePath, users);
    return users[userIndex];
}

const resetPassword = (id, newPassword) => {
    const users = getAllUsers();
    const user = users.find(user => user.id === id);
    if (!user) {
        throw new Error('User not found');
    }
    user.password = newPassword;
    fileUtils.write(usersFilePath, users);
    return user;
}

const verifyUser = (id) => {
    const users = getAllUsers();
    const user = users.find(user => user.id === id);
    if (!user) {
        throw new Error('User not found');
    }
    user.verified = true;
    fileUtils.write(usersFilePath, users);
    return user;
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    addUser,
    updateUser,
    resetPassword,
    verifyUser,
    login
};