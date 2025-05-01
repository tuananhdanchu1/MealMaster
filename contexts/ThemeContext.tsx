import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Define theme colors
const lightTheme = {
  primary: '#5D9A6C', // Sage green
  primaryLight: '#E3F2E7',
  accent: '#F07167', // Coral
  accentLight: '#FCE4E2',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  background: '#FFFFFF',
  cardBackground: '#FFFFFF',
  text: '#333333',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#9CA3AF',
  grayLight: '#F3F4F6',
  heart: '#F07167', // Use accent color for heart icon
};

const darkTheme = {
  primary: '#7AB587', // Lighter sage green for dark mode
  primaryLight: '#2A3B2E',
  accent: '#F07167', // Coral
  accentLight: '#42302E',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  background: '#121212',
  cardBackground: '#1E1E1E',
  text: '#F3F4F6',
  textSecondary: '#9CA3AF',
  border: '#2D2D2D',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#6B7280',
  grayLight: '#2D2D2D',
  heart: '#F07167', // Use accent color for heart icon
};

// Create context
const ThemeContext = createContext({
  isDark: false,
  colors: lightTheme,
  toggleTheme: () => {},
});

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  // Update theme if system theme changes
  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = {
    isDark,
    colors: isDark ? darkTheme : lightTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => useContext(ThemeContext);