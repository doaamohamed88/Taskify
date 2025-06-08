const jwt = require('jsonwebtoken');
const fileUtils = require('../utils/fileUtils');
process.loadEnvFile('./env/.env');

const tokensFilePath = process.env.tokensFilePath;
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const getAllTokens = () => {
    const tokens = fileUtils.read(tokensFilePath);
    return tokens || [];
}

const saveTokens = (tokens) => {
    fileUtils.write(tokensFilePath, tokens);
}

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, boards: user.boards, name: user.name, verified: user.verified }, JWT_SECRET, { expiresIn: '15m' });
}

const generateRefreshToken = (user) => {
    const token = jwt.sign({ id: user.id, email: user.email, boards: user.boards, name: user.name, verified: user.verified }, REFRESH_SECRET, { expiresIn: '7d' });
    const tokens = getAllTokens();
    tokens.push(token);
    saveTokens(tokens);
    return token;
}

const isTokenValid = (token) => {
    const tokens = getAllTokens();
    return tokens.includes(token);
}

const removeToken = (token) => {
    const tokens = getAllTokens().filter(t => t !== token);
    saveTokens(tokens);
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    isTokenValid,
    removeToken
};