const jwt = require('jsonwebtoken');
const Token = require('../models/Token');

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            boards: user.boards,
            name: user.name,
        },
        JWT_SECRET,
        { expiresIn: '15m' }
    );
};

const generateRefreshToken = async (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            boards: user.boards,
            name: user.name
        },
        REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    await Token.create({ token });
    return token;
};

const isTokenValid = async (token) => {
    const found = await Token.findOne({ token });
    return !!found;
};

const removeToken = async (token) => {
    await Token.deleteOne({ token });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    isTokenValid,
    removeToken,
};
