function buildAnalyticsFromPlan(plan) {
  const weakTopics = plan.schedule.slice(0, 2).map((item) => `${item.subject} - advanced topics`);
  return {
    revisionsCount: 1,
    weakTopics,
    studyStreak: 3
  };
}

module.exports = { buildAnalyticsFromPlan };
