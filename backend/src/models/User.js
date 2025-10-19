const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    resetPasswordOTP: {
        type: String
    },
    resetPasswordOTPExpiry: {
        type: Date
    },
    profilePic: {
        type: String
    },
    resumes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume'
    }],
    subscription: {
        isActive: { type: Boolean, default: false },
        plan: { type: String, default: "basic" },
        expires: { type: Date }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
