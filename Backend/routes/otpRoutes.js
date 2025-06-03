const { Router } = require('express');
const otpService = require('../services/otpService');

const otpRouter = Router();

otpRouter.post('/generate', async (req, res) => {
    const { email } = req.body;
    try {
        await otpService.sendOtpEmail(email);
        res.status(200).send({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).send({ message: 'Error generating OTP' });
    }
});

otpRouter.post('/verify', (req, res) => {
    const { email, otp } = req.body;
    try {
        const isValid = otpService.verifyOtp(email, otp);
        if (isValid) {
            res.status(200).send({ message: 'OTP verified successfully' });
        } else {
            res.status(400).send({ message: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error verifying OTP' });
    }
});

module.exports = otpRouter;