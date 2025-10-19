const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const atsController = require('../controllers/atsController');
const { protect } = require('../middlewares/auth');
const validateUpload = require('../middlewares/validateUpload');

// CRUD resumes (protected)
router.post('/create', protect, resumeController.createResume);
router.get('/my', protect, resumeController.getMyResumes);
router.get('/:id', protect, resumeController.getResumeById);
router.put('/:id', protect, resumeController.updateResume);
router.delete('/:id', protect, resumeController.deleteResume);

// ATS Score
router.post('/ats-score', protect, atsController.saveATSScore);

module.exports = router;
