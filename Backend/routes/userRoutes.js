const { Router } = require('express');
const userService = require('../services/userService');

const userRouter = Router();

userRouter.get('/', (_, res) => {
    try {
        const users = userService.getAllUsers();
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving users' });
    }
});

userRouter.get('/:id', (req, res) => {
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
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving user by email' });
    }
});

userRouter.post('/', (req, res) => {
    const userData = req.body;
    try {
        const emailExists = userService.getUserByEmail(userData.email);
        if (emailExists) {
            return res.status(400).send({ message: 'Email already exists' });
        }
        const newUser = userService.addUser(userData);
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send({ message: 'Error adding user' });
    }
});

userRouter.put('/:id', (req, res) => {
    const userData = req.body;
    try {
        const updatedUser = userService.updateUser(req.params.id, userData);
        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ message: 'Error updating user' });
    }
});

module.exports = userRouter;