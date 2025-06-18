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
    let memberBoards = boards.filter(board => board.members.some(member => member.id === userId));
    const allBoards = [...ownerBoards, ...memberBoards];
    const uniqueBoards = allBoards.filter(
        (board, index, self) => index === self.findIndex(b => b.id === board.id)
    );
    return uniqueBoards;
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
    // const newBoard = { id: uuid(), owner: owner.id, createdAt: new Date().toISOString(), ...boardData };
    const members = boardData.members.map((memberId) => {
        const user = users.find((user) => user.id === memberId);
        return {
            id: user.id,
            name: user.name, // or whatever fields you need
            email: user.email,
        };
    });

    const newBoard = {
        id: uuid(),
        owner: owner.id,
        createdAt: new Date().toISOString(),
        title: boardData.title,
        description: boardData.description,
        members,
        tasks: [],
    };
    console.log("New board created:", newBoard);

    updateUser(owner.id, {
        ...owner,
        boards: Array.from(new Set([...(owner.boards || []), newBoard.id]))
    });
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

const createTask = (boardId, taskData) => {
    const allBoards = getAllBoards();
    const board = allBoards.find((board) => board.id === boardId);
    const task = { id: uuid(), ...taskData };
    board.tasks.push(task);
    fileUtils.write(boardsFilePath, allBoards);
    return task;
};

const updateTask = (boardId, taskId, taskData) => {
    const allBoards = getAllBoards();
    const board = allBoards.find((board) => board.id === boardId);
    const taskIndex = board.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
        throw new Error("Task not found");
    }
    board.tasks[taskIndex] = { ...board.tasks[taskIndex], ...taskData };
    fileUtils.write(boardsFilePath, allBoards);
    return board.tasks[taskIndex];
};

const deleteTask = (boardId, taskId) => {
    const allBoards = getAllBoards();
    const board = allBoards.find((board) => board.id === boardId);
    const taskIndex = board.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
        throw new Error("Task not found");
    }
    const deletedTask = board.tasks.splice(taskIndex, 1);
    fileUtils.write(boardsFilePath, allBoards);
    return deletedTask[0];
};
module.exports = {
    getAllBoards,
    getBoardById,
    addBoard,
    updateBoard,
    deleteBoard,
    getBoardsByUser,
    createTask,
    updateTask,
    deleteTask,
};
