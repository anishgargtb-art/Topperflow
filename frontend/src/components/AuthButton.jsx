'use client';

import { useState } from 'react';
import { signInWithGoogle } from '../lib/firebase';
import { apiRequest } from '../lib/api';

export function AuthButton({ mode = 'login' }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const googleToken = await signInWithGoogle();
      const data = await apiRequest('/auth/google', {
        method: 'POST',
        body: JSON.stringify({ token: googleToken })
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/dashboard';
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleGoogleSignIn} className="w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500" disabled={loading}>
      {loading ? 'Please wait...' : `${mode === 'signup' ? 'Sign up' : 'Login'} with Google`}
    </button>
  );
}
