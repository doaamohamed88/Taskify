const nodeMailer = require('nodemailer');
const fileUtils = require('../utils/fileUtils');
process.loadEnvFile('./env/.env');
const otpFilePath = process.env.otpFilePath;
const userService = require('./userService');

const getAllOtps = () => {
    try {
        return fileUtils.read(otpFilePath);
    } catch (error) {
        console.error('Error reading OTP file:', error);
        return [];
    }
}

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const otpIndex = (email) => {
    const otps = getAllOtps();
    return otps.findIndex(otp => otp.email === email);
}

const sendOtpEmail = async (email) => {
    const otp = generateOTP();
    const otps = getAllOtps();
    const existingOtpIndex = otpIndex(email);

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. Please use this code to verify your email.`
    };
    await transporter.sendMail(mailOptions);

    if (existingOtpIndex !== -1) {
        otps[existingOtpIndex].otp = otp;
    } else {
        otps.push({ email, otp });
    }
    fileUtils.write(otpFilePath, otps);
}

const verifyOtp = (email, otp) => {
    const otps = getAllOtps();
    const existingOtpIndex = otpIndex(email);

    if (existingOtpIndex === -1 || otps[existingOtpIndex].otp !== otp)
        return false

    otps.splice(existingOtpIndex, 1);
    fileUtils.write(otpFilePath, otps);

    return true;
}

module.exports = { sendOtpEmail, verifyOtp };