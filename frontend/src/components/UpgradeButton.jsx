'use client';

import { apiRequest } from '../lib/api';

export function UpgradeButton() {
  const handleUpgrade = async () => {
    try {
      const data = await apiRequest('/payments/create-session', { method: 'POST' });
      window.location.href = data.checkoutUrl;
    } catch (error) {
      alert(error.message);
    }
  };

  return <button onClick={handleUpgrade} className="rounded bg-emerald-600 px-4 py-2 text-white">Upgrade to Pro</button>;
}
