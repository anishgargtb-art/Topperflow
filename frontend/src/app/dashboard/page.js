'use client';

import { useEffect, useState } from 'react';
import { PlannerForm } from '../../components/PlannerForm';
import { AnalyticsCard } from '../../components/AnalyticsCard';
import { UpgradeButton } from '../../components/UpgradeButton';
import { apiRequest } from '../../lib/api';

export default function DashboardPage() {
  const [plan, setPlan] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    apiRequest('/analytics').then(setAnalytics).catch(() => null);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <PlannerForm onPlanCreated={(data) => { setPlan(data.plan); setAnalytics(data.analytics); }} />
      <div className="space-y-4">
        <AnalyticsCard analytics={analytics} />
        <section className="rounded border bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold">Latest Plan</h2>
          {!plan ? <p className="text-sm text-slate-600">Generate a plan to view schedule.</p> : (
            <ul className="mt-2 space-y-2 text-sm">
              {plan.schedule.map((item) => (
                <li key={item.subject} className="rounded bg-slate-50 p-2">{item.subject}: {item.focusArea} ({item.sessionsPerWeek}/week)</li>
              ))}
            </ul>
          )}
        </section>
        <UpgradeButton />
      </div>
    </div>
  );
}
