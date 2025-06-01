const fileUtils = require('../utils/fileUtils');
process.loadEnvFile('./env/.env');
const boardsFilePath = process.env.boardsFilePath;
const { v4: uuid } = require('uuid');

const getAllBoards = () => {
    try {
        return fileUtils.read(boardsFilePath);
    } catch (error) {
        console.error('Error reading boards file:', error);
        return [];
    }
}

const getBoardById = (id) => {
    const boards = getAllBoards();
    const board = boards.find(board => board.id === id);
    if (!board) {
        throw new Error('Board not found');
    }
    return board;
}

const addBoard = (boardData) => {
    const boards = getAllBoards();
    const newBoard = { id: uuid(), ...boardData };
    boards.push(newBoard);
    fileUtils.write(boardsFilePath, boards);
    return newBoard;
}

const updateBoard = (id, boardData) => {
    const boards = getAllBoards();
    const boardIndex = boards.findIndex(board => board.id === id);
    if (boardIndex === -1) {
        throw new Error('Board not found');
    }
    boards[boardIndex] = { ...boards[boardIndex], ...boardData };
    fileUtils.write(boardsFilePath, boards);
    return boards[boardIndex];
}

const deleteBoard = (id) => {
    const boards = getAllBoards();
    const boardIndex = boards.findIndex(board => board.id === id);
    if (boardIndex === -1) {
        throw new Error('Board not found');
    }
    const deletedBoard = boards.splice(boardIndex, 1);
    fileUtils.write(boardsFilePath, boards);
    return deletedBoard[0];
}

module.exports = {
    getAllBoards,
    getBoardById,
    addBoard,
    updateBoard,
    deleteBoard
};