const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    salary: {
        min: Number,
        max: Number,
        currency: {
            type: String,
            default: 'INR'
        }
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
        default: 'Full-time'
    },
    experienceLevel: {
        type: String,
        enum: ['Entry', 'Mid', 'Senior', 'Lead'],
        default: 'Entry'
    },
    applyUrl: {
        type: String
    },
    contactEmail: {
        type: String,
        trim: true
    },
    contactPhone: {
        type: String,
        trim: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Admin ID
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    tags: [{
        type: String
    }]
}, { timestamps: true });

// Text index for search
JobSchema.index({ 
    title: 'text', 
    company: 'text', 
    jobDescription: 'text',
    tags: 'text'
});

module.exports = mongoose.model('Job', JobSchema);
