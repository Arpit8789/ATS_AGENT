const Job = require('../models/Job');

// DSA-inspired job search/filter logic
exports.findJobs = async (filters) => {
    let query = {};

    // Text search
    if (filters.keywords) {
        query.$text = { $search: filters.keywords };
    }

    // Exact match filters
    if (filters.company) {
        query.company = new RegExp(filters.company, 'i');
    }

    if (filters.location) {
        query.location = new RegExp(filters.location, 'i');
    }

    if (filters.jobType) {
        query.jobType = filters.jobType;
    }

    if (filters.experienceLevel) {
        query.experienceLevel = filters.experienceLevel;
    }

    // Array filter
    if (filters.tags && filters.tags.length) {
        query.tags = { $in: filters.tags };
    }

    // Salary range filter
    if (filters.minSalary) {
        query['salary.min'] = { $gte: filters.minSalary };
    }

    if (filters.maxSalary) {
        query['salary.max'] = { $lte: filters.maxSalary };
    }

    return await Job.find(query)
        .sort({ postedAt: -1 })
        .populate('postedBy', 'name email');
};

// Get recommended jobs based on user resume/skills
exports.getRecommendedJobs = async (userSkills) => {
    // Simple recommendation based on skill matching
    return await Job.find({
        tags: { $in: userSkills }
    })
    .sort({ postedAt: -1 })
    .limit(10);
};
