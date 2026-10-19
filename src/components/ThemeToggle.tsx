'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function ThemeToggle({ 
  className = '', 
  showLabel = false,
  size = 'md'
}: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  const isDark = theme === 'dark';

  // Prevent layout shift/hydration mismatch during SSR
  if (!mounted) {
    return (
      <div 
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-sm border border-neutral-800 bg-neutral-900/60 opacity-60 ${className}`} 
        aria-hidden="true" 
      />
    );
  }

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20
  };

  const currentIconSize = iconSizes[size];

  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      className={`relative inline-flex items-center justify-center gap-2 rounded-sm border transition-all duration-300 font-mono text-xs uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-orange-500/50 group ${
        isDark
          ? 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:text-orange-400 hover:border-orange-500/50 hover:bg-neutral-800/80 shadow-[0_0_12px_rgba(0,0,0,0.5)]'
          : 'bg-neutral-900/90 border-neutral-700 text-neutral-200 hover:text-amber-400 hover:border-amber-500/50 hover:bg-neutral-800 shadow-[0_0_12px_rgba(249,115,22,0.15)]'
      } ${
        showLabel ? 'px-3.5 py-2' : 'w-9 h-9 sm:w-10 sm:h-10'
      } ${className}`}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <span className="relative flex items-center justify-center">
        {isDark ? (
          <Moon 
            size={currentIconSize} 
            className="text-neutral-400 group-hover:text-orange-400 transition-transform duration-300 group-hover:-rotate-12" 
          />
        ) : (
          <Sun 
            size={currentIconSize} 
            className="text-amber-400 group-hover:text-amber-300 transition-transform duration-500 group-hover:rotate-90" 
          />
        )}
      </span>

      {showLabel && (
        <span className="font-semibold text-xs tracking-wider">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
}
