'use client';

import { createContext, useContext } from 'react';

interface ThemeContextValue {
  resolvedTheme: 'dark';
}

const ThemeContext = createContext<ThemeContextValue>({ resolvedTheme: 'dark' });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={{ resolvedTheme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
