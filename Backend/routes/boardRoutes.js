const { Router } = require('express');
const boardService = require('../services/boardService');
const { authenticate } = require('../middleware/authMiddleware');

const boardRouter = Router();
boardRouter.use(authenticate);

boardRouter.get('/:id', (req, res) => {
    try {
        const board = boardService.getBoardById(req.params.id);
        res.send(board);
    } catch (error) {
        res.status(404).send({ message: 'Board not found' });
    }
});

boardRouter.post('/', (req, res) => {
    const boardData = req.body;
    try {
        const newBoard = boardService.addBoard(boardData);
        res.status(201).send(newBoard);
    } catch (error) {
        res.status(500).send({ message: 'Error adding board' });
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

module.exports = boardRouter;