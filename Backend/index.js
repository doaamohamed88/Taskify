const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./routes/userRoutes');
const boardRouter = require('./routes/boardRoutes');
const otpRouter = require('./routes/otpRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/otp', otpRouter);

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected');
        app.listen(3000, () => {
            console.log('🚀 Server running at http://localhost:3000');
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.message);
    });
