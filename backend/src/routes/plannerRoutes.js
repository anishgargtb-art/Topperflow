const express = require('express');
const { generateStudyPlan } = require('../controllers/plannerController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/generate', requireAuth, generateStudyPlan);

module.exports = router;
