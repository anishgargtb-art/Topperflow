'use client';

import { useState } from 'react';
import { apiRequest } from '../lib/api';

export function PlannerForm({ onPlanCreated }) {
  const [subjects, setSubjects] = useState('Math, Physics');
  const [examDate, setExamDate] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await apiRequest('/planner/generate', {
        method: 'POST',
        body: JSON.stringify({
          subjects: subjects.split(',').map((subject) => subject.trim()).filter(Boolean),
          examDate
        })
      });
      onPlanCreated(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded border bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">Generate Study Plan</h2>
      <input value={subjects} onChange={(e) => setSubjects(e.target.value)} placeholder="Subjects (comma separated)" className="w-full rounded border p-2" required />
      <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} className="w-full rounded border p-2" required />
      <button className="rounded bg-indigo-600 px-4 py-2 text-white" disabled={loading}>
        {loading ? 'Generating...' : 'Generate Plan'}
      </button>
    </form>
  );
}
