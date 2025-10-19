const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { protect } = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');

// Public routes
router.get('/all', jobController.getAllJobs);
router.get('/search', jobController.searchJobs);
router.get('/:id', jobController.getJobById);

// Protected routes (Admin only)
router.post('/create', protect, adminOnly, jobController.createJob);
router.post('/bulk-create', protect, adminOnly, jobController.bulkCreateJobs);

router.put('/:id', protect, adminOnly, jobController.updateJob);
router.delete('/:id', protect, adminOnly, jobController.deleteJob);

// User routes
router.post('/:id/apply', protect, jobController.applyToJob);

module.exports = router;
