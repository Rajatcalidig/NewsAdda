'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (t?: Theme) => void;
  setTheme: (t: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        setThemeState('light');
      }
    } catch {
      // Ignore localStorage access errors in restricted iframe/browser modes
    }
    setMounted(true);
  }, []);

  const applyTheme = useCallback((currentTheme: Theme) => {
    const root = document.documentElement;

    if (currentTheme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.filter = 'invert(1) hue-rotate(180deg)';

      let style = document.getElementById('theme-style');
      if (!style) {
        style = document.createElement('style');
        style.id = 'theme-style';
        document.head.appendChild(style);
      }
      style.innerHTML = `
        img, video, canvas, iframe, .preserve-color, [data-preserve-theme="true"] { 
          filter: invert(1) hue-rotate(180deg) !important; 
        }
      `;

      // Update mobile browser address bar color
      let themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (themeColorMeta) {
        themeColorMeta.setAttribute('content', '#f5f5f5');
      }
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      root.style.filter = '';

      const style = document.getElementById('theme-style');
      if (style) {
        style.remove();
      }

      let themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (themeColorMeta) {
        themeColorMeta.setAttribute('content', '#0a0a0a');
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Ignore
    }
  }, [theme, mounted, applyTheme]);

  const toggleTheme = useCallback((targetTheme?: Theme) => {
    setThemeState((prev) => {
      if (targetTheme) return targetTheme;
      return prev === 'dark' ? 'light' : 'dark';
    });
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
