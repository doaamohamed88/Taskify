const jwt = require('jsonwebtoken');
process.loadEnvFile('./env/.env');
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
