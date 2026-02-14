'use client';

import { useEffect, useState } from 'react';
import { apiRequest } from '../../lib/api';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    apiRequest('/user/profile').then(setProfile).catch(() => null);
  }, []);

  if (!profile) return <p>Login to view profile.</p>;

  return (
    <section className="mx-auto max-w-lg rounded border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Plan: {profile.plan_tier}</p>
    </section>
  );
}
