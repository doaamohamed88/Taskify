const { Router } = require('express');
const boardService = require('../services/boardService');
const { authenticate } = require('../middleware/authMiddleware');

const boardRouter = Router();
boardRouter.use(authenticate);

// GET all boards for current user
boardRouter.get('/', async (req, res) => {
    try {
        const userId = req.user.id;
        const userBoards = await boardService.getBoardsByUser(userId);
        res.send(userBoards);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving boards', devMessage: error.message });
    }
});

// GET specific board by ID
boardRouter.get('/:id', async (req, res) => {
    try {
        const board = await boardService.getBoardById(req.params.id);
        res.send(board);
    } catch (error) {
        res.status(404).send({ message: 'Board not found', devMessage: error.message });
    }
});

// POST new board
boardRouter.post('/', async (req, res) => {
    try {
        const boardData = req.body;
        const owner = req.user;
        const newBoard = await boardService.addBoard(boardData, owner);
        res.status(201).send(newBoard);
    } catch (error) {
        res.status(500).send({ message: 'Error adding board', devMessage: error.message });
    }
});

// PUT update board
boardRouter.put('/:id', async (req, res) => {
    try {
        const boardId = req.params.id;
        const boardData = req.body;
        const updatedBoard = await boardService.updateBoard(boardId, boardData);
        res.send(updatedBoard);
    } catch (error) {
        res.status(404).send({ message: 'Board not found or update failed', devMessage: error.message });
    }
});

// DELETE board
boardRouter.delete('/:id', async (req, res) => {
    try {
        const boardId = req.params.id;
        const deletedBoard = await boardService.deleteBoard(boardId);
        res.send({ message: 'Board deleted successfully', data: deletedBoard });
    } catch (error) {
        res.status(404).send({ message: 'Board not found', devMessage: error.message });
    }
});

// POST create task
boardRouter.post('/:id/tasks', async (req, res) => {
    try {
        const task = await boardService.createTask(req.params.id, req.body);
        res.send(task);
    } catch (error) {
        res.status(404).send({ message: 'Board not found', devMessage: error.message });
    }
});

// PUT update task
boardRouter.put('/:id/tasks/:taskId', async (req, res) => {
    try {
        const updatedTask = await boardService.updateTask(req.params.id, req.params.taskId, req.body);
        res.send(updatedTask);
    } catch (error) {
        res.status(404).send({ message: 'Task not found or update failed', devMessage: error.message });
    }
});

// DELETE task
boardRouter.delete('/:id/tasks/:taskId', async (req, res) => {
    try {
        const deletedTask = await boardService.deleteTask(req.params.id, req.params.taskId);
        res.send({ message: 'Task deleted successfully', data: deletedTask });
    } catch (error) {
        res.status(404).send({ message: 'Task not found', devMessage: error.message });
    }
});

module.exports = boardRouter;
