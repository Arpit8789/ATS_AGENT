const mongoose = require('mongoose');

const ATSScoreSchema = new mongoose.Schema({
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    breakdown: {
        keywordScore: { type: Number, default: 0 },
        sectionScore: { type: Number, default: 0 },
        formatScore: { type: Number, default: 0 },
        contactScore: { type: Number, default: 0 }
    },
    suggestions: [{
        type: String
    }],
    matchedKeywords: [{
        type: String
    }],
    missingKeywords: [{
        type: String
    }],
    analyzedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('ATSScore', ATSScoreSchema);
