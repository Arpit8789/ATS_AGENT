// Global error handler
module.exports = (err, req, res, next) => {
    console.error("Error:", err.stack || err.message);
    res.status(500).json({
        success: false,
        error: err.message || 'Internal Server Error'
    });
};
