const cors = require('cors');

// Allow multiple frontend origins in scalable deployments
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:3000'
];

module.exports = cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
});
