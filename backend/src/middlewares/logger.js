// Request logger middleware for audit trails
module.exports = (req, res, next) => {
    const userId = req.user ? req.user._id : 'public';
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} User: ${userId}`);
    next();
};
