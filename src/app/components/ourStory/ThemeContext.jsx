'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// LIMI brand colors
export const COLORS = {
  light: {
    background: '#F2F0E6', // Alabaster
    text: '#2B2D2F',       // Charleston Green
    primary: '#50C878',    // Emerald
    secondary: '#87CEAB',  // Eton Blue
    accent: '#54BB74',     // Slightly darker emerald
    cardBg: '#FFFFFF',     // White
    cardBorder: '#E5E5E5'  // Light gray
  },
  dark: {
    background: '#2B2D2F', // Charleston Green
    text: '#F2F0E6',       // Alabaster
    primary: '#50C878',    // Emerald
    secondary: '#87CEAB',  // Eton Blue
    accent: '#54BB74',     // Slightly darker emerald
    cardBg: '#1F1F1F',     // Darker gray
    cardBorder: '#3A3D42'  // Medium gray
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const toggleTheme = () => {
    setIsTransitioning(true);
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };
  
  // Provide current color palette based on theme
  const colors = COLORS[theme];
  
  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
