const { z } = require('zod');
const pool = require('../db/pool');
const { generatePlan } = require('../services/plannerService');
const { buildAnalyticsFromPlan } = require('../services/analyticsService');

const schema = z.object({
  subjects: z.array(z.string().min(1)).min(1),
  examDate: z.string()
});

async function generateStudyPlan(req, res) {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid planner payload' });

  const plan = generatePlan(parsed.data.subjects, parsed.data.examDate);

  const inserted = await pool.query(
    `INSERT INTO plans (user_id, subjects, exam_date, schedule, reminders)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, subjects, exam_date, schedule, reminders, created_at`,
    [req.user.id, JSON.stringify(parsed.data.subjects), parsed.data.examDate, JSON.stringify(plan.schedule), JSON.stringify(plan.reminders)]
  );

  const analytics = buildAnalyticsFromPlan(plan);
  await pool.query(
    `INSERT INTO analytics (user_id, revisions_count, weak_topics, study_streak, updated_at)
     VALUES ($1, $2, $3, $4, NOW())
     ON CONFLICT (user_id)
     DO UPDATE SET revisions_count = EXCLUDED.revisions_count,
                   weak_topics = EXCLUDED.weak_topics,
                   study_streak = EXCLUDED.study_streak,
                   updated_at = NOW()`,
    [req.user.id, analytics.revisionsCount, JSON.stringify(analytics.weakTopics), analytics.studyStreak]
  );

  res.status(201).json({ plan: inserted.rows[0], analytics });
}

module.exports = { generateStudyPlan };
