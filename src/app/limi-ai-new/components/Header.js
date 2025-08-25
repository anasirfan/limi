'use client';

import { useState, useEffect } from 'react';
import { PaperShader } from '@paper-design/shaders';

const backgroundOptions = [
  {
    id: 'aurora-fluid-glow',
    name: 'Aurora Fluid Glow',
    description: 'A full-screen fluid aurora effect, where glowing teal and emerald ribbons flow like liquid energy with Northern Lights vibes.',
    config: {
      type: 'auroraFluid',
      colors: ['#0AB6BC', '#54bb74', '#93cfa2'],
      animation: 'glow',
      intensity: 0.9,
      speed: 0.2
    }
  },
  {
    id: 'aurora-crimson-glow',
    name: 'Aurora Crimson Glow',
    description: 'Fiery crimson and orange aurora ribbons dancing with deep red undertones, creating a warm sunset-like atmosphere.',
    config: {
      type: 'auroraCrimson',
      colors: ['#DC2626', '#F97316', '#FEF3C7'],
      animation: 'glow',
      intensity: 0.8,
      speed: 0.25
    }
  },
  {
    id: 'aurora-purple-storm',
    name: 'Aurora Purple Storm',
    description: 'Electric purple and violet streams with magenta highlights, creating an intense cosmic storm effect.',
    config: {
      type: 'auroraPurple',
      colors: ['#7C3AED', '#C084FC', '#F3E8FF'],
      animation: 'storm',
      intensity: 1.0,
      speed: 0.3
    }
  },
  {
    id: 'aurora-golden-waves',
    name: 'Aurora Golden Waves',
    description: 'Luxurious golden and amber waves flowing with warm yellow highlights, resembling liquid gold.',
    config: {
      type: 'auroraGolden',
      colors: ['#F59E0B', '#FCD34D', '#FEF3C7'],
      animation: 'waves',
      intensity: 0.7,
      speed: 0.15
    }
  },
  {
    id: 'aurora-ice-blue',
    name: 'Aurora Ice Blue',
    description: 'Cool ice blue and cyan ribbons with crystalline white highlights, creating a frozen arctic atmosphere.',
    config: {
      type: 'auroraIce',
      colors: ['#0EA5E9', '#67E8F9', '#F0F9FF'],
      animation: 'ice',
      intensity: 0.6,
      speed: 0.18
    }
  },
  {
    id: 'aurora-rainbow-spectrum',
    name: 'Aurora Rainbow Spectrum',
    description: 'Multi-colored aurora displaying the full spectrum from deep purples to vibrant greens and blues.',
    config: {
      type: 'auroraRainbow',
      colors: ['#8B5CF6', '#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
      animation: 'spectrum',
      intensity: 0.9,
      speed: 0.22
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
