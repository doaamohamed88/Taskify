const { updateUser, getAllUsers } = require('./userService')
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

const getBoardsByUser = (userId) => {
    const boards = getAllBoards();
    let ownerBoards = boards.filter(board => board.owner === userId);
    let memberBoards = boards.filter(board => board.members.includes(userId))
    return [...ownerBoards, ...memberBoards];
};

const getBoardById = (id) => {
    const boards = getAllBoards();
    const board = boards.find(board => board.id === id);
    if (!board) {
        throw new Error('Board not found');
    }
    return board;
}

const addBoard = (boardData, owner) => {
    const boards = getAllBoards();
    const users = getAllUsers();
    const newBoard = { id: uuid(), owner: owner.id, ...boardData };
    console.log("New board created:", newBoard);

    updateUser(owner.id, { ...owner, boards: [...owner.boards, newBoard.id] })

    boardData.members.forEach((memberId) => {
        let member = users.find((user) => user.id === memberId);
        updateUser(memberId, { ...member, boards: [...member.boards, newBoard.id] })
    });

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
    deleteBoard,
    getBoardsByUser
};