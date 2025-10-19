const express = require('express');
const router = express.Router();
const atsController = require('../controllers/atsController');
const { protect } = require('../middlewares/auth');

// Save/Update ATS score for resume (protected)
router.post('/score', protect, atsController.saveATSScore);

// Get ATS score by resume ID
router.get('/score/:resumeId', protect, atsController.getATSScore);

// Analyze resume against job description
router.post('/analyze', protect, atsController.analyzeResume);

module.exports = router;
