const Payment = require('../models/Payment');
const User = require('../models/User');
const Resume = require('../models/Resume');
const Job = require('../models/Job');

// Dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalResumes = await Resume.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalPayments = await Payment.countDocuments({ status: 'completed' });

        const totalRevenue = await Payment.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        // Recent activity
        const recentUsers = await User.find({ role: 'user' })
            .select('name email createdAt')
            .sort({ createdAt: -1 })
            .limit(5);

        const recentResumes = await Resume.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalResumes,
                totalJobs,
                totalPayments,
                totalRevenue: totalRevenue[0]?.total || 0
            },
            recentUsers,
            recentResumes
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Get all payments (Admin)
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('user', 'name email')
            .populate('resume', 'title')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: payments.length,
            payments
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Get payment statistics (Admin)
exports.getPaymentStats = async (req, res) => {
    try {
        const totalPayments = await Payment.countDocuments();
        const completedPayments = await Payment.countDocuments({ status: 'completed' });
        const failedPayments = await Payment.countDocuments({ status: 'failed' });
        const pendingPayments = await Payment.countDocuments({ status: 'pending' });
        
        const totalRevenue = await Payment.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        res.json({
            success: true,
            stats: {
                totalPayments,
                completedPayments,
                failedPayments,
                pendingPayments,
                totalRevenue: totalRevenue[0]?.total || 0
            }
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Get all users (Admin)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' })
            .select('-passwordHash')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: users.length,
            users
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Get all resumes (Admin)
exports.getAllResumes = async (req, res) => {
    try {
        const resumes = await Resume.find()
            .populate('user', 'name email')
            .populate('atsScore')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: resumes.length,
            resumes
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Get all jobs (Admin)
exports.getAllJobsAdmin = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate('postedBy', 'name email')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: jobs.length,
            jobs
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Delete user (Admin)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        // Don't allow deleting admin users
        if (user.role === 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Cannot delete admin users'
            });
        }

        await user.deleteOne();
        
        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Delete resume (Admin)
exports.deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        
        if (!resume) {
            return res.status(404).json({ 
                success: false, 
                message: 'Resume not found' 
            });
        }

        await resume.deleteOne();
        
        res.json({
            success: true,
            message: 'Resume deleted successfully'
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Update user status (Admin)
exports.updateUserStatus = async (req, res) => {
    try {
        const { isVerified, subscription } = req.body;
        
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (isVerified !== undefined) user.isVerified = isVerified;
        if (subscription) user.subscription = { ...user.subscription, ...subscription };

        await user.save();

        res.json({
            success: true,
            message: 'User updated successfully',
            user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
