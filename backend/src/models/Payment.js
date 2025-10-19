const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume'
    },
    transactionId: {
        type: String,
        unique: true,
        required: true
    },
    provider: {
        type: String,
        enum: ['razorpay'],
        default: 'razorpay'
    },
    status: {
        type: String,
        enum: ['initiated', 'completed', 'failed', 'refunded'],
        default: 'initiated'
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
