const { Router } = require('express');
const boardService = require('../services/boardService');
const { authenticate } = require('../middleware/authMiddleware');

const boardRouter = Router();
boardRouter.use(authenticate);

boardRouter.get('/', (req, res) => {
    try {
        const userId = req.user.id;
        const userBoards = boardService.getBoardsByUser(userId);
        res.send(userBoards);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving boards', devMessage: error.message });
    }
});

boardRouter.get('/:id', (req, res) => {
    console.log("cur user", req.user);
    try {
        const board = boardService.getBoardById(req.params.id);
        res.send(board);
    } catch (error) {
        res.status(404).send({ message: 'Board not found' });
    }
});

boardRouter.post('/', (req, res) => {
    const boardData = req.body;
    const owner = req.user;
    try {
        const newBoard = boardService.addBoard(boardData, owner);
        res.status(201).send(newBoard);
    } catch (error) {
        res.status(500).send({ message: 'Error adding board', devMessage: error.message });
    }
});

boardRouter.put('/:id', (req, res) => {
    const boardId = req.params.id;
    const boardData = req.body;
    try {
        const updatedBoard = boardService.updateBoard(boardId, boardData);
        res.send(updatedBoard);
    } catch (error) {
        res.status(404).send({ message: 'Board not found or update failed' });
    }
});

boardRouter.delete('/:id', (req, res) => {
    const boardId = req.params.id;
    try {
        const deletedBoard = boardService.deleteBoard(boardId);
        res.send({ message: 'Board deleted successfully', data: deletedBoard });
    } catch (error) {
        res.status(404).send({ message: 'Board not found' });
    }
});


boardRouter.post("/:id/tasks", (req, res) => {
    console.log("cur user", req.body);
    try {
        const task = boardService.createTask(req.params.id, req.body);
        res.send(task);
    } catch (error) {
        res.status(404).send({
            message: "Board not found",
            devMessage: error.message,
        });
    }
});

boardRouter.put("/:id/tasks/:taskId", (req, res) => {
    const boardId = req.params.id;
    const taskId = req.params.taskId;
    const taskData = req.body;
    try {
        const updatedTask = boardService.updateTask(boardId, taskId, taskData);
        res.send(updatedTask);
    } catch (error) {
        res.status(404).send({
            message: "Task not found or update failed",
            devMessage: error.message,
        });
    }
});
boardRouter.delete("/:id/tasks/:taskId", (req, res) => {
    const boardId = req.params.id;
    const taskId = req.params.taskId;
    try {
        const deletedTask = boardService.deleteTask(boardId, taskId);
        res.send({ message: "Task deleted successfully", data: deletedTask });
    } catch (error) {
        res.status(404).send({
            message: "Task not found",
            devMessage: error.message,
        });
    }
});

module.exports = boardRouter;