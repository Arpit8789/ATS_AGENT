require('dotenv').config();
const app = require('./app');
const connectDB = require('./src/config/db');
const checkEnv = require('./src/config/envCheck');

const PORT = process.env.PORT || 5000;

(async () => {
    try {
        checkEnv();
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Startup error:', err.message);
        process.exit(1);
    }
})();
