const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        trim: true
    },
    templateId: {
        type: String, // e.g., "template1", "template2"
        required: true
    },
    fileUrl: {
        type: String, // Cloudinary URL for PDF
    },
    atsScore: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ATSScore'
    },
    aiDetected: {
        type: Boolean,
        default: false
    },
    sectionData: {
        education: { type: Array, default: [] },
        experience: { type: Array, default: [] },
        skills: { type: Array, default: [] },
        projects: { type: Array, default: [] },
        certifications: { type: Array, default: [] },
        achievements: { type: Array, default: [] }
    },
    jdApplied: {
        type: String // If resume is tailored for a JD
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isPaid: {
        type: Boolean,
        default: false // True after user pays to download
    }
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
