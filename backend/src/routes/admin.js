const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');
const {
    getDashboardStats,
    getAllPayments,
    getPaymentStats,
    getAllUsers,
    getAllResumes,
    getAllJobsAdmin,
    deleteUser,
    deleteResume,
    updateUserStatus
} = require('../controllers/adminController');

// All routes require auth + admin
router.use(protect, adminOnly);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Payment management
router.get('/payments', getAllPayments);
router.get('/payments/stats', getPaymentStats);

// User management
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/status', updateUserStatus);

// Resume management
router.get('/resumes', getAllResumes);
router.delete('/resumes/:id', deleteResume);

// Job management
router.get('/jobs', getAllJobsAdmin);

module.exports = router;
