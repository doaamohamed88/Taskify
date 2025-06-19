const { v4: uuid } = require('uuid');
const Board = require('../models/Board');
const User = require('../models/User');

const getAllBoards = async () => {
    return await Board.find();
};

const getBoardsByUser = async (userId) => {
    const boards = await Board.find({
        $or: [
            { owner: userId },
            { 'members.id': userId }
        ]
    });

    const unique = Array.from(new Map(boards.map(b => [b.id, b])).values());
    return unique;
};

const getBoardById = async (id) => {
    const board = await Board.findOne({ id });
    if (!board) throw new Error('Board not found');
    return board;
};

const addBoard = async (boardData, owner) => {
    const users = await User.find();
    const members = boardData.members.map(memberId => {
        const user = users.find(u => u.id === memberId);
        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    });

    const newBoard = new Board({
        id: uuid(),
        owner: owner.id,
        createdAt: new Date().toISOString(),
        title: boardData.title,
        description: boardData.description,
        members,
        tasks: []
    });

    await newBoard.save();

    await User.findOneAndUpdate(
        { id: owner.id },
        { $addToSet: { boards: newBoard.id } }
    );

    await Promise.all(
        boardData.members.map(async memberId => {
            await User.findOneAndUpdate(
                { id: memberId },
                { $addToSet: { boards: newBoard.id } }
            );
        })
    );

    return newBoard;
};

const updateBoard = async (id, boardData) => {
    const users = await User.find();
    let updatedMembers = boardData.members;

    if (typeof boardData.members[0] === 'string') {
        updatedMembers = boardData.members.map(memberId => {
            const user = users.find(u => u.id === memberId);
            return {
                id: user.id,
                name: user.name,
                email: user.email
            };
        });
    }

    const board = await Board.findOneAndUpdate(
        { id },
        { ...boardData, members: updatedMembers },
        { new: true }
    );
    console.log(board);

    if (!board) throw new Error('Board not found');
    return board;
};

const deleteBoard = async (id) => {
    const board = await Board.findOneAndDelete({ id });
    if (!board) throw new Error('Board not found');
    return board;
};

const createTask = async (boardId, taskData) => {
    const board = await Board.findOne({ id: boardId });
    if (!board) throw new Error('Board not found');

    const newTask = { id: uuid(), ...taskData };
    board.tasks.push(newTask);
    await board.save();
    return newTask;
};

const updateTask = async (boardId, taskId, taskData) => {
    const board = await Board.findOne({ id: boardId });
    if (!board) throw new Error('Board not found');

    const taskIndex = board.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) throw new Error('Task not found');

    // Update the task fields
    board.tasks[taskIndex] = { ...board.tasks[taskIndex], ...taskData };

    // If the frontend sends updated member scores, update them in the task
    if (taskData.members && Array.isArray(taskData.members)) {
        board.tasks[taskIndex].members = taskData.members;
        // Sync scores to board.members
        board.members = board.members.map(member => {
            const taskMember = taskData.members.find(m => m.id === member.id);
            if (taskMember && typeof taskMember.score === 'number') {

                return { ...member, score: taskMember.score };
            }
            return member;
        });
    }
    board.markModified('tasks'); // Ensure Mongoose saves nested changes
    await board.save();
    return board.tasks[taskIndex];
};

const deleteTask = async (boardId, taskId) => {
    const board = await Board.findOne({ id: boardId });
    if (!board) throw new Error('Board not found');

    const taskIndex = board.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) throw new Error('Task not found');

    const [deleted] = board.tasks.splice(taskIndex, 1);
    await board.save();
    return deleted;
};

module.exports = {
    getAllBoards,
    getBoardsByUser,
    getBoardById,
    addBoard,
    updateBoard,
    deleteBoard,
    createTask,
    updateTask,
    deleteTask
};
