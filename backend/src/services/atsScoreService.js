// Core logic for ATS Scoring Algorithm

// Extract keywords from job description
function extractKeywords(text) {
    if (!text) return [];
    
    // Remove common words and clean
    const commonWords = new Set([
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
        'of', 'with', 'is', 'are', 'was', 'were', 'been', 'be', 'have', 'has',
        'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may',
        'might', 'must', 'can'
    ]);

    const words = text
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 2 && !commonWords.has(word));

    // Count frequency
    const frequency = {};
    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });

    // Return top keywords
    return Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 50)
        .map(([word]) => word);
}

// Calculate keyword match score
function calculateKeywordScore(resume, jdKeywords) {
    const resumeText = JSON.stringify(resume.sectionData).toLowerCase();
    const matched = [];
    const missing = [];

    jdKeywords.forEach(keyword => {
        if (resumeText.includes(keyword)) {
            matched.push(keyword);
        } else {
            missing.push(keyword);
        }
    });

    const matchRate = jdKeywords.length > 0 
        ? (matched.length / jdKeywords.length) * 100 
        : 0;

    return {
        score: Math.round(matchRate * 0.4), // 40% weight
        matched,
        missing
    };
}

// Calculate section completeness score
function calculateSectionScore(resume) {
    const sections = resume.sectionData;
    let score = 0;
    const feedback = [];

    // Check required sections
    if (sections.education && sections.education.length > 0) {
        score += 15;
    } else {
        feedback.push('Add education section');
    }

    if (sections.experience && sections.experience.length > 0) {
        score += 25;
    } else {
        feedback.push('Add work experience');
    }

    if (sections.skills && sections.skills.length > 0) {
        score += 15;
    } else {
        feedback.push('Add skills section');
    }

    if (sections.projects && sections.projects.length > 0) {
        score += 10;
    }

    if (sections.certifications && sections.certifications.length > 0) {
        score += 5;
    }

    return {
        score: Math.round(score * 0.3), // 30% weight
        feedback
    };
}

// Calculate format score
function calculateFormatScore(resume) {
    let score = 0;
    const feedback = [];

    // Check template
    if (resume.templateId) {
        score += 10;
    } else {
        feedback.push('Use a professional template');
    }

    // Check title
    if (resume.title && resume.title.length > 0) {
        score += 5;
    } else {
        feedback.push('Add a resume title');
    }

    // Check if sections have proper structure
    const sections = resume.sectionData;
    if (sections.experience) {
        const hasDescriptions = sections.experience.some(exp => 
            exp.description && exp.description.length > 20
        );
        if (hasDescriptions) {
            score += 10;
        } else {
            feedback.push('Add detailed descriptions to experience');
        }
    }

    return {
        score: Math.round(score * 0.2), // 20% weight
        feedback
    };
}

// Calculate contact info score
function calculateContactScore(resume) {
    let score = 0;
    const feedback = [];

    // Would need to check user data or contact fields in resume
    // For now, assume basic validation
    score = 10; // 10% weight - placeholder

    return {
        score,
        feedback
    };
}

// Main ATS scoring function
exports.calculateATSScore = (resume, jobDescription = '') => {
    // Extract keywords from job description
    const jdKeywords = extractKeywords(jobDescription);

    // Calculate individual scores
    const keywordAnalysis = calculateKeywordScore(resume, jdKeywords);
    const sectionAnalysis = calculateSectionScore(resume);
    const formatAnalysis = calculateFormatScore(resume);
    const contactAnalysis = calculateContactScore(resume);

    // Calculate total score
    const totalScore = 
        keywordAnalysis.score +
        sectionAnalysis.score +
        formatAnalysis.score +
        contactAnalysis.score;

    // Compile suggestions
    const improvements = [
        ...sectionAnalysis.feedback,
        ...formatAnalysis.feedback,
        ...contactAnalysis.feedback
    ];

    // Add keyword-based suggestions
    if (keywordAnalysis.missing.length > 0) {
        improvements.push(
            `Add these keywords: ${keywordAnalysis.missing.slice(0, 5).join(', ')}`
        );
    }

    // Compile strengths
    const strengths = [];
    if (keywordAnalysis.score > 30) {
        strengths.push('Good keyword match with job description');
    }
    if (sectionAnalysis.score > 20) {
        strengths.push('Well-structured resume sections');
    }
    if (formatAnalysis.score > 15) {
        strengths.push('Professional format and template');
    }

    return {
        score: Math.min(Math.round(totalScore), 100),
        breakdown: {
            keywordScore: keywordAnalysis.score,
            sectionScore: sectionAnalysis.score,
            formatScore: formatAnalysis.score,
            contactScore: contactAnalysis.score
        },
        matchedKeywords: keywordAnalysis.matched.slice(0, 10),
        missingKeywords: keywordAnalysis.missing.slice(0, 10),
        strengths,
        improvements
    };
};
