const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // uuid
    owner: { type: String, required: true }, // user id (uuid)
    title: { type: String, required: true },
    description: { type: String },
    members: [{
        id: String,
        name: String,
        email: String,
        score: String
    }],
    tasks: [{
        id: String,
        title: String,
        description: String,
        status: String,
        createdAt: { type: Date, default: Date.now },
        dueDate: Date,
        difficulty: String,
        members: [{
            id: String,
            name: String,
            email: String,
        }]
    }]
});

module.exports = mongoose.model('Board', boardSchema);
