const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const boardRouter = require('./routes/boardRoutes');
const otpRouter = require('./routes/otpRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/otp', otpRouter);

app.listen(3000, () => {
    console.log("http://localhost:3000")
})