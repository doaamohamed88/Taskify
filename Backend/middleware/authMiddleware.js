const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env' });

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or invalid token format' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // contains: id, email, name, boards, etc.
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token', devMessage: err.message });
    }
};

module.exports = { authenticate };
