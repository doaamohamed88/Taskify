const fileUtils = require('../utils/fileUtils');
process.loadEnvFile('./env/.env');
const usersFilePath = process.env.usersFilePath;
const { v4: uuid } = require('uuid');

const getAllUsers = () => {
    try {
        return fileUtils.read(usersFilePath);
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
        throw new Error('User not found');
    }
    return user;
}

const addUser = (userData) => {
    const users = getAllUsers();
    const newUser = { id: uuid(), ...userData };
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

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    addUser,
    updateUser
};