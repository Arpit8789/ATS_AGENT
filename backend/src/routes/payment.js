const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
    createOrder,
    verifyPayment,
    createPayment,
    getUserPayments,
    getPaymentById
} = require('../controllers/paymentController');

// Create Razorpay order
router.post('/create-order', protect, createOrder);

// Verify Razorpay payment
router.post('/verify', protect, verifyPayment);

// Record payment
router.post('/', protect, createPayment);

// Get user payments
router.get('/my-payments', protect, getUserPayments);

// Get payment by ID
router.get('/:id', protect, getPaymentById);

module.exports = router;
