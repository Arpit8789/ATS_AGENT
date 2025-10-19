const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Auth Middleware (renamed to protect for consistency)
exports.protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "No auth token" 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid user" 
            });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ 
            success: false, 
            message: "Authorization failed" 
        });
    }
};
