const pool = require('../db/pool');
const env = require('../config/env');
const { createCheckoutSession, stripe } = require('../services/paymentService');

async function createSession(req, res) {
  const userResult = await pool.query('SELECT id, email FROM users WHERE id = $1', [req.user.id]);
  if (!userResult.rows.length) return res.status(404).json({ message: 'User not found' });

  const session = await createCheckoutSession(userResult.rows[0]);
  await pool.query(
    `INSERT INTO payments (user_id, provider, session_id, status)
     VALUES ($1, $2, $3, $4)`,
    [req.user.id, 'stripe', session.id, 'pending']
  );

  res.status(201).json({ checkoutUrl: session.url, sessionId: session.id });
}

async function stripeWebhook(req, res) {
  const signature = req.headers['stripe-signature'];

  if (!stripe || !env.stripeWebhookSecret) {
    return res.status(200).send('Webhook ignored (no Stripe config)');
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, env.stripeWebhookSecret);
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await pool.query('UPDATE payments SET status = $1, updated_at = NOW() WHERE session_id = $2', ['completed', session.id]);
    const userId = session.metadata?.userId;
    if (userId) await pool.query("UPDATE users SET plan_tier = 'pro' WHERE id = $1", [userId]);
  }

  res.json({ received: true });
}

module.exports = { createSession, stripeWebhook };
