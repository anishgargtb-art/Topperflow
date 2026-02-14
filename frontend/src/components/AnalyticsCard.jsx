export function AnalyticsCard({ analytics }) {
  return (
    <section className="rounded border bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">Analytics</h2>
      <p>Revisions: {analytics?.revisionsCount ?? 0}</p>
      <p>Study streak: {analytics?.studyStreak ?? 0} days</p>
      <p>Weak topics: {(analytics?.weakTopics || []).join(', ') || 'N/A'}</p>
    </section>
  );
}
