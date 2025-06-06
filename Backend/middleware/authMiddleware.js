const jwt = require('jsonwebtoken');
process.loadEnvFile('./env/.env');
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).send({ message: 'Invalid or expired token' });
    }
};

module.exports = { authenticate };