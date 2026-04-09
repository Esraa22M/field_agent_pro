import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { fonts, spacing, colors } from './index';

type ThemeType = {
  colors: typeof colors.dark & typeof colors.status;
  fonts: typeof fonts;
  spacing: typeof spacing;
};

interface ThemeContextInterface {
  theme: ThemeType;
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextInterface | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme();
  
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDark(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const theme = useMemo(() => ({
    colors: isDark ? { ...colors.dark, ...colors.status } : { ...colors.light, ...colors.status },
    fonts,
    spacing,
  }), [isDark]);

  const contextValue = useMemo(() => ({
    theme,
    isDark,
    toggleTheme,
  }), [theme, isDark]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
