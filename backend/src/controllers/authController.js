const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendRegistrationOTP, sendPasswordResetOTP } = require('../services/emailService');

// Generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Step 1: Register user (send OTP)
exports.register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        
        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide all required fields' 
            });
        }

        // Check if user exists
        let user = await User.findOne({ email });
        
        if (user && user.isVerified) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email already registered' 
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);
        
        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        if (user) {
            // Update existing unverified user
            user.name = name;
            user.phone = phone;
            user.passwordHash = passwordHash;
            user.otp = otp;
            user.otpExpiry = otpExpiry;
            await user.save();
        } else {
            // Create new user
            user = new User({ 
                name, 
                email, 
                passwordHash, 
                phone,
                otp,
                otpExpiry,
                isVerified: false
            });
            await user.save();
        }

        // Send OTP email
        await sendRegistrationOTP(email, otp, name);
        
        res.status(201).json({ 
            success: true, 
            message: 'OTP sent to your email. Please verify to complete registration.',
            email: email
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Step 2: Verify OTP and complete registration
exports.verifyRegistrationOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Email and OTP are required'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: 'User already verified. Please login.'
            });
        }

        // Check OTP expiry
        if (user.otpExpiry < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'OTP has expired. Please request a new one.'
            });
        }

        // Verify OTP
        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        // Mark as verified
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.json({
            success: true,
            message: 'Email verified successfully! You can now login.'
        });
    } catch (err) {
        console.error('OTP verification error:', err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Resend OTP
exports.resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: 'User already verified'
            });
        }

        // Generate new OTP
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // Send OTP email
        await sendRegistrationOTP(email, otp, user.name);

        res.json({
            success: true,
            message: 'New OTP sent to your email'
        });
    } catch (err) {
        console.error('Resend OTP error:', err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Login user - Updated to include role in response
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Find user
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        // Check if verified (skip for admin)
        if (!user.isVerified && user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Please verify your email first',
                needsVerification: true
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        
        if (!isMatch) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        // Generate token with role
        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );
        
        // Send response with role
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role, // Include role for frontend routing
            subscription: user.subscription
        };
        
        res.status(200).json({ 
            success: true, 
            user: userResponse, 
            token 
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Step 1: Request password reset (send OTP)
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No account found with this email'
            });
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user.resetPasswordOTP = otp;
        user.resetPasswordOTPExpiry = otpExpiry;
        await user.save();

        // Send OTP email
        await sendPasswordResetOTP(email, otp, user.name);

        res.json({
            success: true,
            message: 'OTP sent to your email'
        });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Step 2: Verify OTP for password reset
exports.verifyResetOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Email and OTP are required'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check OTP expiry
        if (user.resetPasswordOTPExpiry < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'OTP has expired'
            });
        }

        // Verify OTP
        if (user.resetPasswordOTP !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        res.json({
            success: true,
            message: 'OTP verified. You can now reset your password.'
        });
    } catch (err) {
        console.error('Verify reset OTP error:', err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Step 3: Reset password
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Email, OTP, and new password are required'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check OTP expiry
        if (user.resetPasswordOTPExpiry < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'OTP has expired'
            });
        }

        // Verify OTP
        if (user.resetPasswordOTP !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        // Hash new password
        const passwordHash = await bcrypt.hash(newPassword, 10);

        // Update password and clear OTP
        user.passwordHash = passwordHash;
        user.resetPasswordOTP = undefined;
        user.resetPasswordOTPExpiry = undefined;
        await user.save();

        res.json({
            success: true,
            message: 'Password reset successfully. You can now login with your new password.'
        });
    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-passwordHash -otp -otpExpiry -resetPasswordOTP -resetPasswordOTPExpiry');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Logout
exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
