const jwt = require('jsonwebtoken');
process.loadEnvFile('./env/.env');
const tokensFilePath = process.env.tokensFilePath;
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '15m' }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

const verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_SECRET);
};

module.exports = {
    generateToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};
