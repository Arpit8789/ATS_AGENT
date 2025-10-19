const Job = require('../models/Job');
const jobService = require('../services/jobService');

// Create job (admin only)
exports.createJob = async (req, res) => {
    try {
        const { 
            title, 
            company, 
            location, 
            jobDescription, 
            applyUrl, 
            contactEmail, 
            contactPhone, 
            tags,
            salary,
            jobType,
            experienceLevel
        } = req.body;
        
        const job = new Job({
            title,
            company,
            location,
            jobDescription,
            applyUrl,
            contactEmail,
            contactPhone,
            postedBy: req.user._id,
            tags,
            salary,
            jobType,
            experienceLevel
        });
        
        await job.save();
        
        res.status(201).json({
            success: true,
            job
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const skip = (page - 1) * limit;

        const jobs = await Job.find()
            .sort({ postedAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('postedBy', 'name email');

        const total = await Job.countDocuments();

        res.status(200).json({
            success: true,
            count: jobs.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            jobs
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Search jobs with filters
exports.searchJobs = async (req, res) => {
    try {
        const filters = {
            keywords: req.query.keywords,
            company: req.query.company,
            location: req.query.location,
            tags: req.query.tags ? req.query.tags.split(',') : null,
            jobType: req.query.jobType,
            experienceLevel: req.query.experienceLevel
        };

        const jobs = await jobService.findJobs(filters);

        res.status(200).json({
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

// Get single job by ID
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('postedBy', 'name email')
            .populate('applicants', 'name email');

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        res.json({
            success: true,
            job
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Update job (admin only)
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        const {
            title,
            company,
            location,
            jobDescription,
            applyUrl,
            contactEmail,
            contactPhone,
            tags,
            salary,
            jobType,
            experienceLevel
        } = req.body;

        // Update fields
        if (title) job.title = title;
        if (company) job.company = company;
        if (location) job.location = location;
        if (jobDescription) job.jobDescription = jobDescription;
        if (applyUrl) job.applyUrl = applyUrl;
        if (contactEmail) job.contactEmail = contactEmail;
        if (contactPhone) job.contactPhone = contactPhone;
        if (tags) job.tags = tags;
        if (salary) job.salary = salary;
        if (jobType) job.jobType = jobType;
        if (experienceLevel) job.experienceLevel = experienceLevel;

        await job.save();

        res.json({
            success: true,
            job
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Delete job (admin only)
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        await job.deleteOne();

        res.json({
            success: true,
            message: 'Job deleted successfully'
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Apply to job (user)
exports.applyToJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        // Check if already applied
        if (job.applicants.includes(req.user._id)) {
            return res.status(400).json({
                success: false,
                message: 'Already applied to this job'
            });
        }

        job.applicants.push(req.user._id);
        await job.save();

        res.json({
            success: true,
            message: 'Applied successfully'
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};
// Bulk create jobs (admin only)
exports.bulkCreateJobs = async (req, res) => {
    try {
        const { jobs } = req.body;
        
        if (!Array.isArray(jobs) || jobs.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Jobs array is required'
            });
        }

        // Validate each job has required fields
        const invalidJobs = jobs.filter(job => 
            !job.title || !job.company || !job.jobDescription
        );

        if (invalidJobs.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'All jobs must have title, company, and jobDescription',
                invalidJobs: invalidJobs.length
            });
        }

        // Add postedBy to all jobs
        const jobsWithAdmin = jobs.map(job => ({
            ...job,
            postedBy: req.user._id
        }));

        const createdJobs = await Job.insertMany(jobsWithAdmin);

        res.status(201).json({
            success: true,
            message: `${createdJobs.length} jobs created successfully`,
            count: createdJobs.length,
            jobs: createdJobs
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
