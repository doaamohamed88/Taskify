const jwt = require('jsonwebtoken');
const fileUtils = require('../utils/fileUtils');
process.loadEnvFile('./env/.env');

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;