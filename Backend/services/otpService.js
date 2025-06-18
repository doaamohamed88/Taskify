const nodeMailer = require('nodemailer');
const Otp = require('../models/Otp');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOtpEmail = async (email) => {
    const otp = generateOTP();

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. Please use this code to verify your email.`,
    };

    await transporter.sendMail(mailOptions);

    // Save or update OTP with 5-minute expiry (handled in the model)
    await Otp.findOneAndUpdate(
        { email },
        { otp, createdAt: new Date() },
        { upsert: true, new: true }
    );
};

const verifyOtp = async (email, otp) => {
    const existing = await Otp.findOne({ email });
    if (!existing || existing.otp !== otp) return false;

    // Clean up after verification
    await Otp.deleteOne({ email });
    return true;
};

module.exports = {
    sendOtpEmail,
    verifyOtp,
};
