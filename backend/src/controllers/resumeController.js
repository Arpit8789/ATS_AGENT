const Resume = require('../models/Resume');
const User = require('../models/User');
const ATSScore = require('../models/ATSScore');

// Create new resume
exports.createResume = async (req, res) => {
    try {
        const { title, templateId, sectionData, jdApplied } = req.body;
        
        const resume = new Resume({
            user: req.user._id,
            title,
            templateId,
            sectionData,
            jdApplied
        });
        
        await resume.save();
        
        // Add resume to user's resumes array if it exists in User model
        await User.findByIdAndUpdate(
            req.user._id, 
            { $push: { resumes: resume._id } },
            { runValidators: false }
        ).catch(() => {}); // Ignore error if field doesn't exist
        
        res.status(201).json({
            success: true,
            resume
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Get all resumes of user
exports.getMyResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user._id })
            .populate('atsScore')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
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

// Get single resume by ID
exports.getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id)
            .populate('atsScore')
            .populate('user', 'name email');
        
        if (!resume) {
            return res.status(404).json({ 
                success: false, 
                message: 'Resume not found' 
            });
        }

        // Check if resume belongs to user
        if (resume.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }
        
        res.json({
            success: true,
            resume
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Update resume
exports.updateResume = async (req, res) => {
    try {
        const { title, templateId, sectionData, jdApplied, fileUrl } = req.body;
        
        const resume = await Resume.findById(req.params.id);
        
        if (!resume) {
            return res.status(404).json({ 
                success: false, 
                message: 'Resume not found' 
            });
        }

        // Check ownership
        if (resume.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        // Update fields
        if (title) resume.title = title;
        if (templateId) resume.templateId = templateId;
        if (sectionData) resume.sectionData = sectionData;
        if (jdApplied) resume.jdApplied = jdApplied;
        if (fileUrl) resume.fileUrl = fileUrl;

        await resume.save();
        
        res.json({
            success: true,
            resume
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Delete resume
exports.deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        
        if (!resume) {
            return res.status(404).json({ 
                success: false, 
                message: 'Resume not found' 
            });
        }

        // Check ownership
        if (resume.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        await resume.deleteOne();
        
        // Remove from user's resumes array
        await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { resumes: resume._id } }
        ).catch(() => {});
        
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
