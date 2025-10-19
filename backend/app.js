const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('./src/config/cors');
const errorHandler = require('./src/middlewares/errorHandler');
const logger = require('./src/middlewares/logger');

const authRoutes = require('./src/routes/auth');
const resumeRoutes = require('./src/routes/resume');
const jobRoutes = require('./src/routes/jobs');
const adminRoutes = require('./src/routes/admin');
const atsRoutes = require('./src/routes/ats');
const paymentRoutes = require('./src/routes/payment');

const app = express();

// Security & core middlewares
app.use(helmet());
app.use(cors);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ats', atsRoutes);
app.use('/api/payments', paymentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ success: true, status: 'Server running!' });
});

// Error handler
app.use(errorHandler);

module.exports = app;
