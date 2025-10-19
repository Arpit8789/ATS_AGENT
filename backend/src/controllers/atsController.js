const ATSScore = require('../models/ATSScore');
const Resume = require('../models/Resume');
const atsScoreService = require('../services/atsScoreService');

// Analyze resume and calculate ATS score
exports.analyzeResume = async (req, res) => {
    try {
        const { resumeId, jobDescription } = req.body;

        // Check if resume exists and belongs to user
        const resume = await Resume.findById(resumeId);
        
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        if (resume.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        // Calculate ATS score
        const analysis = atsScoreService.calculateATSScore(resume, jobDescription);

        // Save the score
        let atsScore = await ATSScore.findOne({ resume: resumeId });

        if (atsScore) {
            atsScore.score = analysis.score;
            atsScore.suggestions = analysis.improvements;
            atsScore.matchedKeywords = analysis.matchedKeywords;
            atsScore.missingKeywords = analysis.missingKeywords;
            atsScore.breakdown = analysis.breakdown;
            await atsScore.save();
        } else {
            atsScore = new ATSScore({
                resume: resumeId,
                user: req.user._id,
                score: analysis.score,
                suggestions: analysis.improvements,
                matchedKeywords: analysis.matchedKeywords,
                missingKeywords: analysis.missingKeywords,
                breakdown: analysis.breakdown
            });
            await atsScore.save();

            resume.atsScore = atsScore._id;
            await resume.save();
        }

        res.status(201).json({
            success: true,
            analysis,
            atsScore
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Save ATS score manually
exports.saveATSScore = async (req, res) => {
    try {
        const { resumeId, score, suggestions, matchedKeywords, missingKeywords } = req.body;

        const resume = await Resume.findById(resumeId);
        
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        if (resume.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        let atsScore = await ATSScore.findOne({ resume: resumeId });

        if (atsScore) {
            atsScore.score = score;
            atsScore.suggestions = suggestions || [];
            atsScore.matchedKeywords = matchedKeywords || [];
            atsScore.missingKeywords = missingKeywords || [];
            await atsScore.save();
        } else {
            atsScore = new ATSScore({
                resume: resumeId,
                user: req.user._id,
                score,
                suggestions: suggestions || [],
                matchedKeywords: matchedKeywords || [],
                missingKeywords: missingKeywords || []
            });
            await atsScore.save();

            resume.atsScore = atsScore._id;
            await resume.save();
        }

        res.status(201).json({
            success: true,
            atsScore
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get ATS score by resume ID
exports.getATSScore = async (req, res) => {
    try {
        const atsScore = await ATSScore.findOne({ resume: req.params.resumeId })
            .populate('resume', 'title');

        if (!atsScore) {
            return res.status(404).json({
                success: false,
                message: 'ATS score not found'
            });
        }

        // Check ownership
        if (atsScore.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        res.json({
            success: true,
            atsScore
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
