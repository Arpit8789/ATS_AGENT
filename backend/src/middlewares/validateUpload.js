// Middleware to validate file uploads
const validateUpload = (req, res, next) => {
    if (!req.file && !req.files) {
        return res.status(400).json({
            success: false,
            message: 'No file uploaded'
        });
    }

    // Add additional validation as needed
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const file = req.file || req.files[0];

    if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid file type. Only PDF, JPEG, PNG allowed.'
        });
    }

    if (file.size > maxSize) {
        return res.status(400).json({
            success: false,
            message: 'File too large. Maximum 5MB allowed.'
        });
    }

    next();
};

module.exports = validateUpload;
