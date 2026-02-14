const express = require('express');
const { getAnalytics } = require('../controllers/analyticsController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/', requireAuth, getAnalytics);

module.exports = router;
