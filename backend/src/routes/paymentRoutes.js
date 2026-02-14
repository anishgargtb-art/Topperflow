const express = require('express');
const { createSession, stripeWebhook } = require('../controllers/paymentController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/create-session', requireAuth, createSession);
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;
