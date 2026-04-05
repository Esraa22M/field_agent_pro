import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { Appearance } from 'react-native';
import { fonts, spacing, colors } from './index'; 
const initialState = {
  theme: { colors: {...colors.dark, ...colors.status}, fonts, spacing },
  toggleTheme: () => {},
};

export const ThemeContext = createContext(initialState);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = Appearance.getColorScheme();

  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  const theme = useMemo(() => ({
    colors: isDark ? {...colors.dark, ...colors.status} : {...colors.light, ...colors.status},
    fonts,
    spacing,
  }), [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);

  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme]);

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