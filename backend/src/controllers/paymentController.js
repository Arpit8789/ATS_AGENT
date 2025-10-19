const Payment = require('../models/Payment');
const { razorpayInstance } = require('../config/payment');
const crypto = require('crypto');

// Create Razorpay Order
exports.createOrder = async (req, res) => {
    try {
        const { amount, currency = 'INR', receipt } = req.body;

        const options = {
            amount: amount * 100, // Amount in paise
            currency,
            receipt: receipt || `receipt_${Date.now()}`,
        };

        const order = await razorpayInstance.orders.create(options);
        
        res.status(201).json({
            success: true,
            order
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Verify Razorpay Payment Signature
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            res.json({ 
                success: true, 
                message: "Payment verified successfully" 
            });
        } else {
            res.status(400).json({ 
                success: false, 
                message: "Invalid payment signature" 
            });
        }
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Record payment after successful transaction
exports.createPayment = async (req, res) => {
    try {
        const { amount, currency, resume, transactionId, provider, status } = req.body;
        
        const payment = new Payment({
            user: req.user._id,
            amount,
            currency,
            resume,
            transactionId,
            provider,
            status
        });
        
        await payment.save();
        res.status(201).json({
            success: true,
            payment
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Get user's payment history
exports.getUserPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user._id })
            .populate('resume', 'title')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            payments
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Get single payment details
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate('user', 'name email')
            .populate('resume', 'title');
        
        if (!payment) {
            return res.status(404).json({ 
                success: false, 
                message: 'Payment not found' 
            });
        }

        // Only owner can view their payment
        if (payment.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }
        
        res.json({
            success: true,
            payment
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};
