'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
const ThemeContext = createContext<{theme: Theme, toggleTheme: (t: Theme) => void}>({ theme: 'dark', toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (theme === 'light') {
      document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
      let style = document.getElementById('theme-style');
      if (!style) {
        style = document.createElement('style');
        style.id = 'theme-style';
        document.head.appendChild(style);
      }
      style.innerHTML = `img, video, canvas, iframe, .preserve-color { filter: invert(1) hue-rotate(180deg) !important; }`;
    } else {
      document.documentElement.style.filter = '';
      const style = document.getElementById('theme-style');
      if (style) style.remove();
    }
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
