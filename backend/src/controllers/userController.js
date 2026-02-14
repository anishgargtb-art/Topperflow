const pool = require('../db/pool');

async function getProfile(req, res) {
  const result = await pool.query('SELECT id, email, name, avatar_url, plan_tier, created_at FROM users WHERE id = $1', [req.user.id]);
  if (!result.rows.length) return res.status(404).json({ message: 'User not found' });
  res.json(result.rows[0]);
}

module.exports = { getProfile };
