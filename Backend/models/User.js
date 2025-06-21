const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true }, // uuid
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    boards: [{ type: String }] // uuid references
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
