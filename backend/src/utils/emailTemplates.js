// Generates cold email templates for job applications
exports.generateColdEmail = ({ user, job }) => {
    return `
        Subject: Application for ${job.title} at ${job.company}

        Hi ${job.contactEmail ? '' : 'Hiring Team'},

        I am eager to apply for the position of ${job.title} at ${job.company}.
        My background in ${user.skills.join(', ')} and experience aligns well.
        Please find my resume attached.

        Thank you,
        ${user.name}
        ${user.email} | ${user.phone}
    `;
};
