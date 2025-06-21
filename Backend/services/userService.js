const { v4: uuid } = require('uuid');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const getAllUsers = async (query = null) => {
    if (query) {
        const regex = new RegExp(query, 'i');
        return await User.find({
            $or: [{ name: regex }, { email: regex }]
        });
    }
    return await User.find();
};

const getUserById = async (id) => {
    const user = await User.findOne({ id });
    if (!user) throw new Error('User not found');
    return user;
};

// Get user by email
const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

// Add new user
const addUser = async (userData) => {
    const existing = await getUserByEmail(userData.email);
    if (existing) throw new Error('User already exists');
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new User({
        id: uuid(),
        ...userData,
        password: hashedPassword,
        boards: [],
        verified: false
    });

    return await newUser.save();
};

// Update user
const updateUser = async (id, updates) => {
    const user = await User.findOneAndUpdate(
        { id },
        updates,
        { new: true }
    );
    if (!user) throw new Error('User not found');
    return user;
};

// Reset password
const resetPassword = async (id, newPassword) => {
    return await updateUser(id, { password: newPassword });
};

// Verify user
const verifyUser = async (id) => {
    return await updateUser(id, { verified: true });
};

// Login (simple email/password check)
const login = async (email, password) => {
    const user = await getUserByEmail(email);
    if (!user) throw new Error('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
    return user;
};

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
