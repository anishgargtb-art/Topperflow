const express = require('express');
const { getProfile } = require('../controllers/userController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/profile', requireAuth, getProfile);

module.exports = router;
