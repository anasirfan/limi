'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import CSSThemeToggle from '../ui/CSSThemeToggle';
import { getCurrentTheme, getThemeColors } from '../../utils/forcefulThemeSwitcher';

/**
 * Beautiful LIMI Prototype Page with Textures and Images
 * Showcases theme switching capabilities with rich visual content
 */
export default function LimiPrototypePage() {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [themeColors, setThemeColors] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(getCurrentTheme());
    setThemeColors(getThemeColors());

    const handleThemeChange = (event) => {
      setCurrentTheme(event.detail.theme);
      setThemeColors(event.detail.colors);
    };

    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 animate-pulse">
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 bg-gray-700 rounded mb-4"></div>
          <div className="h-64 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${currentTheme === 'dark' ? 'bg-[#2b2d2f]' : 'bg-[#f2f0e6]'}`}>
      {/* Header with Theme Toggle */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-500 ${
        currentTheme === 'dark' 
          ? 'bg-[#2b2d2f]/80 border-[#3a3d42]' 
          : 'bg-[#f2f0e6]/80 border-[#e5e5e5]'
      }`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className={`text-2xl font-bold transition-colors duration-500 ${
              currentTheme === 'dark' ? 'text-[#f2f0e6]' : 'text-[#2b2d2f]'
            }`}>
              LIMI Prototype
            </h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-500 ${
              currentTheme === 'dark' 
                ? 'bg-[#54bb74] text-[#ffffff]' 
                : 'bg-[#2e7f53] text-[#ffffff]'
            }`}>
              Theme Demo
            </span>
          </div>
          <CSSThemeToggle />
        </div>
      </header>

      {/* Hero Section with Texture Background */}
      <section className="relative py-20 overflow-hidden">
        {/* Texture Background */}
        <div className={`absolute inset-0 opacity-10 transition-opacity duration-500 ${
          currentTheme === 'dark' ? 'opacity-5' : 'opacity-10'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-eton-blue/20"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${currentTheme === 'dark' ? '54bb74' : '2e7f53'}' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-7xl font-bold mb-6 transition-colors duration-500 ${
              currentTheme === 'dark' ? 'text-[#f2f0e6]' : 'text-[#2b2d2f]'
            }`}>
              Lighting Made
              <span className={`block transition-colors duration-500 ${
                currentTheme === 'dark' ? 'text-[#54bb74]' : 'text-[#2e7f53]'
              }`}>
                Limitless
              </span>
            </h2>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto transition-colors duration-500 ${
              currentTheme === 'dark' ? 'text-[#e9eaec]' : 'text-[#3a3d42]'
            }`}>
              Experience the future of smart modular lighting with seamless theme transitions
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'Smart Control',
                description: 'Intelligent lighting that adapts to your needs',
                icon: '🎛️',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
              },
              {
                title: 'Modular Design',
                description: 'Mix and match components for perfect customization',
                icon: '🔧',
                image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop'
              },
              {
                title: 'Theme Adaptive',
                description: 'Beautiful in both light and dark environments',
                icon: '🌓',
                image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=300&fit=crop'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 ${
                  currentTheme === 'dark' 
                    ? 'bg-[#1e2022] border border-[#3a3d42] hover:border-[#54bb74]' 
                    : 'bg-[#ffffff] border border-[#e5e5e5] hover:border-[#2e7f53]'
                }`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    currentTheme === 'dark' 
                      ? 'bg-gradient-to-t from-[#1e2022] via-transparent to-transparent' 
                      : 'bg-gradient-to-t from-[#ffffff] via-transparent to-transparent'
                  }`}></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className={`text-xl font-bold mb-3 transition-colors duration-500 ${
                    currentTheme === 'dark' ? 'text-[#f2f0e6]' : 'text-[#2b2d2f]'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`transition-colors duration-500 ${
                    currentTheme === 'dark' ? 'text-[#e9eaec]' : 'text-[#3a3d42]'
                  }`}>
                    {feature.description}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                  currentTheme === 'dark' 
                    ? 'bg-gradient-to-r from-[#54bb74]/10 to-[#87ceab]/10' 
                    : 'bg-gradient-to-r from-[#2e7f53]/10 to-[#54bb74]/10'
                }`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className={`py-20 transition-all duration-500 ${
        currentTheme === 'dark' ? 'bg-[#1e2022]' : 'bg-[#ffffff]'
      }`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${
              currentTheme === 'dark' ? 'text-[#f2f0e6]' : 'text-[#2b2d2f]'
            }`}>
              Our Products
            </h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${
              currentTheme === 'dark' ? 'text-[#e9eaec]' : 'text-[#3a3d42]'
            }`}>
              Discover our range of smart lighting solutions that adapt beautifully to any theme
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'LIMI Pendant',
                price: '$299',
                image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=300&h=300&fit=crop'
              },
              {
                name: 'LIMI Base',
                price: '$199',
                image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop'
              },
              {
                name: 'LIMI Strip',
                price: '$149',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop'
              },
              {
                name: 'LIMI Hub',
                price: '$399',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
              }
            ].map((product, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl transition-all duration-500 hover:scale-105 ${
                  currentTheme === 'dark' 
                    ? 'bg-[#2b2d2f] border border-[#3a3d42]' 
                    : 'bg-[#f2f0e6] border border-[#e5e5e5]'
                }`}
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className={`font-bold mb-2 transition-colors duration-500 ${
                    currentTheme === 'dark' ? 'text-[#f2f0e6]' : 'text-[#2b2d2f]'
                  }`}>
                    {product.name}
                  </h3>
                  <p className={`text-lg font-semibold transition-colors duration-500 ${
                    currentTheme === 'dark' ? 'text-[#54bb74]' : 'text-[#2e7f53]'
                  }`}>
                    {product.price}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <button className={`absolute bottom-4 right-4 px-4 py-2 rounded-lg font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                  currentTheme === 'dark' 
                    ? 'bg-[#54bb74] text-[#ffffff] hover:bg-[#50c878]' 
                    : 'bg-[#2e7f53] text-[#ffffff] hover:bg-[#54bb74]'
                }`}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Theme Status Section */}
      <section className={`py-16 transition-all duration-500 ${
        currentTheme === 'dark' ? 'bg-[#2b2d2f]' : 'bg-[#f2f0e6]'
      }`}>
        <div className="container mx-auto px-6">
          <div className={`max-w-4xl mx-auto p-8 rounded-2xl transition-all duration-500 ${
            currentTheme === 'dark' 
              ? 'bg-[#1e2022] border border-[#3a3d42]' 
              : 'bg-[#ffffff] border border-[#e5e5e5]'
          }`}>
            <div className="text-center mb-8">
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${
                currentTheme === 'dark' ? 'text-[#f2f0e6]' : 'text-[#2b2d2f]'
              }`}>
                Current Theme Status
              </h3>
              <div className="flex items-center justify-center gap-4">
                <div className={`w-4 h-4 rounded-full transition-colors duration-500 ${
                  currentTheme === 'dark' ? 'bg-[#54bb74]' : 'bg-[#2e7f53]'
                }`}></div>
                <span className={`text-lg font-medium capitalize transition-colors duration-500 ${
                  currentTheme === 'dark' ? 'text-[#54bb74]' : 'text-[#2e7f53]'
                }`}>
                  {currentTheme} Theme Active
                </span>
              </div>
            </div>

            {themeColors && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`font-semibold mb-3 transition-colors duration-500 ${
                    currentTheme === 'dark' ? 'text-[#f2f0e6]' : 'text-[#2b2d2f]'
                  }`}>
                    Color Palette
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(themeColors).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-3">
                        <div 
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: value }}
                        ></div>
                        <span className={`text-sm font-mono transition-colors duration-500 ${
                          currentTheme === 'dark' ? 'text-[#e9eaec]' : 'text-[#3a3d42]'
                        }`}>
                          {key}: {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className={`font-semibold mb-3 transition-colors duration-500 ${
                    currentTheme === 'dark' ? 'text-[#f2f0e6]' : 'text-[#2b2d2f]'
                  }`}>
                    Theme Features
                  </h4>
                  <ul className={`space-y-2 text-sm transition-colors duration-500 ${
                    currentTheme === 'dark' ? 'text-[#e9eaec]' : 'text-[#3a3d42]'
                  }`}>
                    <li>✅ Arbitrary color conversion</li>
                    <li>✅ CSS variable updates</li>
                    <li>✅ Smooth transitions</li>
                    <li>✅ Cross-tab synchronization</li>
                    <li>✅ Persistent preferences</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t transition-all duration-500 ${
        currentTheme === 'dark' 
          ? 'bg-[#1e2022] border-[#3a3d42]' 
          : 'bg-[#ffffff] border-[#e5e5e5]'
      }`}>
        <div className="container mx-auto px-6 text-center">
          <p className={`transition-colors duration-500 ${
            currentTheme === 'dark' ? 'text-[#e9eaec]' : 'text-[#3a3d42]'
          }`}>
            © 2024 LIMI Lighting. Prototype theme demo showcasing seamless dark/light transitions.
          </p>
        </div>
      </footer>
    </div>
  );
}
