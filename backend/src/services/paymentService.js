const Stripe = require('stripe');
const env = require('../config/env');

const stripe = env.stripeSecretKey ? new Stripe(env.stripeSecretKey) : null;

async function createCheckoutSession(user) {
  if (!stripe || !env.stripePriceId) {
    return {
      id: 'mock_session',
      url: `${env.frontendUrl}/dashboard?payment=mock`
    };
  }

  return stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: env.stripePriceId, quantity: 1 }],
    success_url: `${env.frontendUrl}/dashboard?payment=success`,
    cancel_url: `${env.frontendUrl}/pricing?payment=cancelled`,
    customer_email: user.email,
    metadata: { userId: String(user.id) }
  });
}

module.exports = { createCheckoutSession, stripe };
