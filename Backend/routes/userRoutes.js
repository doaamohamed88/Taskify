const jwt = require('jsonwebtoken');
process.loadEnvFile('./env/.env');
const { Router } = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const userService = require('../services/userService');
const authService = require('../services/authService');
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const userRouter = Router();

userRouter.get('/', authenticate, (req, res) => {
    try {
        const { search } = req.query
        const users = search ? userService.getAllUsers(search) : userService.getAllUsers();
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving users', devMessage: error.message });
    }
});

userRouter.post('/login', (req, res) => {
    const { email, password } = req.body;
    try {
        const user = userService.login(email, password);
        const accessToken = authService.generateAccessToken(user);
        const refreshToken = authService.generateRefreshToken(user);
        res.send({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

userRouter.get('/:id', authenticate, (req, res) => {
    try {
        const user = userService.getUserById(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving user' });
    }
});

userRouter.get('/email/:email', (req, res) => {
    try {
        const user = userService.getUserByEmail(req.params.email);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving user by email' });
    }
});

userRouter.post('/', (req, res) => {
    const userData = req.body;
    try {
        const newUser = userService.addUser(userData);
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send({ message: 'Error adding user' });
    }
});

userRouter.put('/:id', authenticate, (req, res) => {
    const userData = req.body;
    try {
        const updatedUser = userService.updateUser(req.params.id, userData);
        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ message: 'Error updating user' });
    }
});

userRouter.put('/:id/reset-password', (req, res) => {
    const { password } = req.body;
    try {
        const updatedUser = userService.resetPassword(req.params.id, password);
        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ message: 'Error updating user' });
    }
});

userRouter.put('/:id/verify', (req, res) => {
    try {
        const updatedUser = userService.verifyUser(req.params.id);
        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ message: 'Error updating user' });
    }
});

userRouter.post('/token', (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).send({ message: 'Refresh token required' });
    if (!authService.isTokenValid(token))
        return res.status(403).send({ message: 'Invalid refresh token' });

    jwt.verify(token, REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).send({ message: 'Expired refresh token' });

        const accessToken = authService.generateAccessToken(user);
        res.send({ accessToken });
    });
});

userRouter.post('/logout', (req, res) => {
    const { token } = req.body;
    authService.removeToken(token);
    res.send({ message: 'Logged out successfully' });
});

module.exports = userRouter;