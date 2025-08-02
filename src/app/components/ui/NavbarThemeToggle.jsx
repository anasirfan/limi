'use client';
import { useState, useEffect } from 'react';
import { toggleTheme, getCurrentTheme, initThemeSwitcher } from '../../utils/forcefulThemeSwitcher';

/**
 * Navbar Theme Toggle Component
 * Stylish 3-option theme switcher (Light/Dark/Black) for navbar integration
 */
export default function NavbarThemeToggle({ className = '' }) {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [isOpen, setIsOpen] = useState(false);
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

  const handleThemeSelect = (theme) => {
    if (theme !== currentTheme) {
      toggleTheme();
      setCurrentTheme(theme);
    }
    setIsOpen(false);
  };

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse"></div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative flex items-center justify-center w-10 h-10 rounded-lg
          transition-all duration-300 ease-in-out
          ${currentTheme === 'dark' 
            ? 'bg-charleston-green-light border border-emerald text-alabaster hover:bg-emerald' 
            : 'bg-alabaster border border-charleston-green text-charleston-green hover:bg-charleston-green hover:text-alabaster'
          }
          ${isOpen ? 'scale-105 shadow-lg' : 'hover:scale-105'}
        `}
        aria-label="Toggle theme"
      >
        {/* Theme Icon */}
        {currentTheme === 'dark' ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className={`
            absolute right-0 top-12 z-50 w-80 max-w-sm
            ${currentTheme === 'dark' 
              ? 'bg-charleston-green border border-emerald' 
              : 'bg-alabaster border border-charleston-green'
            }
            rounded-xl shadow-2xl overflow-hidden
            transform transition-all duration-300 ease-out
            ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'}
          `}>
            
            {/* Header */}
            <div className="p-4 border-b border-current border-opacity-20">
              <h3 className={`
                text-sm font-medium mb-3
                ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
              `}>
                Theme
              </h3>
              
              {/* Theme Switcher */}
              <div className={`
                relative flex p-1 rounded-xl
                ${currentTheme === 'dark' 
                  ? 'bg-charleston-green-dark' 
                  : 'bg-gray-100'
                }
              `}>
                {/* Slider */}
                <div className={`
                  absolute top-1 bottom-1 w-1/2 rounded-lg
                  transition-all duration-300 ease-out
                  ${currentTheme === 'dark' 
                    ? 'bg-emerald shadow-lg' 
                    : 'bg-white shadow-md'
                  }
                  ${currentTheme === 'light' ? 'translate-x-0' : 'translate-x-full'}
                `} />
                
                {/* Light Theme Option */}
                <button
                  onClick={() => handleThemeSelect('light')}
                  className={`
                    relative z-10 flex-1 flex items-center justify-center py-2 px-3 rounded-lg
                    transition-all duration-300 font-medium text-sm
                    ${currentTheme === 'light' 
                      ? 'text-white' 
                      : currentTheme === 'dark' 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-800'
                    }
                  `}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                  Light
                </button>
                
                {/* Dark Theme Option */}
                <button
                  onClick={() => handleThemeSelect('dark')}
                  className={`
                    relative z-10 flex-1 flex items-center justify-center py-2 px-3 rounded-lg
                    transition-all duration-300 font-medium text-sm
                    ${currentTheme === 'dark' 
                      ? 'text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                    }
                  `}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                  Dark
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-3 space-y-1">
              <button
                onClick={() => {
                  handleThemeSelect(currentTheme === 'dark' ? 'light' : 'dark');
                }}
                className={`
                  w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${currentTheme === 'dark' 
                    ? 'text-gray-300 hover:bg-charleston-green-light hover:text-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }
                `}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                Switch Theme
              </button>
              
              <button
                onClick={() => {
                  // Reset to system preference or default
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  handleThemeSelect(systemPrefersDark ? 'dark' : 'light');
                }}
                className={`
                  w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${currentTheme === 'dark' 
                    ? 'text-gray-300 hover:bg-charleston-green-light hover:text-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }
                `}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                System Default
              </button>
            </div>

            {/* Status Indicator */}
            <div className={`
              px-4 py-3 border-t border-current border-opacity-20
              ${currentTheme === 'dark' ? 'bg-charleston-green-dark' : 'bg-gray-50'}
            `}>
              <div className="flex items-center justify-between">
                <span className={`
                  text-xs font-medium
                  ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
                `}>
                  Current Theme
                </span>
                <div className="flex items-center gap-2">
                  <div className={`
                    w-2 h-2 rounded-full
                    ${currentTheme === 'dark' ? 'bg-emerald' : 'bg-charleston-green'}
                  `} />
                  <span className={`
                    text-xs font-medium capitalize
                    ${currentTheme === 'dark' ? 'text-emerald' : 'text-charleston-green'}
                  `}>
                    {currentTheme}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Compact Theme Toggle for Mobile
 */
export function CompactNavbarThemeToggle({ className = '' }) {
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
    return <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>;
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        flex items-center justify-center w-8 h-8 rounded-full
        transition-all duration-300 ease-in-out hover:scale-110
        ${currentTheme === 'dark' 
          ? 'bg-emerald text-white shadow-lg' 
          : 'bg-charleston-green text-alabaster shadow-md'
        }
        ${className}
      `}
      aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {currentTheme === 'dark' ? (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}
