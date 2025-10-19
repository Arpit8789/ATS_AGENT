const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};

// Send OTP for registration
exports.sendRegistrationOTP = async (email, otp, name) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your ATS Agent Account',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4F46E5;">Welcome to ATS Agent!</h2>
                <p>Hi ${name},</p>
                <p>Thank you for registering with ATS Agent. Please use the OTP below to verify your account:</p>
                <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                    <h1 style="color: #4F46E5; font-size: 32px; margin: 0;">${otp}</h1>
                </div>
                <p style="color: #666;">This OTP will expire in <strong>10 minutes</strong>.</p>
                <p>If you didn't request this, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 20px 0;">
                <p style="color: #999; font-size: 12px;">ATS Agent - Build Your Dream Career</p>
            </div>
        `
    };

    return await transporter.sendMail(mailOptions);
};

// Send OTP for password reset
exports.sendPasswordResetOTP = async (email, otp, name) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: email,
        subject: 'Reset Your Password - ATS Agent',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4F46E5;">Password Reset Request</h2>
                <p>Hi ${name},</p>
                <p>We received a request to reset your password. Use the OTP below:</p>
                <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                    <h1 style="color: #4F46E5; font-size: 32px; margin: 0;">${otp}</h1>
                </div>
                <p style="color: #666;">This OTP will expire in <strong>10 minutes</strong>.</p>
                <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
                <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 20px 0;">
                <p style="color: #999; font-size: 12px;">ATS Agent - Build Your Dream Career</p>
            </div>
        `
    };

    return await transporter.sendMail(mailOptions);
};

// Generic email sender
exports.sendEmail = async ({ to, subject, body }) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to,
        subject,
        html: body
    };

    return await transporter.sendMail(mailOptions);
};
