'use client';

import { useState, useTransition } from 'react';
import { loginAction } from '../actions';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError('');
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-sm p-8">
        <div className="mb-8 text-center">
          <h1 className="text-orange-500 font-bold text-2xl tracking-tight mb-2">AIEngineer_OS</h1>
          <p className="text-neutral-500 font-mono text-xs tracking-widest uppercase">Admin Shell Access</p>
        </div>
        
        <form action={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-neutral-400 font-mono text-xs uppercase tracking-wider mb-2">
              Passkey
            </label>
            <input 
              type="password" 
              name="password"
              className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-sm px-4 py-3 focus:outline-none focus:border-orange-500/50 transition-colors font-mono"
              placeholder="••••••••"
              required
            />
          </div>
          
          {error && (
             <p className="text-red-500 text-sm">{error}</p>
          )}

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-neutral-950 font-mono font-bold text-sm tracking-wider uppercase px-4 py-3 rounded-sm transition-colors mt-2"
          >
            {isPending ? 'Authenticating...' : 'Enter System'}
          </button>
        </form>
      </div>
    </div>
  );
}
