// Ensure required environment variables are present before server starts!

const requiredEnv = [
    'MONGODB_URI',
    'JWT_SECRET',
    'RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET',
    'FRONTEND_URL'
];

function checkEnv() {
    let missing = [];
    for (const envKey of requiredEnv) {
        if (!process.env[envKey]) missing.push(envKey);
    }
    if (missing.length) {
        throw new Error(`Missing env vars: ${missing.join(', ')}`);
    }
}

module.exports = checkEnv;
