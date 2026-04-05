import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { Appearance } from 'react-native';
import { fonts, spacing, lightColors, darkColors } from './index';

const initialState = {
  theme: { colors: darkColors, fonts, spacing },
  toggleTheme: () => {},
};

export const ThemeContext = createContext(initialState);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = Appearance.getColorScheme();

  const [theme, setTheme] = useState({
    colors: colorScheme === 'dark' ? darkColors : lightColors,
    fonts,
    spacing,
  });

  const toggleTheme = () => {
    setTheme(prev => ({
      ...prev,
      colors: prev.colors === lightColors ? darkColors : lightColors,
    }));
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(prev => ({
        ...prev,
        colors: colorScheme === 'dark' ? darkColors : lightColors,
      }));
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
