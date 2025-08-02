'use client';
import { useState, useEffect } from 'react';
import { toggleTheme, getCurrentTheme, getThemeColors } from '../../utils/forcefulThemeSwitcher';

/**
 * Forceful Theme Toggle Component
 * Provides UI controls for the forceful theme switcher
 */
export default function ForcefulThemeToggle({ 
  className = '',
  showLabel = true,
  size = 'md' // 'sm', 'md', 'lg'
}) {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Initialize theme state
    setCurrentTheme(getCurrentTheme());

    // Listen for theme changes
    const handleThemeChange = (event) => {
      setCurrentTheme(event.detail.theme);
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 300);
    };

    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, []);

  const handleToggle = () => {
    setIsTransitioning(true);
    toggleTheme();
  };

  // Size variants
  const sizeClasses = {
    sm: 'w-10 h-6',
    md: 'w-12 h-7',
    lg: 'w-14 h-8'
  };

  const knobSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const translateClasses = {
    sm: currentTheme === 'light' ? 'translate-x-4' : 'translate-x-0',
    md: currentTheme === 'light' ? 'translate-x-5' : 'translate-x-0',
    lg: currentTheme === 'light' ? 'translate-x-6' : 'translate-x-0'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showLabel && (
        <span className="text-sm font-medium text-current">
          {currentTheme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </span>
      )}
      
      <button
        onClick={handleToggle}
        className={`
          relative inline-flex ${sizeClasses[size]} items-center rounded-full 
          transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 
          focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-current
          ${currentTheme === 'dark' 
            ? 'bg-charleston-green border-2 border-emerald' 
            : 'bg-alabaster border-2 border-charleston-green'
          }
          ${isTransitioning ? 'scale-105' : 'scale-100'}
        `}
        aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`}
        disabled={isTransitioning}
      >
        {/* Toggle knob */}
        <span
          className={`
            ${knobSizeClasses[size]} ${translateClasses[size]}
            inline-block rounded-full transition-all duration-300 ease-in-out
            ${currentTheme === 'dark' 
              ? 'bg-emerald shadow-lg' 
              : 'bg-charleston-green shadow-md'
            }
            ${isTransitioning ? 'scale-110' : 'scale-100'}
          `}
        >
          {/* Theme icons */}
          <span className="absolute inset-0 flex items-center justify-center text-xs">
            {currentTheme === 'dark' ? '🌙' : '☀️'}
          </span>
        </span>
      </button>
      
      {/* Status indicator */}
      <div className="flex items-center gap-1">
        <div 
          className={`
            w-2 h-2 rounded-full transition-all duration-300
            ${currentTheme === 'dark' ? 'bg-emerald' : 'bg-charleston-green'}
            ${isTransitioning ? 'animate-pulse' : ''}
          `} 
        />
        {isTransitioning && (
          <span className="text-xs text-current opacity-70">
            Switching...
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Minimal Theme Toggle Button (icon only)
 */
export function MinimalThemeToggle({ className = '' }) {
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    setCurrentTheme(getCurrentTheme());
    
    const handleThemeChange = (event) => {
      setCurrentTheme(event.detail.theme);
    };

    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2 rounded-lg transition-all duration-300 hover:scale-110
        ${currentTheme === 'dark' 
          ? 'bg-charleston-green-light hover:bg-emerald text-alabaster' 
          : 'bg-alabaster hover:bg-charleston-green text-charleston-green hover:text-alabaster'
        }
        ${className}
      `}
      aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {currentTheme === 'dark' ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}

/**
 * Theme Status Display
 */
export function ThemeStatus({ className = '' }) {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [themeColors, setThemeColors] = useState(null);

  useEffect(() => {
    setCurrentTheme(getCurrentTheme());
    setThemeColors(getThemeColors());
    
    const handleThemeChange = (event) => {
      setCurrentTheme(event.detail.theme);
      setThemeColors(event.detail.colors);
    };

    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, []);

  if (!themeColors) return null;

  return (
    <div className={`p-4 rounded-lg border ${className}`} style={{
      backgroundColor: themeColors.cardBg,
      borderColor: themeColors.cardBorder,
      color: themeColors.text
    }}>
      <h3 className="font-semibold mb-2">Current Theme: {currentTheme}</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>Background: <span className="font-mono">{themeColors.background}</span></div>
        <div>Text: <span className="font-mono">{themeColors.text}</span></div>
        <div>Primary: <span className="font-mono">{themeColors.primary}</span></div>
        <div>Secondary: <span className="font-mono">{themeColors.secondary}</span></div>
      </div>
    </div>
  );
}
