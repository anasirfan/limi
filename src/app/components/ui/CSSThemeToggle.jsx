'use client';
import { useState, useEffect } from 'react';
import { toggleTheme, getCurrentTheme, initThemeSwitcher } from '../../utils/forcefulThemeSwitcher';

/**
 * Beautiful CSS-based Theme Toggle Component
 * Matches the provided CSS design with smooth animations
 */
export default function CSSThemeToggle({ className = '' }) {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Initialize theme switcher
    initThemeSwitcher();
    setCurrentTheme(getCurrentTheme());

    // Listen for theme changes
    const handleThemeChange = (event) => {
      setCurrentTheme(event.detail.theme);
    };

    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, []);

  const handleToggle = () => {
    toggleTheme();
  };

  if (!mounted) {
    return (
      <div className="w-20 h-10 rounded-full bg-gray-200 animate-pulse"></div>
    );
  }

  return (
    <div className={`theme-switch ${className}`}>
      <input 
        type="checkbox" 
        className="checkbox opacity-0 absolute" 
        id="limi-theme-checkbox" 
        checked={currentTheme === 'dark'}
        onChange={handleToggle}
      />
      <label 
        htmlFor="limi-theme-checkbox" 
        className="label flex items-center justify-between p-2.5 rounded-full relative h-10 w-20 cursor-pointer transition-all duration-300 ease-out"
        style={{
          boxShadow: currentTheme === 'dark' 
            ? '0px 0px 10px 3px rgba(0, 0, 0, 0.5) inset' 
            : '0px 0px 10px 3px rgba(0, 0, 0, 0.1) inset',
          backgroundColor: currentTheme === 'dark' ? '#292639' : '#fff'
        }}
      >
        {/* Moon Icon */}
        <svg 
          className="moon transition-all duration-500 ease-out hover:rotate-360" 
          width="24" 
          height="24" 
          strokeWidth="1.5" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: '#f1c40f' }}
        >
          <path 
            d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Sun Icon */}
        <svg 
          className="sun transition-all duration-500 ease-out hover:rotate-360" 
          width="24" 
          height="24" 
          strokeWidth="1.5" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: '#ff6b00' }}
        >
          <path 
            d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path d="M22 12L23 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 2V1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 23V22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 20L19 19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 4L19 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 20L5 19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 4L5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1 12L2 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        {/* Toggle Ball */}
        <div 
          className="ball absolute rounded-full top-1.5 left-1.5 h-7 w-7 transition-all duration-300 ease-out"
          style={{
            backgroundColor: currentTheme === 'dark' ? '#ebeaf7' : '#303030',
            transform: currentTheme === 'dark' ? 'translateX(40px)' : 'translateX(0)'
          }}
        />
      </label>
      
      <style jsx>{`
        .theme-switch .label:hover .moon,
        .theme-switch .label:hover .sun {
          transform: rotate(360deg);
        }
        
        .hover\\:rotate-360:hover {
          transform: rotate(360deg);
        }
      `}</style>
    </div>
  );
}

/**
 * Compact CSS Theme Toggle for Mobile
 */
export function CompactCSSThemeToggle({ className = '' }) {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initThemeSwitcher();
    setCurrentTheme(getCurrentTheme());

    const handleThemeChange = (event) => {
      setCurrentTheme(event.detail.theme);
    };

    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, []);

  if (!mounted) {
    return <div className="w-16 h-8 rounded-full bg-gray-200 animate-pulse"></div>;
  }

  return (
    <div className={`theme-switch-compact ${className}`}>
      <input 
        type="checkbox" 
        className="opacity-0 absolute" 
        id="limi-theme-checkbox-mobile" 
        checked={currentTheme === 'dark'}
        onChange={toggleTheme}
      />
      <label 
        htmlFor="limi-theme-checkbox-mobile" 
        className="flex items-center justify-between p-2 rounded-full relative h-8 w-16 cursor-pointer transition-all duration-300 ease-out"
        style={{
          boxShadow: currentTheme === 'dark' 
            ? '0px 0px 8px 2px rgba(0, 0, 0, 0.5) inset' 
            : '0px 0px 8px 2px rgba(0, 0, 0, 0.1) inset',
          backgroundColor: currentTheme === 'dark' ? '#292639' : '#fff'
        }}
      >
        {/* Moon Icon */}
        <svg 
          className="transition-all duration-500 ease-out" 
          width="16" 
          height="16" 
          strokeWidth="1.5" 
          viewBox="0 0 24 24" 
          fill="none"
          style={{ color: '#f1c40f' }}
        >
          <path 
            d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Sun Icon */}
        <svg 
          className="transition-all duration-500 ease-out" 
          width="16" 
          height="16" 
          strokeWidth="1.5" 
          viewBox="0 0 24 24" 
          fill="none"
          style={{ color: '#ff6b00' }}
        >
          <path 
            d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path d="M22 12L23 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 2V1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 23V22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 20L19 19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 4L19 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 20L5 19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 4L5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1 12L2 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        {/* Toggle Ball */}
        <div 
          className="absolute rounded-full top-1 left-1 h-6 w-6 transition-all duration-300 ease-out"
          style={{
            backgroundColor: currentTheme === 'dark' ? '#ebeaf7' : '#303030',
            transform: currentTheme === 'dark' ? 'translateX(32px)' : 'translateX(0)'
          }}
        />
      </label>
    </div>
  );
}
