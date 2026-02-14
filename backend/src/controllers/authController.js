const jwt = require('jsonwebtoken');
const { z } = require('zod');
const pool = require('../db/pool');
const env = require('../config/env');
const { verifyGoogleToken } = require('../services/firebaseService');

const schema = z.object({ token: z.string().min(1) });

async function googleAuth(req, res) {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid payload' });

  const profile = await verifyGoogleToken(parsed.data.token);

  const upsert = await pool.query(
    `INSERT INTO users (firebase_uid, email, name, avatar_url)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (firebase_uid)
     DO UPDATE SET email = EXCLUDED.email, name = EXCLUDED.name, avatar_url = EXCLUDED.avatar_url
     RETURNING id, email, name, avatar_url, plan_tier`,
    [profile.uid, profile.email, profile.name, profile.picture]
  );

  const user = upsert.rows[0];
  const sessionToken = jwt.sign({ id: user.id, email: user.email }, env.jwtSecret, { expiresIn: '7d' });

  res.json({ token: sessionToken, user });
}

module.exports = { googleAuth };
