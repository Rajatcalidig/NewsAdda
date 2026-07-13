'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export function ThemeSettings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-8">
      <h3 className="text-lg font-bold text-white mb-6">Theme Preferences</h3>
      
      <div className="flex gap-4">
        <button 
          onClick={() => toggleTheme('dark')}
          className={`flex-1 flex flex-col items-center gap-3 p-6 border-2 rounded-sm relative overflow-hidden group transition-colors ${
            theme === 'dark' ? 'border-orange-500 bg-neutral-900' : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
          }`}
        >
          {theme === 'dark' && <div className="absolute inset-0 bg-orange-500/5"></div>}
          <Moon size={24} className={theme === 'dark' ? 'text-orange-500' : 'text-neutral-500'} />
          <span className={theme === 'dark' ? 'text-white font-bold text-sm' : 'text-neutral-400 font-bold text-sm'}>Dark Mode</span>
          {theme === 'dark' && <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-orange-500"></div>}
        </button>
        
        <button 
          onClick={() => toggleTheme('light')}
          className={`flex-1 flex flex-col items-center gap-3 p-6 border-2 rounded-sm relative overflow-hidden group transition-colors ${
            theme === 'light' ? 'border-orange-500 bg-neutral-900' : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
          }`}
        >
          {theme === 'light' && <div className="absolute inset-0 bg-orange-500/5"></div>}
          <Sun size={24} className={theme === 'light' ? 'text-orange-500' : 'text-neutral-500'} />
          <span className={theme === 'light' ? 'text-white font-bold text-sm' : 'text-neutral-400 font-bold text-sm'}>Light Mode</span>
          {theme === 'light' && <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-orange-500"></div>}
        </button>
      </div>
    </div>
  );
}
