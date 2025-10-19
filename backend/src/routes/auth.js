const express = require('express');
const router = express.Router();
const {
    register,
    verifyRegistrationOTP,
    resendOTP,
    login,
    forgotPassword,
    verifyResetOTP,
    resetPassword,
    getCurrentUser,
    logout
} = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

// Registration flow
router.post('/register', register);
router.post('/verify-otp', verifyRegistrationOTP);
router.post('/resend-otp', resendOTP);

// Login
router.post('/login', login);

// Password reset flow
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-otp', verifyResetOTP);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.post('/logout', protect, logout);

module.exports = router;
