const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { authenticate } = require('../middleware/authMiddleware');
const userService = require('../services/userService');
const authService = require('../services/authService');

require('dotenv').config({ path: './.env' });
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const userRouter = Router();

userRouter.get('/', authenticate, async (req, res) => {
    try {
        const { search } = req.query;
        const users = await userService.getAllUsers(search);
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving users', devMessage: error.message });
    }
});

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.login(email, password);
        const accessToken = authService.generateAccessToken(user);
        const refreshToken = await authService.generateRefreshToken(user);
        res.send({ accessToken, refreshToken });
    } catch (error) {
        res.status(401).send({ message: error.message });
    }
});

userRouter.get('/:id', authenticate, async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(404).send({ message: 'User not found' });
    }
});

userRouter.get('/email/:email', async (req, res) => {
    try {
        const user = await userService.getUserByEmail(req.params.email);
        if (!user) return res.status(404).send({ message: 'User not found' });
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving user by email' });
    }
});

userRouter.post('/', async (req, res) => {
    try {
        const newUser = await userService.addUser(req.body);
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send({ message: 'Error adding user', devMessage: error.message });
    }
});

userRouter.put('/:id', authenticate, async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ message: 'Error updating user', devMessage: error.message });
    }
});

userRouter.put('/:id/reset-password', async (req, res) => {
    try {
        const updatedUser = await userService.resetPassword(req.params.id, req.body.password);
        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ message: 'Error resetting password', devMessage: error.message });
    }
});

userRouter.put('/:id/verify', async (req, res) => {
    try {
        const updatedUser = await userService.verifyUser(req.params.id);
        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ message: 'Error verifying user', devMessage: error.message });
    }
});

userRouter.post('/token', async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).send({ message: 'Refresh token required' });

    const valid = await authService.isTokenValid(token);
    if (!valid) return res.status(403).send({ message: 'Invalid refresh token' });

    jwt.verify(token, REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).send({ message: 'Expired or invalid token' });
        const accessToken = authService.generateAccessToken(user);
        res.send({ accessToken });
    });
});

userRouter.post('/logout', async (req, res) => {
    const { token } = req.body;
    try {
        await authService.removeToken(token);
        res.send({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error logging out', devMessage: error.message });
    }
});

module.exports = userRouter;
