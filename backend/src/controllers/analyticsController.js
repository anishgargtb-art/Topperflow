const pool = require('../db/pool');

async function getAnalytics(req, res) {
  const result = await pool.query('SELECT revisions_count, weak_topics, study_streak, updated_at FROM analytics WHERE user_id = $1', [req.user.id]);
  if (!result.rows.length) {
    return res.json({ revisionsCount: 0, weakTopics: [], studyStreak: 0, updatedAt: null });
  }

  const row = result.rows[0];
  res.json({
    revisionsCount: row.revisions_count,
    weakTopics: row.weak_topics,
    studyStreak: row.study_streak,
    updatedAt: row.updated_at
  });
}

module.exports = { getAnalytics };
