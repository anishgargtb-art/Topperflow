function daysBetween(startDate, endDate) {
  return Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));
}

function generatePlan(subjects, examDate) {
  const now = new Date();
  const target = new Date(examDate);
  const totalDays = daysBetween(now, target);

  const schedule = subjects.map((subject, index) => ({
    subject,
    sessionsPerWeek: Math.max(2, Math.floor(14 / subjects.length)),
    focusArea: index % 2 === 0 ? 'Concept mastery' : 'Problem solving',
    suggestedHours: Math.max(3, Math.floor(totalDays / Math.max(subjects.length, 1)))
  }));

  const reminders = [
    { type: 'daily', message: 'Review flashcards for 20 minutes.' },
    { type: 'weekly', message: 'Take one timed mock test.' },
    { type: 'milestone', message: `Complete first revision by ${new Date(now.getTime() + (totalDays * 0.5 * 86400000)).toDateString()}.` }
  ];

  return { schedule, reminders };
}

module.exports = { generatePlan };
