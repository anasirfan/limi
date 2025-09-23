'use client';

import { useState, useEffect } from 'react';
import { PaperShader } from '@paper-design/shaders';

const backgroundOptions = [
  {
    id: 'metaballs-ultra-light',
    name: 'Metaballs Ultra Light',
    description: 'Ultra-lightweight single metaball with maximum performance for smooth experience.',
    config: {
      type: 'shader',
      shaderType: 'Metaballs',
      baseLayer: {
        component: 'Metaballs',
        props: {
          color: '#8A2BE2',
          speed: 0.05,
          count: 2,
          size: 0.5,
          quality: 'low',
          resolution: 0.25,
          fps: 30
        }
      },
      overlayLayer: null // Remove overlay for maximum performance
    }
  },
  {
    id: 'metaballs-static',
    name: 'Metaballs Static',
    description: 'Nearly static metaballs with minimal animation for best performance on low-end devices.',
    config: {
      type: 'shader',
      shaderType: 'Metaballs',
      baseLayer: {
        component: 'Metaballs',
        props: {
          color: '#7B61FF',
          speed: 0.02,
          count: 1,
          size: 0.4,
          quality: 'low',
          resolution: 0.2,
          fps: 15,
          paused: false
        }
      },
      overlayLayer: null // No overlay layer
    }
  }
];

export default function Header({ onBackgroundChange }) {
  const [selectedBackground, setSelectedBackground] = useState(backgroundOptions[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (onBackgroundChange) {
      onBackgroundChange(selectedBackground);
    }
  }, [selectedBackground, onBackgroundChange]);

  const handleBackgroundSelect = (background) => {
    setSelectedBackground(background);
    setIsDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <h1 className="text-white font-semibold text-lg">LIMI AI</h1>
        </div>

        {/* Background Selector */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 transition-colors duration-200 rounded-lg px-4 py-2 text-white border border-white/20"
          >
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500"></div>
            <span className="text-sm font-medium">{selectedBackground.name}</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-black/90 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-2 max-h-96 overflow-y-auto">
                {backgroundOptions.map((background) => (
                  <button
                    key={background.id}
                    onClick={() => handleBackgroundSelect(background)}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                      selectedBackground.id === background.id
                        ? 'bg-emerald-500/20 border border-emerald-400/30'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                        selectedBackground.id === background.id
                          ? 'bg-emerald-400'
                          : 'bg-white/30'
                      }`}></div>
                      <div>
                        <h3 className="text-white font-medium text-sm mb-1">{background.name}</h3>
                        <p className="text-white/70 text-xs leading-relaxed">{background.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-white/80 hover:text-white transition-colors duration-200 text-sm">Features</a>
          <a href="#demo" className="text-white/80 hover:text-white transition-colors duration-200 text-sm">Demo</a>
          <a href="#contact" className="text-white/80 hover:text-white transition-colors duration-200 text-sm">Contact</a>
        </nav>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </header>
  );
}
